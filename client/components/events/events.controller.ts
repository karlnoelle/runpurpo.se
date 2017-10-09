'use strict';

export default class EventsController {
    const scotchApp = angular.module('scotchApp', []);

    $scope.message = 'Everyone come and see how good I look!';
    console.log($scope.message)
}

//   // create the controller and inject Angular's $scope
//   runpurposeApp.controller('mainController', function($scope) {
    
//             // create a message to display in our view
//             $scope.message = 'Everyone come and see how good I look!';
//             console.log($scope.message)

//         });


export default class AdminController {
  users: Object[];

  /*@ngInject*/
  constructor(User) {
    // Use the User $resource to fetch all users
    this.users = User.query();
  }

  delete(user) {
    user.$remove();
    this.users.splice(this.users.indexOf(user), 1);
  }
}
