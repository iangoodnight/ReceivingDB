/*
 * route handling
 */

'use strict';

const router = require('express').Router();

const apiRoutes = require('./api');
const viewRoutes = require('./view');
const {
  rbac: { isReset: checkReset },
} = require('../middleware');

/* api routes */
router.use('/api', apiRoutes);
/* view home page. */
router.use('/', checkReset, viewRoutes);

module.exports = router;
