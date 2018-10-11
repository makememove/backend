module.exports = objectRepository => async (req, res, next) => {
    res.locals.teams = await objectRepository.models.team.findAll();
    return next();
};
