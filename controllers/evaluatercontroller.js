var authenticate = require("../authenticate");
const writingResult = require("../models/free_MockTest");

const evaluateEssay = async (req, res) => {
  try {
    const question_id = req.body.question_id;
    const question_answer = req.body.question_answer;

    const question = await writingResult.findById(question_id);
    console.log(question.question_text);

    res.status(200).json({ value: 10 });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  evaluateEssay,
};
