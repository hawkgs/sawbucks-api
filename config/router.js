'use strict';

const userController = require('../app_modules/user/controllers').userController;
const authController = require('../app_modules/user/controllers').authController;
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
    .post(userController.createUser);

  // Auth API
  app.post('/auth/login', authController.login);
  app.get('/auth/valid', authenticate, authController.isJwtValid);

  // 404
  app.get('*', (req, res) => {
    return res.redirect(req.protocol + '://' + req.get('host'));
  });

  errorHandler(app);
};
