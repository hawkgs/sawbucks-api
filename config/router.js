'use strict';

const UserController = require('../app_modules/user/controllers/user.controller');
const AuthController = require('../app_modules/user/controllers/auth.controller');
const errorHandler = require('./error-handler');
const expressJwt = require('express-jwt');
const consts = require('../utils/consts');

/**
 * Router.
 * @param app - Express
 */
module.exports = (app) => {
  const authenticate = expressJwt({ secret: consts.JWT_SECRET });

  // Auth API
  app.post('/auth/login', AuthController.login);
  // app.get('/auth/valid', authenticate, AuthController.isJwtValid);

  // Users API
  app.route('/api/users').post(UserController.createUser);

  app.route('/pesho').get(authenticate, function(req, res) {
    res.send({ msg: 'yolo' });
  });

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
    return res.status(404).send({ errors: ['Not found'] });
  });

  errorHandler(app);
};
