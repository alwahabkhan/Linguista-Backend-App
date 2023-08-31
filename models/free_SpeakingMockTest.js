const mongoose = require("mongoose");

const freeSpeakingMockSchema = new mongoose.Schema({
  passage: {
    type: String,
  },
});

const FreeSpeakingMock = mongoose.model(
    "FreeSpeakingMock",
    freeSpeakingMockSchema,
    "FREE-SpeakingMockTestData"
  );

module.exports = FreeSpeakingMock;