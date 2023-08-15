// free_ReadingMockTest.js
const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  question_text: {
    type: String,
    required: true,
  },
  options: {
    type: [String],
    required: true,
  },
  correct_option: {
    type: Number,
    required: true,
  },
});

const fillInTheBlanksSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  blanks: [
    {
      blank_id: {
        type: Number,
        required: true,
      },
      options: {
        type: [String],
        required: true,
      },
      correct_option: {
        type: String,
        required: true,
      },
    },
  ],
});

const dragAndDropSchema = new mongoose.Schema({
  questionText: {
    type: String,
    required: true,
  },
  randomOrder: {
    type: [String],
    required: true,
  },
  correctOrder: {
    type: [String],
    required: true,
  },
});

const freeReadingMockSchema = new mongoose.Schema({
  test_name: {
    type: String,
    required: true,
  },
  questions: [questionSchema],
  fillInTheBlanks: fillInTheBlanksSchema,
  dragAndDrop: dragAndDropSchema,
});

const freeReadingMock = mongoose.model(
  "freeReadingMock",
  freeReadingMockSchema,
  "FREE-ReadingMockTestData"
);

module.exports = freeReadingMock;
