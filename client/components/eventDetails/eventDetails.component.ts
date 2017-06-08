'use strict';
const angular = require('angular');
const ngRoute = require('angular-route');


import routes from './eventDetails.routes';

export class EventDetailsComponent {
  /*@ngInject*/
  constructor() {
    this.message = 'Hello';
  }
}

export default angular.module('runpurposeApp.eventDetails', [ngRoute])
  .config(routes)
  .component('eventDetails', {
    template: require('./eventDetails.html'),
    controller: EventDetailsComponent,
    controllerAs: 'eventDetailsCtrl'
  })
  .name;
