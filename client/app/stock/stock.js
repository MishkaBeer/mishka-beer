'use strict';

angular.module('mishkaBeerApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('stock', {
        url: '/stock',
        templateUrl: 'app/stock/stock.html',
        controller: 'StockCtrl'
      });
  });
