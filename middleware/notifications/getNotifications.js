module.exports = objectRepository => async (req, res, next) => {
    try {
        res.locals.notifications = await objectRepository.models.notification.findAll({
            where: { userId: req.user.id },
            attributes: { exclude: ['userId'] }
        });
    } catch (err) {
        console.log(err);
        return next(err);
    }

    return next();
};
