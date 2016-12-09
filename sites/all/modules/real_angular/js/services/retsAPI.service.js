function retsAPI($http, $q) {
    var service = {};
    
    service.get = function(values) {
        var val = [];
        jQuery.each(values, function(key, value) {
            val.push(key + '=' + value);
        });
        
        return $http({
            url: 'http://rets.mindimage.net?' + val.join('&'),
            method: 'get',
            withCredentials: false,
            crossDomain: true,
            headers: {
                'Content-Type' : 'application/json',
                'Access-Control-Allow-Headers' : '*'
            }
        }).then(function (response) {
            if(response) {
                return response.data;
            } else {
                return $q.reject();
            }
        })
    };
    
    return service;
}