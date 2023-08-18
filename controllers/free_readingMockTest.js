var authenticate = require("../authenticate");
const freeMock = require("../models/free_ReadingMockTest");

const free = async (req, res) => {
  try {
    const data = await freeMock.find({}).select({
      "questions.correct_choice": 0,
      "passages.questions.correct_choice": 0,
      "passages.fillInTheBlanks.blanks.correct_choice": 0,
      "passages.dragAndDrop.correct_choice": 0,
    });

    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  free,
};
