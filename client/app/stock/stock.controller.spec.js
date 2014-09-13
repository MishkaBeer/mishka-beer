'use strict';

describe('Controller: StockCtrl', function () {

  // load the controller's module
  beforeEach(module('mishkaBeerApp'));

  var StockCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    StockCtrl = $controller('StockCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
