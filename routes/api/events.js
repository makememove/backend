const express = require('express');

const router = express.Router();

const { checkAccess } = require('../../middleware/auth/');
const {
    getEvents,
    createEvent,
    editEvent,
    getEvent,
    deleteEvent
} = require('../../middleware/events/');

const { getFriendRequests, aggregateFriendRequests } = require('../../middleware/users');

const models = require('../../models/');

function json() {
    return (req, res) => res.json(res.locals);
}

const objectRepository = {
    models
};

router.use(checkAccess(objectRepository));

router.get(
    '/',
    (req, res, next) => {
        res.locals.user = {};
        return next();
    },
    getFriendRequests(objectRepository, false, true),
    getFriendRequests(objectRepository, true, true),
    aggregateFriendRequests(),
    getEvents(objectRepository),
    json()
);
router.get(
    '/:eventId',
    (req, res, next) => {
        res.locals.user = {};
        return next();
    },
    getFriendRequests(objectRepository, false, true),
    getFriendRequests(objectRepository, true, true),
    aggregateFriendRequests(),
    getEvent(objectRepository),
    json()
);
router.post('/create', createEvent(objectRepository), json());
router.post('/edit/:eventId', getEvent(objectRepository), editEvent(objectRepository), json());
router.post('/delete/:eventId', getEvent(objectRepository), deleteEvent(objectRepository), json());

module.exports = router;
