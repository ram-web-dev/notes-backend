import { Router } from "express";
import { authenticateUser } from "../controllers/userAuthController.js";

const router = Router();

router.post("/", authenticateUser);

export default router;
