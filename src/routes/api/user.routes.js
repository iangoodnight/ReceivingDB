/**
 * user.routes.js
 */

'use strict';

const router = require('express').Router();
const { user } = require('../../controllers');
const { rbac } = require('../../middleware');

// CREATE
router.post('/', rbac.isAdmin, user.create);
// READ
router.get('/', rbac.isAdmin, user.findAll);
router.get('/:id', user.findById);
// UPDATE
router.put('/:id', rbac.isAdmin, user.update);
// DELETE
router.delete('/:id', rbac.isAdmin, user.delete);

module.exports = router;
