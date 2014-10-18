'use strict';

angular.module('mishkaBeerApp')
  .controller('YeastsCtrl', function ($scope, $http, socket, $translate) {
    $scope.yeasts = [];
    $scope.newYeast = {
        "$edit" : true
    };
    $scope.newYeastClass = "";
    $scope.currentYeastInList = null;
    $scope.errorGetList = false;

    $scope.editYeast = function($yeast) {
        if ($scope.currentYeastInList != null) {
            $scope.currentYeastInList.$edit = false;
        }
        if ($scope.currentYeastInList != $yeast || $yeast.$details) {
            $scope.currentYeastInList = $yeast;
            $yeast.$edit = true;
            $yeast.$details = false;
        } else {
            $yeast.$edit = false;
            $yeast.$details = false;
            $scope.currentYeastInList = null;
        }
    }

    $scope.showYeast = function($yeast) {
        console.log("-- AFFICHER HOUBON");
        if ($scope.currentYeastInList != null) {
            $scope.currentYeastInList.$details = false;
        }
        if ($scope.currentYeastInList != $yeast || $yeast.$edit) {
            $scope.currentYeastInList = $yeast;
            $yeast.$edit = false;
            $yeast.$details = true;
        } else {
            $yeast.$edit = false;
            $yeast.$details = false;
            $scope.currentYeastInList = null;
        }
    }

    $scope.changeShowNewYeast = function() {
        if ( $scope.newYeastClass === "") {
            $scope.newYeastClass = "in";
        } else {
            $scope.newYeastClass = "";
        }
    }

    $http.get('/api/yeasts')
        .success(function(yeasts) {
          $scope.yeasts = yeasts;

          socket.syncUpdates('yeast', $scope.yeasts, function(event, item, list, oldItem) {
            if (oldItem != null && oldItem.$edit) {
                item.$edit = true;
            }
            if (oldItem != null && oldItem.$alert) {
                item.$alert = true;
            }
          }
        );
    }).error(function(yeasts) {
            $scope.errorGetList = false;
        }
    );

    $scope.saveYeast = function($yeast) {
        $scope.yeasts.push($yeast);
        if ($yeast._id != null) {
            return $http.put('/api/yeasts/' + $yeast._id, $yeast);
        } else {
            return $http.post('/api/yeasts', $yeast);
        };
    };

    $scope.deleteYeast = function(yeast) {
      $http.delete('/api/yeasts/' + yeast._id);
    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('yeast');
    });

  });
