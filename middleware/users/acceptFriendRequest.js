module.exports = objectRepository => async (req, res, next) => {
    try {
        const { userId } = req.params;

        const request = await objectRepository.models.friendRequest.findOne({
            where: { userId, friendId: req.user.id, isAccepted: 0 }
        });
        if (!request) {
            return next(new Error('no such request!'));
        }

        await objectRepository.models.friendRequest.update(
            {
                isAccepted: 1
            },
            {
                where: {
                    userId,
                    friendId: req.user.id
                }
            }
        );

        res.locals.status = 'ok';
    } catch (err) {
        console.log(err);
        return next(err);
    }

    return next();
};
