/**
 * View routes
 */

'use strict';

const router = require('express').Router();
const {
  page,
  route: { generatePageDetails },
} = require('../../utils');
const { index, login, newEntry, reset, userForm, search } = page;
const { rbac } = require('../../middleware');
const {
  entry: {
    findLastNDays,
    findByIdAndRender,
    findByPoAndRender,
    findForAuditAndRender,
  },
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

router.get('/reset', rbac.isLoggedIn, (req, res, next) => {
  const [page, pageDetails] = generatePageDetails(req, reset);
  console.log(req.user);
  res.render(page, pageDetails);
});

router.get('/audit/:id', rbac.isAudit, findForAuditAndRender);

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

router.get('/new', rbac.isWrite, (req, res, next) => {
  try {
    const [page, pageDetails] = generatePageDetails(req, newEntry);
    delete pageDetails.audit;
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
