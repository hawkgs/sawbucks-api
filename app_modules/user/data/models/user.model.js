'use strict';

const mongoose = require('mongoose');
const encryption = require('../../../../utils/encryption');
const MGDB_REQUIRED_MSG = require('../../../../utils/consts').MGDB_REQUIRED_MSG;

/**
 * Defines 'user' database schema and methods.
 */
module.exports.init = () => {
  const userSchema = mongoose.Schema({
    pId: { type: Number, default: 0 },
    username: { type: String, require: MGDB_REQUIRED_MSG, unique: true },
    passcode: { type: String, require: MGDB_REQUIRED_MSG },
    salt: String,
    hashPass: String,
    createdAt: { type: Date, default: Date.now },
    isActive: { type: Boolean, default: true }
  });

  userSchema.method({
    isPasswordValid: function (password) {
      return encryption.generateHashedPassword(this.salt, password) === this.hashPass;
    },

    isPasscodeValid: function (passcode) {
      const hashed = encryption.generateHashedCode(passcode.toString());
      return this.passcode === hashed;
    }
  });

  mongoose.model('User', userSchema);
};
