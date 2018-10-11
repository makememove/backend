const sequelize = require('sequelize');

const db = require('./sequelize');
const event = require('./event');
const team = require('./team');

const ranking = db.define('ranking', {
    place: sequelize.INTEGER
});

team.belongsToMany(event, { through: ranking, as: 'rankings' });
event.belongsToMany(team, { through: ranking, as: 'rankings' });

module.exports = ranking;
