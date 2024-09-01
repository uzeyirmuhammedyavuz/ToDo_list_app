"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class TodoList extends Model {
    static associate(models) {
      // Bir TodoList bir User'a ait olabilir
      this.belongsTo(models.User, {
        foreignKey: "userId",
        as: "user",
      });

      // Bir TodoList bir MadeList'e ait olabilir
      this.belongsTo(models.MadeList, {
        foreignKey: "madeListId",
        as: "madeList",
      });
    }
  }
  TodoList.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      isItDone: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      madeListId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "TodoList",
    }
  );
  return TodoList;
};
