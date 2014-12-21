'use strict';

angular.module('mishkaBeerApp')
    .controller('msk-MessageCtrl', function ($scope, $http, socket, $translate, $injector, $timeout) {
        $scope.displayError = false;
        $scope.displayInfo = false;

        $scope.infoMessage = "";
        $scope.errorMessage = "";

        $scope.messagingService = $injector.get('messagingService');
        $scope.$watch('messagingService.error', function (newValue, oldValue) {
            if (newValue != "") {
                $scope.displayError = true;
                $scope.errorMessage = newValue;
            }
        });
        $scope.$watch('messagingService.info', function (newValue, oldValue) {
            if (newValue != "") {
                $scope.displayInfo = true;
                $scope.infoMessage = newValue;
                $timeout(
                    function () {
                        if ($scope.infoMessage == newValue) {
                            //Only if no other message was displayed
                            $scope.displayInfo = false;
                            $scope.messagingService.info = "";
                        }
                    }, 4000);
            }
        });

        $scope.isDisplayError = function () {
            return $scope.displayError;
        }

        $scope.hideError = function () {
            $scope.displayError = false;
            $scope.messagingService.error = "";
        }

        $scope.isDisplayInfo = function () {
            return $scope.displayInfo;
        }

    });
