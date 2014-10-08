angular.module('mishkaBeerApp')
    .controller('Controller', ['$scope', function($scope) {

    }]).directive('maltedit', function() {
        function link(scope, element, attrs) {

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
            scope: {
                savefunction: '=',
                malt: "=",
                clearform: "="
            },
            link : link
        };
    });
