var express = require("express");
var router = express.Router();
var passport = require("passport");
var authenticate = require("../authenticate");
const bodyParser = require("body-parser");
var { free } = require("../controllers/free_readingMockTest");

router.get("/get-all-questions-reading", free);

module.exports = router;
