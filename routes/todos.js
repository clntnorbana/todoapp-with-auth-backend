const express = require("express");
const {
  createTodo,
  getTodos,
  getTodo,
  deleteTodo,
  updateTodo,
} = require("../controllers/todoController");

const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

// REQUIRE AUTHENTICATION FOR TODOS ROUTES
router.use(requireAuth);

// POST, DELETE, UPDATE, RETRIEVE
router.post("/", createTodo);
router.get("/", getTodos);
router.get("/:id", getTodo);
router.delete("/:id", deleteTodo);
router.patch("/:id", updateTodo);

module.exports = router;
