const sequelize = require('../util/database');
const Sequelize = require('sequelize');

const Book = sequelize.define('books', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  book_name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  issued_on: {
    type: Sequelize.DATE,
  },
  return_at: {
    type: Sequelize.DATE,
  },
  current_fine: {
    type: Sequelize.DECIMAL(10, 2),
    defaultValue: 0,
  },
});

module.exports = Book;