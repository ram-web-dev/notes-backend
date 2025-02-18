import { Router } from "express";
import authenticateToken from "../middlewares/authenticateToken.js";
import {
  archiveNote,
  createNote,
  editNote,
  fetchAllNotes,
  fetchArchivedNotes,
  fetchNote,
  pinNote,
  removeNote,
} from "../controllers/notesController.js";

const router = Router();

router.use(authenticateToken);

router.route("/").post(createNote).get(fetchAllNotes);

router.get("/archives", fetchArchivedNotes);

router.route("/:id").get(fetchNote).put(editNote).delete(removeNote);

router.patch("/:id/pin", pinNote);

router.patch("/:id/archive", archiveNote);

export default router;
