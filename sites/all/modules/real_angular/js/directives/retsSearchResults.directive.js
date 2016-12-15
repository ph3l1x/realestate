function retsSearchResultsDirective() {
    return {
        restrict: 'A',
        templateUrl: '/sites/all/modules/real_angular/themes/search_results.html',
        replace: false,
        link: function (scope, element, attrs) {

            // scope.retsFormChange = function() {
            //     retsAPI
            //         .get(scope.form)
            //         .then(function(result) {
            //             scope.results = result.data;
            //             scope.marker = {
            //                 coords: {
            //                     latitude: 43.5926449,
            //                     longitude: -116.348655
            //                 },
            //                 options: {
            //                     draggable: true
            //                 },
            //                 id: 0
            //             }
            //         })
            // }
        }
    }
}