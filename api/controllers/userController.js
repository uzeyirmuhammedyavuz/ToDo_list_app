require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { User } = require("../models");
const validator = require("validator");
const { where } = require("sequelize");

exports.createUser = async (req, res) => {
  try {
    const { name, surname, email, password, confirmPassword } = req.body;

    if (!name || typeof name !== "string") {
      return res.status(400).json({
        Error: {
          Message: "name empty or invalid",
        },
      });
    }

    if (!surname || typeof surname !== "string") {
      return res.status(400).json({
        Error: {
          Message: "surname empty or invalid",
        },
      });
    }

    if (!email || !validator.isEmail(email)) {
      return res.status(400).json({
        Error: {
          Message: "email empty or invalid",
        },
      });
    }

    if (
      validator.isEmpty(password || confirmPassword) ||
      password !== confirmPassword
    ) {
      return res.status(400).json({
        Error: {
          Message: "password and confirmPassword are not equal or invalid",
        },
      });
    }

    const user = await User.create({
      name,
      surname,
      email,
      password,
    });

    res.status(201).send(user);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
    console.log(error);
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(400).json({
        Error: {
          Message: "Invalid email or password",
        },
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        Error: {
          Message: "Invalid email or password",
        },
      });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY);

    res.status(200).json({ message: "Login succesful", token });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
    console.log(error);
  }
};
