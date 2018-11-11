const sequelize = require('sequelize');
const db = require('./sequelize');
const event = require('./event');

const team = db.define('team', {
    name: sequelize.STRING,
    capacity: sequelize.INTEGER
});

team.belongsTo(event);

module.exports = team;
