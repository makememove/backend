module.exports = objectRepository => async (req, res, next) => {
    try {
        const { gender, picture, firstName, lastName, birthday } = req.body;

        const { user } = res.locals;

        await objectRepository.models.user.update(
            {
                gender: typeof gender === 'undefined' ? user.gender : gender,
                picture: picture || user.picture,
                firstName: firstName || user.firstName,
                lastName: lastName || user.lastName,
                birthday: birthday || user.birthday
            },
            {
                where: { id: user.id }
            }
        );

        res.locals.status = 'ok';
        delete res.locals.user;
    } catch (err) {
        console.log(err);
        return next(err);
    }

    return next();
};
