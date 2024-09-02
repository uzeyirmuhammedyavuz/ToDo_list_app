'use strict';

module.exports = (sequelize, DataTypes) => {
  const MadeList = sequelize.define('MadeList', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    todoListId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'TodoLists',
        key: 'id'
      }
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING
    }
  });

  MadeList.associate = function(models) {
    // MadeList belongs to TodoList
    MadeList.belongsTo(models.TodoList, {
      foreignKey: 'todoListId',
      as: 'todoList'
    });
  };

  return MadeList;
};
