'use strict';

export default function($routeProvider) {
  'ngInject';
  $routeProvider
    .when('/createEvent', {
      template: '<create-event></create-event>'
    });
}
