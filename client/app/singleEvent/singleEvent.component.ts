'use strict';
const angular = require('angular');
const ngRoute = require('angular-route');


import routes from './singleEvent.routes';

export class SingleEventComponent {
  message = 'string';
  /*@ngInject*/
  constructor() {
    this.message = 'Hello';
  }
}

export default angular.module('runpurposeApp.singleEvent', [ngRoute])
  .config(routes)
  .component('singleEvent', {
    template: require('./singleEvent.html'),
    controller: SingleEventComponent,
    controllerAs: 'singleEventCtrl'
  })
  .name;
