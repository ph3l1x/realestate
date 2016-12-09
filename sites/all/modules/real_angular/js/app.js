
var app = angular.module('real_angular', ['node', 'nodes', 'ngRoute']).

    directive('retsSearchForm', retsSearchFormDirective).
    directive('retsSearchResults', retsSearchResultsDirective).
    factory('retsAPI', retsAPI);
    // controller('RetsSearchCtrl', ['$scope']).
    // config(function($routeProvider) {
    //     $routeProvider.
    //     when('/', {
    //          controller:RetsSearchCtrl,
    //         templateUrl: Drupal.settings.angularjsApp.basePath + 'rets_search/display'
    //     }).
    // otherwise({redirectTo:'/'});
    
// });