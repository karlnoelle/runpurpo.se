'use strict';
/*eslint no-process-env:0*/

// Development specific configuration
// ==================================
module.exports = {

  // MongoDB connection options
  mongo: {
    uri: 'mongodb://heroku_h1wdx9nf:ejn11ei1vi9qpjm83a3meuueli@ds121192.mlab.com:21192/heroku_h1wdx9nf'
  },

  // Seed database on startup
  seedDB: true

};
