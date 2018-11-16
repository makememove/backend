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
    deleteFriendRequest
} = require('../../middleware/users');

const { getNotifications } = require('../../middleware/notifications');

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

router.get(
    '/me',
    getUser(objectRepository),
    getFriendRequests(objectRepository, false, true),
    getFriendRequests(objectRepository, true, true),
    (req, res, next) => {
        let friends = [];
        friends = friends.concat(res.locals.sent);
        friends = friends.concat(res.locals.requests);
        res.locals.user.friends = friends;
        delete res.locals.sent;
        delete res.locals.requests;
        next();
    },
    json()
);
router.get(
    '/:userId',
    getUser(objectRepository),
    getFriendRequests(objectRepository, false, true),
    getFriendRequests(objectRepository, true, true),
    (req, res, next) => {
        let friends = [];
        friends = friends.concat(res.locals.sent);
        friends = friends.concat(res.locals.requests);
        res.locals.user.friends = friends;
        delete res.locals.sent;
        delete res.locals.requests;
        next();
    },
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
