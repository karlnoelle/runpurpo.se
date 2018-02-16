'use strict';

// Use local.env.js for environment variables that will be set when the server starts locally.
// Use for your api keys, secrets, etc. This file should not be tracked by git.
//
// You will need to set these on the server you deploy to.

module.exports = {
  DOMAIN: 'http://localhost:9000',
  SESSION_SECRET: 'runpurpose-secret',

  FACEBOOK_ID: '300878227033708',
  FACEBOOK_SECRET: '6831bbd62e8b58b67bd5e935ecf6332c',

  TWITTER_ID: 'Odxx07uvzdZAZY8J0pFOLKpoz',
  TWITTER_SECRET: 'DpR1Cr0uWB44TzxkLVE2jIkkNJ4I390TGBbRODg5ywBQd8WU6D',

  // Control debug level for modules using visionmedia/debug
  DEBUG: ''
};
