const express = require("express");
const {
  getNotes,
  getNotesById,
  createNotes,
  updateNotes,
  deleteNotes,
} = require("../../controllers/Notes/notesControllers");
const { VerifyToken } = require("../../middleware/verifyToken");
const router = express.Router();

router.get("/", VerifyToken, getNotes);
router.get("/:id", VerifyToken, getNotesById);
router.post("/", VerifyToken, createNotes);
router.put("/:id", VerifyToken, updateNotes);
router.delete("/:id", VerifyToken, deleteNotes)

module.exports = router;
