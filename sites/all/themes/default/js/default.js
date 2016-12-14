jQuery(document).ready(function($) {

    var updateMapSize = function() {
        var mapContainerWidth = $('.searchMapContainer').width(),
            mapContainerHeight = $('.searchMapContainer').height();

        $('.gmap').css({
            height: mapContainerHeight,
            width: mapContainerWidth
        });
        $('.angular-google-map').css({
            height: mapContainerHeight,
            width: mapContainerWidth
        });
        $('.angular-google-map-container').css({
            height: mapContainerHeight,
            width: mapContainerWidth
        });
    };

    updateMapSize();
    $(window).resize(function() {
        updateMapSize();
    });

    // Scroll Header Fix
    $(window).scroll(function() {
       if($(this).scrollTop() > 1) {
           $('header').addClass('sticky');
           $('.searchContainer').addClass('stickySearch');
       } else {
           $('header').removeClass('sticky');
           $('.searchContainer').removeClass('stickySearch');
       }
    });

});
