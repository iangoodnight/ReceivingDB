/**
 * View routes
 */

'use strict';

const router = require('express').Router();
const {
  page,
  route: { generatePageDetails },
} = require('../../utils');
const { index, login, newEntry, search } = page;
const {
  entry: { findLastNDays, findByIdAndRender, findByPoAndRender },
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
  try {
    const [page, pageDetails] = generatePageDetails(req, login);
    res.render(page, pageDetails);
  } catch (err) {
    next(err);
  }
});

router.get('/browse', findLastNDays);

router.get('/view/:id', findByIdAndRender);

router.get('/view/po/:purchaseOrder', findByPoAndRender);

router.get('/new', (req, res, next) => {
  try {
    const [page, pageDetails] = generatePageDetails(req, newEntry);
    res.render(page, pageDetails);
  } catch (err) {
    next(err);
  }
});

router.get('/search', (req, res, next) => {
  try {
    const [page, pageDetails] = generatePageDetails(req, search);
    res.render(page, pageDetails);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
