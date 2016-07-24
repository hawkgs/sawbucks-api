'use strict';

/**
 * Helpers
 */
module.exports = {
  logToConsole: (err) => {
    console.log('\n/////////////////\n' + err.name.toUpperCase() + '\n/////////////////');
    console.log(err);
  }
};
