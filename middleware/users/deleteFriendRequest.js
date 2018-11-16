module.exports = objectRepository => async (req, res, next) => {
    try {
        const { friendId } = req.params;

        const request = await objectRepository.models.friendRequest.findOne({
            where: { userId: req.user.id, friendId, isAccepted: 0 }
        });
        if (!request) {
            return next(new Error('no such request!'));
        }

        await objectRepository.models.friendRequest.destroy({
            where: { userId: req.user.id, friendId, isAccepted: 0 }
        });

        res.locals.status = 'ok';
    } catch (err) {
        console.log(err);
        return next(err);
    }

    return next();
};
