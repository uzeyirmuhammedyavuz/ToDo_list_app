const express = require("express");
const router = express.Router();
const todoListController = require("../controllers/todoListController");
const authMiddleware = require("../middlewares/authMiddleware")

router.get("/add",authMiddleware, todoListController.addTodoList);

module.exports = router;
