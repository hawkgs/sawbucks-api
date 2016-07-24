'use strict';

const express = require('express');
const env = process.env.NODE_ENV || 'development';

console.log('process.env.NODE_ENV: ' + env);

const app = express();
const config = require('./config/config')[env];

// Require and run configuration components
require('./config/express')(app);
require('./config/mongoose')(config);

// Injectables
const UsersData = require('./app_modules/user/data/users.data');
const injectables = {
  UsersData: new UsersData(),
};

require('./config/injector').init(injectables);
require('./config/passport')();
require('./config/router')(app);

// Start the server
app.listen(config.port);

console.log('NODE_ENV = ' + env);
console.log('Server running on port: ' + config.port);

module.exports = {
  app: app,
  port: config.port,
  host: config.host
};
