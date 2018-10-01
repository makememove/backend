const db = require('./sequelize');
const user = require('./user');
const team = require('./team');

const membership = db.define('membership');

team.belongsToMany(user, { through: membership });
user.belongsToMany(team, { through: membership });

module.exports = membership;
