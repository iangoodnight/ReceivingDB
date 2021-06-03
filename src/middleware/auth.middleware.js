/**
 * Role-based access middleware
 */

'use strict';

const {
  route: { unauthorized },
} = require('../utils');

module.exports = {
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
};
