/**
 * Accepted user roles
 */

'use strict';

const roles = {
  admin: 'ADMIN',
  audit: 'AUDIT',
  read: 'READ',
  write: 'WRITE',
};

function isAdmin(user = {}) {
  const { roles } = user;
  if (!user || !roles) return false;
  return roles.indexOf('ADMIN') !== -1;
}

module.exports = {
  isAdmin,
};
