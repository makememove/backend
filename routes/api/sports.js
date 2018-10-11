const express = require('express');

const router = express.Router();

const { checkAccess } = require('../../middleware/auth');
const { getSports } = require('../../middleware/sports');

const models = require('../../models');

function json() {
    return (req, res) => res.json(res.locals);
}

const objectRepository = {
    models
};

router.use(checkAccess(objectRepository));

router.get('/', getSports(objectRepository), json());

module.exports = router;
