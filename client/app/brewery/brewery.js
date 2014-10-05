'use strict';

angular.module('mishkaBeerApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('brewery', {
        url: '/brewery',
        templateUrl: 'app/brewery/brewery.html',
        controller: 'BreweryCtrl'
      });
  });
