const sequelize = require('sequelize');

const db = require('./sequelize');
const user = require('./user');
const sport = require('./sport');

const userSport = db.define('userSport');

sport.belongsToMany(user, { through: userSport });
user.belongsToMany(sport, { through: userSport});
userSport.belongsTo(sport);

module.exports = userSport;
