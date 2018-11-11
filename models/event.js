const sequelize = require('sequelize');
const db = require('./sequelize');
const user = require('./user');
const category = require('./category');
const sport = require('./sport');
const team = require('./team');

const event = db.define('event', {
    date: sequelize.DATE,
    public: sequelize.INTEGER(1),
    title: sequelize.STRING,
    description: sequelize.TEXT,
    location: sequelize.STRING,
    length: sequelize.INTEGER,
    lowestSkillPoint: sequelize.INTEGER,
    highestSkillPoint: sequelize.INTEGER
});

event.belongsTo(user, { foreignKey: 'creatorId', as: 'creator' });
event.belongsTo(category);
event.belongsTo(sport);
event.hasMany(team);

module.exports = event;
