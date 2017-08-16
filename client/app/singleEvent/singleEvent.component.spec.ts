'use strict';

describe('Component: SingleEventComponent', function() {
  // load the controller's module
  beforeEach(module('runpurposeApp.singleEvent'));

  var SingleEventComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    SingleEventComponent = $componentController('singleEvent', {});
  }));

  it('should ...', function() {
    expect(1).toEqual(1);
  });
});
