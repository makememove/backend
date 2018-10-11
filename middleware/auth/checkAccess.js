const jwt = require('jsonwebtoken');

const config = require('../../config');

function decode(token) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, config.auth.jwtSecretKey, (err, payload) => {
            if (err) {
                return reject(err);
            }

            return resolve(payload);
        });
    });
}

module.exports = objectRepository => async (req, res, next) => {
    try {
        const token = req.headers.authorization;

        if (!token) {
            return next(new Error('unauthoried!'));
        }

        const { id } = await decode(token);

        const user = objectRepository.models.user.findOne({ where: { id } });
        if (!user) {
            return next(new Error('unauthoried!'));
        }

        req.user = { id };
    } catch (err) {
        console.log(err);
        return next(err);
    }

    return next();
};
