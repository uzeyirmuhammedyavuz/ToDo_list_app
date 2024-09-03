const express = require("express");
const router = express.Router();
const todoListController = require("../controllers/todoListController");
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/", authMiddleware, todoListController.getTodoList);
router.post("/add", authMiddleware, todoListController.createTodoList);
router.put("/update", authMiddleware, todoListController.updateTodoList);
router.delete("/delete/:id", authMiddleware, todoListController.deleteTodoList);

module.exports = router;
