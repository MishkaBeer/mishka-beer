'use strict';

angular.module('mishkaBeerApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('receipts-list', {
        url: '/receipts/list',
        templateUrl: 'app/receipts/receipts-list/receipts-list.html',
        controller: 'ReceiptsListCtrl'
      });
  });
