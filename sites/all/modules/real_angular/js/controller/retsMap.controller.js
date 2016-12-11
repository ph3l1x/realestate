function retsMapController($scope, $rootScope, Nodes, Node, retsAPI, uiGmapGoogleMapApi) {

    console.log("FUCK OFF");
    $scope.map = {
        center: {
            latitude: -23.598763,
            longitude: -46.676547
        },
        zoom: 10,
        options: {
            streetViewControl: false,
            mapTypeControl: false,
            scaleControl: false,
            rotateControl: false,
            zoomControl: false
        }
    };

    uiGmapGoogleMapApi.then(function (maps) {
        // You can now merge your options which need google.map helpers
        angular.merge($scope.map, {
            options: {
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                zoomControlOptions: {
                    style: google.maps.ZoomControlStyle.LARGE,
                    position: google.maps.ControlPosition.LEFT_CENTER
                }
            }
        });
    });

    return['$scope', uiGmapGoogleMapApi];
    // $scope.retsFormChange = function() {
    //     retsAPI
    //         .get($scope.form)
    //         .then(function(result) {
    //             $scope.results = result;
    //             console.log("Result: ", result);
    //         })
    // }

}
