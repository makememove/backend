module.exports = objectRepository => async (req, res, next) => {
    try {
        res.locals.categories = await objectRepository.models.category.findAll();
    } catch (err) {
        console.log(err);
        return next(err);
    }

    return next();
};
