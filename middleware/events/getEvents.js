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
                    through: { model: objectRepository.models.attendance, attributes: [] },
                    as: 'attendances'
                },
                {
                    model: objectRepository.models.team,
                    through: { model: objectRepository.models.ranking, attributes: [] },
                    as: 'rankings'
                }
            ]
        };

        if (req.query.sportId) {
            query.where = {
                sportId: req.query.sportId
            };
        }

        res.locals.events = await objectRepository.models.event.findAll(query);
    } catch (err) {
        console.log(err);
        return next(err);
    }

    return next();
};
