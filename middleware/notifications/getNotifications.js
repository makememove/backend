module.exports = objectRepository => async (req, res, next) => {
    try {
        console.log('asd');
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
