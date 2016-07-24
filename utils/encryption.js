'use strict';

const crypto = require('crypto');

/**
 * Password encryption utility.
 */
module.exports = {
  /**
   * Generates a random password salt.
   * @returns {string}
   */
  generateSalt: () => {
    return crypto.randomBytes(128).toString('base64');
  },

  /**
   * Hashes the password with the provided salt.
   * @param salt {string}
   * @param password {string}
   * @returns {string}
   */
  generateHashedPassword: (salt, password) => {
    const hmac = crypto.createHmac('sha256', salt);

    return hmac.update(password).digest('hex');
  },

  generateHashedCode: (passcode) => {
    return crypto.createHash('sha256').update(passcode).digest('hex');
  }
};
