const express = require("express");
const router = express.Router();

const Note = require("../../models/Note");

// Get all notes by user_id and conditions
router.post("/", function (req, res) {
  if (req.isAuthenticated()) {
    Note.find(
      {
        user_id: req.user.id,
        ...req.body,
      },
      function (err, notes) {
        if (err) return res.status(400).send(err);
        res.send(notes);
      }
    );
  } else {
    res.status(401).send({ message: "Unauthorized" });
  }
});

// Get a note by id
router.get("/:id", function (req, res) {});

// Create new note
router.post("/create", function (req, res) {
  if (req.isAuthenticated()) {
    const note = new Note({ user_id: req.user.id, ...req.body });
    note.save();
    res.send(note);
  } else {
    res.send(null);
  }
});

// Delete a note by id
router.delete("/:id", function (req, res) {});

// Delete multiple notes
router.delete("/", function (req, res) {});

// Update a note by id
router.put("/", function (req, res) {});

module.exports = router;
