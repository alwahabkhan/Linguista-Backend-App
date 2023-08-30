var authenticate = require("../authenticate");
const writingResult = require("../models/free_MockTest");

const evaluateEssay = async (req, res) => {
  try {
    const question_ids = req.body.question_id; // Assuming question_id is an array
    const question_answers = req.body.question_answers;

    // Now question_ids will contain ["64ba1117dfbf013551f50f90", "64ba1117dfbf013551f50f91", "64ba1117dfbf013551f50f92"]
    
    for (const id of question_ids) {
      const question = await writingResult.findById(id);
      console.log(question.question_text);
      // You can process each question here
    }

    res.status(200).json({ value: 10 });
  } catch (error) {
    console.error(error); // Log the error to the console
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  evaluateEssay,
};
