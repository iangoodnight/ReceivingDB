/**
 * Accepted user roles
 */

'use strict';

function isAdmin(user = {}) {
  const { roles } = user;
  if (!user || !roles) return false;
  return roles.indexOf('ADMIN') !== -1;
}

function isAudit(user = {}) {
  const { roles } = user;
  if (!user || !roles) return false;
  return roles.indexOf('AUDIT') !== -1;
}

function isWrite(user = {}) {
  const { roles } = user;
  if (!user || !roles) return false;
  return roles.indexOf('WRITE') !== -1;
}

module.exports = {
  isAdmin,
  isAudit,
  isWrite,
};
