import { Router } from "express";
import { createUser } from "../controllers/userAuthController.js";

const router = Router();

router.post("/", createUser);

export default router;
