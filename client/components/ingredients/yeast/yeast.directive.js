angular.module('mishkaBeerApp')
    .directive('yeastedit', function() {
        function link(scope, element, attrs, ngCtrl) {
            scope.initdata = angular.copy(scope.yeast);

            scope.yeast.$alert = false;

            scope.save = function($editForm) {
                if ($editForm.$valid) {
                    scope.savefunction(scope.yeast).error(function() {
                        scope.yeast.$alert = true;
                    });
                    if (scope.clearform) {
                        scope.yeast = {
                            "$edit" : true
                        }
                    }
                }
                scope.initdata =  angular.copy(scope.yeast);
            }

            scope.yeastModified = function() {
                return !angular.equals(scope.yeast, scope.initdata);
            }

            scope.resetData = function() {
                for (var name in scope.initdata) {
                    if (name.indexOf("$") != 0 && name.indexOf("_") != 0) {
                        console.log(scope.initdata[name]);
                        scope.yeast[name] = scope.initdata[name];
                    }
                }
            }

            scope.$on('$destroy', function () {
                scope.resetData();
            });

        }
        return {
            templateUrl: '../components/ingredients/yeast/yeastedit.html',
            restrict: 'EA',
            require: "^ngController",
            scope: {
                savefunction: '=',
                yeast: "=",
                clearform: "="
            },
            link : link
        };
    });
