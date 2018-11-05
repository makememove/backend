module.exports = objectRepository => async (req, res, next) => {
    try {
        const { teamId } = req.params;
        if (!teamId) {
            return next(new Error('No team id specified!'));
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
            return next(new Error('not found'));
        }

        res.locals.team = team;
    } catch (err) {
        console.log(err);
        return next(err);
    }

    return next();
};
