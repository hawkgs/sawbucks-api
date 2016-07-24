'use strict';

const bodyParser = require('body-parser');
const passport = require('passport');
const timeout = require('connect-timeout');
const REQ_TIMEOUT = require('../utils/consts').REQ_TIMEOUT;

/**
 * Configures express and runs needed middleware.
 * @param app - Express
 */
module.exports = (app) => {
  // bodyparser
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(timeout(REQ_TIMEOUT));

  // passport
  app.use(passport.initialize());
};
