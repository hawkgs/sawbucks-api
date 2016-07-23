'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const MGDB_REQUIRED_MSG = require('../../../../utils/consts').MGDB_REQUIRED_MSG;

/**
 * Defines 'category' database schema.
 */
module.exports.init = () => {
  const categorySchema = mongoose.Schema({
    publicId: { type: Number, default: 0 },
    name: { type: String, require: MGDB_REQUIRED_MSG },
    color: { type: String, require: MGDB_REQUIRED_MSG },
    user: {
      type: Schema.Types.ObjectId,
      require: MGDB_REQUIRED_MSG,
      ref: 'User'
    },
    createdAt: { type: Date, default: Date.now },
    isActive: { type: Boolean, default: true }
  });

  mongoose.model('Category', categorySchema);
};
