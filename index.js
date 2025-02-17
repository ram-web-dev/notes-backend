import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { config } from "dotenv";
import signUpRoute from "./routes/signupRoute.js";
import authRoute from "./routes/authRoute.js";
import notesRoutes from "./routes/notesRoutes.js";

config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

(() => {
  app.listen(process.env.PORT_NO, (req, res) => {
    console.log(`Server is listening on port no: ${process.env.PORT_NO}`);
  });
})();

app.use("/signup", signUpRoute);
app.use("/login", authRoute);
app.use("/notes", notesRoutes);
