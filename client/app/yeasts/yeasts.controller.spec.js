'use strict';

describe('Controller: YeastsCtrl', function () {

  // load the controller's module
  beforeEach(module('mishkaBeerApp'));

  var YeastsCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    YeastsCtrl = $controller('YeastsCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
