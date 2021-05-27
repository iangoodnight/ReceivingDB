/**
 * Accepted user roles
 */

'use strict';

const roles = {
  admin: 'ADMIN',
  read: 'READ',
  write: 'WRITE',
};

function isAdmin(user = {}) {
  const { roles } = user || { roles: [] };
  return roles.indexOf('ADMIN') !== -1;
}

module.exports = {
  isAdmin,
};
