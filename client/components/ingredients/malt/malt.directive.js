angular.module('mishkaBeerApp')
    .directive('maltedit', function() {
        function link($scope, element, attrs, ngCtrl) {
            $scope.MaltTypes = ngCtrl.getMaltTypes();
            $scope.MashNecessary = ngCtrl.getMashNecessary();
            $scope.editinfo = ngCtrl.getInfos($scope.malt._id);

            console.log("EditInfo " + $scope.editinfo);
            console.log("Malt " + $scope.malt);

/*            scope.MaltTypes = ngCtrl.getMaltTypes();
            scope.MashNecessary = ngCtrl.getMashNecessary();

            scope.editdata = angular.copy(scope.malt);
            scope.initdata = angular.copy(scope.malt);

            scope.save = function($editForm) {
                if ($editForm.$valid) {
                    scope.savefunction(scope.editdata)
                    .success(function() {
                        // success message
                        var message = {
                            type : "success",
                            text : "entities.actions.save.savesuccess",
                            title: "entities.actions.save.saveimpossible"
                        }
                        scope.editinfo.$messages.push(message);
                        scope.initdata =  angular.copy(scope.editdata);
                    })
                    .error(function() {
                        scope.$alert = true;
                    });
                    if (scope.clearform) {
                        scope.editdata = {
                        }
                    }
                }

            }

            scope.maltModified = function() {
                return !angular.equals(scope.initdata, scope.editdata);
            }

            scope.resetData = function() {
                scope.editdata = angular.copy(scope.initdata);
            }

            scope.$on('$destroy', function () {
               scope.resetData();
            });
            */

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
