'use strict';

angular.module('mishkaBeerApp')
.controller('BreweryCtrl', function ($scope, $http, socket) {
  $scope.brewery;
  $scope.brewerys = [];
  $scope.storageLocations = [];


  $scope.initBrewery = function() {
      $scope.brewery = {name:''};
  }

  $http.get('/api/brewery').success(function(brewerys) {
    $scope.brewerys = brewerys;
    socket.syncUpdates('brewery', $scope.brewerys);
  });

  $http.get('/api/storagelocation').success(function(storageLocations) {
    $scope.storageLocations=storageLocations;
    socket.syncUpdates('storageLocations', $scope.storageLocations);
  });

  $scope.deleteBrewery = function(brewery) {
    $http.delete('/api/brewery/' + brewery._id);
  };

  $scope.$on('$destroy', function () {
    socket.unsyncUpdates('brewery');
    socket.unsyncUpdates('storageLocations');
  });

  $scope.addBrewery = function() {
    if($scope.brewery.name === '') {
      return;
    }
    $http.post('/api/brewery',$scope.brewery);
    $scope.initBrewery();
  };

 $scope.initStorageLocation = function(brewery) {
    brewery.newStorageLocation = {name:'',brewery:brewery._id};
  };


  $scope.addStorageLocation = function(brewery) {
      $http.post('/api/storagelocation',brewery.newStorageLocation);
      brewery.newStorageLocation = undefined;
  }


  $scope.deleteStorageLocation = function(storageLocation) {
    $http.delete('/api/storagelocation/' + storageLocation._id);
  };
    

  $scope.initBrewery();
});

