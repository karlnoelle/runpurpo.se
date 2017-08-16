'use strict';

export default function($routeProvider) {
  'ngInject';
  $routeProvider
    .when('/singleEvent', {
      template: '<single-event></single-event>'
    });
}
