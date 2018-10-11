module.exports = {
    db: {
        host: process.env.DB_HOST || 'localhost',
        database: process.env.DB_NAME || 'makememove',
        username: process.env.DB_USER || 'makememove',
        password: process.env.DB_PASS || '',
        shouldLog: !!process.env.DB_SHOULD_LOG
    },
    auth: {
        jwtSecretKey: process.env.JWT_SECRET_KEY || 'such secret key',
        jwtExpiresIn: process.env.JWT_EXPIRES_IN || null
    }
};
