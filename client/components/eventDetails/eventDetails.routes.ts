'use strict';

export default function($routeProvider) {
  'ngInject';
  $routeProvider
    .when('/eventDetails', {
      template: '<event-details></event-details>'
    });
}
