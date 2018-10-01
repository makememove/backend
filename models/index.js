const sequelize = require('./sequelize');
const user = require('./user');
const event = require('./event');
const team = require('./team');
const membership = require('./membership');
const attendance = require('./attendance');
const category = require('./category');
const sport = require('./sport');
const userSkillPoint = require('./userSkillPoint');
const teamSkillPoint = require('./teamSkillPoint');
const ranking = require('./ranking');

module.exports = {
    sequelize,
    user,
    event,
    team,
    membership,
    attendance,
    category,
    sport,
    userSkillPoint,
    teamSkillPoint,
    ranking
};
