function retsMapController($scope, uiGmapGoogleMapApi, uiGmapIsReady, retsAPI) {
    $scope.map = {
        center: {
            latitude: 43.6376107,
            longitude: -116.314943
        },
        zoom: 10,
        bounds: {},
        show: false
    };

    $scope.options = {
            scrollwheel: true,
            streetViewControl: false,
            mapTypeControl: false,
            scaleControl: false,
            rotateControl: false,
            zoomControl: false
    };
    $scope.windowOptions = {
        content: 'This is some fucking shit',
        zIndex: 999
    };

    $scope.window = {
        model: [],
        show: false,
        options: {
            pixelOffset: {
                width: -1,
                height: -20
            }
        }
    };

    var createMarker = function(i, lat, long) {
        var ret = {
            latitude: lat,
            longitude: long,
            title: 'bitch tits-' + i,
            text: 'lalalala',
            show: false,
            events: {
                mouseover: function(marker, eventName, model, args) {
                    console.log("DADDY", args);
                    $scope.window.show = true;
                    $scope.window.model = model;
                }
            }
        };
        // ret.onClick = function() {
        //     console.log("clicked");
        //     ret.show = !ret.show;
        //     $scope.$apply();
        // };
        ret['id'] = i;
        return ret;
    };

    var markers = [];
    $scope.markers = [];
    uiGmapIsReady.promise()
        .then(function (instances) {
            console.log(instances[0].map);
        })
        .then(function () {
            retsAPI.default().success(function(result) {
                $scope.results = result;
                var i = 0;
                   result.forEach(function(item) {
                       markers.push(createMarker(item['L_ListingID'], item['LMD_MP_Latitude'], item['LMD_MP_Longitude'] ));
                   i++;
                });
                $scope.markers = markers;
                console.log("MARKERS: ", $scope.markers);
                console.log("MAP: ", $scope.map);
        });
    });

    // $scope.markersEvents = {
    //     mouseover: function(gMarker, eventName, model) {
    //         model.show = true;
    //         $scope.$apply();
    //     }
    // };

    $scope.windowOptions = {
        visible: false
    };
    $scope.onClick = function() {
        $scope.windowOptions.visible = !$scope.windowOptions.visible;
    };

    uiGmapGoogleMapApi.then(function (maps) {
        angular.extend($scope.map, {
            options: {
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                zoomControlOptions: {
                    style: google.maps.ZoomControlStyle.LARGE,
                    position: google.maps.ControlPosition.LEFT_CENTER
                }
            }
        });
    });

}
