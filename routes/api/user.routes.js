/**
 * user.routes.js
 */

'use strict';

const router = require('express').Router();
const { user } = require('../../controllers');

// CREATE
router.post('/', user.create);
// READ
router.get('/', user.findAll);
router.get('/:id', user.findById);
// UPDATE
router.put('/:id', user.update);
// DELETE
router.delete('/:id', user.delete);

module.exports = router;
