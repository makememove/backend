const express = require('express');

const router = express.Router();

const { checkAccess } = require('../../middleware/auth');
const {
    getSports,
    getSportsForUser,
    followSport,
    unfollowSport
} = require('../../middleware/sports');

const models = require('../../models');

function json() {
    return (req, res) => res.json(res.locals);
}

const objectRepository = {
    models
};

router.use(checkAccess(objectRepository));

router.get('/all', getSports(objectRepository), json());
router.get('/', getSportsForUser(objectRepository), json());
router.post('/follow/:sportId', followSport(objectRepository), json());
router.post('/unfollow/:sportId', unfollowSport(objectRepository), json());

module.exports = router;
