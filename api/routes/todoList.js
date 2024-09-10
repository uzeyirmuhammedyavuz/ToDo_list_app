const express = require("express");
const router = express.Router();
const todoListController = require("../controllers/todoListController");
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/", authMiddleware, todoListController.getTodoList);
router.post("/add", authMiddleware, todoListController.createTodoList);
router.put("/update/:id", authMiddleware, todoListController.updateTodoList);
router.delete("/delete/:id", authMiddleware, todoListController.deleteTodoList);
router.get("/made", authMiddleware, todoListController.getCompletedTodoList);

module.exports = router;
