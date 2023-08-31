var authenticate = require("../authenticate");
const FreeReadingMock = require("../models/free_ReadingMockTest");

const evaluateReadingTest = async (req, res) => {
  try {
    const evaluations = req.body; // Array of evaluations
    const results = [];

    for (const evaluation of evaluations) {
      const { question_evaluationId, question_answers } = evaluation;
      const question_evaluation = await FreeReadingMock.findById(question_evaluationId);

      const correctAnswers = question_evaluation.questions.map(question => question.correct_choice);

      let totalMarks = 0;
      const evaluationResults = [];

      for (let i = 0; i < question_evaluation.questions.length; i++) {
        const userAnswer = question_answers[i];
        const correctAnswer = correctAnswers[i];
        
        if (userAnswer === correctAnswer) {
          totalMarks++;
          evaluationResults.push('Correct');
        } else {
          evaluationResults.push('Incorrect');
        }
      }

      results.push({ totalMarks, evaluationResults });
    }

    const overallTotalMarks = results.reduce((acc, evaluation) => acc + evaluation.totalMarks, 0);
    const overallTotalQuestions = results.reduce((acc, evaluation) => acc + evaluation.evaluationResults.length, 0);

    res.json({ results, overallTotalMarks, overallTotalQuestions });
  } catch (error) {
    console.error('Error generating results:', error);
    res.status(500).json({ error: 'An error occurred while generating results.' });
  }
};

module.exports = evaluateReadingTest;
