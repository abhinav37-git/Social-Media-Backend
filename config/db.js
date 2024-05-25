const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize("new_db", "new_user", "12345678", {
  host: process.env.DB_HOST,
  dialect: 'mysql',
});

module.exports = sequelize;