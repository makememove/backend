module.exports = objectRepository => async (req, res, next) => {
    try {
        const { limit } = req.query;
        const { sportId } = req.params;
        if (!limit) {
            return next(new Error('must provide limit larger than 0'));
        }

        const sport = await objectRepository.models.sport.findOne({ where: { id: sportId } });
        if (!sport) {
            return next(new Error('no such sport'));
        }

        const response = await objectRepository.models.sequelize.query(
            `select users.id, users.firstName, users.lastName, users.userName, userSkillPoints.skillPoint
            from userSkillPoints 
            join users on users.id = userSkillPoints.userId
            where userSkillPoints.sportId = ${parseInt(sportId)}
            order by userSkillPoints.skillPoint desc
            limit ${parseInt(limit)}`,
            {
                raw: true,
                type: objectRepository.models.sequelize.QueryTypes.SELECT
            }
        );

        res.locals.sport = JSON.parse(JSON.stringify(sport));
        res.locals.sport.ranklist = response;
    } catch (err) {
        console.log(err);
        return next(err);
    }

    return next();
};
