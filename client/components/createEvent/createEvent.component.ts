'use strict';
const angular = require('angular');
const ngRoute = require('angular-route');


import routes from './createEvent.routes';

export class CreateEventComponent {
  /*@ngInject*/
  constructor() {
    this.message = 'Hello';
  }
}

export default angular.module('runpurposeApp.createEvent', [ngRoute])
  .config(routes)
  .component('createEvent', {
    template: require('./createEvent.html'),
    controller: CreateEventComponent,
    controllerAs: 'createEventCtrl'
  })
  .name;
