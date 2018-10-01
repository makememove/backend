const sequelize = require('sequelize');
const db = require('./sequelize');

const team = db.define('team', {
    name: sequelize.STRING,
    capacity: sequelize.INTEGER
});

module.exports = team;
