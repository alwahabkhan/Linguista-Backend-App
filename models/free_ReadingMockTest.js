const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  question: String,
  choices: [String],
  correct_choice: String
});

const passageSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  passage: String,
  questions: [questionSchema]
});

const freeReadingMockSchema = new mongoose.Schema({
  test_name: {
    type: String,
    required: true,
  },
  passages: [passageSchema],
  questions: [questionSchema],
});

const FreeReadingMock = mongoose.model(
  "FreeReadingMock",
  freeReadingMockSchema,
  "FREE-ReadingMockTestData"
);

module.exports = FreeReadingMock;
