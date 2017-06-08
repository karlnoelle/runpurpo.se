'use strict';

describe('Component: EventDetailsComponent', function() {
  // load the controller's module
  beforeEach(module('runpurposeApp.eventDetails'));

  var EventDetailsComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    EventDetailsComponent = $componentController('eventDetails', {});
  }));

  it('should ...', function() {
    expect(1).toEqual(1);
  });
});
