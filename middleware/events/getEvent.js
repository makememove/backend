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
                    through: { model: objectRepository.models.ranking, attributes: ['place'] },
                    as: 'rankings'
                    // order: [['place', 'asc']]
                },
                {
                    model: objectRepository.models.team
                }
            ]
        };

        query.where = {
            id: req.params.eventId,
            [objectRepository.models.sequelize.Op.or]: [
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
            ]
        };

        query.order = [
            {
                model: objectRepository.models.team,
                through: { model: objectRepository.models.ranking, attributes: ['place'] },
                as: 'rankings'
            },
            'place',
            'asc'
        ];

        if (req.query.sportId) {
            query.where.sportId = req.query.sportId;
        }

        const event = await objectRepository.models.event.findOne(query);
        if (!event) {
            return next(new Error('no such event!'));
        }

        res.locals.event = event;
        delete res.locals.user;
    } catch (err) {
        console.log(err);
        return next(err);
    }

    return next();
};
