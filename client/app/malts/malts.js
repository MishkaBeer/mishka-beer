'use strict';

angular.module('mishkaBeerApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('malts', {
        url: '/malts',
        templateUrl: 'app/malts/malts.html',
        controller: 'MaltsCtrl'
      });
  });
