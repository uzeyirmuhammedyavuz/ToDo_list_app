"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class MadeList extends Model {
    static associate(models) {
      // Bir MadeList bir TodoList'e ait olabilir
      this.belongsTo(models.TodoList, {
        foreignKey: "todoListId",
        as: "todoList",
      });
    }
  }
  MadeList.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      todoListId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "MadeList",
    }
  );
  return MadeList;
};
