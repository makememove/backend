const jwt = require('jsonwebtoken');

const config = require('../../config');

function encode(userId) {
    return new Promise((resolve, reject) => {
        const expiresIn = parseInt(config.auth.jwtExpiresIn);
        const options = {};

        if (!isNaN(expiresIn)) {
            options.expiresIn = expiresIn;
        }

        jwt.sign({ id: userId }, config.auth.jwtSecretKey, options, (err, token) => {
            if (err) {
                return reject(err);
            }

            return resolve(token);
        });
    });
}

module.exports = () => async (req, res, next) => {
    try {
        const { user } = res.locals;

        const token = await encode(user.id);

        delete res.locals.user;
        res.locals.token = token;
    } catch (err) {
        console.log(err);
        return next(err);
    }

    return next();
};
