function retsMapController($scope, $timeout, uiGmapGoogleMapApi, uiGmapIsReady, retsAPI, $location) {
    $scope.map = {
        center: {
            latitude: 43.6376107,
            longitude: -116.314943
        },
        zoom: 11,
        bounds: {},
        isDragging: false,
        shouldFit: false
        //show: false
    };
    
    $scope.loadedFromUrlFlag = false;
    
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
        idle: function(e) {
            if ($scope.map.isDragging) {
                return;
            }
            $timeout(function() {
                $scope.updateSideBar();
                
                console.log(e.bounds);
                
                var sendValue = [],
                        markers = [];
                        
                sendValue.push({
                    bound: 'Bounds',
                    name: e.bounds.northeast.latitude + ',' + e.bounds.northeast.longitude + ',' + e.bounds.southwest.latitude + ','
                    + e.bounds.southwest.longitude
                });
                
                $scope.lTypeNameArray.forEach(function(value, key) {
                        if (value.selected = true) {
                            if (value.filter == 'L_Type_' || value.filter == 'L_Keyword2' || value.filter == 'LM_Dec_3' ||
                                value.filter == 'L_City' || value.filter == 'L_SystemPrice' || value.filter == 'LM_int4_27' ||
                                value.filter == 'LM_Int4_1' || value.filter == "L_Remarks" || value.filter == 'L_Keyword1' ||
                                value.filter == 'L_ListingID' || value.filter == "Bounds" || value.filter == 'L_Zip') {
                                sendValue.push({
                                    filter: value.filter,
                                    name: value.name
                                });
                            }
                        }
                    });
                
                
                var searchVal = $location.search();

                if (searchVal.query && !$scope.loadedFromUrlFlag) {
                    $timeout(function() {
                        $scope.loadedFromUrlFlag = true;    
                    }, 3000);
                    
                    return;
                }
                
                retsAPI.get(sendValue).then(function(searchResult) {
                    //   searchResult.data.forEach(function(item) {
                    for (var i = 0, len = searchResult.data.length; i < len; i++) {
                        if (searchResult.data[i]['IMAGES']) {
                            searchResult.data[i]['L_AskingPrice'] = parseFloat(searchResult.data[i]['L_AskingPrice']).toFixed(0).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
                            searchResult.data[i]['ImageCount'] = searchResult.data[i].IMAGES.length;
                            markers.push(createMarker(searchResult.data[i]['L_ListingID'], searchResult.data[i]['LMD_MP_Latitude'], searchResult.data[i]['LMD_MP_Longitude'], searchResult.data[i]));
                        }
                    }

                    $scope.markers = markers;
                    $scope.markers_visible = markers;
                    $scope.markers_visible[0].events.mouseover();
                    $scope.myValue = "";
                });
            }, 200);
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
            show: true,
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
            if ($scope.loaded_from_url) {
                // retsAPI.default().success(function(result) {
                //     var i = 0;
                //     result.forEach(function(item) {
                //         markers.push(createMarker(item['L_ListingID'], item['LMD_MP_Latitude'], item['LMD_MP_Longitude'], item));
                //         i++;
                //     });
                //     $scope.markers = markers;
                //     $scope.markers_visible = markers;
                //     console.log("MARKERS: ", $scope.markers);
                // });
            }
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
