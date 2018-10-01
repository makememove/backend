module.exports = {
    db: {
        host: process.env.DB_HOST || 'localhost',
        database: process.env.DB_NAME || 'makememove',
        username: process.env.DB_USER || 'makememove',
        password: process.env.DB_PASS || ''
    }
};
