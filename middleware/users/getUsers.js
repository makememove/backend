module.exports = objectRepository => async (req, res, next) => {
    res.locals.users = await objectRepository.models.user.findAll({
        where: {
            id: { [objectRepository.models.sequelize.Op.ne]: req.user.id }
        },
        attributes: ['id', 'lastName', 'firstName', 'picture']
    });
    return next();
};
