'use strict';

const passport = require('passport');
const LocalStrategy = require('passport-local');
const usersData = require('./injector').get().provide('UsersData');

/**
 * Defines user authentication strategies with Passport.
 */
module.exports = () => {
  /**
   * Local strategy.
   */
  passport.use(new LocalStrategy((username, password, done) => {
    usersData.findByUsername(username, (err, user) => {
      if (err) {
        console.log('Error loading user: ' + err);
        return;
      }

      if (user && user.isPasswordValid(password)) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    });
  }));
};