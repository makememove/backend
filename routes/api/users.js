const express = require('express');

const router = express.Router();

const { checkAccess } = require('../../middleware/auth');
const { getUsers, getUser } = require('../../middleware/users');

const models = require('../../models');

function json() {
    return (req, res) => res.json(res.locals);
}

const objectRepository = {
    models
};

router.use(checkAccess(objectRepository));

router.get('/', getUsers(objectRepository), json());
router.get('/me', getUser(objectRepository), json());

module.exports = router;
