const express = require('express');

const router = express.Router();

const { register, login, generateToken } = require('../../middleware/auth');

const models = require('../../models');

function json() {
    return (req, res) => res.json(res.locals);
}

const objectRepository = {
    models
};

router.post('/register', register(objectRepository), generateToken(), json());
router.post('/login', login(objectRepository), generateToken(), json());

module.exports = router;
