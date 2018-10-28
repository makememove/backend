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

        await objectRepository.models.userSport.create({
            userId: req.user.id,
            sportId
        });

        res.locals.status = 'ok';
    } catch (err) {
        console.log(err);
        return next(err);
    }

    return next();
};
