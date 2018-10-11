module.exports = objectRepository => async (req, res, next) => {
    res.locals.categories = await objectRepository.models.category.findAll();
    return next();
};
