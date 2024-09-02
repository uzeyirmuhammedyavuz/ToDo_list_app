"use strict";

const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      surname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      hooks: {
        beforeCreate: async (User) => {
          if (User.password) {
            const salt = await bcrypt.genSalt(10);
            User.password = await bcrypt.hash(User.password, salt);
          }
        },
        beforeUpdate: async (User) => {
          if (User.password) {
            const salt = await bcrypt.genSalt(10);
            User.password = await bcrypt.hash(User.password, salt);
          }
        },
      },
    }
  );

  User.associate = function (models) {
    // User has many TodoLists
    User.hasMany(models.TodoList, {
      foreignKey: "userId",
      as: "todoLists",
    });
  };

  return User;
};
