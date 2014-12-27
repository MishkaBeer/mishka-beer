'use strict';

angular.module('mishkaBeerApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('receipts-edit', {
        url: '/receipts/edit',
        templateUrl: 'app/receipts/receipts-edit/receipts-edit.html',
        controller: 'ReceiptsEditCtrl'
      });
  });
