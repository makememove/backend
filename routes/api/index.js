const express = require('express');

const router = express.Router();

const eventsRouter = require('./events');
const sportsRouter = require('./sports');
const categoriesRouter = require('./categories');
const teamsRouter = require('./teams');
const usersRouter = require('./users');

router.use('/events', eventsRouter);
router.use('/sports', sportsRouter);
router.use('/categories', categoriesRouter);
router.use('/teams', teamsRouter);
router.use('/users', usersRouter);

module.exports = router;
