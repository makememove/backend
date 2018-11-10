module.exports = objectRepository => async (req, res, next) => {
    try {
        await objectRepository.models.team.destroy({
            where: { id: res.locals.team.id }
        });

        delete res.locals.team;

        res.locals.status = 'ok';
    } catch (err) {
        console.log(err);
        return next(err);
    }

    return next();
};
