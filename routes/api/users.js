const express = require("express");
const router = express.Router();

const User = require("../../models/User");

// Get user by id
router.get("/:id", function (req, res) {});

// Register user
router.post("/", function (req, res) {});

module.exports = router;
