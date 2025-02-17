import { Router } from "express";
import authenticateToken from "../middlewares/authenticateToken.js";
import {
  archiveNote,
  createNote,
  editNote,
  fetchAllNotes,
  pinNote,
  removeNote,
} from "../controllers/notesController.js";

const router = Router();

router.use(authenticateToken);

router.route("/").post(createNote).get(fetchAllNotes);

router.route("/:id").put(editNote).delete(removeNote);

router.patch("/:id/pin", pinNote);

router.patch("/:id/archive", archiveNote);

export default router;
