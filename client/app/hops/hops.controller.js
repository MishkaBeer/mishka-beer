'use strict';

angular.module('mishkaBeerApp')

.controller('HopsCtrl', function ($scope, $http, socket, $translate, $injector) {
    $scope.editInfos = [];
    $scope.hops = [];
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
        $scope.closeAll();
        var info = $scope.getInfos($element._id);
        info.$edit = true;
        info.$details = false;
    }

    $scope.show = function ($element) {
        $scope.closeAll();
        var info = $scope.getInfos($element._id);
        info.$edit = false;
        info.$details = true;
    }



    //
    // Hops services.
    //

    $scope.changeShowNewHop = function () {
        if ($scope.newHopClass === "") {
            $scope.newHopClass = "in";
        } else {
            $scope.newHopClass = "";
        }
    }

    $scope.newHopClass = "";

    $scope.errorGetList = false;

    $http.get('/api/hops')
        .success(function (hops) {
            $scope.hops = hops;
            $scope.editInfos = [];
            for (var i = 0; i < hops.length; i++) {
                $scope.editInfos.push({
                    $edit: false,
                    $details: false,
                    id: hops[i]._id
                });
            }

            socket.syncUpdates('hop', $scope.hops, function (event, item, list, oldItem) {
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
                    console.log("=>>> taille editInfos ap cre : " + $scope.editInfos.length);
                }
            });
            $scope.errorGetList = false;
        }).error(function (hops) {
            $scope.errorGetList = true;
        });

    $scope.saveHop = function ($hop) {
        if ($hop._id != null) {
            return $http.put('/api/hops/' + $hop._id, $hop).
            success(function (data, status, headers, config) {
                $scope.messagingService.displayInfo("entities.hop.confirm.update");
            }).
            error(function (data, status, headers, config) {
                $scope.messagingService.displaySystemError();
            });
        } else {
            return $http.post('/api/hops', $hop).
            success(function (data, status, headers, config) {
                $scope.messagingService.displayInfo("entities.hop.confirm.add");
            }).
            error(function (data, status, headers, config) {
                $scope.messagingService.displaySystemError();
            });
        };
    };

    $scope.deleteHop = function ($hop) {
        $http.delete('/api/hops/' + $hop._id).
        success(function (data, status, headers, config) {
            $scope.messagingService.displayInfo("entities.hop.confirm.delete");
        }).
        error(function (data, status, headers, config) {
            $scope.messagingService.displaySystemError();
        });
    };

    $scope.$on('$destroy', function () {
        socket.unsyncUpdates('hop');
    });

});
