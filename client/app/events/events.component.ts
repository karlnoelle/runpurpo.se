'use strict';
const angular = require('angular');
const ngRoute = require('angular-route');


import routes from './events.routes';

export class EventsComponent {
  /*@ngInject*/
  constructor() {
    this.message = 'Hello';
  }
}

export default angular.module('runpurposeApp.events', [ngRoute])
  .config(routes)
  .component('events', {
    template: require('./events.html'),
    controller: EventsComponent,
    controllerAs: 'eventsCtrl'
  })
  .name;
