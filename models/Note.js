const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  content: {
    type: String,
  },
  label: {
    type: String,
  },
  color: {
    type: String,
  },
  updateDate: {
    type: Date,
    default: Date.now,
  },
  createDate: {
    type: Date,
    default: Date.now,
  },
});

const Note = mongoose.model("Note", noteSchema);

module.exports = Note;
