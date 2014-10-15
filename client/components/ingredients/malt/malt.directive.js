angular.module('mishkaBeerApp')
    .directive('maltedit', function() {
        function link(scope, element, attrs, ngCtrl) {
            scope.MaltTypes = ngCtrl.getMaltTypes();
            scope.MashNecessary = ngCtrl.getMashNecessary();
            scope.initdata = angular.copy(scope.malt);

            scope.save = function() {
                //TODO gérer les erreurs
                scope.savefunction(scope.malt);
                if (scope.clearform) {
                    scope.malt = {
                        "edit" : true
                    }
                }
                scope.initdata = scope.malt;
            }

            scope.saveIsActive = function() {
                return !angular.equals(scope.malt, scope.initdata);
            }

            scope.resetData = function() {
                scope.malt = angular.copy(scope.initdata);
            }
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
