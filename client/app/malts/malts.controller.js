'use strict';

angular.module('mishkaBeerApp')
  .controller('MaltsCtrl', function ($scope, $http, socket, $translate) {
    $scope.malts = [];
    $scope.newMalt = {
        "edit" : true
    };
    $scope.newMaltClass = "";
    $scope.currentMaltInList = null;

    $scope.editMalt = function($malt) {
        if ($scope.currentMaltInList != $malt || $malt.details) {
            $scope.currentMaltInList = $malt;
            $malt.edit = true;
            $malt.details = false;
        } else {
            $malt.edit = false;
            $malt.details = false;
            $scope.currentMaltInList = null;
        }
    }

    $scope.showMalt = function($malt) {
        if ($scope.currentMaltInList != $malt || $malt.edit) {
            $scope.currentMaltInList = $malt;
            $malt.edit = false;
            $malt.details = true;
        } else {
            $malt.edit = false;
            $malt.details = false;
            $scope.currentMaltInList = null;
        }
    }

    $scope.changeShowNewMalt = function() {
        if ( $scope.newMaltClass === "") {
            $scope.newMaltClass = "in";
        } else {
            $scope.newMaltClass = "";
        }
    }

     // value range for malt types
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

    $http.get('/api/malts').success(function(malts) {
/*         for(var i in $scope.malts) {
            console.log("trouvé avec edit");
            if ($scope.malts[i].edit) {
                console.log("trouvé avec edit");
                for(var j in malts) {
                    if (malts[j]._id === $scope.malts[i]._id) {
                        console.log("trouvé même id");
                        malts[j].edit=true;
                        return;
                    }
                }
            }
        }*/
      $scope.malts = malts;

      socket.syncUpdates('malt', $scope.malts, function(event, item, list, oldItem) {
        if (oldItem.edit) {
            item.edit = true;
        }
      });
    });

    $scope.saveMalt = function($malt) {
      if($malt === '') {
        return false;
      }
      if ($malt._id != null) {
        $http.put('/api/malts/' + $malt._id, $malt);
      } else {
        $http.post('/api/malts', $malt);
      };
    };

    $scope.deleteMalt = function(malt) {
      $http.delete('/api/malts/' + malt._id);
    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('malt');
    });

  });
