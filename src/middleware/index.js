/**
 * gathered middleware for convenience
 */

'use strict';

module.exports = {
  forceSsl: require('./ssl.middleware'),
  passport: require('./passport.middleware'),
  validateIp: require('./ip.middleware'),
  // Role-Based Access Control
  rbac: require('./auth.middleware'),
};
