module.exports = objectRepository => async (req, res, next) => {
    try {
        const { userName, email, password } = req.body;

        if (!userName || !email || !password) {
            return next(new Error('you must provide userName, email and password'));
        }

        res.locals.user = await objectRepository.models.user.findOne({
            where: { userName, password, email }
        });
    } catch (err) {
        console.log(err);
        return next(err);
    }

    return next();
};
