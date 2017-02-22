
var app = angular.module('real_angular', ['node', 'nodes', 'ngRoute', 'uiGmapgoogle-maps', 'isteven-multi-select', 'rzModule']).
    controller('retsMap', retsMapController).
    controller('infoWindow', infoWindowController).
    directive('retsSearchForm', retsSearchFormDirective).
    directive('retsSearchResults', retsSearchResultsDirective).
    factory('retsAPI', retsAPI).
    config(['uiGmapGoogleMapApiProvider', function(GoogleMapApiProviders) {
            GoogleMapApiProviders.configure({
                v: '3.20',
                libraries: 'weather,geometry,visualization'
            });
        }]);


app.config(function($locationProvider) {
  $locationProvider.html5Mode(false);
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