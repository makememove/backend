module.exports = objectRepository => async (req, res, next) => {
    res.locals.events = await objectRepository.models.event.findAll();
    return next();
};
