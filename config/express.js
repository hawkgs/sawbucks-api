'use strict';

const bodyParser = require('body-parser');
const passport = require('passport');

/**
 * Configures express and runs needed middleware.
 * @param app - Express
 */
module.exports = (app) => {
  // bodyparser
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  // passport
  app.use(passport.initialize());
};
