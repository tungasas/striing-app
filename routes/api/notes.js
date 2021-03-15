const express = require("express");
const router = express.Router();

const Note = require("../../models/Note");

// Get note by id
router.get("/:id", function (req, res) {});

// Create new note
router.post("/", function (req, res) {});

module.exports = router;
