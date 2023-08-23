const mongoose = require("mongoose");

const listeningquestionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  audioData: {
    base64: String,
    subType: String,
  },
  contentType: {
    type: String,
    required: true,
  },
  sentences: [
    {
      sentence: {
        type: String,
        required: true,
      },
      options: [
        {
          type: String,
        },
      ],
      correctOption: {
        type: String,
        required: true,
      },
    },
  ],
  question_category: {
    type: String,
    required: true,
    enum: ["fillInTheBlanks", "MultipleChoice", "IdentifyingOptions"],
  },
});

const FreelisteningMock = mongoose.model("FreelisteningMock", listeningquestionSchema,"FREE-ListeningMockTestData");

module.exports = FreelisteningMock;
