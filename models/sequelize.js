const Sequelize = require('sequelize');

const config = require('../config');

// const user = require('./user');

const sequelize = new Sequelize(config.db.database, config.db.username, config.db.password, {
    host: config.db.host,
    dialect: 'mysql',
    operatorsAliases: false,
    logging: config.db.shouldLog,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

module.exports = sequelize;
