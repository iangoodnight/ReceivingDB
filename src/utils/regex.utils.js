/**
 * regex.utils.js
 */

'use strict';

module.exports = {
  isAlphaNumeric: (string) => {
    const re = /[-_.0-9a-z]/i;
    return re.test(string);
  },
};
