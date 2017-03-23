function retsAPI($http, $q) {
    var service = {};
    
    service.get = function(values) {
        var def = $q.defer();
        return $http({
            // url: 'http://rets.mindimage.net/search.php?' + val.join('&'),
            url: 'http://rets.mindimage.net/search.php',
            method: 'post',
            data: values,
            withCredentials: false,
            crossDomain: true,
            headers: {
                'Content-Type' : 'application/json',
                'Access-Control-Allow-Headers' : '*'
            }
        }).success(function (response) {
            def.resolve(response);

            return def.promise;

        }).error(function(theError) {
            console.log("ERROR GETTING LISTING DATA", theError);
            
            return "error";
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
               for(var i = 0, len = response.length; i < len; i++) {
                   response[i]['L_AskingPrice'] = parseFloat(response[i]['L_AskingPrice']).toFixed(0).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
                   return response;
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
    
    service.citiesList = function() {
        return $http({
            url: 'http://rets.mindimage.net/search.php?list=citiesList',
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
	
    service.customSearch = function(search) {
        return $http({
            url: 'http://rets.mindimage.net/search.php?list=search&search='+search,
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