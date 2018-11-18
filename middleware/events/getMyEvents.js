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
        const eventIds = await objectRepository.models.sequelize
            .query(
                `select t.eventId from memberships m
            join teams t on t.id = m.teamId
            where m.userId = ${parseInt(req.user.id)}`,
                { raw: true, type: objectRepository.models.sequelize.QueryTypes.SELECT }
            )
            .map(result => result.eventId);

        query.where = {
            id: {
                [objectRepository.models.sequelize.Op.in]: eventIds
            }
        };

        query.where.closed = 0;
        if (typeof req.query.closed !== 'undefined') {
            const closed = parseInt(req.query.closed);
            if (closed === 1) {
                query.where.closed = 1;
            }
        }
        res.locals.events = await objectRepository.models.event.findAll(query);
    } catch (err) {
        console.log(err);
        return next(err);
    }

    return next();
};
