module.exports = objectRepository => async (req, res, next) => {
    try {
        const query = {
            include: [
                {
                    model: objectRepository.models.user,
                    attributes: ['id', 'firstName', 'lastName', 'userName'],
                    as: 'creator'
                },
                { model: objectRepository.models.category },
                { model: objectRepository.models.sport }
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
