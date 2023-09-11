// Import required modules
var express = require("express");
var router = express.Router();
var passport = require("passport");
var authenticate = require("../authenticate");
const bodyParser = require("body-parser");

// Import the controller function
var { gTWritingMockTest } = require("../controllers/free_writingGeneralTrainingMockTest");

// Define the route
router.get("/get-all-generaltraining-writing-questions", gTWritingMockTest);

// Export the router
module.exports = router;
