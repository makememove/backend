module.exports = objectRepository => async (req, res, next) => {
    try {
        const { sportId } = req.params;

        if (typeof sportId === 'undefined') {
            return next(new Error('no sport id!'));
        }

        const sport = objectRepository.models.sport.findOne({
            where: {
                id: sportId
            }
        });

        if (!sport) {
            return next(new Error('no such sport!'));
        }

        const userSport = await objectRepository.models.userSport.findOne({
            where: {
                userId: req.user.id,
                sportId
            }
        });

        if (!userSport) {
            return next(new Error('sport is not followed'));
        }

        await objectRepository.models.userSport.destroy({
            where: { sportId, userId: req.user.id }
        });

        res.locals.status = 'ok';
    } catch (err) {
        console.log(err);
        return next(err);
    }

    return next();
};
