module.exports = objectRepository => async (req, res, next) => {
    try {
        res.locals.teams = await objectRepository.models.team.findAll();
    } catch (err) {
        console.log(err);
        return next(err);
    }

    return next();
};
