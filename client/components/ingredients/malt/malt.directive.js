angular.module('mishkaBeerApp')
    .directive('maltedit', function() {
        function link(scope, element, attrs, ngCtrl) {
            scope.MaltTypes = ngCtrl.getMaltTypes();
            scope.MashNecessary = ngCtrl.getMashNecessary();
            scope.initdata = angular.copy(scope.malt);

            scope.malt.$alert = false;

            scope.save = function($editForm) {
                if ($editForm.$valid) {
                    scope.savefunction(scope.malt).error(function() {
                        scope.malt.$alert = true;
                    });
                    if (scope.clearform) {
                        scope.malt = {
                            "$edit" : true
                        }
                    }
                }
                scope.initdata =  angular.copy(scope.malt);
            }

            scope.maltModified = function() {
                return !angular.equals(scope.malt, scope.initdata);
            }

            scope.resetData = function() {
                for (var name in scope.initdata) {
                    if (name.indexOf("$") != 0 && name.indexOf("_") != 0) {
                        scope.malt[name] = scope.initdata[name];
                    }
                }
            }

            scope.$on('$destroy', function () {
              scope.resetData();
            });

        }
        return {
            templateUrl: '../components/ingredients/malt/maltedit.html',
            restrict: 'EA',
            require: "^ngController",
            scope: {
                savefunction: '=',
                malt: "=",
                clearform: "="
            },
            link : link
        };
    });
