angular.module('mishkaBeerApp')
    .directive('maltedit', function() {
        function link(scope, element, attrs, ngCtrl) {
            scope.MaltTypes = ngCtrl.getMaltTypes();
            scope.MashNecessary = ngCtrl.getMashNecessary();
            scope.save = function() {
                //TODO gérer les erreurs
                scope.savefunction(scope.malt);
                if (scope.clearform) {
                    scope.malt = '';
                }
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
