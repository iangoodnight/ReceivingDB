/**
 * auth.routes.js
 */

'use strict';

const router = require('express').Router();
const { auth } = require('../../controllers');

// LOGIN
router.post('/', auth.login);

module.exports = router;
