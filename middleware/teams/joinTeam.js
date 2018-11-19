module.exports = objectRepository => async (req, res, next) => {
    try {
        const { teamId } = req.params;
        if (!teamId) {
            return next(new Error('no team id specified!'));
        }

        const team = await objectRepository.models.team.findOne({
            where: { id: teamId },
            include: [
                {
                    model: objectRepository.models.user,
                    attributes: ['id', 'firstName', 'lastName']
                }
            ]
        });
        if (!team) {
            return next(new Error('no such team!'));
        }

        if (team.users.length + 1 > team.capacity) {
            return next(new Error('team is full'));
        }

        await objectRepository.models.membership.create({ teamId, userId: req.user.id });
        const newMember = await objectRepository.models.user.findOne({
            where: { id: req.user.id }
        });
        const event = objectRepository.models.event.findOne({ where: { id: team.eventId } });
        await Promise.all(
            team.users.map(user =>
                objectRepository.models.notification.create({
                    type: 0,
                    eventId: team.eventId,
                    userId: user.id,
                    message: `${newMember.userName} joined ${team.name} for the event: ${
                        event.title || ''
                    }`
                })
            )
        );

        res.locals.status = 'ok';
    } catch (err) {
        console.log(err);
        return next(err);
    }

    return next();
};
