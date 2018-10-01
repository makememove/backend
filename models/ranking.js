const sequelize = require('sequelize');

const db = require('./sequelize');
const event = require('./event');
const team = require('./team');

const ranking = db.define('ranking', {
    place: sequelize.INTEGER
});

team.belongsToMany(event, { through: ranking});
event.belongsToMany(team, { through: ranking });

module.exports = ranking;
