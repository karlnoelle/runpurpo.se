'use strict';

// Use local.env.js for environment variables that will be set when the server starts locally.
// Use for your api keys, secrets, etc. This file should not be tracked by git.
//
// You will need to set these on the server you deploy to.

module.exports = {
  DOMAIN: 'http://localhost:3000',
  SESSION_SECRET: 'runpurpose-secret',

  FACEBOOK_ID: '300878227033708',
  FACEBOOK_SECRET: 'b22a7fb8b1c2da91e084cb23014d6752',

  TWITTER_ID: 'zPkpwhmwSYezlLi5hacmaZ5Hr',
  TWITTER_SECRET: 'KPyHvaJXyigyrWzACgu3zr62tMYNjVJ8TrHEsg8HDFC1JiO97c',

  // Control debug level for modules using visionmedia/debug
  DEBUG: ''
};
