const express = require("express");
const router = express.Router();
const passport = require("passport");

const User = require("../../models/User");

// Get user via token
router.get("/", function (req, res) {
  if (req.isAuthenticated()) {
    res.send(req.user);
  } else {
    res.send(null);
  }
});

// Authenticate user and get token
router.post("/", function (req, res) {
  // const user = new User({
  //   username: req.body.username,
  //   password: req.body.password,
  // });

  // req.login(user, function (err) {
  //   console.log(err);
  //   if (err) {
  //     console.log(err);
  //     res.status(400).send(err);
  //   } else {
  //     res.send(req.user);
  //   }
  // });
  passport.authenticate("local", function (err, user, info) {
    if (err) {
      return res.status(400).send(err);
    }
    if (!user) {
      return res.status(401).send(info.message);
    }
    req.logIn(user, function (err) {
      if (err) {
        return res.status(400).send(err);
      }

      return res.send(user);
    });
  })(req, res);
});

// Logout
router.get("/logout", function (req, res) {
  req.session.destroy();
  req.logout();
});

module.exports = router;
