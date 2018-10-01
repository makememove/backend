const sequelize = require('sequelize');
const db = require('./sequelize');

// const event = require('./event');

const user = db.define('user', {
    type: sequelize.INTEGER(1),
    experience: sequelize.INTEGER,
    level: sequelize.INTEGER,
    gender: sequelize.INTEGER(1),
    picture: sequelize.STRING,
    firstName: sequelize.STRING,
    lastName: sequelize.STRING,
    userName: sequelize.STRING,
    email: sequelize.STRING,
    birthday: sequelize.DATE,
    popularity: sequelize.DATE
});

// user.hasOne(event, { foreignKey: 'reatorId'});

module.exports = user;
