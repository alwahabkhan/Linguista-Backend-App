var express = require("express");
var router = express.Router();
var passport = require("passport");
var authenticate = require("../authenticate");
const bodyParser = require("body-parser");
var { evaluateEssay } = require("../controllers/evaluatercontroller");

router.post("/get-writing-essay-result-stub", evaluateEssay);

module.exports = router;
