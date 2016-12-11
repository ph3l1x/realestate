<div id="real_angular" ng-app="real_angular">
    <div rets-search-form></div>
    <ui-gmap-google-map
        ng-if="map.center"
        center='map.center'
        zoom='map.zoom'
        options='map.options'
        refresh="true"
        bounce="map.bounds"
        ></ui-gmap-google-map>
    <div rets-search-results></div>
</div>
