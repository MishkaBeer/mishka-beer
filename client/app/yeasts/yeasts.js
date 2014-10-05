'use strict';

angular.module('mishkaBeerApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('yeasts', {
        url: '/yeasts',
        templateUrl: 'app/yeasts/yeasts.html',
        controller: 'YeastsCtrl'
      });
  });
