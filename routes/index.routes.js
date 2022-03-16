const router = require('express').Router();
const usersRouter = require('./users.routes');
const gamesRouter = require('./games.routes');


router.use('/users', usersRouter);
router.use('/games', gamesRouter);


module.exports = router;
