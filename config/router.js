'use strict';

const UserController = require('../app_modules/user/controllers/user.controller');
const AuthController = require('../app_modules/user/controllers/auth.controller');
const errorHandler = require('./error-handler');
const expressJwt = require('express-jwt');
const consts = require('../utils/consts');
const errors = require('../utils/errors');

/**
 * Router.
 * @param app - Express
 */
module.exports = (app) => {
  const authenticate = expressJwt({ secret: consts.JWT_SECRET });

  // Auth API
  app.post('/api/auth/login', AuthController.login);
  app.post('/api/auth/code', authenticate, AuthController.validateCode);

  // Users API
  app.route('/api/users').post(UserController.createUser);
  app.route('/api/users/update').post(authenticate, UserController.updateUser);

  // Categories API
  // app.route('/api/categories')
  //   .post(null)
  //   .get(null)
  //   .delete(null);

  // Expenses API
  // app.route('/api/expenses')
  //   .post(null)
  //   .get(null);

  // Stats API
  // app.route('/api/stats').get(null);

  // 404
  app.get('*', (req, res) => {
    return res.status(404).send({ errors: [errors.GEN_NOT_FOUND] });
  });

  errorHandler(app);
};
