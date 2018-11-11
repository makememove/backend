module.exports = objectRepository => async (req, res, next) => {
    try {
        const { name, capacity, eventId } = req.body;
        if (!name || !capacity || !eventId) {
            return next('name and capacity and eventId needed');
        }

        const event = await objectRepository.models.event.findOne({
            where: { id: eventId },
            include: [
                {
                    model: objectRepository.models.team
                }
            ]
        });
        if (!event) {
            return next(new Error('no such event!'));
        }

        if (event.teams.length + 1 > event.maxAttending) {
            return next(new Error('event is full'));
        }

        await objectRepository.models.team.create({
            name,
            capacity,
            eventId
        });

        res.locals.status = 'ok';
    } catch (err) {
        console.log(err);
        return next(err);
    }

    return next();
};
