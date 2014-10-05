'use strict';

describe('Controller: MaltsCtrl', function () {

  // load the controller's module
  beforeEach(module('mishkaBeerApp'));

  var MaltsCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MaltsCtrl = $controller('MaltsCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
