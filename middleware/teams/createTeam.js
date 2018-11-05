module.exports = objectRepository => async (req, res, next) => {
    try {
        const { name, capacity } = req.body;
        if (!name || !capacity) {
            return next('name and capacity needed');
        }

        await objectRepository.models.team.create({
            name,
            capacity
        });

        res.locals.status = 'ok';
    } catch (err) {
        console.log(err);
        return next(err);
    }

    return next();
};
