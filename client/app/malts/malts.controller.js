'use strict';

angular.module('mishkaBeerApp')
  .controller('MaltsCtrl', function ($scope, $http, socket) {
    $scope.malts = [];

    $http.get('/api/malts').success(function(malts) {
      $scope.malts = malts;
      socket.syncUpdates('malt', $scope.malts);
    });

    $scope.addMalt = function() {
      if($scope.newMalt === '') {
        return;
      }
      $http.post('/api/malts', { name: $scope.newMalt });
      $scope.newMalt = '';
    };

    $scope.deleteMalt = function(malt) {
      $http.delete('/api/malts/' + malt._id);
    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('malt');
    });
  });
