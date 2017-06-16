'use strict';
const angular = require('angular');
const ngRoute = require('angular-route');


import routes from './profile.routes';

export class ProfileComponent {
  //message: string;
  isLoggedIn: Function;
  getCurrentUser: Function;
  /*@ngInject*/
  constructor(Auth) {
    //this.message = 'Hello what up where does this message appear. im coming from profile.component.ts';

    'ngInject';
    this.isLoggedIn = Auth.isLoggedInSync;
    this.getCurrentUser = Auth.getCurrentUserSync;
  }

  /*isActive(route) {
    return route === this.$location.path();
  }*/
}

export default angular.module('runpurposeApp.profile', [ngRoute])
  .config(routes)
  .component('profile', {
    template: require('./profile.html'),
    controller: ProfileComponent,
    controllerAs: 'profileCtrl'
  })
  .name;
