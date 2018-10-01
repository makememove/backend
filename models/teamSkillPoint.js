const sequelize = require('sequelize');

const db = require('./sequelize');
const team = require('./team');
const sport = require('./sport');

const teamSkillPoint = db.define('teamSkillPoint', {
    skillPoint: sequelize.INTEGER
});

sport.belongsToMany(team, { through: teamSkillPoint });
team.belongsToMany(sport, { through: teamSkillPoint });

module.exports = teamSkillPoint;
