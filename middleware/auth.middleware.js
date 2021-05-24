/**
 * Role-based access middleware
 */

'use strict';

const {
  role,
  route: { unauthorized },
} = require('../utils');

module.exports = {
  isAdmin: (req, res, next) => {
    if (!req.user) return unauthorized(res);
    const { roles = [] } = req.user;
    if (!roles.includes(role.admin)) return unauthorized(res);
    next();
  },
  isRead: (req, res, next) => {
    if (!req.user) return unauthorized(res);
    const { roles = [] } = req.user;
    if (!roles.includes(role.admin)) return unauthorized(res);
  },
  isWrite: (req, res, next) => {
    if (!req.user) return unauthorized(res);
    const { roles = [] } = req.user;
    if (!roles.includes(role.write)) return unauthorized(res);
    next();
  },
};
