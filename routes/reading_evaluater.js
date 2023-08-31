var express = require("express");
var router = express.Router();
var passport = require("passport");
var authenticate = require("../authenticate");
const bodyParser = require("body-parser");
// var { evaluateReading } = require("../controllers/reading_evaluatercontroller");




const evaulateReadingTest = require('../controllers/reading_evaluatercontroller');

router.use('/free-reading-mock-test-result', evaulateReadingTest);

router.post("/get-reading-section-result", evaulateReadingTest);

module.exports = router;
