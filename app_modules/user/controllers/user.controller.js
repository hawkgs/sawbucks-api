'use strict';

const env = process.env.NODE_ENV || 'development';
const MGDB_DUPL_ERR_CODE = require('../../../utils/consts').MGDB_DUPL_ERR_CODE;
const errors = require('../../../utils/errors');
const util = require('../../../utils/util');
const encryption = require('../../../utils/encryption');
const usersData = require('../data/users.data');

/**
 * Controller in charge of user management.
 */
var UserController = {
  /**
   * Creates a user.
   * @param req - Request object
   * @param res - Response object
   * @returns {*}
   */
  createUser: (req, res) => {
    const validationErrMsgs = UserController._validate(req.body);

    // Validation
    if (validationErrMsgs.length > 0) {
      return res.status(422).send({ errors: validationErrMsgs });
    }

    const userObject = {
      username: req.body.username,
      email: req.body.email
    };

    // Password
    userObject.salt = encryption.generateSalt();
    userObject.hashPass = encryption.generateHashedPassword(userObject.salt, req.body.password);

    // Creating
    usersData.create(userObject, (error) => {
      // Mongo errors
      if (error) {
        return res.status(422).send({ errors: [UserController._mongoValidation(error)] });
      }

      res.status(201).send({});
    });
  },

  updateUser: (req, res) => {
    return null;
  },

  /**
   * Combines all validation methods.
   * @param body - Request body
   * @returns {Array.<string>} Error messages array
   * @private
   */
  _validate: (body) => {
    const errors = [];

    errors.push(UserController._validatePasswords(body));
    errors.push(UserController._validatePasscode(body.passcode));
    errors.push(UserController._validateUsername(body.username));

    return errors.filter((error) => {
      if (error) {
        return error;
      }
    });
  },

  /**
   * Validates passwords for existence, match, length, allowed symbols.
   * @param body - Request body
   * @returns {string} Error message
   * @private
   */
  _validatePasswords: (body) => {
    if (!body.password || !body.confirmPassword) {
      return errors.USER_PASS_MISSING;
    }

    if (body.password !== body.confirmPassword) {
      return errors.USER_PASS_SAME;
    }

    if (body.password.length < 8 || 25 < body.password.length) {
      return errors.USER_PASS_LENGTH;
    }

    return null;
  },

  _validatePasscode: (passcode) => {
    if (!passcode) {
      return errors.USER_CODE_MISSING;
    }

    if (passcode.toString().length !== 4) {
      return errors.USER_CODE_LENGTH;
    }

    const digits = passcode.toString().split('');

    for (let i = 0; i < digits.length; i+=1) {
      if (isNaN(parseInt(digits[i]))) {
        return errors.USER_CODE_DIGITS;
      }
    }

    return null;
  },

  /**
   * Validates username for existence, length and allowed symbols.
   * @param {string} username
   * @returns {string} Error message
   * @private
   */
  _validateUsername: (username) => {
    if (!username) {
      return errors.USER_NAME_MISSING;
    }

    if (username.length < 6 || 25 < username.length) {
      return errors.USER_NAME_LENGTH;
    }

    if (!/^[\w.]+$/.test(username)) {
      return errors.USER_NAME_MATCH;
    }

    return null;
  },

  /**
   * All errors related to MongoDB which occur when attempting 'create'.
   * @param error - Error object
   * @returns {string} Error message
   * @private
   */
  _mongoValidation: (error) => {
    const unique = { 'username': errors.USER_NAME_DUPL };
    let duplicated;

    // Duplicated field errors
    if (error.code === MGDB_DUPL_ERR_CODE) {
      Object.keys(unique).forEach((key) => {
        if (error.errmsg.indexOf(key) !== -1) {
          duplicated = unique[key];
        }
      });

      return duplicated;
    }

    if (env === 'development') {
      return error;
    } else {
      util.logToConsole(error);
      return errors.MONGO_GENERAL;
    }
  }
};

module.exports = {
  createUser: UserController.createUser
};
