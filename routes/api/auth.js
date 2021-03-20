const express = require("express");
const router = express.Router();

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
  const user = new User({
    username: req.body.username,
    password: req.body.password,
  });

  req.login(user, function (err) {
    if (err) {
      res.send({ message: err });
    }
    res.send(req.user);
  });
});

module.exports = router;
