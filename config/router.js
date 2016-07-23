'use strict';

const UserController = require('../app_modules/user/controllers/user.controller');
const AuthController = require('../app_modules/user/controllers/auth.controller');
const errorHandler = require('./error-handler');
const expressJwt = require('express-jwt');
const consts = require('../utilities/consts');

/**
 * Router.
 * @param app - Express
 */
module.exports = (app) => {
  const authenticate = expressJwt({ secret: consts.JWT_SECRET });

  // Users API
  app.route('/api/users')
    .post(UserController.createUser);

  // Auth API
  app.post('/auth/login', AuthController.login);
  app.get('/auth/valid', authenticate, AuthController.isJwtValid);

  // 404
  app.get('*', (req, res) => {
    return res.redirect(req.protocol + '://' + req.get('host'));
  });

  errorHandler(app);
};
