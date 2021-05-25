/**
 * View routes
 */

'use strict';

const router = require('express').Router();
const { page } = require('../../utils');
const { index, login } = page;
const {
  entry: { findLastNDays },
} = require('../../controllers');

router.get('/', (req, res, next) => {
  const { bodyClass, mainClass, page, title } = index;
  const { user } = req;
  const admin = user.roles.indexOf('ADMIN') !== -1;
  console.log(user);
  res.render(page, { admin, bodyClass, mainClass, title, user });
});

router.get('/login', (req, res, next) => {
  const { bodyClass, mainClass, page, title } = login;
  const { user } = req;
  res.render(page, { bodyClass, mainClass, title, user });
});

router.get('/browse', findLastNDays);

module.exports = router;
