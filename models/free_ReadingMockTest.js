const mongoose = require("mongoose");

const passageSchema = new mongoose.Schema({
  passage: String,
});

const questionSchema = new mongoose.Schema({
  question: String,
  answer: String,
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
