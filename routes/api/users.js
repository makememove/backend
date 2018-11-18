const express = require('express');

const router = express.Router();

const { checkAccess } = require('../../middleware/auth');
const {
    getUsers,
    getUser,
    requestFriend,
    getFriendRequests,
    acceptFriendRequest,
    deleteFriend,
    denyFriendRequest,
    updateUser,
    deleteFriendRequest,
    aggregateFriendRequests
} = require('../../middleware/users');

const { getNotifications, deleteNotification } = require('../../middleware/notifications');

const models = require('../../models');

function json() {
    return (req, res) => res.json(res.locals);
}

const objectRepository = {
    models
};

router.use(checkAccess(objectRepository));

router.get('/', getUsers(objectRepository), json());

router.get('/notifications', getNotifications(objectRepository), json());
router.post('/notifications/delete/:notificationId', deleteNotification(objectRepository), json());

router.get(
    '/me',
    getUser(objectRepository),
    getFriendRequests(objectRepository, false, true),
    getFriendRequests(objectRepository, true, true),
    aggregateFriendRequests(),
    json()
);
router.get(
    '/:userId',
    getUser(objectRepository),
    getFriendRequests(objectRepository, false, true),
    getFriendRequests(objectRepository, true, true),
    aggregateFriendRequests(),
    json()
);

router.post('/friends/request/:friendId', requestFriend(objectRepository), json());
router.get('/friends/requests', getFriendRequests(objectRepository), json());
router.get('/friends/requests/sent', getFriendRequests(objectRepository, true), json());
router.post('/friends/requests/accept/:userId', acceptFriendRequest(objectRepository), json());
router.post('/friends/requests/deny/:userId', denyFriendRequest(objectRepository), json());
router.post('/friends/delete/:friendId', deleteFriend(objectRepository), json());
router.post(
    '/friends/requests/sent/delete/:friendId',
    deleteFriendRequest(objectRepository),
    json()
);
router.post('/edit', getUser(objectRepository), updateUser(objectRepository), json());

module.exports = router;
