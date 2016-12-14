function retsSearchResultsDirective(retsAPI) {
    return {
        restrict: 'A',
        templateUrl: '/sites/all/modules/real_angular/themes/search_results.html',
        replace: true,
        link: function (scope, element) {

            scope.retsFormChange = function() {
                retsAPI
                    .get(scope.form)
                    .then(function(result) {
                        scope.results = result.data;
                        scope.marker = {
                            coords: {
                                latitude: 43.5926449,
                                longitude: -116.348655
                            },
                            options: {
                                draggable: true
                            },
                            id: 0
                        }
                    })
            }
        }
    }
}