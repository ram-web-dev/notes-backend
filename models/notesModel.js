import { format, getWeek } from "date-fns";
import dbPromise from "../db/connectDb.js";

export const getAllUserNotes = async (userId) => {
  const db = await dbPromise;
  const getAllUserNotesQuery =
    "SELECT * FROM notes WHERE user_id = ? AND archived = FALSE";
  return await db.all(getAllUserNotesQuery, [userId]);
};

export const getNote = async (noteId) => {
  const db = await dbPromise;
  const getNoteQuery = "SELECT * FROM notes WHERE id = ?";
  return await db.get(getNoteQuery, [noteId]);
};

export const createNewNote = async (
  title,
  content,
  category,
  user_id,
  pinned = false,
  archived = false,
  createdAt = format(Date.now(), "yyyy-MM-dd kk:mm:ss"),
  updatedAt = format(Date.now(), "yyyy-MM-dd kk:mm:ss")
) => {
  const db = await dbPromise;
  const createNotesQuery =
    "INSERT INTO NOTES(title, content, category, pinned, archived, user_id, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
  await db.run(createNotesQuery, [
    title,
    content,
    category,
    pinned,
    archived,
    user_id,
    createdAt,
    updatedAt,
  ]);
};

export const updateNote = async (
  notesId,
  userId,
  title,
  content,
  category,
  updatedAt = format(Date.now(), "yyyy-MM-dd kk:mm:ss")
) => {
  const db = await dbPromise;
  const updateNotesQuery =
    "UPDATE notes SET title = ?, content = ?, category = ?, updated_at = ? WHERE id = ? AND user_id = ?";
  db.run(updateNotesQuery, [
    title,
    content,
    category,
    updatedAt,
    notesId,
    userId,
  ]);
};

export const deleteNote = async (noteId) => {
  const db = await dbPromise;
  const deleteNoteQuery = "DELETE FROM notes WHERE id = ?";
  await db.run(deleteNoteQuery, [noteId]);
};

export const updateNotePin = async (noteId, pinned) => {
  const db = await dbPromise;
  const updateNotePinQuery = "UPDATE notes SET pinned = ? WHERE id = ?";
  await db.run(updateNotePinQuery, [pinned, noteId]);
};

export const updateNoteArchive = async (noteId, archived) => {
  const db = await dbPromise;
  const updateNoteArchiveQuery = "UPDATE notes SET archived = ? WHERE id = ?";
  await db.run(updateNoteArchiveQuery, [archived, noteId]);
};
