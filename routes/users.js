var express = require("express");
var router = express.Router();
var passport = require("passport");
var authenticate = require("../authenticate");
const bodyParser = require("body-parser");
var { signup, login } = require("../controllers/usercontroller");
const userModel = require("../models/user");
router.use(bodyParser.json());

router.post("/signup", signup);

router.post("/login", passport.authenticate("local"), login);

router.get("/", authenticate.verifyUser, function (req, res, next) {
  userModel
    .find()
    .then(
      (user) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(user);
      },
      (err) => next(err)
    )
    .catch((err) => next(err));
});

module.exports = router;
