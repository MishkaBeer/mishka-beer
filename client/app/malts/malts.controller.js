'use strict';

angular.module('mishkaBeerApp')
  .controller('MaltsCtrl', function ($scope, $http, socket, $translate) {
    $scope.malts = [];
    $scope.newMalt = '';

    $http.get('/api/malts').success(function(malts) {
      $scope.malts = malts;
      socket.syncUpdates('malt', $scope.malts);
    });

    $scope.addMalt = function($malt) {
      if($malt === '') {
        return false;
      }
      $http.post('/api/malts', $malt);
    };

    $scope.deleteMalt = function(malt) {
      $http.delete('/api/malts/' + malt._id);
    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('malt');
    });

  });
