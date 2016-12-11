function retsAPI($http, $q) {
    var service = {};
    
    service.get = function(values) {
        var val = [];
        jQuery.each(values, function(key, value) {
            val.push(key + '=' + value);
        });
        
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
                });

                return response;
            } else {
               return $q.reject();
            }
        })
    };
    
    return service;
}