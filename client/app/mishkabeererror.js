'use strict';

angular.module('mishkaBeerApp')
    .controller('MishkaBeerErrorCtrl', function ($scope, $http, socket, $translate, $injector) {
        $scope.display=false;
        $scope.messagingService = $injector.get('messagingService');
        $scope.$watch('messagingService.error', function (newValue, oldValue) {
            //$scope.messagingService.setError();
            if (newValue != "") {
                $scope.diplay=true;
            }
        });

        $scope.isDisplay = function() {
            return $scope.diplay;
        }

    });
