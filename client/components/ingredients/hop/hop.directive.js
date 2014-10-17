angular.module('mishkaBeerApp')
    .directive('hopedit', function() {
        function link(scope, element, attrs, ngCtrl) {
            scope.initdata = angular.copy(scope.hop);

            scope.hop.$alert = false;

            scope.save = function($editForm) {
                if ($editForm.$valid) {
                    scope.savefunction(scope.hop).error(function() {
                        scope.hop.$alert = true;
                    });
                    if (scope.clearform) {
                        scope.hop = {
                            "$edit" : true
                        }
                    }
                }
                scope.initdata =  angular.copy(scope.hop);
            }

            scope.hopModified = function() {
                return !angular.equals(scope.hop, scope.initdata);
            }

            scope.resetData = function() {
                for (var name in scope.initdata) {
                    if (name.indexOf("$") != 0 && name.indexOf("_") != 0) {
                        scope.hop[name] = scope.initdata[name];
                    }
                }
            }
        }
        return {
            templateUrl: '../components/ingredients/hop/hopedit.html',
            restrict: 'EA',
            require: "^ngController",
            scope: {
                savefunction: '=',
                hop: "=",
                clearform: "="
            },
            link : link
        };
    });
