angular.module('mishkaBeerApp')
    .directive('maltedit', ['$mskConstants', function ($mskConstants) {
        function link(scope, element, attrs, ngCtrl) {

            scope.$mskConstants = $mskConstants;

            if (scope.malt == undefined) {
                scope.maltOriginal = {
                    ebc: null,
                    maxuse: null,
                    maxyield: null
                };
            } else {
                scope.maltOriginal = scope.malt;
            }

            scope.resetData = function () {
                scope.editdata = angular.copy(scope.maltOriginal);
            }

            scope.resetData();

            scope.save = function ($editForm) {
                if ($editForm.$valid) {
                    scope.savefunction(scope.editdata);
                    if (scope.clearform) {
                        scope.editdata = {}
                        scope.edit = true;
                    }
                }
            }

            scope.maltModified = function () {
                return !angular.equals(scope.maltOriginal, scope.editdata);
            }

        }
        return {
            templateUrl: '../components/ingredients/malt/maltedit.html',
            restrict: 'EA',
            require: "^ngController",
            scope: {
                savefunction: '=',
                malt: "=",
                clearform: "=",
                edit: "="
            },
            link: link
        };
    }]);
