module.exports = objectRepository => async (req, res, next) => {
    try {
        const { friendId } = req.body;
        if (!friendId) {
            return next('friendId needed');
        }

        const request = await objectRepository.models.friendRequest.findOne({
            where: { userId: req.user.id, friendId, isAccepted: 1 }
        });
        const reverseRequest = await objectRepository.models.friendRequest.findOne({
            where: { userId: friendId, friendId: req.user.id, isAccepted: 1 }
        });
        if (!request && !reverseRequest) {
            return next(new Error('you are not friends!'));
        }

        if (request !== null) {
            await objectRepository.models.friendRequest.destroy({
                where: { userId: req.user.id, friendId, isAccepted: 1 }
            });
        }

        if (reverseRequest !== null) {
            await objectRepository.models.friendRequest.destroy({
                where: { userId: friendId, friendId: req.user.id, isAccepted: 1 }
            });
        }

        res.locals.status = 'ok';
    } catch (err) {
        console.log(err);
        return next(err);
    }

    return next();
};
