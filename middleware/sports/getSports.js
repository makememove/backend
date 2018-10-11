module.exports = objectRepository => async (req, res, next) => {
    res.locals.sports = await objectRepository.models.sport.findAll();
    return next();
};
