/**
 * entry.routes.js
 */

'use strict';

const router = require('express').Router();
const { entry } = require('../../controllers');

// CREATE
router.post('/', entry.create);
// READ
router.get('/', entry.findLastNDays);

module.exports = router;
