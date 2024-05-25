const {Sequelize} = require('sequelize');

const db = new Sequelize("rnw", "root", "sarikahd108", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = db;
