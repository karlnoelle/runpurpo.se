'use strict';

export default function($routeProvider) {
  'ngInject';
  $routeProvider
    .when('/profile', {
      template: '<profile></profile>'
    });
}
