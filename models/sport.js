const sequelize = require('sequelize');
const db = require('./sequelize');

const sport = db.define('sport', {
    name: sequelize.STRING,
    popularity: sequelize.INTEGER
});

module.exports = sport;
