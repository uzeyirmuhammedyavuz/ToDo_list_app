"use strict";
module.exports = (sequelize, DataTypes) => {
  const TodoList = sequelize.define("TodoList", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isItDone: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    description: {
      type: DataTypes.STRING,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Users",
        key: "id",
      },
    },
  });

  TodoList.associate = function (models) {
    // TodoList belongs to a User
    TodoList.belongsTo(models.User, {
      foreignKey: "userId",
      as: "user",
    });
  };

  return TodoList;
};
