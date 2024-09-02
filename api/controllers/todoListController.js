require("dotenv").config();
const express = require("express");
const { TodoList } = require("../models");

exports.addTodoList = async (req, res) => {
  res.send("yeey");
};
