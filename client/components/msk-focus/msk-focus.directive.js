angular.module('mishkaBeerApp')
    .directive('mskfocus', [
        function () {
            function link(scope, element, attrs, ngCtrl) {
                scope.$watch('mskfocus', function (autofocus) {
                    if (autofocus)
                        setTimeout(function () {
                            element.focus();
                            element.select();
                        }, 0)
                })
            };
            return {
                restrict: 'A',
                scope: {
                    mskfocus: '='
                },
                link: link
            }
}])
