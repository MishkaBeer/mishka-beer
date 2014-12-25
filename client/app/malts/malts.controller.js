'use strict';

angular.module('mishkaBeerApp')
    .controller('MaltsCtrl', function ($scope, $http, socket, $translate, $injector, $mskConstants, $mskUtilities) {
        $scope.messagingService = $injector.get('messagingService');
        $scope.listManager = $mskUtilities.createListEditManager('/api/malts/', 'malt');

        //
        // Specific malts management
        //
        $scope.getNameMaltType = function ($code) {
            for (var i in $mskConstants.maltTypes) {
                if ($mskConstants.maltTypes[i].code === $code) {
                    return $mskConstants.maltTypes[i].name;
                }
            }
        }

        //
        // Malts services
        //
        $scope.changeShowNewMalt = function () {
            if ($scope.newMaltClass === "") {
                $scope.newMaltClass = "in";
            } else {
                $scope.newMaltClass = "";
            }
        }

        $scope.newMaltClass = "";

        $scope.listManager.initList().error(function () {
            $scope.messagingService.displayError("entities.malt.error.list");
        });

        $scope.saveMalt = function ($malt) {
            if ($malt._id != null) {
                return $scope.listManager.save($malt).
                success(function () {
                    $scope.messagingService.displayInfo("entities.malt.confirm.update");
                }).error(function () {
                    $scope.messagingService.displayError("entities.malt.error.update");
                });
            } else {
                return $scope.listManager.saveNew($malt).
                success(function () {
                    $scope.messagingService.displayInfo("entities.malt.confirm.add");
                }).error(function () {
                    $scope.messagingService.displayError("entities.malt.error.add");
                });
            };
        };

        $scope.deleteMalt = function ($malt) {
            return $scope.listManager.delete($malt).
            success(function () {
                $scope.messagingService.displayInfo("entities.malt.confirm.delete");
            }).error(function () {
                $scope.messagingService.displayError("entities.malt.error.delete");
            });
        };

        $scope.$on('$destroy', $scope.listManager.unsyncUpdates);

    });
