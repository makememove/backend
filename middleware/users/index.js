const getUsers = require('./getUsers');
const getUser = require('./getUser');
const requestFriend = require('./requestFriend');
const getFriendRequests = require('./getFriendRequests');
const acceptFriendRequest = require('./acceptFriendRequest');
const deleteFriend = require('./deleteFriend');
const denyFriendRequest = require('./denyFriendRequest');

module.exports = {
    getUsers,
    getUser,
    requestFriend,
    getFriendRequests,
    acceptFriendRequest,
    deleteFriend,
    denyFriendRequest
};
