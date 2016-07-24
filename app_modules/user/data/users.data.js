'use strict';

const User = require('mongoose').model('User');

/**
 * A module which creates an abstraction of the database manipulation methods.
 */
class UsersData {
  constructor () {}

  /**
   * Creates a new user.
   * @param user {User} - Object with user data
   * @param callback
   */
  create(user, callback) {
    User.find({}).sort({ $natural: -1 }).limit(1)
      .exec((err, lastUser) => {
        if (lastUser.length > 0) {
          user.pId = lastUser[0].pId + 1;
        } else {
          user.pId = 1;
        }

        User.create(user, callback);
      });
  }

  /**
   * Finds a user by provided ID.
   * @param id {ObjectId}
   * @param callback
   */
  findById(id, callback) {
    User.findOne({ _id: id, isActive: true }).exec(callback);
  }

  findByPid(pId, callback) {
    User.findOne({ pId: pId, isActive: true }).exec(callback);
  }

  /**
   * Finds a user by provided username.
   * @param username {string}
   * @param callback
   */
  findByUsername(username, callback) {
    User.findOne({ username: username }).exec(callback);
  }

  /**
   * Updates existing user information.
   * @param id {ObjectId}
   * @param user {User}
   * @param callback
   */
  update(id, user, callback) {
    User.update({ _id: id }, user, callback);
  }
}

module.exports = UsersData;
