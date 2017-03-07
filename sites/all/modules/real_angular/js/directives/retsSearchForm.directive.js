function retsSearchFormDirective(retsAPI, $timeout) {
    return {
        restrict: 'A',
        replace: true,
        transclude: true,
        templateUrl: '/sites/all/modules/real_angular/themes/search_form.html',
        link: function(scope, element, attrs, timeout, location) {
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

                    scope.column = column;

                    //console.log(scope.lTypeNameArray.length);
                    for (var i = 0, len = scope.lTypeNameArray.length; i < len; i++) {
                        //alert(scope.lTypeNameArray[ i ].filter);
                        if (scope.lTypeNameArray[i].filter == column) {

                            scope.lTypeNameArray.splice(i, 1);
                            break;

                        }

                    }

                    query.forEach(function(value, key) {
                        if (value.selected = true) {
                            if (value.filter == 'L_Type_' || value.filter == 'L_Keyword2' || value.filter == 'LM_Dec_3' ||
                                value.filter == 'L_City' || value.filter == 'L_SystemPrice' || value.filter == 'LM_int4_27' ||
                                value.filter == 'LM_Int4_1' || value.filter == "L_Remarks" || value.filter == 'L_Keyword1' ||
                                value.filter == 'L_ListingID' || value.filter == "Bounds") {
                                sendValue.push({
                                    filter: value.filter,
                                    name: value.name
                                });
                            }
                        }
                    });

                    retsAPI.get(sendValue).then(function(searchResult) {
                        //   searchResult.data.forEach(function(item) {
                        for (var i = 0, len = searchResult.data.length; i < len; i++) {
                            if (searchResult.data[i]['IMAGES']) {
                                searchResult.data[i]['L_AskingPrice'] = parseFloat(searchResult.data[i]['L_AskingPrice']).toFixed(0).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
                                searchResult.data[i]['ImageCount'] = searchResult.data[i].IMAGES.length;
                                markers.push(createMarker(searchResult.data[i]['L_ListingID'], searchResult.data[i]['LMD_MP_Latitude'], searchResult.data[i]['LMD_MP_Longitude'], searchResult.data[i]));
                            }
                        }
                        scope.markers = markers;
                        scope.markers_visible = markers;

                        for (const queryPart of searchResult.config.data) {
                            if (queryPart.filter == 'L_City') {
                                scope.map.center.latitude = searchResult.data[0].LMD_MP_Latitude;
                                scope.map.center.longitude = searchResult.data[0].LMD_MP_Longitude;
                            }
                        }

                        scope.myValue = "";
                    });

                };

            retsAPI.listingType().success(function(result) {
                scope.lTypes = result;
            });


            /* Default Values for Min and Max Price */
            scope.priceMinValue = parseFloat(200000).toFixed(0).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
            scope.priceMaxValue = parseFloat(500000).toFixed(0).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
            scope.priceMaxValueWithoutFormat = 500000;
            scope.priceMinValueWithoutFormat = 200000;
            scope.priceMinValueSmall = scope.priceMinValue.slice(0, -4);
            scope.priceMaxValueSmall = scope.priceMaxValue.slice(0, -4);


            scope.updateLotSize = function() {



                var found = false;

                for (var i = 0, len = scope.lTypeNameArray.length; i < len; i++) {
                    if (scope.lTypeNameArray[i].filter == "L_Keyword1") {
                        found = true;
                        scope.lTypeNameArray[i] = {
                            filter: 'L_Keyword1',
                            name: scope.lot_size,
                            selected: true
                        };
                        break;
                    }
                }

                if (!found) {
                    scope.lTypeNameArray.push({
                        filter: 'L_Keyword1',
                        name: scope.lot_size,
                        selected: true
                    });
                }

                queryGenerator(scope.lTypeNameArray);
            };

            scope.slider = {
                minValue: scope.priceMinValueWithoutFormat,
                maxValue: scope.priceMaxValueWithoutFormat,
                ceilLabel: '1M',
                options: {
                    ceilLabel: '1M',
                    floor: 0,
                    ceil: 1000000,
                    step: 10000,
                    minRange: 10000,
                    maxRange: 900000,

                    translate: function(value) {
                        if (value.toString().length > 6) {
                            value = value.toString()[0] + 'M+';
                        }

                        return '$' + value;
                    },
                    onEnd: function() {
                        scope.priceSave(scope.slider.minValue, scope.slider.maxValue);
                    }

                }
            };

            scope.sliderSqFt = {
                minValue: 1500,
                maxValue: 5000,
                options: {
                    floor: 0,
                    ceil: 10000,
                    step: 100,
                    minRange: 500,
                    maxRange: 7000,
                    onEnd: function() {
                        scope.sqFtSave(scope.sliderSqFt.minValue, scope.sliderSqFt.maxValue);
                    }

                }
            };

            scope.sliderYear = {
                minValue: 1900,
                maxValue: 2010,
                options: {
                    floor: 1850,
                    ceil: 2017,
                    step: 10,
                    minRange: 10,
                    maxRange: 100,
                    showTicks: true,
                    onEnd: function() {
                        scope.saveYear(scope.sliderYear.minValue, scope.sliderYear.maxValue);
                    }

                }
            };

            scope.myValue = '';

            scope.updateKeywords = function() {
                //L_Keyword2
                var keywords = scope.keyWordFilter;

                if (keywords.length > 0) {
                    keywords = keywords.split(',');
                }

                if (keywords.length > 0) {
                    for (var keyword in keywords) {
                        scope.lTypeNameArray.push({
                            filter: 'L_Remarks',
                            name: keywords[keyword].trim(),
                            selected: true
                        });
                    }
                }

                queryGenerator(scope.lTypeNameArray);

            };

            scope.myFunc = function() {
                retsAPI.customSearch(scope.myValue).success(function(result) {
                    scope.search = result;
                });
            };

            scope.onItemSelectFunction = function(item) {
                console.log(item);
                scope.typeSave();

            };

            scope.typeSave = function() {

                scope.lTypeNameArray = scope.lTypesOutput.filter(function(type) {
                    return type.ticked;
                });

                let selectedTypes = [];
                for (let type in scope.lTypeNameArray) {
                    selectedTypes.push(scope.lTypeNameArray[type].name);
                }

                selectedTypes = selectedTypes.join(',');

                scope.lTypeNameArray.push({
                    filter: 'L_Type_',
                    name: selectedTypes,
                    selected: true
                });

                scope.lTypeNameArray.push({
                    filter: 'Bounds',
                    name: scope.map.bounds.northeast.latitude + ',' + scope.map.bounds.northeast.longitude + ',' + scope.map.bounds.southwest.latitude + ',' +
                        scope.map.bounds.southwest.longitude
                });

                if (scope.bedding) {
                    scope.lTypeNameArray.push({
                        filter: scope.column,
                        name: scope.bedding,
                        selected: true
                    });
                }

                if (scope.isPriceSet) {
                    scope.lTypeNameArray.push({
                        filter: 'L_SystemPrice',
                        name: scope.priceMinValueWithoutFormat + "-" + scope.priceMaxValueWithoutFormat,
                        selected: true
                    });
                }
                queryGenerator(scope.lTypeNameArray);
            };

            scope.isPriceSet = 0;

            scope.sqFtSave = function(min, max) {
                var found = false;
                for (var i = 0, len = scope.lTypeNameArray.length; i < len; i++) {
                    if (scope.lTypeNameArray[i].filter == "LM_int4_27") {
                        found = true;
                        scope.lTypeNameArray[i] = {
                            filter: 'LM_int4_27',
                            name: min + "-" + max,
                            selected: true
                        };
                        break;
                    }
                }

                if (!found) {
                    scope.lTypeNameArray.push({
                        filter: 'LM_int4_27',
                        name: min + "-" + max,
                        selected: true
                    });
                }

                queryGenerator(scope.lTypeNameArray);
            };

            scope.saveYear = function(min, max) {
                var found = false;
                for (var i = 0, len = scope.lTypeNameArray.length; i < len; i++) {
                    if (scope.lTypeNameArray[i].filter == "LM_Int4_1") {
                        found = true;
                        scope.lTypeNameArray[i] = {
                            filter: 'LM_Int4_1',
                            name: min + "-" + max,
                            selected: true
                        };
                        break;
                    }
                }

                scope.lTypeNameArray.push({
                    filter: 'LM_Int4_1',
                    name: min + "-" + max,
                    selected: true
                });

                queryGenerator(scope.lTypeNameArray);
            };

            scope.priceSave = function(min, max) {
                scope.isPriceSet = 1;
                scope.priceMinValueWithoutFormat = min;
                scope.priceMaxValueWithoutFormat = max;

                scope.priceMinValue = parseFloat(min).toFixed(0).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
                scope.priceMaxValue = parseFloat(max).toFixed(0).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
                scope.priceMinValueSmall = scope.priceMinValue.slice(0, -4);
                scope.priceMaxValueSmall = scope.priceMaxValue.slice(0, -4);


                if (scope.bedding) {
                    scope.lTypeNameArray.push({
                        filter: scope.column,
                        name: scope.bedding,
                        selected: true
                    });
                }

                for (var i = 0, len = scope.lTypeNameArray.length; i < len; i++) {

                    if (scope.lTypeNameArray[i].filter == "L_SystemPrice") {

                        scope.lTypeNameArray.splice(i, 1);
                        break;
                    }

                }

                scope.lTypeNameArray.push({
                    filter: 'L_SystemPrice',
                    name: scope.priceMinValueWithoutFormat + "-" + scope.priceMaxValueWithoutFormat,
                    selected: true
                });
                queryGenerator(scope.lTypeNameArray);
            }

            scope.bedding = 0;
            scope.bathing = 0;
            scope.city = '';
            scope.column = '';

            scope.updateMLS = function() {
                scope.beddingSave('City', scope.myValue);
            }

            scope.beddingSave = function(type, bedding) {
                scope.search = [];
                scope.lTypeNameArray = [];

                /* 				alert(type);
                				alert(bedding); */

                scope.lTypeNameArray.push({
                    filter: 'Bounds',
                    name: scope.map.bounds.northeast.latitude + ',' + scope.map.bounds.northeast.longitude + ',' + scope.map.bounds.southwest.latitude + ',' +
                        scope.map.bounds.southwest.longitude
                });

                var column = 'L_City';

                if (type == "Beds") {
                    scope.bedding = bedding;
                    column = "L_Keyword2";
                }
                else if (type == "Baths") {
                    scope.bathing = scope.baths;
                    column = "LM_Dec_3";
                }
                else if (type == "City") {
                    let intval = parseInt(bedding);

                    if (intval) {
                        if (intval.toString().length > 5) {
                            scope.city = bedding;
                            column = "L_ListingID";
                        }
                        else {
                            scope.city = bedding;
                            column = "L_Zip";
                        }

                    }
                    else {
                        scope.listing_id = bedding;
                        column = "L_City";
                    }

                }

                scope.column = column;

                //console.log(scope.lTypeNameArray.length);
                for (var i = 0, len = scope.lTypeNameArray.length; i < len; i++) {
                    //alert(scope.lTypeNameArray[ i ].filter);
                    if (scope.lTypeNameArray[i].filter == column) {

                        scope.lTypeNameArray.splice(i, 1);
                        break;

                    }

                }

                if (type == "Baths") {
                    scope.lTypeNameArray.push({
                        filter: column,
                        name: scope.baths,
                        selected: true
                    });
                }
                else {
                    scope.lTypeNameArray.push({
                        filter: column,
                        name: bedding,
                        selected: true
                    });
                }


                if (scope.isPriceSet) {
                    scope.lTypeNameArray.push({
                        filter: 'L_SystemPrice',
                        name: scope.priceMinValueWithoutFormat + "-" + scope.priceMaxValueWithoutFormat,
                        selected: true
                    });
                }

                queryGenerator(scope.lTypeNameArray);
            }
        },
        controller: function($scope, $element, $timeout, $location) {
            $scope.retsFormChange = function() {
                retsAPI
                    .get($scope.form)
                    .then(function(result) {
                        $scope.results = result;

                    })
            }

            var searchVal = $location.search();

            if (searchVal.query) {
                var sendValue = [],
                    markers = [];

                let intval = parseInt(searchVal.query);
                if (intval) {
                    if (intval.toString().length > 5) {
                        sendValue.push({
                            filter: 'L_ListingID',
                            name: searchVal.query
                        });
                    }
                    else {
                        sendValue.push({
                            filter: 'L_Zip',
                            name: searchVal.query
                        });
                    }
                }
                else {
                    sendValue.push({
                        filter: 'L_City',
                        name: searchVal.query
                    });
                }




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



                    $scope.map.shouldFit = true;
                    $scope.map.center = [searchResult.data[0]['LMD_MP_Latitude'], searchResult.data[0]['LMD_MP_Longitude']];

                    $timeout(function() {
                        $scope.map.shouldFit = false;
                        if (searchResult.data.length == 1) {
                            $scope.map.zoom = 15;
                        }
                    }, 1000);

                    $scope.markers = markers;
                    $scope.markers_visible = markers;

                    $scope.loaded_from_url = false;

                    $scope.myValue = "";
                });
            }
            else {
                $scope.loaded_from_url = true;
            }


            $scope.refreshSlider = function() {
                $timeout(function() {
                    $scope.$broadcast('rzSliderForceRender');
                });
            };
        }
    }
}
