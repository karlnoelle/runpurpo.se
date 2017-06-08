'use strict';

describe('Component: CreateEventComponent', function() {
  // load the controller's module
  beforeEach(module('runpurposeApp.createEvent'));

  var CreateEventComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    CreateEventComponent = $componentController('createEvent', {});
  }));

  it('should ...', function() {
    expect(1).toEqual(1);
  });
});
