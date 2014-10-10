'use strict';

angular.module('mishkaBeerApp')
  .controller('MaltsCtrl', function ($scope, $http, socket, $translate) {
    $scope.malts = [];
    $scope.newMalt = '';

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
        return 'et ben non';
    }

    this.getMaltTypes = function() { return this.MaltTypes; };
    this.getMashNecessary = function() { return this.MashNecessary; };

    $http.get('/api/malts').success(function(malts) {
      $scope.malts = malts;
      socket.syncUpdates('malt', $scope.malts);
    });

    $scope.addMalt = function($malt) {
      if($malt === '') {
        return false;
      }
      $http.post('/api/malts', $malt);
    };

    $scope.deleteMalt = function(malt) {
      $http.delete('/api/malts/' + malt._id);
    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('malt');
    });

  });
