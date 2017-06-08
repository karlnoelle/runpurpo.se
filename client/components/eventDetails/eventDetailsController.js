'use strict';

runpurposeApp.controller('EventsController',
  function EventsController($scope) {

    $scope.event = {
      name: 'thing',
      date: 'soon',
      time: 'now'
    }
  }
);