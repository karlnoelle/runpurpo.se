'use strict';
const angular = require('angular');
// import ngAnimate from 'angular-animate';
const ngCookies = require('angular-cookies');
const ngResource = require('angular-resource');
const ngSanitize = require('angular-sanitize');

const ngRoute = require('angular-route');

const uiBootstrap = require('angular-ui-bootstrap');
// const ngMessages = require('angular-messages');
// import ngValidationMatch from 'angular-validation-match';


import {routeConfig} from './app.config';

import _Auth from '../components/auth/auth.module';
import account from './account';
import admin from './admin';
import navbar from '../components/navbar/navbar.component';
import footer from '../components/footer/footer.component';
import main from './main/main.component';
import constants from './app.constants';
import util from '../components/util/util.module';

import eventsModule from '../components/events/events.component';
import eventDetailsModule from '../components/eventDetails/eventDetails.component';
import CreateEventComponent from '../components/createEvent/createEvent.component';

import './app.scss';

angular.module('runpurposeApp', [
  ngCookies,
  ngResource,
  ngSanitize,


  ngRoute,
  uiBootstrap,

  _Auth,
  account,
  admin,  navbar,
  footer,
  main,
  constants,

  eventsModule,
  eventDetailsModule,
  CreateEventComponent,

  util
])
  .config(routeConfig)
  .run(function($rootScope, $location, Auth) {
    'ngInject';
    // Redirect to login if route requires auth and you're not logged in
    $rootScope.$on('$stateChangeStart', function(event, next) {
      Auth.isLoggedIn(function(loggedIn) {
        if(next.authenticate && !loggedIn) {
          $location.path('/login');
        }
      });
    });
  });

angular
  .element(document)
  .ready(() => {
    angular.bootstrap(document, ['runpurposeApp'], {
      strictDi: true
    });
  });