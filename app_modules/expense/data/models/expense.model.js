'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const MGDB_REQUIRED_MSG = require('../../../../utils/consts').MGDB_REQUIRED_MSG;

/**
 * Defines 'expense' database schema.
 */
module.exports.init = () => {
  const expenseSchema = mongoose.Schema({
    publicId: { type: Number, default: 0 },
    cost: { type: Number, require: MGDB_REQUIRED_MSG },
    time: { type: Date, require: MGDB_REQUIRED_MSG },
    category: {
      type: Schema.Types.ObjectId,
      require: MGDB_REQUIRED_MSG,
      ref: 'Category'
    },
    user: {
      type: Schema.Types.ObjectId,
      require: MGDB_REQUIRED_MSG,
      ref: 'User'
    },
    createdAt: { type: Date, default: Date.now },
    isActive: { type: Boolean, default: true }
  });

  mongoose.model('Expense', expenseSchema);
};
