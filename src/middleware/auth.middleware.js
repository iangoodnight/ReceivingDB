/**
 * Role-based access middleware
 */

'use strict';

const bcrypt = require('bcrypt');
const { User } = require('../models');
const {
  route: { unauthorized },
} = require('../utils');

async function checkForApiAuth(req, next) {
  if (req.user) return;
  if (req.headers.authorization) {
    const [, basicAuthEncoded] = req.headers.authorization.split(' ');

    const basicAuthBuffer = Buffer.from(basicAuthEncoded, 'base64');

    const basicAuthDecoded = basicAuthBuffer.toString('utf8');

    const [username, password] = basicAuthDecoded.split(':');

    const user = await User.findOne({ username }).select('+password');

    if (user && (await bcrypt.compare(password, user.password))) {
      return req.logIn(user, (err) => {
        if (err) return next(err);
      });
    }
  }
}

module.exports = {
  isLoggedIn: async (req, res, next) => {
    if (!req.user) return unauthorized(res);
    next();
  },
  isAudit: async (req, res, next) => {
    await checkForApiAuth(req, next);
    if (!req.user) return unauthorized(res);
    const { roles = [] } = req.user;
    if (!roles.includes('AUDIT')) return unauthorized(res);
    next();
  },
  isAdmin: async (req, res, next) => {
    await checkForApiAuth(req, next);
    if (!req.user) return unauthorized(res);
    const { roles = [] } = req.user;
    if (!roles.includes('ADMIN')) return unauthorized(res);
    next();
  },
  isRead: async (req, res, next) => {
    await checkForApiAuth(req, next);
    if (!req.user) return unauthorized(res);
    const { roles = [] } = req.user;
    if (!roles.includes('READ')) return unauthorized(res);
  },
  isWrite: async (req, res, next) => {
    await checkForApiAuth(req, next);
    if (!req.user) return unauthorized(res);
    const { roles = [] } = req.user;
    if (!roles.includes('WRITE')) return unauthorized(res);
    next();
  },
  isReset: (req, res, next) => {
    if (req.user && req.user.resetRequired && req.path !== '/reset')
      return res.redirect('/reset');
    next();
  },
};
