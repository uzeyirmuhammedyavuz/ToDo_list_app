'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('TodoLists', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      isItDone: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: false
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id'
        },
        onDelete: 'CASCADE', // Kullanıcı silindiğinde ilgili TodoList'ler de silinsin
        allowNull: false
      },
      madeListId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'MadeLists',
          key: 'id'
        },
        onDelete: 'SET NULL', // MadeList silindiğinde ilgili TodoList'in madeListId'si null olsun
        allowNull: true
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('TodoLists');
  }
};
