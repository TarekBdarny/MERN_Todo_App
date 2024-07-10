import express from "express";
import {
  getTodo,
  addTodo,
  updateTodo,
  deleteTodo,
} from "../controllers/todo.controller.js";
const router = express.Router();

router.get("/:id", getTodo);
router.post("/add", addTodo);
router.patch("/:id", updateTodo);
router.delete("/:id", deleteTodo);

export { router as todoRouter };
