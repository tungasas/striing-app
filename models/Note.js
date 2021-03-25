const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
  },
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
    default: "#fff",
  },
  note: {
    type: Boolean,
    default: true,
  },
  archived: {
    type: Boolean,
    default: false,
  },
  trashed: {
    type: Boolean,
    default: false,
  },
  trashDate: {
    type: Date,
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
