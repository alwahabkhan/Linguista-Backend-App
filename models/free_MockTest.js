const mongoose = require("mongoose");

const freeMockSchema = new mongoose.Schema({
  question_text: {
    type: String,
  },
});

const freeMock = mongoose.model(
  "freeMock",
  freeMockSchema,
  "FREE-WritingMockTestData"
);

module.exports = freeMock;
