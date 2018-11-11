module.exports = objectRepository => async (req, res, next) => {
    try {
        const { name, capacity, eventId } = req.body;
        if (!name || !capacity || !eventId) {
            return next('name and capacity and eventId needed');
        }

        const event = await objectRepository.models.event.findOne({ where: { id: eventId } });
        if (!event) {
            return next(new Error('no such event!'));
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
