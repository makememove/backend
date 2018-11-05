const express = require('express');

const router = express.Router();

const { checkAccess } = require('../../middleware/auth/');
const { getTeams, getTeam, createTeam, joinTeam, leaveTeam } = require('../../middleware/teams/');

const models = require('../../models/');

function json() {
    return (req, res) => res.json(res.locals);
}

const objectRepository = {
    models
};

router.use(checkAccess(objectRepository));

router.get('/', getTeams(objectRepository), json());
router.get('/:teamId', getTeam(objectRepository), json());
router.post('/create', createTeam(objectRepository), json());
router.post('/join/:teamId', joinTeam(objectRepository), json());
router.post('/leave/:teamId', leaveTeam(objectRepository), json());

module.exports = router;
