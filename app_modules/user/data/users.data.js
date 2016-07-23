'use strict';

const User = require('mongoose').model('User');

/**
 * A module which creates an abstraction of the database manipulation methods.
 */
module.exports = {
  /**
   * Creates a new user.
   * @param user {User} - Object with user data
   * @param callback
   */
  create: (user, callback) => {
    User.create(user, callback);
  },

  /**
   * Finds a user by provided ID.
   * @param id {ObjectId}
   * @param callback
   */
  findById: (id, callback) => {
    User.findOne({ _id: id }).exec(callback);
  },

  /**
   * Finds a user by provided username.
   * @param username {string}
   * @param callback
   */
  findByUsername: (username, callback) => {
    User.findOne({ username: username }).exec(callback);
  },

  /**
   * Updates existing user information.
   * @param id {ObjectId}
   * @param user {User}
   * @param callback
   */
  update: (id, user, callback) => {
    User.update({ _id: id }, user, callback);
  }
};