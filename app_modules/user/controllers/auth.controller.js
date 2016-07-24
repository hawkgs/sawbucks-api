'use strict';

const passport = require('passport');
const jwt = require('jsonwebtoken');
const consts = require('../../../utils/consts');
const errors = require('../../../utils/errors');
const usersData = require('../../../config/injector').get().provide('UsersData');

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
        return res.status(422).send({ errors: [errors.USER_CRED_INVALID] });
      }

      req.logIn(user, { session: false }, (err) => {
        if (err) {
          return next(err);
        }

        // Payload
        const token = AuthController._generateToken({
          sub: user.pId,
          name: user.username,
          registered: user.createdAt
        });

        res.status(200).send({ jwt: token });
      });
    })(req, res, next);
  },

  validateCode: (req, res, next) => {
    usersData.findByPid(req.user.sub, (err, user) => {
      console.log(user);

      if (err) {
        return next(err);
      }

      const isPasscodeValid = user.isPasscodeValid(req.passcode);

      if (isPasscodeValid) {
        return res.status(403).send({ msg: 'no' });
      }

      return res.status(200).send({ msg: 'yes' });
    });
  },

  /**
   * Generates a json web token (JWT) by provided @payload. Expiration and secret are located at consts module.
   * @param payload
   * @private
   */
  _generateToken: (payload) => {
    return jwt.sign(payload, consts.JWT_SECRET, { expiresIn: 60 * 60 * consts.JWT_EXP_HOURS });
  },
};

module.exports = {
  login: AuthController.login,
  validateCode: AuthController.validateCode,
  isJwtValid: AuthController.isJwtValid
};
