module.exports = objectRepository => async (req, res, next) => {
    try {
        const { eventId } = req.params;
        const event = await objectRepository.models.event.findOne({
            where: { id: eventId, creatorId: req.user.id, closed: 0 }
        });

        if (!event) {
            return next(new Error('no such event'));
        }

        const { rankings } = req.body;
        if (!rankings) {
            return next(new Error('rankings must be supplied'));
        }

        const ranks = rankings.map(ranking => ({
            place: ranking.place,
            teamId: ranking.teamId,
            eventId
        }));

        await objectRepository.models.ranking.bulkCreate(ranks);
        await objectRepository.models.event.update({ closed: 1 }, { where: { id: eventId } });
        res.locals.status = 'ok';
    } catch (err) {
        console.log(err);
        return next(err);
    }
    return next();
};
