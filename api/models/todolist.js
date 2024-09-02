'use strict';

module.exports = (sequelize, DataTypes) => {
  const TodoList = sequelize.define('TodoList', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING
    },
    isItDone: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  });

  TodoList.associate = function(models) {
    // TodoList belongs to User
    TodoList.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user'
    });

    // TodoList has many MadeLists
    TodoList.hasMany(models.MadeList, {
      foreignKey: 'todoListId',
      as: 'madeLists'
    });
  };

  return TodoList;
};
