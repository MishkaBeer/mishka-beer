'use strict';

angular.module('mishkaBeerApp')
  .controller('HopsCtrl', function ($scope, $http, socket, $translate) {
    $scope.hops = [];
    $scope.newHop = {
        "$edit" : true
    };
    $scope.newHopClass = "";
    $scope.currentHopInList = null;
    $scope.errorGetList = false;

    $scope.editHop = function($hop) {
        if ($scope.currentHopInList != null) {
            $scope.currentHopInList.$edit = false;
        }
        if ($scope.currentHopInList != $hop || $hop.$details) {
            $scope.currentHopInList = $hop;
            $hop.$edit = true;
            $hop.$details = false;
        } else {
            $hop.$edit = false;
            $hop.$details = false;
            $scope.currentHopInList = null;
        }
    }

    $scope.showHop = function($hop) {

        if ($scope.currentHopInList != null) {
            $scope.currentHopInList.$details = false;
        }
        if ($scope.currentHopInList != $hop || $hop.$edit) {
            $scope.currentHopInList = $hop;
            $hop.$edit = false;
            $hop.$details = true;
        } else {
            $hop.$edit = false;
            $hop.$details = false;
            $scope.currentHopInList = null;
        }
    }

    $scope.changeShowNewHop = function() {
        if ( $scope.newHopClass === "") {
            $scope.newHopClass = "in";
        } else {
            $scope.newHopClass = "";
        }
    }

    $http.get('/api/hops')
        .success(function(hops) {
          $scope.hops = hops;

          socket.syncUpdates('hop', $scope.hops, function(event, item, list, oldItem) {
            if (oldItem != null && oldItem.$edit) {
                item.$edit = true;
            }
            if (oldItem != null && oldItem.$alert) {
                item.$alert = true;
            }
          }
        );
    }).error(function(hops) {
            $scope.errorGetList = false;
        }
    );

    $scope.saveHop = function($hop) {
        $scope.hops.push($hop);
        if ($hop._id != null) {
            return $http.put('/api/hops/' + $hop._id, $hop);
        } else {
            return $http.post('/api/hops', $hop);
        };
    };

    $scope.deleteHop = function(hop) {
      $http.delete('/api/hops/' + hop._id);
    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('hop');
    });

  });
