'use strict';

angular.module('mishkaBeerApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'btford.socket-io',
  'ui.router',
  'ngGrid',
  'ui.bootstrap',
  'pascalprecht.translate',
  'ngAnimate'
])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider, $translateProvider) {

    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
    $httpProvider.interceptors.push('authInterceptor');

    $translateProvider.useStaticFilesLoader({
            prefix: '/i18n/',
            suffix: '.json'
        });

    $translateProvider.determinePreferredLanguage(function () {
        if (navigator.language.lastIndexOf("fr", 0) === 0) {
            return "fr";
        } else {
            return "en";
        }
    });

  })

  .factory('authInterceptor', function ($rootScope, $q, $cookieStore, $location) {
    return {
      // Add authorization token to headers
      request: function (config) {
        config.headers = config.headers || {};
        if ($cookieStore.get('token')) {
          config.headers.Authorization = 'Bearer ' + $cookieStore.get('token');
        }
        return config;
      },

      // Intercept 401s and redirect you to login
      responseError: function(response) {
        if(response.status === 401) {
          $location.path('/login');
          // remove any stale tokens
          $cookieStore.remove('token');
          return $q.reject(response);
        }
        else {
          return $q.reject(response);
        }
      }
    };
  })

  .run(function ($rootScope, $location, Auth) {
    // Redirect to login if route requires auth and you're not logged in
    $rootScope.$on('$stateChangeStart', function (event, next) {
      Auth.isLoggedInAsync(function(loggedIn) {
        if (next.authenticate && !loggedIn) {
          $location.path('/login');
        }
      });
    });
  }).factory('messagingService', function () {
    var service = {};
    service.error = "";
    service.info = "";
    service.warning = "";
    service.displayError = function (error) {
        service.error = error;
    }
    service.displaySystemError = function () {
        service.error = "common.errors.system";
    }
    service.displayInfo = function (info) {
        service.info = info;
    }
    return service;
});

