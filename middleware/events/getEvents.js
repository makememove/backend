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

        if (typeof req.query.closed !== 'undefined') {
            const closed = parseInt(req.query.closed);
            if (closed === 1) {
                query.where.closed = 1;
            } else if (closed === 0) {
                query.where.closed = 0;
            }
        }

        if (typeof req.query.public !== 'undefined' && req.query.public !== 'null') {
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

        if (req.query.location && req.query.location !== 'null') {
            query.where.location = {
                [objectRepository.models.sequelize.Op.like]: req.query.location
            };
        }

        if (req.query.title && req.query.title !== 'null') {
            query.where.title = { [objectRepository.models.sequelize.Op.like]: req.query.title };
        }

        if (
            typeof req.query.lowestSkillPoint !== 'undefined' &&
            req.query.lowestSkillPoint !== 'null'
        ) {
            query.where.lowestSkillPoint = {
                [objectRepository.models.sequelize.Op.gt]: parseInt(req.query.lowestSkillPoint)
            };
        }

        if (
            typeof req.query.highestSkillPoint !== 'undefined' &&
            req.query.highestSkillPoint !== 'null'
        ) {
            query.where.highestSkillPoint = {
                [objectRepository.models.sequelize.Op.lt]: parseInt(req.query.highestSkillPoint)
            };
        }

        if (typeof req.query.creatorId !== 'undefined') {
            query.where.creatorId = parseInt(req.query.creatorId);
        }

        res.locals.events = await objectRepository.models.event.findAll(query);
        delete res.locals.user;
    } catch (err) {
        console.log(err);
        return next(err);
    }

    return next();
};
