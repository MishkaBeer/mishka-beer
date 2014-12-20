angular.module('mishkaBeerApp')
    .directive('hopedit', function () {
        function link(scope, element, attrs, ngCtrl) {

            scope.resetData = function () {
                if (scope.hop == undefined) {
                    scope.editdata = {};
                } else {
                    scope.editdata = angular.copy(scope.hop);
                }
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

            scope.hopModified = function () {
                if (scope.hop == undefined) {
                    return !angular.equals({}, scope.editdata);
                } else {
                    return !angular.equals(scope.hop, scope.editdata);
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
                clearform: "=",
                edit: "="
            },
            link: link
        };
    });
