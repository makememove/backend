module.exports = objectRepository => async (req, res, next) => {
    try {
        res.locals.users = await objectRepository.models.user.findAll({
            where: {
                id: { [objectRepository.models.sequelize.Op.ne]: req.user.id }
            },
            attributes: ['id', 'lastName', 'firstName', 'picture', 'userName']
        });
    } catch (err) {
        console.log(err);
        return next(err);
    }
    return next();
};
