$('.tabButton').each(function (index) {
    $(this).on("click", function () {
        $('.tabButton').removeClass('tabButtonActive');
        $(this).addClass('tabButtonActive');
        var currentClass = $(this).attr('class').split(' ')[0];
        if (currentClass == 'imageMapImages') {
            $('.mapImages').css("display", "block");
            $('.mapStreet').css("display", "none");
            $('.mapMap').css("display", "none");
            $('.mapSatellite').css("display", "none");
        }
        if (currentClass == 'imageMapStreet') {
            $('.mapImages').css("display", "none");
            $('.mapStreet').css("display", "block");
            $('.mapMap').css("display", "none");
            $('.mapSatellite').css("display", "none");
        }
        if (currentClass == 'imageMapMap') {
            $('.mapImages').css("display", "none");
            $('.mapStreet').css("display", "none");
            $('.mapMap').css("display", "block");
            $('.mapSatellite').css("display", "none");
        }
        if (currentClass == 'imageMapSatellite') {
            $('.mapImages').css("display", "none");
            $('.mapStreet').css("display", "none");
            $('.mapMap').css("display", "none");
            $('.mapSatellite').css("display", "block");
        }

    });
});
$('.tabButton1').each(function (index) {
    $(this).on("click", function () {
        $('.tabButton1').removeClass('tabButtonActive1');
        $(this).addClass('tabButtonActive1');
        var currentClass = $(this).attr('class').split(' ')[0];
        if (currentClass == 'tabInterior') {
            $('.tabInteriorInfo').css("display", "block");
            $('.tabExteriorInfo').css("display", "none");
            $('.tabMoreInfoInfo').css("display", "none");
            $('.tabTaxesInfo').css("display", "none");
            $('.tabUtilitiesInfo').css("display", "none");
            $('.tabSchoolInfo').css("display", "none");
        }
        if (currentClass == 'tabExterior') {
            $('.tabInteriorInfo').css("display", "none");
            $('.tabExteriorInfo').css("display", "block");
            $('.tabMoreInfoInfo').css("display", "none");
            $('.tabTaxesInfo').css("display", "none");
            $('.tabUtilitiesInfo').css("display", "none");
            $('.tabSchoolInfo').css("display", "none");
        }
        if (currentClass == 'tabMoreInfo') {
            $('.tabInteriorInfo').css("display", "none");
            $('.tabExteriorInfo').css("display", "none");
            $('.tabMoreInfoInfo').css("display", "block");
            $('.tabTaxesInfo').css("display", "none");
            $('.tabUtilitiesInfo').css("display", "none");
            $('.tabSchoolInfo').css("display", "none");
        }
        if (currentClass == 'tabTaxes') {
            $('.tabInteriorInfo').css("display", "none");
            $('.tabExteriorInfo').css("display", "none");
            $('.tabMoreInfoInfo').css("display", "none");
            $('.tabTaxesInfo').css("display", "block");
            $('.tabUtilitiesInfo').css("display", "none");
            $('.tabSchoolInfo').css("display", "none");
        }
        if (currentClass == 'tabUtilities') {
            $('.tabInteriorInfo').css("display", "none");
            $('.tabExteriorInfo').css("display", "none");
            $('.tabMoreInfoInfo').css("display", "none");
            $('.tabTaxesInfo').css("display", "none");
            $('.tabUtilitiesInfo').css("display", "block");
            $('.tabSchoolInfo').css("display", "none");
        }
        if (currentClass == 'tabSchool') {
            $('.tabInteriorInfo').css("display", "none");
            $('.tabExteriorInfo').css("display", "none");
            $('.tabMoreInfoInfo').css("display", "none");
            $('.tabTaxesInfo').css("display", "none");
            $('.tabUtilitiesInfo').css("display", "none");
            $('.tabSchoolInfo').css("display", "block");
        }
    });
});