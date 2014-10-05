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
    var i;
    for (i = 0;i<$scope.brewerys.length;i++) {
        var brewery = $scope.brewerys[i];
        $http.get('/api/storagelocation', {brewery:brewery}).success(function(storagelocations) {
            brewery.storagelocations=storagelocations;
        });
    }
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
   
 $scope.initStorageLocation = function(brewery) {
    brewery.newStorageLocation = {name:'',brewery:brewery};
  };
    
        
  $scope.addStorageLocation = function(brewery) {
      //$http.post('/api/storagelocation',brewery.newStorageLocation);
      brewery.newStorageLocation = undefined;
  }
    
  $scope.initBrewery();
});

