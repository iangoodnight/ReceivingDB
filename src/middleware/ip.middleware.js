/**
 * ip.middleware.js
 */

'use strict';

const validateIp = function (req, res, next) {
  const validIpList = process.env.IP_WHITELIST.split(';');

  const remoteConnection = req.headers['x-forwarded-for'];

  if (validIpList.includes(remoteConnection)) return next();

  const err = new Error('Bad IP: ' + remoteConnection);
  next(err);
};

module.exports = validateIp;
