import bcrypt from "bcrypt";

import { createNewUser, fetchUserByEmail } from "../models/userModel.js";

import jwt from "jsonwebtoken";

export const authenticateUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).send({ errorMessage: "Email, Password cannot be empty" });
    return;
  }
  const user = await fetchUserByEmail(email);
  if (user === undefined) {
    res.status(400).send({ errorMessage: "Invalid User" });
  } else {
    const isPasswordSame = await bcrypt.compare(password, user.password);
    if (isPasswordSame) {
      const payload = {
        email,
      };
      const jwtToken = jwt.sign(payload, process.env.JWT_SECRET_TOKEN);
      res.send({ jwtToken });
    } else {
      res.status(401).send({ errorMessage: "invalid Password" });
    }
  }
};

export const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res
      .status(400)
      .send({ errorMessage: "Name, Email, Password cannot be empty" });
    return;
  }

  const user = await fetchUserByEmail(email);
  if (user)
    return res
      .status(409)
      .send({ errorMessage: "There is already a user with this email" });

  const hashedPassword = await bcrypt.hash(password, 10);
  await createNewUser(name, email, hashedPassword);

  res.sendStatus(201);
};
