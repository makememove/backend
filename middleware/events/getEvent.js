module.exports = objectRepository => async (req, res, next) => {
    try {
        const query = {
            include: [
                {
                    model: objectRepository.models.user,
                    attributes: {
                        exclude: ['password']
                    },
                    as: 'creator'
                },
                { model: objectRepository.models.category },
                { model: objectRepository.models.sport },
                {
                    model: objectRepository.models.team,
                    through: { model: objectRepository.models.ranking, attributes: [] },
                    as: 'rankings'
                }
            ]
        };

        query.where = {
            id: req.params.eventId
        };

        if (req.query.sportId) {
            query.where.sportId = req.query.sportId;
        }

        const event = await objectRepository.models.event.findOne(query);
        if (!event) {
            return next(new Error('no such event!'));
        }

        res.locals.event = event;
    } catch (err) {
        console.log(err);
        return next(err);
    }

    return next();
};
