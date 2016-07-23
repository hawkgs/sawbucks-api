'use strict';

var express = require('express'),
  env = process.env.NODE_ENV || 'development',
  config,
  app;

console.log('process.env.NODE_ENV: ' + process.env.NODE_ENV);

app = express();
config = require('./config/config')[env];

// Require and run configuration components
require('./config/express')(app, config);
require('./config/mongoose')(config);
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
