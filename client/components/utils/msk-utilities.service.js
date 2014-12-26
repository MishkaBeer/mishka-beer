angular.module("mishkaBeerApp").factory("$mskUtilities",
    function ($http, socket) {

        createListEditManagerFct = function ($apiUrl, $listName) {
            return {
                items: [],
                editInfos: [],
                apiUrl: $apiUrl,
                listName: $listName,
                initList: function () {
                    listItems = this.items;
                    name = this.listName;
                    return $http.get(this.apiUrl).success(function ($listReceived) {
                        this.editInfos = [];
                        for (var i = 0; i < $listReceived.length; i++) {
                            this.editInfos.push({
                                $edit: false,
                                $details: false,
                                id: $listReceived[i]._id
                            });
                            this.listItems.push($listReceived[i]);
                        }
                        socket.syncUpdates(this.name, this.listItems, function (event, item, list, oldItem) {
                            if (event === "deleted") {
                                _.remove(this.editInfos, {
                                    id: item._id
                                });
                            } else if (event === "created") {
                                this.editInfos.push({
                                    $edit: false,
                                    $details: false,
                                    id: item._id
                                });
                            }
                        });
                    })
                },
                save: function ($item) {
                    return $http.put(this.apiUrl + $item._id, $item);
                },
                saveNew: function ($item) {
                    return $http.post(this.apiUrl, $item);
                },
                delete: function ($item) {
                    return $http.delete(this.apiUrl + $item._id);
                },
                getInfos: function (id) {
                    for (var i in editInfos) {
                        if (editInfos[i].id == id) {
                            return editInfos[i];
                        }
                    }
                    return null;
                },
                closeAll: function () {
                    for (var i = 0; i < editInfos.length; i++) {
                        editInfos[i].$edit = false;
                        editInfos[i].$details = false;
                    }
                },
                edit: function ($element) {
                    var info = this.getInfos($element._id);
                    var editNew = !info.$edit;
                    this.closeAll();
                    info.$edit = editNew;
                    info.$details = false;
                },
                show: function ($element) {
                    var info = this.getInfos($element._id);
                    var detailsNew = !(info.$details || info.$edit);
                    this.closeAll();
                    info.$edit = false;
                    info.$details = detailsNew;
                },
                unsyncUpdates: function () {
                    socket.unsyncUpdates('malt');
                }
            }
        };

        return {
            /** creation of a list manager */
            createListEditManager: createListEditManagerFct
        };
    }
);
