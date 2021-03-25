import { client } from "./api-client";

function getAllNotes() {
  return client("/api/notes", { data: { note: true } });
}

function createNote(note) {
  return client("/api/notes/create", { data: note });
}

export { createNote };
