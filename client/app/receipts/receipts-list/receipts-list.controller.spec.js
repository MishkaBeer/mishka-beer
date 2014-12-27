'use strict';

describe('Controller: ReceiptsListCtrl', function () {

  // load the controller's module
  beforeEach(module('mishkaBeerApp'));

  var ReceiptsListCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ReceiptsListCtrl = $controller('ReceiptsListCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
