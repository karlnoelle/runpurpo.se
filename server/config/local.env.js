'use strict';

// Use local.env.js for environment variables that will be set when the server starts locally.
// Use for your api keys, secrets, etc. This file should not be tracked by git.
//
// You will need to set these on the server you deploy to.

module.exports = {
  DOMAIN: 'http://localhost:3000',
  SESSION_SECRET: 'runpurpose-secret',

  FACEBOOK_ID: '300878227033708',
  FACEBOOK_SECRET: 'e5b62d273324ce8425cd04f30038a4c1',

  TWITTER_ID: 'tlvk3A3WyPcbGw4wUqPxiccbF',
  TWITTER_SECRET: '09HyfAlhAgjMHcfJDQBQAUSTEv2ovlGunOsEFwGUWAM7U1geQg',

  // Control debug level for modules using visionmedia/debug
  DEBUG: ''
};
