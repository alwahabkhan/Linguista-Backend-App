/* var authenticate = require("../authenticate");
const writingResult = require("../models/free_MockTest");
const axios = require('axios');
const compromise = require('compromise');

const evaluateEssay = async (req, res) => {
  try {
    const question_ids = req.body.question_id; // Assuming question_id is an array
    const question_answers = req.body.question_answers;

    // LanguageTool API endpoint
    const grammarApiUrl = 'https://languagetool.org/api/v2/check';

    let totalCorrectAnswers = 0; // Initialize total correct answers

    // Iterate over each question answer 
    for (let i = 0; i < question_ids.length; i++) {
      const question_id = question_ids[i];
      const question_answer = question_answers[i];

      // Make a POST request to the LanguageTool API for grammar checking
      const grammarResponse = await axios.post(grammarApiUrl, `text=${encodeURIComponent(question_answer)}&language=en-US`);
      const grammarMatches = grammarResponse.data.matches;

      // Check if the answer has no grammar mistakes
      const answerIsCorrect = grammarMatches.length === 0;

      if (answerIsCorrect) {
        totalCorrectAnswers++;
      }

      // Use compromise to tokenize and analyze text for basic coherence and cohesion
      const sentences = compromise(question_answer).sentences();

      // Now you can also process the database question using the question_id
      const question = await writingResult.findById(question_id);
      console.log(question.question_text);

      // Perform any other necessary processing
      // ...

      // Logging for debugging
      console.log('Question Answer:', question_answer);
      console.log('Grammar Issues:', grammarMatches);
      console.log('Sentences:', sentences);
    }

    // Calculate the score as a percentage of correct answers
    const percentageCorrect = (totalCorrectAnswers / question_ids.length) * 100;
    let totalScore = (percentageCorrect / 100) * 10; // Convert to a score out of 10

    // Round the total score according to your requirements
    totalScore = Math.round(totalScore * 2) / 2; // Round to nearest 0.5

    res.status(200).json({ totalScore });
  } catch (error) {
    console.error(error); // Log the error to the console
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  evaluateEssay,
};
 */
var authenticate = require("../authenticate");
const writingResult = require("../models/free_MockTest");
const axios = require('axios');
const compromise = require('compromise');

const evaluateEssay = async (req, res) => {
  try {
    const question_ids = req.body.question_id; // Assuming question_id is an array
    const question_answers = req.body.question_answers;

    // LanguageTool API endpoint
    const grammarApiUrl = 'https://languagetool.org/api/v2/check';

    let totalCorrectAnswers = 0; // Initialize total correct answers

    const allMistakes = []; // To store all mistakes for each answer

    // Iterate over each question answer
    for (let i = 0; i < question_ids.length; i++) {
      const question_id = question_ids[i];
      const question_answer = question_answers[i];

      // Make a POST request to the LanguageTool API for grammar checking
      const grammarResponse = await axios.post(grammarApiUrl, `text=${encodeURIComponent(question_answer)}&language=en-US`);
      const grammarMatches = grammarResponse.data.matches;

      // Check if the answer has no grammar mistakes
      const answerIsCorrect = grammarMatches.length === 0;

      if (answerIsCorrect) {
        totalCorrectAnswers++;
      }

      // Store the mistakes for this answer
      allMistakes.push({
        answerIndex: i,
        mistakes: grammarMatches,
      });

      // Use compromise to tokenize and analyze text for basic coherence and cohesion
      const sentences = compromise(question_answer).sentences();

      // Now you can also process the database question using the question_id
      const question = await writingResult.findById(question_id);
      console.log(question.question_text);

      // Perform any other necessary processing
      // ...

      // Logging for debugging
      console.log('Question Answer:', question_answer);
      console.log('Grammar Issues:', grammarMatches);
      console.log('Sentences:', sentences);
    }

    // Calculate the score as a percentage of correct answers
    const percentageCorrect = (totalCorrectAnswers / question_ids.length) * 100;
    let totalScore = (percentageCorrect / 100) * 10; // Convert to a score out of 10

    // Round the total score according to your requirements
    totalScore = Math.round(totalScore * 2) / 2; // Round to nearest 0.5

    res.status(200).json({ totalScore, allMistakes });
  } catch (error) {
    console.error(error); // Log the error to the console
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  evaluateEssay,
};
