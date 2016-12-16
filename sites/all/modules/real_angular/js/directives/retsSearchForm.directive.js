function retsSearchFormDirective(retsAPI) {
    return {
        restrict: 'A',
        replace: true,
        transclude: true,
        templateUrl: '/sites/all/modules/real_angular/themes/search_form.html',
        link: function(scope, element, attrs) {

            var query = [],
                createMarker = function(i, lat, long, item) {
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
            },
            queryGenerator = function(query) {
                var sendValue = [],
                    markers = [];
                console.log('QUERY', query);
                query.forEach(function(value, key) {
                    if(value.selected = true){
                        if(value.filter == 'L_Type_') {
                            sendValue.push({
                                filter: value.filter,
                                name: value.name
                            });
                        }
                    }
                });
                retsAPI
                   .get(sendValue)
                   .then(function(searchResult) {
                     //   searchResult.data.forEach(function(item) {
                       for(var i = 0, len = searchResult.data.length; i < len; i++) {
                            if(searchResult.data[i] ['IMAGES']) {
                                console.log("ITEMZ:", searchResult.data[i]);
                                searchResult.data[i]['L_AskingPrice'] = parseFloat(searchResult.data[i]['L_AskingPrice']).toFixed(0).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
                                searchResult.data[i]['ImageCount'] = searchResult.data[i].IMAGES.length;
                                markers.push(createMarker(searchResult.data[i]['L_ListingID'], searchResult.data[i]['LMD_MP_Latitude'], searchResult.data[i]['LMD_MP_Longitude'], searchResult.data[i]));
                            }
                        }
                       scope.markers = markers;
                   });
                console.log("sendValue", sendValue);
            };

            retsAPI.listingType().success(function (result) {
                scope.lTypes = result;
                console.log("RSF Result", scope.lTypes);
            });

            scope.lTypeNameArray = [];
            scope.typeSave = function() {
                scope.lTypeNameArray = scope.lTypes.filter(function(type) {
                   return type.selected;
                });
                queryGenerator(scope.lTypeNameArray);
            };

            // scope.typeSearch = function(key, value) {
            //     var sendValue = [];
            //     var markers = [];
            //     sendValue.push({
            //         key: key,
            //         value: value
            //     });
            //     console.log("SENDVALUE", sendValue);
            //    retsAPI
            //        .get(sendValue)
            //        .then(function(searchResult) {
            //            console.log("searchResult", searchResult);
            //             searchResult.data.forEach(function(item) {
            //                 markers.push(createMarker(item['L_ListingID'], item['LMD_MP_Latitude'], item['LMD_MP_Longitude'], item ));
            //             });
            //            scope.markers = markers;
            //        })
            // }
        },
        controller: function($scope, $element) {
            // $scope.retsFormChange = function() {
            //     retsAPI
            //         .get($scope.form)
            //         .then(function(result) {
            //             $scope.results = result;
            //
            //         })
            // }
        }
    }
}
