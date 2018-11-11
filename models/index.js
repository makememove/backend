const sequelize = require('./sequelize');
const user = require('./user');
const event = require('./event');
const team = require('./team');
const membership = require('./membership');
const category = require('./category');
const sport = require('./sport');
const userSkillPoint = require('./userSkillPoint');
const teamSkillPoint = require('./teamSkillPoint');
const ranking = require('./ranking');
const userSport = require('./userSport');
const friendRequest = require('./friendRequest');

module.exports = {
    sequelize,
    user,
    event,
    team,
    membership,
    category,
    sport,
    userSkillPoint,
    teamSkillPoint,
    ranking,
    userSport,
    friendRequest
};
