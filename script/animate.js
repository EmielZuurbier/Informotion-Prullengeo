/*global $*/

$(document).ready(function () {
    "use strict";

    $('.aside-icon').click(function () {
        $(this).toggleClass('icon-rotate');
        $('nav').toggleClass('nav-open');
        $('aside').toggleClass('aside-open');
        $('main').toggleClass('main-open');
    });

});
