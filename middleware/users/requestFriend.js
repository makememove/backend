module.exports = objectRepository => async (req, res, next) => {
    try {
        const { friendId } = req.params;

        const friend = await objectRepository.models.user.findOne({ where: { id: friendId } });
        if (!friend) {
            return next(new Error('no such user!'));
        }

        const alreadyExisting = await objectRepository.models.friendRequest.findOne({
            where: { userId: friendId, friendId: req.user.id }
        });

        if (alreadyExisting !== null) {
            return next(new Error('already friends!'));
        }

        await objectRepository.models.friendRequest.create({
            friendId,
            userId: req.user.id,
            isAccepted: 0
        });

        const user = await objectRepository.models.user.findOne({ where: { id: req.user.id } });
        await objectRepository.models.notification.create({
            type: 2,
            message: `${user.userName} sent you a friend request!`,
            userId: friendId
        });

        res.locals.status = 'ok';
    } catch (err) {
        console.log(err);
        return next(err);
    }

    return next();
};
