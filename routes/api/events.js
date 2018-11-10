const express = require('express');

const router = express.Router();

const { checkAccess } = require('../../middleware/auth/');
const { getEvents, createEvent, editEvent, getEvent } = require('../../middleware/events/');

const models = require('../../models/');

function json() {
    return (req, res) => res.json(res.locals);
}

const objectRepository = {
    models
};

router.use(checkAccess(objectRepository));

router.get('/', getEvents(objectRepository), json());
router.get('/:eventId', getEvent(objectRepository), json());
router.post('/create', createEvent(objectRepository), json());
router.post('/edit/:eventId', getEvent(objectRepository), editEvent(objectRepository), json());

module.exports = router;
