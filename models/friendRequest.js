const sequelize = require('sequelize');

const db = require('./sequelize');
const user = require('./user');

const friendRequest = db.define('friendRequest', {
    isAccepted: sequelize.INTEGER(1)
});

user.belongsToMany(user, { through: friendRequest, as: 'friend' });

module.exports = friendRequest;
