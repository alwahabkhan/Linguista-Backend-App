const axios = require('axios');
const compromise = require('compromise');
const writingResult = require("../models/free_MockTest");
const natural = require('natural');
const textReadability = require('text-readability');

const evaluateEssay = async (req, res) => {
  try {
    const question_ids = req.body.question_id; // Assuming question_id is an array
    const question_answers = req.body.question_answers;

    // LanguageTool API endpoint
    const grammarApiUrl = 'https://languagetool.org/api/v2/check';

    let totalRareWords = 0; // Initialize total rare words count
    let totalComplexWords = 0; // Initialize total complex words count
    let totalMistakes = 0; // Initialize total mistakes count
    let totalStructuralErrors = 0;
    const allMistakes = []; // To store all mistakes for each answer
    const questionMarks = []; // To store individual question marks

    // Iterate over each question answer
    for (let i = 0; i < question_ids.length; i++) {
      const question_id = question_ids[i];
      const question_answer = question_answers[i];

      // Get the question text from the database for this question
      const question = await writingResult.findById(question_id).select('question_text');
      const question_text = question ? question.question_text : '';

      // Make a POST request to the LanguageTool API for grammar checking
      const grammarResponse = await axios.post(grammarApiUrl, `text=${encodeURIComponent(question_answer)}&language=en-US`);
      const grammarMatches = grammarResponse.data.matches;

      // Calculate the question mark based on grammar correctness
      const questionMark = calculateQuestionMark(grammarMatches);

      // Store the individual question mark
      questionMarks.push(questionMark);

      // Store the mistakes for this answer
      allMistakes.push({
        answerIndex: i,
        mistakes: grammarMatches,
      });

      // Use compromise to tokenize and analyze text for basic coherence and cohesion
      const doc = compromise(question_answer);
      const sentences = doc.sentences();
      

      // Inside the loop where you're processing terms
      doc.terms().forEach(term => {
        const word = term.out('text');
        const wordCount = term.wordCount();

        if (wordCount === 1 && word.length > 3) {
          totalRareWords++;
        }

        // Calculate the Automated Readability Index using the text-readability package
        const readabilityScore = textReadability.automatedReadabilityIndex(word);

        if (readabilityScore >= 7) {
          totalComplexWords++;
        }
      });

      console.log(question.question_text);

      console.log('Question Answer:', question_answer);
      console.log('Grammar Issues:', grammarMatches);
      console.log('Sentences:', sentences);
    }

    // Calculate the total marks out of 9
    const totalMarks = questionMarks.reduce((total, mark) => total + mark, 0);

    // Calculate the percentage of rare words and complex words out of 100
    const percentageRareWords = (totalRareWords / (question_ids.length * 100)) * 100;
    const percentageComplexWords = (totalComplexWords / (question_ids.length * 100)) * 100;

    res.status(200).json({
      totalMarks,
      allMistakes,
      percentageRareWords,
      percentageComplexWords,
      questionMarks,
    });
  } catch (error) {
    console.error(error); // Log the error to the console
    res.status(500).json({
      error: "Internal server error"
    });
  }
};

function calculateQuestionMark(grammarMatches) {
  // You can implement your own logic to calculate the question mark here
  // For example, you can deduct marks for each grammar mistake and return the remaining marks
  const deductionPerMistake = 1; // Adjust this as needed
  const maxMarks = 3; // Maximum marks per question
  const mistakes = grammarMatches.length;
  const remainingMarks = Math.max(0, maxMarks - mistakes * deductionPerMistake);
  return remainingMarks;
}

module.exports = {
  evaluateEssay,
};
