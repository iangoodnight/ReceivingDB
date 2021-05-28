/**
 * Routing convenience utils
 */

'use strict';

const { isAdmin } = require('./roles.utils');

module.exports = {
  generatePageDetails: (req, pageObject) => {
    const { user } = req;
    const admin = isAdmin(user);
    const { page } = pageObject;
    return [ page, { ...pageObject, user, admin } ];
  },
  unauthorized: (res, msg = null) => {
    const message = 'Unauthorized' + (msg ? `: ${msg.toString()}` : '');
    return res.status(401).json({
      success: false,
      message,
    });
  },
  success: (res) => {
    return res.status(200).json({
      success: true,
    });
  },
};
