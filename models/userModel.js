import dbPromise from "../db/connectDb.js";
import { format } from "date-fns";

export const createNewUser = async (
  name,
  email,
  hashedPassword,
  createdAt = format(Date.now(), "yyyy-MM-dd kk:mm:ss")
) => {
  const db = await dbPromise;
  const createUserQuery =
    "INSERT INTO users(name, email, password, created_at) VALUES(?, ?, ?, ?)";
  await db.run(createUserQuery, [name, email, hashedPassword, createdAt]);
};

export const fetchUserByEmail = async (email) => {
  const db = await dbPromise;
  const getUserByEmailQuery = "SELECT * FROM users WHERE email LIKE ?";
  return await db.get(getUserByEmailQuery, [email]);
};
