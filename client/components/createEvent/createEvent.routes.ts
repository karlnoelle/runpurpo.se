'use strict';

// Restrict 'user' role from viewing /createEvent route

export default function($routeProvider) {
  'ngInject';
  $routeProvider
    .when('/createEvent', {
      template: '<create-event></create-event>',
      authenticate: 'admin'
    });
}
