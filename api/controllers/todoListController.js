require("dotenv").config();
const express = require("express");
const { TodoList, User, MadeList } = require("../models");
const { where } = require("sequelize");

exports.getTodoList = async (req, res) => {
  try {
    const todoList = await TodoList.findAll();

    return res.status(200).json({ todoList });
  } catch (error) {}
};

exports.createTodoList = async (req, res) => {
  try {
    const { userId, title, description, isItDone } = req.body;

    const user = await User.findOne({ where: { id: userId } });

    if (!user) {
      return res.status(400).json({
        Error: {
          Message: "userId cannot be empty ",
        },
      });
    }

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
    const { id, title, description, isItDone } = req.body;

    const isMatch = await TodoList.findOne({ where: { id } });

    if (!isMatch) {
      return res.status(400).json({
        Error: {
          Message: "id not found",
        },
      });
    }
    
    const updateTodo = await TodoList.update(
      {
        title,
        description,
        isItDone,
      },
      { where: { id } }
    );

    if (updateTodo[0] === 0) {
      return res.status(400).json({
        Error: {
          Message: "No records updated",
        },
      });
    }

    res.status(201).json({ message: "update succesfuly", updateTodo });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
    console.log(error);
  }
};

exports.deleteTodoList = async (req, res) => {
  try {
    const id = req.params.id;

    const isMatch = await TodoList.findOne({ id });

    if (!isMatch) {
      return res.status(400).json({
        Error: {
          Message: "id not found",
        },
      });
    }

    await TodoList.destroy({ where: { id } });
    res
      .status(200)
      .json({ message: `Item with id ${id} deleted successfully` });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
    console.log(error);
  }
};
