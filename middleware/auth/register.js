const emailValidator = require('email-validator');

function validateBody(body) {
    const { email, userName, password } = body;
    const emailOk = emailValidator.validate(email);
    let userNameOk = false;
    let passwordOk = false;

    if (typeof userName !== 'undefined' && userName !== '') {
        userNameOk = true;
    }

    if (typeof password !== 'undefined' && password !== '') {
        passwordOk = true;
    }

    return emailOk && userNameOk && passwordOk;
}

module.exports = objectRepository => async (req, res, next) => {
    try {
        if (!validateBody(req.body)) {
            console.log(req.body);
            return next(new Error('params are not valid!'));
        }

        const { email, userName, password } = req.body;

        const user = await objectRepository.models.user.findOne({ where: { email } });

        if (user) {
            return next(new Error('email address is already used by somebody!'));
        }

        res.locals.user = await objectRepository.models.user.create({
            email,
            userName,
            password
        });
    } catch (err) {
        console.log(err);
        return next(err);
    }

    return next();
};
