/**
 * Configure passport middleware
 */

'use strict';

const session = require('express-session');
const MongoStore = require('connect-mongo');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');
const { User } = require('../models');

module.exports = (app) => {
  // dependencies for managing sessions
  app.use(cookieParser());
  app.use(
    session({
      cookie: {
        httpOnly: true,
        maxAge: 1 * 24 * 60 * 60 * 1_000,
        secure:
          process.env.NODE_ENV === 'production'
            ? true
            : false /* requires https */,
        sameSite: 'strict',
      },
      name: 'speak_and_spell',
      resave: false,
      rolling: true,
      saveUninitialized: false,
      secret: process.env.COOKIE_SECRET,
      store: MongoStore.create({
        mongoUrl:
          process.env.NODE_ENV === 'production'
            ? process.env.MONGODB_URI
            : process.env.DEV_URI,
      }),
    })
  );

  if (process.env.NODE_ENV === 'production') app.set('trust proxy', 1);

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (userId, done) => {
    try {
      const user = await User.login(userId);
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
      const isMatch = user.validatePassword(password);
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
