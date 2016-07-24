'use strict';

const helpers = require('../utils/util');
const errors = require('../utils/errors');

const expressJwtErrMsg = {
  'No authorization token was found': errors.JWT_MISSING,
  'jwt malformed': errors.JWT_MALFORMED,
  'invalid token': errors.JWT_INVALID
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

    // json
    if (err.name === 'SyntaxError') {
      helpers.logToConsole(err);
      return res.status(400).send({ errors: [errors.GEN_SYNTAX] });
    }

    // express-jwt
    if (err.name === 'UnauthorizedError') {
      const errCodes = Object.keys(expressJwtErrMsg).map((key) => {
        if (err.message === key) {
          return expressJwtErrMsg[key];
        } else {
          return null;
        }
      })
      .filter((m) => !!m);

      return res.status(401).send({ errors: errCodes });
    }

    // if uncaught
    helpers.logToConsole(err);
    res.status(500).send({ errors: [err.name] });
  });
};