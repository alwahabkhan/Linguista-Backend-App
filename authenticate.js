// var passport = require("passport");
// var LocalStrategy = require("passport-local").Strategy;
// var UserModel = require("./app_server/models/UserModel");
// var JwtStrategy = require("passport-jwt").Strategy;
// var ExtractJwt = require("passport-jwt").ExtractJwt;
// var jwt = require("jsonwebtoken"); // used to create, sign, and verify tokens

// passport.use(new LocalStrategy(UserModel.authenticate()));
// passport.serializeUser(UserModel.serializeUser());
// passport.deserializeUser(UserModel.deserializeUser());
// exports.getToken = function (user) {
//   return jwt.sign(user, "123-456-789", { expiresIn: 36000 });
// };
// var opts = {};
// opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
// opts.secretOrKey = "123-456-789";

// passport.use(
//   new JwtStrategy(opts, function (jwt_payload, done) {
//     console.log("asdkhjdhjsadhjasdjhasdhasdhdashjkahjk");
//     UserModel.findOne({ _id: jwt_payload._id }, function (err, user) {
//       if (err) {
//         console.log("jasd");
//         return done(err, false);
//       }
//       if (user) {
//         console.log("jasd");
//         return done(null, user);
//       } else {
//         console.log("jasd");
//         return done(null, false);
//         // or you could create a new account
//       }
//     });
//   })
// );

// exports.verifyUser = passport.authenticate("jwt", { session: false });
// exports.verifyAdmin = (req, res, next) => {
//   console.log(req.user._id);
//   UserModel.findOne({ _id: req.user._id }, (err, user) => {
//     console.log(user.admin);
//     if (err) {
//       return next(err);
//     } else if (user.admin) {
//       return next();
//     } else {
//       res.send("You are not allowed to perform this operation");
//     }
//   });
// };

var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var userModel = require("./models/user")
var JwtStrategy = require("passport-jwt").Strategy;
var ExtractJwt = require("passport-jwt").ExtractJwt;
var jwt = require("jsonwebtoken"); // used to create, sign, and verify tokens
var config = require("./config.js");
const bcrypt = require("bcryptjs");

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, async (email, password, done) => {
    try {
        const user = await userModel.findOne({ email: email });
        if(user != null){
        bcrypt.compare(password, user.password, (err, result) => {
            if (err) {
                return done(err);
            }
            if (!result) {
                return done(null, false);
            }else{
                return done(null, user);
            }
        })
    }
    else{
        return done(null, false);
    }
      } catch (err) {
        return done(err);
      }
}));
passport.serializeUser(function (user, done) {
    done(null, user._id);
});
passport.deserializeUser(function (id, done) {
    userModel.findById(id, function (err, user) {
        done(err, user);
    });
});
exports.getToken = function (user) {
  return jwt.sign(user, "LMS-GSLinguista", { expiresIn: 3600 });
};
var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.secretKey;

passport.use(
  new JwtStrategy(opts, async function (jwt_payload, done) {
    console.log(jwt_payload);
    try {
      const found = await userModel.findOne({ _id: jwt_payload._id });
      console.log(found)
      if (found) {
        done(null, found);
      } else {
        done(null, false);
      }
    } catch (err) {
      done(err, false);
    }
  })
);

exports.verifyUser = passport.authenticate("jwt", { session: false });
exports.verifyAdmin = (req, res, next) => {
  console.log(req.user._id);
  userModel.findOne({ _id: req.user._id }, (err, user) => {
    console.log(user.admin);
    if (err) {
      return next(err);
    } else if (user.admin) {
      return next();
    } else {
      res.send("You are not allowed to perform this operation");
    }
  });
};
