module.exports = objectRepository => async (req, res, next) => {
    try {
        const { userName, email, password } = req.body;

        const hasName = !!userName || !!email;

        if (!hasName || !password) {
            return next(new Error('you must provide userName, email and password'));
        }

        const nameIsEmail = !!email;
        const query = { password };

        if (nameIsEmail) {
            query.email = email;
        } else {
            query.userName = userName;
        }

        res.locals.user = await objectRepository.models.user.findOne({
            where: query
        });
    } catch (err) {
        console.log(err);
        return next(err);
    }

    return next();
};
