/**
 * Accepted user roles
 */

'use strict';

function isAdmin(user = {}) {
  const { roles } = user;
  if (!user || !roles) return false;
  return roles.indexOf('ADMIN') !== -1;
}

module.exports = {
  isAdmin,
};
