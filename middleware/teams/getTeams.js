module.exports = objectRepository => async (req, res, next) => {
    try {
        res.locals.teams = await objectRepository.models.team.findAll({
            include: [
                {
                    model: objectRepository.models.user,
                    attributes: { exclude: ['password'] },
                    through: { attributes: [] }
                }
            ]
        });
    } catch (err) {
        console.log(err);
        return next(err);
    }

    return next();
};
