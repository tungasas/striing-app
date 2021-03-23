const express = require("express");
const router = express.Router();
const passport = require("passport");

const User = require("../../models/User");

// Register user
router.post("/", function (req, res, next) {
  User.register(
    new User({ username: req.body.username }),
    req.body.password,
    function (err, user) {
      if (err) {
        return res.status(400).send(err);
      }

      passport.authenticate("local")(req, res, function () {
        res.send(user);
      });
    }
  );
});

module.exports = router;
