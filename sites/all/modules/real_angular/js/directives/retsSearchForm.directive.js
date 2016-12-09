function retsSearchFormDirective(retsAPI) {
    return {
        restrict: 'A',
        replace: true,
        transclude: true,
        templateUrl: '/sites/all/modules/real_angular/themes/search_form.html',
        link: {},
     //   scope: { "results" : "=" },
        controller: function($scope, $element) {
            $scope.retsFormChange = function() {
                retsAPI
                    .get($scope.form)
                    .then(function(result) {
                        $scope.results = result;
                   //     $scope.photoCount = result.photos.length;
                    //    console.log("PHOTOS: ", result.photos);
                        console.log("RESULTS: ", result);
                    })
            }
        }
    }
}
