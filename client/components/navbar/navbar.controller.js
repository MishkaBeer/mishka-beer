'use strict';

angular.module('mishkaBeerApp')
    .controller('NavbarCtrl', function ($scope, $location, Auth, $translate) {
        $scope.menu = [
            {
                'title': 'nav-bar.home',
                'link': '/'
            },
            {
                'title': 'nav-bar.receipts',
                'type': 'dropDown',
                'link': '/receipts/',
                'sub': [
                    {
                        'title': 'nav-bar.subreceipts.list',
                        'link': '/receipts/list'
                    },
                    {
                        'title': 'nav-bar.subreceipts.new',
                        'link': '/receipts/edit'
                    }
                ]
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
            },
            {
                'title': 'nav-bar.yeasts',
                'link': '/yeasts'
            }
        ];

        $scope.isCollapsed = true;
        $scope.isLoggedIn = Auth.isLoggedIn;
        $scope.isAdmin = Auth.isAdmin;
        $scope.getCurrentUser = Auth.getCurrentUser;

        $scope.logout = function () {
            Auth.logout();
            $location.path('/login');
        };

        $scope.isActive = function (route, dropDown) {
            if (dropDown != undefined && dropDown) {
                return $location.path().startsWith(route);
            } else {
                return route === $location.path();
            }
        };
    });
