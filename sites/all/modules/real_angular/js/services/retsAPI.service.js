function retsAPI($http, $q) {
    var service = {};
    
    service.get = function(values) {
        var val = [];
        values.forEach(function(value) {
            console.log("value", value);
            val.push(value.key + '=' + value.value);
        });
        console.log("SSSSSSSS", val);
        
        return $http({
            url: 'http://rets.mindimage.net/search.php?' + val.join('&'),
            method: 'get',
            withCredentials: false,
            crossDomain: true,
            headers: {
                'Content-Type' : 'application/json',
                'Access-Control-Allow-Headers' : '*'
            }
        }).success(function (response) {
            if(response) {
                response.forEach(function(item) {
                    /**
                     * Update and modify values here if needed.
                     */
                    item['L_AskingPrice'] = parseFloat(item['L_AskingPrice']).toFixed(0).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
                    item['ImageCount'] = item.IMAGES.length;
                });

                return response;
            } else {
               return $q.reject();
            }
        })
    };
    service.default = function() {
        return $http({
            url: 'http://rets.mindimage.net/search.php',
            method: 'get',
            withCredentials: false,
            crossDomain: true,
            headers: {
                'Content-Type' : 'application/json',
                'Access-Control-Allow-Headers' : '*'
            }
        }).success(function (response) {
            if(response) {
                response.forEach(function(item) {
                    /**
                     * Update and modify values here if needed.
                     */
                    item['ImageCount'] = item.IMAGES.length;
                    item['L_AskingPrice'] = parseFloat(item['L_AskingPrice']).toFixed(0).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
                });

                return response;
            } else {
                return $q.reject();
            }
        })
    };
    service.listingType = function() {
        return $http({
            url: 'http://rets.mindimage.net/search.php?list=listingTypes',
            method: 'get',
            withCredentials: false,
            crossDomain: true,
            headers: {
                'Content-Type' : 'application/json',
                'Access-Control-Allow-Headers' : '*'
            }
        }).success(function(data) {
            if(data) {
                return data;
            } else {
                return $q.reject();
            }
        })
    };
    
    return service;
}