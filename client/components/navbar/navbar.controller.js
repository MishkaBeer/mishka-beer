'use strict';

angular.module('mishkaBeerApp')
  .controller('NavbarCtrl', function ($scope, $location, Auth, $translate) {
    $scope.menu = [{
      'title': 'nav-bar.home',
      'link': '/'
    },
    {
      'title': 'nav-bar.stock',
      'link': '/stock'
    },
    {
      'title': 'nav-bar.brewery',
      'link': '/brewery'
    },
    {
      'title': 'nav-bar.malts',
      'link': '/malts'
    },
    {
      'title': 'nav-bar.hops',
      'link': '/hops'
    }];

    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.logout = function() {
      Auth.logout();
      $location.path('/login');
    };

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });
