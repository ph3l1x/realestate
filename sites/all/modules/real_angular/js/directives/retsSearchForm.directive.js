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
            },
                    queryGenerator = function(query) {
                        var sendValue = [],
                                markers = [];
                        query.forEach(function(value, key) {
                            if (value.selected = true) {
                                if (value.filter == 'L_Type_' || value.filter == 'Beds_') {
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
                                    for (var i = 0, len = searchResult.data.length; i < len; i++) {
                                        if (searchResult.data[i] ['IMAGES']) {
                                            searchResult.data[i]['L_AskingPrice'] = parseFloat(searchResult.data[i]['L_AskingPrice']).toFixed(0).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
                                            searchResult.data[i]['ImageCount'] = searchResult.data[i].IMAGES.length;
                                            markers.push(createMarker(searchResult.data[i]['L_ListingID'], searchResult.data[i]['LMD_MP_Latitude'], searchResult.data[i]['LMD_MP_Longitude'], searchResult.data[i]));
                                        }
                                    }
                                    scope.markers = markers;
                                });
                    };

            retsAPI.listingType().success(function(result) {
                scope.lTypes = result;
            });

            /* Default Values for Min and Max Price */
            scope.priceMinValue = parseFloat(200000).toFixed(0).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
            scope.priceMaxValue = parseFloat(500000).toFixed(0).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
            scope.priceMinValueSmall = scope.priceMinValue.slice(0, -4);
            scope.priceMaxValueSmall = scope.priceMaxValue.slice(0, -4);
            
            scope.lTypeNameArray = [];
            scope.typeSave = function() {
                scope.lTypeNameArray = scope.lTypes.filter(function(type) {
                    return type.selected;
                });
                queryGenerator(scope.lTypeNameArray);
            };
            
            scope.bedding = '';
            scope.beddingSave = function(bedding) {
                scope.bedding = bedding;

				console.log(scope.lTypeNameArray.length);
				for(var i = 0, len = scope.lTypeNameArray.length; i < len;  i++) {
					//alert(scope.lTypeNameArray[ i ].filter);
					if( scope.lTypeNameArray[ i ].filter == "Beds_" ){
	
						scope.lTypeNameArray.splice(i, 1);
						
					}
						
				}
		
                scope.lTypeNameArray.push({
                                        filter: 'Beds_',
                                        name: bedding,
                                        selected : true
                                    });
                queryGenerator(scope.lTypeNameArray);
            }
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
