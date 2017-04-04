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
    };
    var updateMapSize = function() {
        var mapContainerWidth = $('.searchMapContainer').width(),
            mapContainerHeight = $('.searchMapContainer').height();

        $('.gmap').css({
            height: mapContainerHeight,
            width: mapContainerWidth,
        });
        $('.angular-google-map').css({
            height: mapContainerHeight,
            width: mapContainerWidth,
        });
        $('.angular-google-map-container').css({
            height: mapContainerHeight,
            width: mapContainerWidth,
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
        var topDistance = $(window).scrollTop();
        if(topDistance > '36') {
            // Make Header Fixed
            $('.headerContainer').css({
                position: 'fixed',
                top: '0',
                width: '100%'
            });
        }
        if(topDistance <= '36') {
            $('.headerContainer').css({
                position: 'relative',
                top: 'inherit',
                width: 'inhert'
            });
        }

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
    });

    // Contact Us Slider
    $('.emailSlideTab').on('click', function() {
       $('.emailSlideContainer').toggleClass('email-sliding');
        $('.emailSlideContainer i').toggleClass('fa-arrow-down fa-arrow-up');
    });
});
