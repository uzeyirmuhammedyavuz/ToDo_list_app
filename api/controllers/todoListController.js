require("dotenv").config();
const express = require("express");
const { TodoList, User } = require("../models");
const { where } = require("sequelize");

exports.getTodoList = async (req, res) => {
  try {
    const todoList = await TodoList.findAll({
      where: { userId: req.userId },
    });

    return res.status(200).json({ todoList });
  } catch (error) {
    res.status(500).json({ error: "Unable to retrieve todo lists" });
  }
};

exports.getCompletedTodoList = async (req, res) => {
  try {
    const userId = req.userId;

    const completedTodos = await TodoList.findAll({
      where: {
        userId,
        isItDone: true,
      },
    });

    if (completedTodos.length === 0) {
      return res.status(404).json({
        message: "No completed todos found",
      });
    }

    res.status(200).json(completedTodos);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
    console.log(error);
  }
};

exports.createTodoList = async (req, res) => {
  try {
    const userId = req.userId;
    const { title, description, isItDone } = req.body;

    if (!title) {
      return res.status(400).json({
        Error: {
          Message: "title cannot be empty ",
        },
      });
    }

    const todo = await TodoList.create({
      userId,
      title,
      description,
      isItDone,
    });

    res.status(201).send(todo);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
    console.log(error);
  }
};

exports.updateTodoList = async (req, res) => {
  try {
    const todoId = req.params.id;
    const { title, description, isItDone } = req.body;
    const todo = await TodoList.findByPk(todoId);

    if (!todo) {
      return res.status(404).json({ error: "Cannot find todo" });
    }

    if (todo.userId !== req.userId) {
      return res.status(403).json({ error: "You have no authorization" });
    }

    todo.title = title || todo.title;
    todo.description = description || todo.description;
    todo.isItDone = isItDone || todo.isItDone;

    await todo.save();
    return res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({ error: "Cannot updated todo" });
    console.log(error);
  }
};

exports.deleteTodoList = async (req, res) => {
  try {
    const todoId = req.params.id;

    const todo = await TodoList.findByPk(todoId);

    if (!todo) {
      return res.status(400).json({
        Error: {
          Message: "todo not found",
        },
      });
    }

    if (todo.userId !== req.userId) {
      return res.status(403).json({
        Error: {
          Message: "You do not permission to delete this todo",
        },
      });
    }

    await TodoList.destroy({ where: { id: todoId } });
    res
      .status(200)
      .json({ message: `Item with id ${todoId} deleted successfully` });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
    console.log(error);
  }
};
