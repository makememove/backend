module.exports = objectRepository => async (req, res, next) => {
    try {
        res.locals.events = await objectRepository.models.event.findAll({
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
        });
    } catch (err) {
        console.log(err);
        return next(err);
    }

    return next();
};
