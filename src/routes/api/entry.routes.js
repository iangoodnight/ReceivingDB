/**
 * entry.routes.js
 */

'use strict';

const router = require('express').Router();
const { entry } = require('../../controllers');
const {
  rbac: { isAudit, isWrite },
} = require('../../middleware');

// CREATE
router.post('/', isWrite, entry.create);
// READ
router.get('/', entry.findLastNDays);
// UPDATE
router.put('/:id', isAudit, entry.auditEntry);

module.exports = router;
