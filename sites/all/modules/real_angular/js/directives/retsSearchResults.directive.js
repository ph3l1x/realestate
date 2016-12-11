function retsSearchResultsDirective(retsAPI) {
    return {
        restrict: 'A',
        templateUrl: '/sites/all/modules/real_angular/themes/search_results.html',
        replace: false,
        link: function (scope, element) {

            scope.retsFormChange = function() {
                retsAPI
                    .get(scope.form)
                    .then(function(result) {
                        scope.results = result.data;
                    })
            }
        }
    }
}