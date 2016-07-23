'use strict';

const passport = require('passport');
const jwt = require('jsonwebtoken');
const consts = require('../../../utilities/consts');

/**
 * Controller for the authentication API.
 */
const AuthController = {
  /**
   * /auth/login API: Authenticates a user by issuing a JWT.
   * @param req
   * @param res
   * @param next
   */
  login: (req, res, next) => {
    passport.authenticate('local', (err, user) => {
      if (err) {
        return next(err);
      }

      // If something is wrong.
      if (!user) {
        return res.send({ success: false });
      }

      req.logIn(user, { session: false }, (err) => {
        if (err) {
          return next(err);
        }

        const token = AuthController._generateToken({
          //sub: user.
          username: user.username
        });

        res.send({ success: true, username: user.username, token: token });
      });
    })(req, res, next);
  },

  /**
   * /auth/valid API: Returns whether a user is authenticated or not by checking the
   * validity and expiration of his/hers JWT. Note that the current method returns only
   * successful response. If the user is not authenticated the error message will be handled
   * by the errorHandler (returning success false).
   * @param req
   * @param res
   */
  isJwtValid: (req, res) => {
    res.status(200).send({ success: true });
  },

  /**
   * Generates a json web token (JWT) by provided @payload. Expiration and secret are located at consts module.
   * @param payload
   * @private
   */
  _generateToken: (payload) => {
    return jwt.sign(payload, consts.JWT_SECRET, { expiresIn: 60 * 60 * consts.JWT_EXP_HOURS });
  }
};

module.exports = {
  login: AuthController.login,
  isJwtValid: AuthController.isJwtValid
};
