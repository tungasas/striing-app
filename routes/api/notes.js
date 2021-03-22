const express = require("express");
const router = express.Router();

const Note = require("../../models/Note");

// Get all notes by user_id
router.get("/", function (req, res) {
  if (req.isAuthenticated()) {
    Note.find(
      {
        user_id: req.user.id,
      },
      function (err, notes) {
        res.send(notes);
      }
    );
  } else {
    res.send(null);
  }
});

// Get note by id
router.get("/:id", function (req, res) {});

// Create new note
router.post("/", function (req, res) {
  if (req.isAuthenticated()) {
    const note = new Note({ user_id: req.user.id, ...req.body });
    note.save();
    res.send(note);
  } else {
    res.send(null);
  }
});

module.exports = router;
