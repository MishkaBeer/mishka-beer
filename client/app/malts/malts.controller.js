angular.module('mishkaBeerApp')
    .controller('MaltsCtrl', function ($scope, $http, socket, $translate, $mskNotifications, $mskConstants, $mskUtilities) {
        'use strict';

        $scope.mskNotifications = $mskNotifications;
        $scope.listManager = $mskUtilities.createListEditManager($mskConstants.maltApiURI, 'malt');

        //
        // Specific malts management
        //
        $scope.getNameMaltType = function ($code) {
            var i;
            for (i = 0; i < $mskConstants.maltTypes.length; i = i + 1) {
                if ($mskConstants.maltTypes[i].code === $code) {
                    return $mskConstants.maltTypes[i].name;
                }
            }
        };

        $scope.changeShowNewMalt = function () {
            if ($scope.newMaltClass === "") {
                $scope.newMaltClass = "in";
            } else {
                $scope.newMaltClass = "";
            }
        };

        $scope.newMaltClass = "";

        $scope.listManager.initList().error(function () {
            $scope.mskNotifications.displayError("entities.malt.error.list");
        });

        $scope.saveMalt = function ($malt) {
            if ($malt._id != null) {
                return $scope.listManager.save($malt).
                success(function () {
                    $scope.mskNotifications.displayInfo("entities.malt.confirm.update");
                }).error(function () {
                    $scope.mskNotifications.displayError("entities.malt.error.update");
                });
            } else {
                return $scope.listManager.saveNew($malt).
                success(function () {
                    $scope.mskNotifications.displayInfo("entities.malt.confirm.add");
                }).error(function () {
                    $scope.mskNotifications.displayError("entities.malt.error.add");
                });
            }
        };

        $scope.deleteMalt = function ($malt) {
            return $scope.listManager.delete($malt).
            success(function () {
                $scope.mskNotifications.displayInfo("entities.malt.confirm.delete");
            }).error(function () {
                $scope.mskNotifications.displayError("entities.malt.error.delete");
            });
        };

        $scope.$on('$destroy', $scope.listManager.unsyncUpdates);

    });
