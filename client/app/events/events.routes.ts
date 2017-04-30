'use strict';

export default function($routeProvider) {
  'ngInject';
  $routeProvider
    .when('/events', {
      template: '<events></events>'
    });
}
