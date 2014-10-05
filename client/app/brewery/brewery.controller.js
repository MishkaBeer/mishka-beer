'use strict';

angular.module('mishkaBeerApp')
.controller('BreweryCtrl', function ($scope, $http, socket) {
  $scope.brewery;
  $scope.brewerys = [];


  $scope.initBrewery = function() {
      $scope.brewery = {name:''};
  }

  $http.get('/api/brewery').success(function(brewerys) {
    $scope.brewerys = brewerys;
    socket.syncUpdates('brewery', $scope.brewerys);
  });

  $scope.deleteBrewery = function(brewery) {
    $http.delete('/api/brewery/' + brewery._id);
  };

  $scope.$on('$destroy', function () {
    socket.unsyncUpdates('brewery');
  });

  $scope.addBrewery = function() {
    if($scope.brewery.name === '') {
      return;
    }
    $http.post('/api/brewery',$scope.brewery);
    $scope.initBrewery();
  };
  $scope.initBrewery();
});

