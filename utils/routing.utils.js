/**
 * Routing convenience utils
 */

'use strict';

module.exports = {
  unauthorized: (res) => {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized',
    });
  },
  success: (res) => {
    return res.status(200).json({
      success: true,
    });
  },
};
