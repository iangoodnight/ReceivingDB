/**
 * View routes
 */

'use strict';

const router = require('express').Router();
const { page } = require('../../utils');
const { index, login } = page;

router.get('/', (req, res, next) => {
  const { bodyClass, mainClass, page, title } = index;
  res.render(page, { bodyClass, mainClass, title });
});

router.get('/login', (req, res, next) => {
  const { bodyClass, mainClass, page, title } = login;
  res.render(page, { bodyClass, mainClass, title });
});

module.exports = router;
