/**
 * Auth db functions
 */

'use strict';

const passport = require('passport');

module.exports = {
  info: (req, res) => {},
  login: (req, res, next) => {
    passport.authenticate('local', (err, user) => {
      if (err) return next(err);
      if (!user) return res.status(401).send('Unauthorized\n');
      req.logIn(user, (err) => {
        if (err) return next(err);
        return res.status(200).json(user);
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
