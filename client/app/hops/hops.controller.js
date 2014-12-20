'use strict';

angular.module('mishkaBeerApp')
    .controller('HopsCtrl', function ($scope, $http, socket, $translate) {
        $scope.editInfos = [];
        $scope.hops = [];

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
            var detailsNew = !info.$details;
            $scope.closeAll();
            info.$edit = false;
            info.$details = detailsNew;
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
                return $http.put('/api/hops/' + $hop._id, $hop);
            } else {
                return $http.post('/api/hops', $hop);
            };
        };

        $scope.deleteHop = function ($hop) {
            $http.delete('/api/hops/' + $hop._id);
        };

        $scope.$on('$destroy', function () {
            socket.unsyncUpdates('hop');
        });

    });
