'use strict';

angular.module('mishkaBeerApp')
    .controller('msk-notificationsCtrl', function ($scope, $translate, $mskNotifications, $timeout) {
        $scope.displayError = false;
        $scope.displayInfo = false;

        $scope.infoMessage = "";
        $scope.errorMessage = "";

        $scope.mskNotifications = $mskNotifications;
        $scope.$watch('mskNotifications.error', function (newValue, oldValue) {
            if (newValue != "") {
                $scope.displayError = true;
                $scope.errorMessage = newValue;
            }
        });
        $scope.$watch('mskNotifications.info', function (newValue, oldValue) {
            if (newValue != "") {
                $scope.displayInfo = true;
                $scope.infoMessage = newValue;
                $timeout(
                    function () {
                        if ($scope.infoMessage == newValue) {
                            //Only if no other message was displayed
                            $scope.displayInfo = false;
                            $scope.mskNotifications.info = "";
                        }
                    }, 4000);
            }
        });

        $scope.isDisplayError = function () {
            return $scope.displayError;
        }

        $scope.hideError = function () {
            $scope.displayError = false;
            $scope.mskNotifications.error = "";
        }

        $scope.isDisplayInfo = function () {
            return $scope.displayInfo;
        }

    });
