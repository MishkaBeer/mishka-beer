'use strict';

angular.module('mishkaBeerApp')
    .controller('MaltsCtrl', function ($scope, $http, socket, $translate, $injector) {

        $scope.editInfos = [];
        $scope.malts = [];
        $scope.messagingService = $injector.get('messagingService');

        /**
         * Return infos for an element.
         *
         * @param {Integer} id
         */
        $scope.getInfos = function (id) {
            for (var i in $scope.editInfos) {
                if ($scope.editInfos[i].id == id) {
                    return $scope.editInfos[i];
                }
            }
            return null;
        }

        /**
         * Function to close all
         */
        $scope.closeAll = function () {
            for (var i = 0; i < $scope.editInfos.length; i++) {
                $scope.editInfos[i].$edit = false;
                $scope.editInfos[i].$details = false;
            }
        }

        $scope.edit = function ($element) {
            var info = $scope.getInfos($element._id);
            var editNew = !info.$edit;
            $scope.closeAll();
            info.$edit = editNew;
            info.$details = false;
        }

        $scope.show = function ($element) {
            var info = $scope.getInfos($element._id);
            var detailsNew = !(info.$details || info.$edit);
            $scope.closeAll();
            info.$edit = false;
            info.$details = detailsNew;
        }


        //
        // Specific malts management
        //

        $scope.MaltTypes = [
            {
                code: "malt",
                name: "entities.malt.type.values.malt"
        },
            {
                code: "raw",
                name: "entities.malt.type.values.raw"
        },
            {
                code: "sugar",
                name: "entities.malt.type.values.sugar"
        }
    ];

        $scope.MashNecessary = [
            {
                code: true,
                name: "entities.malt.mash.values.true"
        },
            {
                code: false,
                name: "entities.malt.mash.values.false"
        }
    ];

        $scope.getNameMaltType = function ($code) {
            for (var i in $scope.MaltTypes) {
                if ($scope.MaltTypes[i].code === $code) {
                    return $scope.MaltTypes[i].name;
                }
            }
        }

        this.getMaltTypes = function () {
            return $scope.MaltTypes;
        };
        this.getMashNecessary = function () {
            return $scope.MashNecessary;
        };

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

        $http.get('/api/malts')
            .success(function (malts) {

                $scope.malts = malts;
                $scope.editInfos = [];
                for (var i = 0; i < malts.length; i++) {
                    $scope.editInfos.push({
                        $edit: false,
                        $details: false,
                        id: malts[i]._id
                    });
                }

                socket.syncUpdates('malt', $scope.malts, function (event, item, list, oldItem) {
                    if (event === "deleted") {
                        _.remove($scope.editInfos, {
                            id: item._id
                        });
                    } else if (event === "created") {
                        $scope.editInfos.push({
                            $edit: false,
                            $details: false,
                            id: item._id
                        });
                    }
                });
            }).error(function () {
                $scope.messagingService.displayError("entities.malt.error.list");
            });

        $scope.saveMalt = function ($malt) {
            if ($malt._id != null) {
                return $http.put('/api/malts/' + $malt._id, $malt).
                success(function () {
                    $scope.messagingService.displayInfo("entities.malt.confirm.update");
                }).error(function () {
                    $scope.messagingService.displayError("entities.malt.error.update");
                });
            } else {
                return $http.post('/api/malts', $malt).
                success(function () {
                    $scope.messagingService.displayInfo("entities.malt.confirm.add");
                }).error(function () {
                    $scope.messagingService.displayError("entities.malt.error.add");
                });
            };
        };

        $scope.deleteMalt = function ($malt) {
            $http.delete('/api/malts/' + $malt._id).
            success(function () {
                $scope.messagingService.displayInfo("entities.malt.confirm.delete");
            }).error(function () {
                $scope.messagingService.displayError("entities.malt.error.delete");
            });
        };

        $scope.$on('$destroy', function () {
            socket.unsyncUpdates('malt');
        });

    });
