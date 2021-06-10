/**
 * ssl.middleware.js
 */

'use strict';

// Heroku-specific implementation
const forceSsl = function (req, res, next) {
  if (req.headers['x-forwarded-proto'] !== 'https') {
    return res.redirect(['https://', req.get('Host'), req.url].join(''));
  }
  return next();
};

module.exports = forceSsl;
