const freeGeneral = require("../models/free_writingGTMockTest");

const gTWritingMockTest = async (req, res) => {
  try {
    // Fetch questions from the "essay" category
    const eassyQuestions = await freeGeneral.find({ category: "essay" }).select("-sampleAnswer");

    // Fetch questions from the "generalTraining" category
    const generalTrainingQuestions = await freeGeneral.find({ category: "generalTraining" }).select("-sampleAnswer");

    // Initialize the selected questions array
    let selectedQuestions = [];

    // Generate a random number (0 or 1) to determine the mix
    const randomMix = Math.floor(Math.random() * 2);

    // Determine the number of "essay" and "generalTraining" questions to include
    let essayCount, generalTrainingCount;

    if (randomMix === 0) {
      // Take 1 "essay" question and 2 "generalTraining" questions
      essayCount = 1;
      generalTrainingCount = 2;
    } else {
      // Take 2 "essay" questions and 1 "generalTraining" question
      essayCount = 2;
      generalTrainingCount = 1;
    }

    // Ensure there are enough questions in each category
    if (
      eassyQuestions.length >= essayCount &&
      generalTrainingQuestions.length >= generalTrainingCount
    ) {
      // Take the required number of "essay" questions
      selectedQuestions.push(...eassyQuestions.splice(0, essayCount));

      // Take the required number of "generalTraining" questions
      selectedQuestions.push(...generalTrainingQuestions.splice(0, generalTrainingCount));
    } else {
      // If there are not enough questions in either category, select all available questions
      selectedQuestions.push(...eassyQuestions, ...generalTrainingQuestions);
    }

    // Shuffle the selected questions randomly
    shuffleArray(selectedQuestions);

    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.json(selectedQuestions);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Function to shuffle an array randomly
function shuffleArray(array) {
  let currentIndex = array.length;
  let randomIndex, temporaryValue;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // Swap elements randomly
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

module.exports = {
  gTWritingMockTest,
};
