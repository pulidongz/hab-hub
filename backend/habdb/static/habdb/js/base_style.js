/*! TAKEN FROM "dist/js/chart-js-config.js"
 * spur-template - An admin template based on Bootstrap 4
 * Version v1.0.2
 * Copyright 2016 - 2019 Alexander Rechsteiner
 * https://hackerthemes.com
 */
Chart.defaults.global.defaultFontFamily = "'Open Sans', 'sans-serif'";

window.chartColors = {
    primary: '#3F84FC',
    secondary: '#727F94',
    success: '#1DAB47',
    info: '#8A3FFC',
    warning: '#FCAE3F',
    superwarning: '#fd7e14',
    danger: '#FC413F',
};



/*!TAKEN FROM "dist/js/spur.js"
 * spur-template - An admin template based on Bootstrap 4
 * Version v1.0.2
 * Copyright 2016 - 2019 Alexander Rechsteiner
 * https://hackerthemes.com
 */
const mobileBreakpoint = window.matchMedia("(max-width: 991px )");

$(document).ready(function(){
    $(".dash-nav-dropdown-toggle").click(function(){
        $(this).closest(".dash-nav-dropdown")
            .toggleClass("show")
            .find(".dash-nav-dropdown")
            .removeClass("show");

        $(this).parent()
            .siblings()
            .removeClass("show");
    });

    $(".menu-toggle").click(function(){
        if (mobileBreakpoint.matches) {
            $(".dash-nav").toggleClass("mobile-show");
        } else {
            $(".dash").toggleClass("dash-compact");
        }
    });

    $(".searchbox-toggle").click(function(){
        $(".searchbox").toggleClass("show");
    });

    // Dev utilities
    // $("header.dash-toolbar .menu-toggle").click();
    // $(".searchbox-toggle").click();
});
