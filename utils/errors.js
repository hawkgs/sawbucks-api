'use strict';

/**
 * Response error codes
 */
module.exports = {
  // General => G
  GEN_SYNTAX: 'G000', // Syntax Error
  GEN_NOT_FOUND: 'G100', // Not Found Error
  GEN_SVC_UNAVAILABLE: 'G200', // Service Unavailable Error

  // User => U
  // username => 0
  USER_NAME_MISSING: 'U000', // Missing username.
  USER_NAME_LENGTH: 'U010', // The username length must be between 6 and 25 symbols.
  USER_NAME_MATCH: 'U020', // The username can contain only A-Z, a-z, 0-9, _, . symbols.
  USER_NAME_DUPL: 'U030', // The username is already in use
  // password => 1
  USER_PASS_MISSING: 'U100', // Missing password(s).
  USER_PASS_SAME: 'U110', // The passwords aren't the same.
  USER_PASS_LENGTH: 'U120', // The password length must be between 8 and 25 symbols.
  // passcode => 2
  USER_CODE_MISSING: 'U200', // Missing passcode.
  USER_CODE_LENGTH: 'U210', // The passcode should consist of 4 digits.
  USER_CODE_DIGITS: 'U220', // The passcode can consist of only digits.
  USER_CODE_INVALID: 'U230', // Invalid code.
  // credentails (username, password) => 3
  USER_CRED_INVALID: 'U300', // Invalid credentials.

  // JWT => J0
  JWT_MISSING: 'J000',
  JWT_MALFORMED: 'J010',
  JWT_INVALID: 'J020',

  // Mongo => M
  MONGO_GENERAL: 'M000'
};
