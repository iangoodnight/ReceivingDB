/**
 * Configure passport middleware
 */

'use strict';

const session = require('express-session');
const cookieParse = require('cookie-parser');
const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');
const { User } = require('../models');

module.exports = (app) => {
  // dependencies for managing sessions
  app.use(cookieParse());
  app.use(
    session({
      resave: false,
      rolling: true,
      secret: process.env.COOKIE_SECRET,
      saveUninitialized: false,
      cookie: {
        maxAge: 1 * 24 * 60 * 60 * 1_000,
        secure: false /* requires https */,
      },
      name: 'speak_and_spell',
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (userId, done) => {
    try {
      const user = await User.findById(userId);
      done(null, user);
    } catch (err) {
      done(err);
    }
  });

  const localStrategy = new LocalStrategy(async (username, password, done) => {
    const badUsername = 'Sorry, we do not recognize that user';
    const badPassword = 'Invalid password';
    try {
      const user = await User.findOne({ username }).select('+password');
      if (!user) return done(null, false, { message: badUsername });
      const isMatch = await user.validatePassword(password);
      if (!isMatch) return done(null, false, { message: badPassword });
      return done(null, user, null);
    } catch (err) {
      done(err);
    }
  });

  passport.use(localStrategy);
  app.use(passport.initialize());
  // must come last
  app.use(passport.session());
};
