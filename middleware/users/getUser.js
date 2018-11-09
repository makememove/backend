module.exports = objectRepository => async (req, res, next) => {
    try {
        const userId = req.params.userId || req.user.id;
        let user = await objectRepository.models.user.findOne({
            where: {
                id: userId
            },
            attributes: { exclude: ['password'] },
            include: [
                {
                    model: objectRepository.models.sport,
                    attributes: ['id', 'name'],
                    through: {
                        model: objectRepository.models.userSkillPoint,
                        attributes: ['skillPoint']
                    },
                    as: 'following'
                }
            ]
        });
        if (!user) {
            return next(new Error('not found'));
        }

        user = JSON.parse(JSON.stringify(user));



        res.locals.user = user;
    } catch (err) {
        console.log(err);
        return next(err);
    }
    return next();
};
