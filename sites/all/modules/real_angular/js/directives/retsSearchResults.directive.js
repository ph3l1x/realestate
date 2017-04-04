function retsSearchResultsDirective() {
    return {
        restrict: 'A',
        templateUrl: '/sites/all/modules/real_angular/themes/search_results.html',
        replace: false,
        link: function (scope, element, attrs) {
            
            scope.hoverElement = function hoverElement(result) {
                scope.window.model = result;
                result.show = true;
            };
            var selector = document.getElementById('agent-details');
            scope.email = selector.getAttribute('data-email');
            scope.agentNID = selector.getAttribute('data-agentNID');
            scope.agentPicture = selector.getAttribute('data-agentPicture');
            scope.title = selector.getAttribute('data-title');
            scope.agentMID = selector.getAttribute('data-agentMID');
            scope.facebook = selector.getAttribute('data-facebook');
            scope.phone = selector.getAttribute('data-phone');
            
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