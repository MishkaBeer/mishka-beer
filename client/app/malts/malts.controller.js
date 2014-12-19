'use strict';

angular.module('mishkaBeerApp')
  .controller('MaltsCtrl', function ($scope, $http, socket, $translate) {

    //
    // generic management of entities
    //

    $scope.editInfos = []; // array of entities infos.

    /**
     * Return infos for an element.
     *
     * @param {Integer} id
     */
    $scope.getInfos = function(id) {
        for (var i in $scope.editInfos) {
            if ($scope.editInfos[i].id == id) {
                return $scope.editInfos[i];
            }
        }
        return null;
    }

    this.getInfos = function(id) {

        return $scope.getInfos(id);
    };

    $scope.edit = function($element) {
        var info = $scope.getInfos($element._id);
        info.$edit = true;
        info.$details = false;
    }

    $scope.show = function($element) {
        var info = $scope.getInfos($element._id);
        info.$edit = false;
        info.$details = true;
    }

    $scope.updateInfos = function($elements) {
        console.log("updateInfos");
        for (var i in $elements) {
             var oldItem = $scope.getInfos($elements[i]._id);
            // test if oldItem is null or not, create.
            if (!oldItem) {
                $scope.editInfos.push({$edit : false, id : $elements[i]._id});
            }
            $elements[i].
        }
    }


    //
    // Specific malts management
    //

    $scope.malts = [];

    $scope.MaltTypes = [
        {
            code : "malt",
            name : "entities.malt.type.values.malt"
        },
        {
            code : "raw",
            name : "entities.malt.type.values.raw"
        },
        {
            code : "sugar",
            name : "entities.malt.type.values.sugar"
        }
    ];

    $scope.MashNecessary = [
        {
            code : true,
            name : "entities.malt.mash.values.true"
        },
        {
            code : false,
            name : "entities.malt.mash.values.false"
        }
    ]

    $scope.getNameMaltType = function($code){
        for(var i in $scope.MaltTypes) {
            if ($scope.MaltTypes[i].code === $code) {
                return $scope.MaltTypes[i].name;
            }
        }
    }

    this.getMaltTypes = function() { return $scope.MaltTypes; };
    this.getMashNecessary = function() { return $scope.MashNecessary; };

    //
    // Malts services
    //
    $http.get('/api/malts')
        .success(
            function(malts) {
                $scope.malts = malts;
                $scope.updateInfos(malts);
            })
        .error(function(malts) {
            $scope.errorGetList = false;
        }
    );

    $scope.saveMalt = function($malt) {
        if ($malt._id != null) {
            // update
            return $http.put('/api/malts/' + $malt._id, $malt);
        } else {
            // create
            return $http.post('/api/malts', $malt);
        };
    };

    $scope.deleteMalt = function(malt) {
      $http.delete('/api/malts/' + malt._id);
    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('malt');
    });

  });
