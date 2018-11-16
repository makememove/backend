module.exports = objectRepository => async (req, res, next) => {
    try {
        const { notificationId } = req.params;
        const notification = await objectRepository.models.notification.findOne({
            where: { id: notificationId }
        });
        if (!notification) {
            return next(new Error('no such notification'));
        }

        await objectRepository.models.notification.destroy({ where: { id: notificationId } });

        res.locals.status = 'ok';
    } catch (err) {
        console.log(err);
        return next(err);
    }

    return next();
};
