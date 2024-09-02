const { Sequelize } = require('sequelize');

// PostgreSQL veritabanı bağlantı bilgilerini buraya ekleyin
const sequelize = new Sequelize('todo_db', 'postgres', '123123', {
  host: '127.0.0.1',
  dialect: 'postgres',
  logging: false // SQL sorgularını konsola yazdırmamak için false yapabilirsiniz
});

module.exports = sequelize;