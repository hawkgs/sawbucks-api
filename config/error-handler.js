'use strict';

/**
 * Helpers
 * @type {{logToConsole: helpers.logToConsole}}
 */
const helpers = {
  logToConsole: (err) => {
    console.log('\n/////////////////\n' + err.name.toUpperCase() + '\n/////////////////');
    console.log(err);
  }
};

/**
 * Manages all uncaught router errors.
 * @param app - Express
 */
module.exports = (app) => {
  app.use((err, req, res, next) => {
    if (!err) {
      return next();
    }

    // ERRORS

    // express-jwt
    if (err.name === 'UnauthorizedError') {
      return res.status(401).send({ success: false, message: err.message });
    }

    // if uncaught
    helpers.logToConsole(err);
    res.status(500).send({ name: err.name });
  });
};