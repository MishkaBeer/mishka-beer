'use strict';

describe('Controller: HopsCtrl', function () {

  // load the controller's module
  beforeEach(module('mishkaBeerApp'));

  var HopsCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    HopsCtrl = $controller('HopsCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
