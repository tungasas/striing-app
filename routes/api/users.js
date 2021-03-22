const express = require("express");
const router = express.Router();
const passport = require("passport");

const User = require("../../models/User");

// Register user
router.post("/", function (req, res) {
  User.register(
    { username: req.body.username },
    req.body.password,
    function (err, user) {
      if (err) {
        //return Promise.reject({ message: err });
        res.send({ message: err });
      }

      passport.authenticate("local")(req, res, function () {
        //return Promise.resolve(user);
        res.send(user);
      });
    }
  );
});

module.exports = router;
