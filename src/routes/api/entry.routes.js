/**
 * entry.routes.js
 */

'use strict';

const router = require('express').Router();
const { entry } = require('../../controllers');
const {
  rbac: { isWrite },
} = require('../../middleware');

// CREATE
router.post('/', isWrite, entry.create);
// READ
router.get('/', entry.findLastNDays);

module.exports = router;
