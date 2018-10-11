module.exports = objectRepository => async (req, res, next) => {
    try {
        res.locals.sports = await objectRepository.models.sport.findAll();
    } catch (err) {
        console.log(err);
        return next(err);
    }

    return next();
};
