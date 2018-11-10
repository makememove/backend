module.exports = objectRepository => async (req, res, next) => {
    try {
        if (req.user.id !== res.locals.event.creatorId) {
            return next(new Error('only creator can delete'));
        }

        await objectRepository.models.event.destroy({ where: { id: res.locals.event.id } });
        delete res.locals.event;
        res.locals.status = 'ok';
    } catch (err) {
        console.log(err);
        return next(err);
    }

    return next();
};
