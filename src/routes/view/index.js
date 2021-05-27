/**
 * View routes
 */

'use strict';

const router = require('express').Router();
const { page } = require('../../utils');
const { index, login } = page;
const {
  entry: { findLastNDays, findByIdAndRender },
} = require('../../controllers');

router.get('/', (req, res, next) => {
  const { bodyClass, mainClass, page, title } = index;
  const { user } = req;
  const { roles } = user || { roles: [] };
  const admin = roles.indexOf('ADMIN') !== -1;
  console.log(admin);
  res.render(page, { admin, bodyClass, mainClass, title, user });
});

router.get('/login', (req, res, next) => {
  const { bodyClass, mainClass, page, title } = login;
  const { user } = req;
  res.render(page, { bodyClass, mainClass, title, user });
});

router.get('/browse', findLastNDays);

router.get('/view/:id', findByIdAndRender);

module.exports = router;
