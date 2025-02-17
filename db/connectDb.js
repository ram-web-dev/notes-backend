import sqlite3 from "sqlite3";
import { open } from "sqlite";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, "notes.db");

const connectDB = async () => {
  const db = await open({
    filename: dbPath,
    driver: sqlite3.Database,
  });

  return db;
};

const dbPromise = connectDB();

export default dbPromise;
