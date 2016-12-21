function retsSearchFormDirective(retsAPI) {
    return {
        restrict: 'A',
        replace: true,
        transclude: true,
        templateUrl: '/sites/all/modules/real_angular/themes/search_form.html',
        link: function(scope, element, attrs) {
			scope.lTypeNameArray = [];
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
                                if (value.filter == 'L_Type_' || value.filter == 'L_Keyword2' || value.filter == 'LM_Dec_3' || value.filter == 'L_City' || value.filter == 'L_SystemPrice') {
                                    sendValue.push({
                                        filter: value.filter,
                                        name: value.name
                                    });
                                }
                            }
                        });
						//alert(sendValue);
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
			
/*             retsAPI.citiesList().success(function(result) {
                scope.cities = result;
            }); */

            /* Default Values for Min and Max Price */
            scope.priceMinValue = parseFloat(200000).toFixed(0).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
            scope.priceMaxValue = parseFloat(500000).toFixed(0).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
            scope.priceMaxValueWithoutFormat = 500000;
            scope.priceMinValueWithoutFormat = 200000;
            scope.priceMinValueSmall = scope.priceMinValue.slice(0, -4);
            scope.priceMaxValueSmall = scope.priceMaxValue.slice(0, -4);
			
			scope.myValue = '';
			
			scope.myFunc = function() {
				retsAPI.customSearch(scope.myValue).success(function(result) {
					scope.search = result;
				});
			};			
            
            
            scope.typeSave = function() {
                scope.lTypeNameArray = scope.lTypes.filter(function(type) {
                    return type.selected;
                });
				
				if(scope.bedding){
					scope.lTypeNameArray.push({
											filter: scope.column,
											name: scope.bedding,
											selected : true
										});
				}
				if(scope.isPriceSet){
					scope.lTypeNameArray.push({
										filter: 'L_SystemPrice',
										name: scope.priceMinValueWithoutFormat+"-"+scope.priceMaxValueWithoutFormat,
										selected : true
									});					
				}
                queryGenerator(scope.lTypeNameArray);
            };
			
			scope.isPriceSet = 0;
			
			scope.priceSave = function(min,max) {
				scope.isPriceSet = 1;
				scope.priceMinValueWithoutFormat = min;
				scope.priceMaxValueWithoutFormat = max;
				
				//alert(min);
				scope.priceMinValueSmall = parseFloat(min).toFixed(0).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,").slice(0, -4);
				scope.priceMaxValueSmall = parseFloat(max).toFixed(0).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,").slice(0, -4);
				
				alert(scope.priceMinValueSmall);
			
				if(scope.bedding){
					scope.lTypeNameArray.push({
											filter: scope.column,
											name: scope.bedding,
											selected : true
										});
				}
				
				for(var i = 0, len = scope.lTypeNameArray.length; i < len;  i++) {
					
					if( scope.lTypeNameArray[ i ].filter == "L_SystemPrice" ){
	
						scope.lTypeNameArray.splice(i, 1);
						
					}
						
				}
				
				scope.lTypeNameArray.push({
										filter: 'L_SystemPrice',
										name: scope.priceMinValueWithoutFormat+"-"+scope.priceMaxValueWithoutFormat,
										selected : true
									});
                queryGenerator(scope.lTypeNameArray);
			}
            
            scope.bedding = 0;
            scope.bathing = 0;
            scope.city = '';
            scope.column = '';
            scope.beddingSave = function(type,bedding) {
				
/* 				alert(type);
				alert(bedding); */
				
				if(type == "Beds"){
					scope.bedding = bedding;
					var column = "L_Keyword2";
				}
				else if(type == "Baths"){
					scope.bathing = bedding;
					var column = "LM_Dec_3";
				}
				else if(type == "City"){
					scope.city = bedding;
					var column = "L_City";
				}

                scope.column = column;

				//console.log(scope.lTypeNameArray.length);
				for(var i = 0, len = scope.lTypeNameArray.length; i < len;  i++) {
					//alert(scope.lTypeNameArray[ i ].filter);
					if( scope.lTypeNameArray[ i ].filter == column ){
	
						scope.lTypeNameArray.splice(i, 1);
						
					}
						
				}
		
                scope.lTypeNameArray.push({
                                        filter: column,
                                        name: bedding,
                                        selected : true
                                    });
									
				if(scope.isPriceSet){
					scope.lTypeNameArray.push({
										filter: 'L_SystemPrice',
										name: scope.priceMinValueWithoutFormat+"-"+scope.priceMaxValueWithoutFormat,
										selected : true
									});					
				}
					
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
