angular.module('mishkaBeerApp')
    .directive('maltedit', function () {
        function link(scope, element, attrs, ngCtrl) {

            scope.resetData = function () {
                if (scope.malt == undefined) {
                    scope.editdata = {};
                } else {
                    scope.editdata = angular.copy(scope.malt);
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

            scope.maltModified = function () {
                if (scope.malt == undefined) {
                    return !angular.equals({}, scope.editdata);
                } else {
                    return !angular.equals(scope.malt, scope.editdata);
                }
            }

            scope.MaltTypes = [
                {
                    code: "malt",
                    name: "entities.malt.type.values.malt"
        },
                {
                    code: "raw",
                    name: "entities.malt.type.values.raw"
        },
                {
                    code: "sugar",
                    name: "entities.malt.type.values.sugar"
        }
    ];

            scope.MashNecessary = [
                {
                    code: true,
                    name: "entities.malt.mash.values.true"
        },
                {
                    code: false,
                    name: "entities.malt.mash.values.false"
        }
    ];


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
    });
