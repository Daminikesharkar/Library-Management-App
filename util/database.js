const Sequelize = require('sequelize');

const sequelize = new Sequelize('testprojectdb','root','damini@123',{
    host:'localhost',
    dialect: 'mysql'
})
module.exports = sequelize;