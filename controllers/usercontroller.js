const bcrypt = require("bcryptjs");
var userModel = require("../models/user");
var authenticate = require("../authenticate");

const signup = async (req, res) => {
  var data = {
    fullName: req.body.fullName,
    email: req.body.email,
    password: req.body.password,
    location: req.body.location,
    phoneNo: req.body.phoneNo,
  };
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(data.password, salt);
    data.password = hashedPassword;
    const user = await userModel.create(data);
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.json({});
  } catch (err) {
    res.statusCode = 500;
    res.setHeader("Content-Type", "application/json");
    res.json({ err: err });
  }
};

const login = (req, res) => {
  var token = authenticate.getToken({ _id: req.user._id });
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.json({
    success: true,
    token: token,
    status: "You are successfully logged in!",
    user: req.user,
  });
};

module.exports = {
  signup,
  login,
};
