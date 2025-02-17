import { fetchUserByEmail } from "../models/userModel.js";
import {
  createNewNote,
  deleteNote,
  getAllUserNotes,
  getNote,
  updateNote,
  updateNoteArchive,
  updateNotePin,
} from "../models/notesModel.js";

export const createNote = async (req, res) => {
  const { title, content, category } = req.body;
  if (!title || !category) {
    res.status(400).send({ errorMessage: "Title, Category cannot be empty" });
    return;
  }

  const user = await fetchUserByEmail(req.userMail);
  await createNewNote(title, content, category.toLowerCase(), user.id);
  res.sendStatus(201);
};

export const fetchAllNotes = async (req, res) => {
  const user = await fetchUserByEmail(req.userMail);
  const notes = await getAllUserNotes(user.id);
  res.send({ notes });
};

export const editNote = async (req, res) => {
  const { id } = req.params;
  const { title, content, category } = req.body;
  if (!title || !category) {
    res.status(400).send({ errorMessage: "Title, Category cannot be empty" });
    return;
  }
  const user = await fetchUserByEmail(req.userMail);
  const note = await getNote(id);
  if (note === undefined) {
    res.status(404).send({ errorMessage: "Note not Found" });
    return;
  }
  if (note.user_id !== user.id) {
    res.status(401).send({ errorMessage: "Cannot update Notes" });
    return;
  }

  await updateNote(id, user.id, title, content, category);
  res.sendStatus(200);
};

export const removeNote = async (req, res) => {
  const { id } = req.params;
  const user = await fetchUserByEmail(req.userMail);
  const note = await getNote(id);
  if (note === undefined) {
    res.status(404).send({ errorMessage: "Note not Found" });
    return;
  }
  if (note.user_id !== user.id) {
    res.status(401).send({ errorMessage: "Cannot Delete Notes" });
    return;
  }

  await deleteNote(id);
  res.sendStatus(200);
};

export const pinNote = async (req, res) => {
  const { id } = req.params;
  const user = await fetchUserByEmail(req.userMail);
  const note = await getNote(id);
  if (note === undefined) {
    res.status(404).send({ errorMessage: "Note not Found" });
    return;
  }
  if (note.user_id !== user.id) {
    res.status(401).send({ errorMessage: "Cannot Pin Notes" });
    return;
  }
  await updateNotePin(id, !note.pinned);
  res.sendStatus(200);
};

export const archiveNote = async (req, res) => {
  const { id } = req.params;
  const user = await fetchUserByEmail(req.userMail);
  const note = await getNote(id);
  if (note === undefined) {
    res.status(404).send({ errorMessage: "Note not Found" });
    return;
  }
  if (note.user_id !== user.id) {
    res.status(401).send({ errorMessage: "Cannot Archive Notes" });
    return;
  }
  await updateNoteArchive(id, !note.archived);
  res.sendStatus(200);
};
