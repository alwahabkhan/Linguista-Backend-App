var express = require("express");
var router = express.Router();
var passport = require("passport");
var authenticate = require("../authenticate");
const bodyParser = require("body-parser");
var { free } = require("../controllers/free_listeningMockTest");

router.get("/get-all-questions-listening", free);

module.exports = router;
