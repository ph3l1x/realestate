function retsAPI($http, $q) {
    var service = {};
    
    service.get = function(values) {
        // var val = [];
        // var newName = [];
        // values.forEach(function(value, i) {
        //     if(i > 0) {
        //         newName.push({name: value.name.join('|')});
        //     }
        //     console.log('i', i);
        //     console.log('newname', newName);
        //     console.log("value", value);
        //     val.push(value.filter + '=' + value.name);
        // });
        // console.log("SSSSSSSS", val);
        //
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

            // console.log("DEF.PROMISE", def.promise);
            // resolve.forEach(function(item) {
            //     console.log("ITEM", item);
            //     /**
            //      * Update and modify values here if needed.
            //      */
            //     item['L_AskingPrice'] = parseFloat(item['L_AskingPrice']).toFixed(0).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
            //     item['ImageCount'] = item.IMAGES.length;
            //
            // });

            return def.promise;

        }).error(function(theError) {
            console.log("ERROR GETTING LISTING DATA", theError);
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