function retsMapController($scope, $timeout, uiGmapGoogleMapApi, uiGmapIsReady, retsAPI) {
    $scope.map = {
        center: {
            latitude: 43.6376107,
            longitude: -116.314943
        },
        zoom: 100,
        bounds: {},
        //show: false
    };
    
    $scope.mapObj= {};
    
    $scope.updateSideBar = function() {
        $scope.markers_visible = [];
            
        for (var i = 0; i < $scope.markers.length; i++) {
          if ($scope.map.bounds.southwest.latitude < $scope.markers[i].latitude && $scope.markers[i].latitude < $scope.map.bounds.northeast.latitude && $scope.map.bounds.southwest.longitude < $scope.markers[i].longitude && $scope.markers[i].longitude< $scope.map.bounds.northeast.longitude) {
            $scope.markers_visible.push($scope.markers[i]);
          }
        }    
    };
    
    $scope.events = {
        bounds_changed: function(e) {
            $timeout(function() {
                $scope.updateSideBar();
                
            }, 1000);
        }
    };

    $scope.options = {
        scrollwheel: true,
        streetViewControl: false,
        mapTypeControl: true,
        scaleControl: true,
        rotateControl: false,
        zoomControl: false,
        draggable: true,
    };



    $scope.addOnClick = function() {
        console.log(this);
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
    var markers_visible = [];
    $scope.markers = [];
    $scope.markers_visible = [];
    uiGmapIsReady.promise()
        .then(function(instances) {
            // console.log(instances[0].map);
        })
        .then(function() {
            retsAPI.default().success(function(result) {
                var i = 0;
                result.forEach(function(item) {
                    markers.push(createMarker(item['L_ListingID'], item['LMD_MP_Latitude'], item['LMD_MP_Longitude'], item));
                    i++;
                });
                $scope.markers = markers;
                $scope.markers_visible = markers;
                console.log("MARKERS: ", $scope.markers);
            });
        });

    uiGmapGoogleMapApi.then(function(maps) {
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

    $scope.names = ["john", "bill", "charlie", "robert", "alban", "oscar", "marie", "celine", "brad", "drew", "rebecca", "michel", "francis", "jean", "paul", "pierre", "nicolas", "alfred", "gerard", "louis", "albert", "edouard", "benoit", "guillaume", "nicolas", "joseph"];
}
