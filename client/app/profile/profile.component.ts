'use strict';
const angular = require('angular');
const ngRoute = require('angular-route');


import routes from './profile.routes';

export class ProfileComponent {
  $location;
  isLoggedIn: Function;
  getCurrentUser: Function;

  constructor($location, Auth) {
    'ngInject';
    this.$location = $location;
    this.isLoggedIn = Auth.isLoggedInSync;
    this.getCurrentUser = Auth.getCurrentUserSync;
  }

  isActive(route) {
    return route === this.$location.path();
  }
}

/*export default angular.module('directives.navbar', [])
  .component('navbar', {
    template: require('./navbar.html'),
    controller: NavbarComponent
  })
  .name;*/

export default angular.module('runpurposeApp.profile', [ngRoute])
  .config(routes)
  .component('profile', {
    template: require('./profile.html'),
    controller: ProfileComponent,
    //controllerAs: 'profileCtrl'
  })
  .name;
