'use strict';

angular.module('mishkaBeerApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('hops', {
        url: '/hops',
        templateUrl: 'app/hops/hops.html',
        controller: 'HopsCtrl'
      });
  });
