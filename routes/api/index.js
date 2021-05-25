/**
 * api routes
 */

'use strict';

const router = require('express').Router();

const authRoutes = require('./auth.routes');
const entryRoutes = require('./entry.routes');
const userRoutes = require('./user.routes');

router.use('/auth', authRoutes);
router.use('/entry', entryRoutes);
router.use('/user', userRoutes);

module.exports = router;
