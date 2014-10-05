'use strict';

describe('Controller: BreweryCtrl', function () {

  // load the controller's module
  beforeEach(module('mishkaBeerApp'));

  var BreweryCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    BreweryCtrl = $controller('BreweryCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
