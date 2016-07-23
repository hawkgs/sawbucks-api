'use strict';

const mongoose = require('mongoose');
const encryption = require('../../../../utilities/encryption');
const MGDB_REQUIRED_MSG = require('../../../../utilities/consts').MGDB_REQUIRED_MSG;

/**
 * Defines 'user' database schema and methods.
 */
module.exports.init = () => {
  const userSchema = mongoose.Schema({
    publicId: { type: Number, default: 0 },
    username: { type: String, require: MGDB_REQUIRED_MSG, unique: true },
    salt: String,
    hashPasscode: String,
    createdAt: { type: Date, default: Date.now },
    isActive: { type: Boolean, default: true }
  });

  userSchema.method({
    isPasscodeValid: (passcode) => {
      return encryption.generateHashedPassword(this.salt, passcode) === this.hashPass;
    }
  });

  mongoose.model('User', userSchema);
};
