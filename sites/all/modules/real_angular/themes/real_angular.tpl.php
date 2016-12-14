<div id="real_angular" ng-controller="retsMap" ng-app="real_angular">
    <div rets-search-form></div>
    <div class="searchMapContainer">
        <ui-gmap-google-map
            class="gmap"
            ng-if="map.center"
            center='map.center'
            zoom='map.zoom'
            options='options'
            refresh="true"
            bounds="map.bounds">
            <ui-gmap-markers
                fit="true"
                models="markers"
                coords="'self'"
                idKey="id"
                options="options"
                click="'onClick()'"
                events="markers.events"
                icon="'icon'">
                <ui-gmap-window
                    show="window.show"
                    coords="window.model"
                    options="window.options"
                    templateUrl="'/sites/all/themes/default/templates/infowindow.tpl'"
                    templateParaneter="window.model"
                    ng-cloak>
<!--                    <div >WTF {{ markers.title }}</div>-->
                </ui-gmap-window>
            </ui-gmap-markers>
        </ui-gmap-google-map>
    </div>
    <div class="searchListingsContainer">
        <div rets-search-results></div>
    </div>
</div>
