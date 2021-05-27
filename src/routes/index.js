/*
 * route handling
 */

'use strict';

const router = require('express').Router();

const apiRoutes = require('./api');
const viewRoutes = require('./view');

/* api routes */
router.use('/api', apiRoutes);
/* view home page. */
router.use('/', viewRoutes);

module.exports = router;
