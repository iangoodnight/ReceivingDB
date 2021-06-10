/**
 * ip.middleware.js
 */

'use strict';

const validateIp = function (req, res, next) {
  const validIpList = process.env.IP_WHITELIST.split(';');

  if (validIpList.includes(req.connection.remoteAddress)) return next();

  const err = new Error('Bad IP: ' + req.connection.remoteAddress);
  next(err);
};

module.exports = validateIp;
