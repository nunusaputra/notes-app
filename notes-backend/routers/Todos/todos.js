const express = require("express");
const {
  getTodos,
  getTodosById,
  createTodos,
  updateTodos,
  deleteTodos,
} = require("../../controllers/Todos/todosControllers");
const { VerifyToken } = require("../../middleware/verifyToken");
const router = express.Router();

router.get("/", VerifyToken, getTodos);
router.get("/:id", VerifyToken, getTodosById);
router.post("/", VerifyToken, createTodos);
router.put("/:id", VerifyToken, updateTodos);
router.delete("/:id", VerifyToken, deleteTodos)

module.exports = router;
