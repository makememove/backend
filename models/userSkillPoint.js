const sequelize = require('sequelize');

const db = require('./sequelize');
const user = require('./user');
const sport = require('./sport');

const userSkillPoint = db.define('userSkillPoint', {
    skillPoint: sequelize.INTEGER
});

sport.belongsToMany(user, { through: userSkillPoint });
user.belongsToMany(sport, { through: userSkillPoint, as: 'following' });

module.exports = userSkillPoint;
