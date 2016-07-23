'use strict';

const passport = require('passport');
const LocalStrategy = require('passport-local');
const usersData = require('../app_modules/user/data/users.data');

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

      if (user && user.isPasscodeValid(password)) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    });
  }));
};