jQuery(document).ready(function($) {

    var updateHomePreface = function() {
        var vw = $('.fullscreen-bg__video').width(),
            vh = $('.fullscreen-bg__video').height();

        $('.video-content').height(vh - 20);
        $('.video-content').width(vw);
        // $('.video-content').css({
        //     height: vh - 20,
        //     width: vw
        // });
        console.log(vh, vw);
    };
    var updateMapSize = function() {
        var mapContainerWidth = $('.searchMapContainer').width(),
            mapContainerHeight = $('.searchMapContainer').height();
        console.log(mapContainerWidth);

        $('.gmap').css({
            height: mapContainerHeight,
            width: mapContainerWidth - 15
        });
        $('.angular-google-map').css({
            height: mapContainerHeight,
            width: mapContainerWidth - 15
        });
        $('.angular-google-map-container').css({
            height: mapContainerHeight,
            width: mapContainerWidth - 15
        });
    };

    updateMapSize();
    updateHomePreface();
    updateHomePreface();
    $(window).resize(function() {
        updateMapSize();
        updateHomePreface();
    });

    // Scroll Header Fix
    $(window).scroll(function() {
       // if($(this).scrollTop() > 1) {
       //     $('header').addClass('sticky');
       //     $('.searchContainer').addClass('stickySearch');
       // } else {
       //     $('header').removeClass('sticky');
       //     $('.searchContainer').removeClass('stickySearch');
       // }
    });


    // Home Page Search Button
    $('.rets-search-button').on('click', function () {
        window.location.replace("/home_search#?query=" + $('.rets-search-input').val());
        console.log($('.rets-search-input').val());
    });

});
