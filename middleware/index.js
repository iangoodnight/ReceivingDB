/**
 * gathered middleware for convenience
 */

'use strict';

module.exports = {
  passport: require('./passport.middleware'),
  // Role-Based Access Control
  rbac: require('./auth.middleware'),
};
