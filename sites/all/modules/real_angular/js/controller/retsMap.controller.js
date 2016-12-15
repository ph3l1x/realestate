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
            scrollwheel: false,
            streetViewControl: true,
            mapTypeControl: true,
            scaleControl: false,
            rotateControl: false,
            zoomControl: false,
            draggable: false,
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

    var createMarker = function(i, lat, long, item) {
        var ret = {
            latitude: lat,
            longitude: long,
            show: false,
            events: {
                mouseover: function(marker, eventName, model, args) {
                    $scope.window.show = true;
                    $scope.window.model = model;
                }
            }
        };

        ret['results'] = item;
        ret['id'] = i;
        return ret;
    };

    var markers = [];
    $scope.markers = [];
    uiGmapIsReady.promise()
        .then(function (instances) {
            // console.log(instances[0].map);
        })
        .then(function () {
            retsAPI.default().success(function(result) {
                var i = 0;
                   result.forEach(function(item) {
                       markers.push(createMarker(item['L_ListingID'], item['LMD_MP_Latitude'], item['LMD_MP_Longitude'], item ));
                   i++;
                });
                $scope.markers = markers;
                console.log("MARKERS: ", $scope.markers);
        });
    });

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
