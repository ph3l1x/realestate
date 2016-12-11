
var app = angular.module('real_angular', ['node', 'nodes', 'ngRoute', 'uiGmapgoogle-maps']).
    controller('retsMapController', ['$scope']).
    directive('retsSearchForm', retsSearchFormDirective).
    directive('retsSearchResults', retsSearchResultsDirective).
    factory('retsAPI', retsAPI).
    config(['uiGmapGoogleMapApiProvider', function(GoogleMapApiProviders) {
            GoogleMapApiProviders.configure({
                v: '3.20',
                libraries: 'weather,geometry,visualization'
            });
        }]
    ).
    config(function($routeProvider) {
        $routeProvider.
        when('/', {
             controller:retsMapController,
            templateUrl: Drupal.settings.angularjsApp.basePath + 'home_search'
    });
});

    // controller('RetsSearchCtrl', ['$scope']).
    // config(function($routeProvider) {
    //     $routeProvider.
    //     when('/', {
    //          controller:RetsSearchCtrl,
    //         templateUrl: Drupal.settings.angularjsApp.basePath + 'rets_search/display'
    //     }).
    // otherwise({redirectTo:'/'});
    
// });