module.exports = objectRepository => async (req, res, next) => {
    try {
        const { userName, email, password } = req.body;

        const hasName = !!userName || !!email;

        if (!hasName || !password) {
            return next(new Error('you must provide userName, email and password'));
        }

        let user = null;
        user = await objectRepository.models.user.findOne({
            where: {
                userName,
                password
            }
        });

        if (user) {
            res.locals.user = user;
            return next();
        }

        user = await objectRepository.models.user.findOne({
            where: {
                email,
                password
            }
        });

        if (!user) {
            return next(new Error('no such user'));
        }

        res.locals.user = user;
        return next();
    } catch (err) {
        console.log(err);
        return next(err);
    }

    return next();
};
