'use strict';

const mongoose = require('mongoose');
const Models = require('../app_modules/user/data/models');

/**
 * Opens a connection to the MongoDB database and initializes needed models.
 * @param config - Server configuration
 */
module.exports = (config) => {
  mongoose.connect(config.db);
  const db = mongoose.connection;

  db.once('open', (err) => {
    if (err) {
      console.log('Database could not be opened: ' + err);
      return;
    }

    console.log('Database up and running...');
  });

  db.on('error', (err) => {
    console.log('Database error: ' + err);
  });

  // Models initialization
  Models.User.init();
};