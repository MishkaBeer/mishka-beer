angular.module("mishkaBeerApp").factory("$mskUtilities",
    function ($http, socket) {
        'use strict';

        var ListEditManager = function ($apiUrl, $listName) {
            var manager = {};
            manager.items = [];
            manager.editInfos = [];
            manager.apiUrl = $apiUrl;
            manager.listName = $listName;
            manager.initList = function () {
                return $http.get(this.apiUrl).success(function ($listReceived) {
                    var i;
                    for (i = 0; i < $listReceived.length; i = i + 1) {
                        manager.editInfos.push({
                            $edit: false,
                            $details: false,
                            id: $listReceived[i]._id
                        });
                        manager.items.push($listReceived[i]);
                    }
                    socket.syncUpdates(manager.listName, manager.items, function (event, item, list, oldItem) {
                        if (event === "deleted") {
                            _.remove(manager.editInfos, {
                                id: item._id
                            });
                        } else if (event === "created") {
                            manager.editInfos.push({
                                $edit: false,
                                $details: false,
                                id: item._id
                            });
                        }
                    });
                });
            };
            manager.save = function ($item) {
                return $http.put(manager.apiUrl + $item._id, $item);
            };
            manager.saveNew = function ($item) {
                return $http.post(manager.apiUrl, $item);
            };
            manager.delete = function ($item) {
                return $http.delete(manager.apiUrl + $item._id);
            };
            manager.getInfos = function (id) {
                var i;
                for (i = 0; i < manager.editInfos.length; i = i + 1) {
                    if (manager.editInfos[i].id === id) {
                        return manager.editInfos[i];
                    }
                }
                return null;
            };
            manager.closeAll = function () {
                var i;
                for (i = 0; i < manager.editInfos.length; i = i + 1) {
                    manager.editInfos[i].$edit = false;
                    manager.editInfos[i].$details = false;
                }
            };
            manager.edit = function ($element) {
                var info = manager.getInfos($element._id),
                    editNew = !info.$edit;
                manager.closeAll();
                info.$edit = editNew;
                info.$details = false;
            };
            manager.show = function ($element) {
                var info = manager.getInfos($element._id),
                    detailsNew = !(info.$details || info.$edit);
                manager.closeAll();
                info.$edit = false;
                info.$details = detailsNew;
            };
            manager.unsyncUpdates = function () {
                socket.unsyncUpdates('malt');
            };

            return manager;
        };

        return {
            /** creation of a list manager */
            createListEditManager: ListEditManager
        };
    });
