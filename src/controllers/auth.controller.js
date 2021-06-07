/**
 * Auth db functions
 */

'use strict';

const passport = require('passport');
const {
  route: { unauthorized },
} = require('../utils');

module.exports = {
  info: (req, res) => {
    const { user } = req;
    if (user) return res.json(user);
    unauthorized(res);
  },
  login: (req, res, next) => {
    passport.authenticate('local', (err, user) => {
      if (err) return next(err);
      if (!user) return unauthorized(res, 'user not found');
      const { enabled = false } = user;
      console.log(user);
      if (!enabled) return unauthorized(res, 'user is disabled');
      req.logIn(user, (err) => {
        if (err) return next(err);
        const { _id, email, roles, username } = user;
        const userDetails = { _id, email, roles, username };
        const response = { success: true, data: userDetails };
        return res.status(200).json(response);
      });
    })(req, res, next);
  },
  logout: (req, res) => {
    req.logout();
    req.session.destroy();
    res.json({
      success: true,
      message: 'Logged out',
    });
  },
};
