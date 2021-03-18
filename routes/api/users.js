const express = require("express");
const router = express.Router();
const passport = require("passport");

const User = require("../../models/User");

// Get user by id
router.get("/:id", function (req, res) {
  const user = new User({
    username: req.body.username,
    password: req.body.password,
  });

  req.login(user, function (err) {
    if (err) {
      console.log(err);
      return Promise.reject({ message: err });
    }
    return Promise.resolve(req.user);
  });
});

// Register user
router.post("/", function (req, res) {
  User.register(
    { username: req.body.username },
    req.body.password,
    function (err, user) {
      if (err) {
        console.log(err);
        return Promise.reject({ message: err });
      }

      passport.authenticate("local")(req, res, function () {
        return Promise.resolve(user);
      });
    }
  );
});

module.exports = router;
