const express = require('express');

const router = express.Router();

const { checkAccess } = require('../../middleware/auth/');
const { getCategories } = require('../../middleware/categories/');

const models = require('../../models/');

function json() {
    return (req, res) => res.json(res.locals);
}

const objectRepository = {
    models
};

router.use(checkAccess(objectRepository));

router.get('/', getCategories(objectRepository), json());

module.exports = router;
