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

        const membership = await objectRepository.models.membership.findOne({
            where: { teamId, userId: req.user.id }
        });

        if (!membership) {
            return next(new Error('user is not in team'));
        }

        await objectRepository.models.membership.destroy({
            where: { teamId, userId: req.user.id }
        });

        const membershipCount = await objectRepository.models.membership.count({
            where: { teamId }
        });

        if (membershipCount === 0) {
            await objectRepository.models.team.destroy({ where: { id: teamId } });
        }

        res.locals.status = 'ok';
    } catch (err) {
        console.log(err);
        return next(err);
    }

    return next();
};
