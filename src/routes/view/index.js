/**
 * View routes
 */

'use strict';

const router = require('express').Router();
const {
  page,
  route: { generatePageDetails },
} = require('../../utils');
const { index, login, newEntry, userForm, search } = page;
const { rbac } = require('../../middleware');
const {
  entry: { findLastNDays, findByIdAndRender, findByPoAndRender },
  user: { findAndRender, findOneAndRender },
} = require('../../controllers');

router.get('/', (req, res, next) => {
  const [page, pageDetails] = generatePageDetails(req, index);
  res.render(page, pageDetails);
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

router.get('/user', rbac.isAdmin, findAndRender);

router.get('/user/new', rbac.isAdmin, (req, res, next) => {
  try {
    const [page, pageDetails] = generatePageDetails(req, userForm);
    res.render(page, pageDetails);
  } catch (err) {
    next(err);
  }
});

router.get('/user/:id', rbac.isAdmin, findOneAndRender);

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
