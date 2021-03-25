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
