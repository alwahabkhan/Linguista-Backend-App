var express = require("express");
var router = express.Router();
var passport = require("passport");
var authenticate = require("../authenticate");
const bodyParser = require("body-parser");
var { free } = require("../controllers/free_speakingMockTest");

router.get("/get-all-questions-speaking", free);

module.exports = router;
