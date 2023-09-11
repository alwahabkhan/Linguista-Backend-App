const mongoose = require('mongoose');

const free_writingGeneralTrainingMockTest = new mongoose.Schema({
  category: {
    type: String,
  },
  question_text: {
    type: String,
  },
  
  
});



const freeGeneral = mongoose.model('freeGeneral', free_writingGeneralTrainingMockTest, 'FREE-WritingMockTestData');

module.exports = freeGeneral;
