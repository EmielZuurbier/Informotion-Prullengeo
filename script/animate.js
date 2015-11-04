/*global $*/

$(document).ready(function () {
    "use strict";

    $('.aside-icon').click(function () {
        $('.aside-icon i').toggleClass('icon-rotate');
        $('nav').toggleClass('nav-open');
        $('aside').toggleClass('aside-open');
        $('main').toggleClass('main-open');
    });

});
