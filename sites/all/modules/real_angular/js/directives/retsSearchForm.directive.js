function retsSearchFormDirective(retsAPI) {
    return {
        restrict: 'A',
        replace: true,
        transclude: true,
        templateUrl: '/sites/all/modules/real_angular/themes/search_form.html',
        link: function(scope, element, attrs) {

            var createMarker = function(i, lat, long, item) {
                var ret = {
                    latitude: lat,
                    longitude: long,
                    show: false,
                    events: {
                        mouseover: function(marker, eventName, model, args) {
                            scope.window.show = true;
                            scope.window.model = model;
                        }
                    }
                };

                ret['results'] = item;
                ret['id'] = i;
                return ret;
            };

            retsAPI.listingType().success(function (result) {
                scope.lType = result;
                console.log("RSF Result", scope.lType);
            });

            scope.typeSearch = function(key, value) {
                var sendValue = [];
                var markers = [];
                sendValue.push({
                    key: key,
                    value: value
                });
                console.log("SENDVALUE", sendValue);
               retsAPI
                   .get(sendValue)
                   .then(function(searchResult) {
                       console.log("searchResult", searchResult);
                        searchResult.data.forEach(function(item) {
                            markers.push(createMarker(item['L_ListingID'], item['LMD_MP_Latitude'], item['LMD_MP_Longitude'], item ));
                        });
                       scope.markers = markers;
                   })
            }
        },
        controller: function($scope, $element) {
            $scope.retsFormChange = function() {
                retsAPI
                    .get($scope.form)
                    .then(function(result) {
                        $scope.results = result;

                    })
            }
        }
    }
}
