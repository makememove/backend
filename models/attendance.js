const db = require('./sequelize');
const event = require('./event');
const team = require('./team');

const attendance = db.define('attendance');

team.belongsToMany(event, { through: attendance, as: 'attendances' });
event.belongsToMany(team, { through: attendance, as: 'attendances' });

module.exports = attendance;
