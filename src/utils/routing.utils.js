/**
 * Routing convenience utils
 */

'use strict';

module.exports = {
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
