module.exports = objectRepository => async (req, res, next) => {
    try {
        const userId = req.params.userId || req.user.id;
        res.locals.user = await objectRepository.models.user.findOne({
            where: {
                id: userId
            },
            attributes: { exclude: ['password'] }
        });
    } catch (err) {
        console.log(err);
        return next(err);
    }
    return next();
};
