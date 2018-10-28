module.exports = objectRepository => async (req, res, next) => {
    try {
        const userSports =await objectRepository.models.userSport.findAll({
            where: {
                userId: req.user.id
            },
            attributes: ['sportId'],
            include: [
                {
                    model: objectRepository.models.sport
                }
            ]
        });

        if(userSports.length === 0) {
            res.local.sports = [];
            return next();
        }

        res.locals.sports = userSports.map(e => e.sport);
    } catch (err) {
        console.log(err);
        return next(err);
    }

    return next();
};
