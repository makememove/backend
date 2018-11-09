module.exports = (objectRepository, isSentByMe = false, isAccepted = false) => async (
    req,
    res,
    next
) => {
    try {
        const userId = req.params.userId || req.user.id;
        res.locals[
            isSentByMe ? 'sent' : 'requests'
        ] = await objectRepository.models.sequelize.query(
            `select ${
                isSentByMe ? 'friendId' : 'userId'
            } as id, users.firstName, users.lastName, users.userName
             from friendRequests 
             join users on users.id = friendRequests.${isSentByMe ? 'friendId' : 'userId'} 
            where friendRequests.${isSentByMe ? 'userId' : 'friendId'} = ${userId} and
                isAccepted = ${isAccepted ? 1 : 0}`,
            { raw: true, type: objectRepository.models.sequelize.QueryTypes.SELECT }
        );
    } catch (err) {
        console.log(err);
        return next(err);
    }
    return next();
};
