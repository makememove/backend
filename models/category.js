const sequelize = require('sequelize');
const db = require('./sequelize');

const category = db.define('category', {
    name: sequelize.STRING
});

module.exports = category;
