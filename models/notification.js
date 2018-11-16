const sequelize = require('sequelize');
const db = require('./sequelize');

const event = require('./event');
const user = require('./user');

const notification = db.define('notification', {
    type: sequelize.INTEGER(1),
    message: sequelize.STRING
});

notification.belongsTo(event);
notification.belongsTo(user);

module.exports = notification;
