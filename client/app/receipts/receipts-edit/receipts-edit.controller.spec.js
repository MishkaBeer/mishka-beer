'use strict';

describe('Controller: ReceiptsEditCtrl', function () {

  // load the controller's module
  beforeEach(module('mishkaBeerApp'));

  var ReceiptsEditCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ReceiptsEditCtrl = $controller('ReceiptsEditCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
