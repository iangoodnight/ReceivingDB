/**
 * Role-based access middleware
 */

'use strict';

const {
  route: { unauthorized },
} = require('../utils');

module.exports = {
  isLoggedIn: (req, res, next) => {
    if (!req.user) return unauthorized(res);
    next();
  },
  isAudit: (req, res, next) => {
    if (!req.user) return unauthorized(res);
    const { roles = [] } = req.user;
    if (!roles.includes('AUDIT')) return unauthorized(res);
    next();
  },
  isAdmin: (req, res, next) => {
    if (!req.user) return unauthorized(res);
    const { roles = [] } = req.user;
    if (!roles.includes('ADMIN')) return unauthorized(res);
    next();
  },
  isRead: (req, res, next) => {
    if (!req.user) return unauthorized(res);
    const { roles = [] } = req.user;
    if (!roles.includes('READ')) return unauthorized(res);
  },
  isWrite: (req, res, next) => {
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
