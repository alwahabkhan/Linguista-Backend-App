var express = require("express");
var router = express.Router();
var passport = require("passport");
var authenticate = require("../authenticate");
const bodyParser = require("body-parser");
var { evaluateReading } = require("../controllers/reading_evaluatercontroller");

router.post("/get-reading-section-result", evaluateReading);

module.exports = router;
