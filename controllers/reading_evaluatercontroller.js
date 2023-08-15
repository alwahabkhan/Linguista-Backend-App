var authenticate = require("../authenticate");
const readingResult = require("../models/free_ReadingMockTest");

const evaluateReading = async (req, res) => {
  try {
    const _id = req.body._id;
    const questions_userAnswer = req.body.question_userAnswer;
    const fillInTheBlanks_userAnswer = req.body.question_userAnswer;
    const dragAndDrop_userAnswer = req.body.question_userAnswer;

    const question = await readingResult.findById(_id);

    if (!question) {
      return res.status(404).json({ error: "Question not found" });
    }

    // Log question_text from questions array
    if (question.questions && question.questions.length > 0) {
      console.log("Question Text:", question.questions[0].question_text);
    }

    // Log fillInTheBlanks question
    if (question.fillInTheBlanks) {
      console.log(
        "Fill in the Blanks Question:",
        question.fillInTheBlanks.question
      );
    }

    // Log dragAndDrop questionText
    if (question.dragAndDrop) {
      console.log(
        "Drag and Drop Question Text:",
        question.dragAndDrop.questionText
      );
    }

    // Log user answers
    console.log("User Answers:", {
      questions_userAnswer: req.body.question_userAnswer,
      fillInTheBlanks_userAnswer: req.body.fillInTheBlanks_userAnswer,
      dragAndDrop_userAnswer: req.body.dragAndDrop_userAnswer,
    });

    res.status(200).json({ value: 10 });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  evaluateReading,
};
