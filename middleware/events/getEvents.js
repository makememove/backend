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

        query.where = {};

        if (req.query.sportId) {
            query.where.sportId = req.query.sportId;
        }

        if (typeof req.query.public !== 'undefined') {
            const isPublic = parseInt(req.query.public);
            if (isPublic === 1) {
                query.where.public = 1;
            } else if (isPublic === 0) {
                query.where.public = 0;
                query.where.creatorId = {
                    [objectRepository.models.sequelize.Op.in]: res.locals.user.friends
                        .map(friend => friend.id)
                        .concat([req.user.id])
                };
            }
        } else {
            query.where[objectRepository.models.sequelize.Op.or] = [
                { public: 1 },
                { public: null },
                { creatorId: req.user.id },
                {
                    public: 0,
                    creatorId: {
                        [objectRepository.models.sequelize.Op.in]: res.locals.user.friends.map(
                            friend => friend.id
                        )
                    }
                }
            ];
        }

        res.locals.events = await objectRepository.models.event.findAll(query);
        delete res.locals.user;
    } catch (err) {
        console.log(err);
        return next(err);
    }

    return next();
};
