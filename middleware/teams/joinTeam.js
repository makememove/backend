module.exports = objectRepository => async (req, res, next) => {
    try {
        const { teamId } = req.params;
        if (!teamId) {
            return next(new Error('no team id specified!'));
        }

        const team = await objectRepository.models.team.findOne({ where: { id: teamId } });
        if (!team) {
            return next(new Error('no such team!'));
        }

        await objectRepository.models.membership.create({ teamId, userId: req.user.id });

        res.locals.status = 'ok';
    } catch (err) {
        console.log(err);
        return next(err);
    }

    return next();
};
