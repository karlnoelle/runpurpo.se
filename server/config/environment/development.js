'use strict';
/*eslint no-process-env:0*/

// Development specific configuration
// ==================================
module.exports = {

  // MongoDB connection options
  mongo: {
    uri: 'mongodb://heroku_b5h9p4zn:aghejo8bf2k2c9ggecjq2sum0q@ds133418.mlab.com:33418/heroku_b5h9p4zn'
  },

  // Seed database on startup
  seedDB: true

};
