/**
 * auth.routes.js
 */

'use strict';

const router = require('express').Router();
const { auth } = require('../../controllers');

// LOGIN
router.post('/', auth.login);
// LOGOUT
router.delete('/', auth.logout);
// RESET
router.put('/', auth.reset);

module.exports = router;
