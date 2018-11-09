module.exports = objectRepository => async (req, res, next) => {
    try {
        const { userId } = req.body;
        if (!userId) {
            return next('userId needed');
        }

        const request = await objectRepository.models.friendRequest.findOne({
            where: { userId, friendId: req.user.id, isAccepted: 0 }
        });
        if (!request) {
            return next(new Error('no such request!'));
        }

        await objectRepository.models.friendRequest.destroy({
            where: { userId, friendId: req.user.id, isAccepted: 0 }
        });

        res.locals.status = 'ok';
    } catch (err) {
        console.log(err);
        return next(err);
    }

    return next();
};
