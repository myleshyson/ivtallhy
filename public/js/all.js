<<<<<<< HEAD
// remap jQuery to $
(function($) {

    var $width = $(window).width();
    var $menuLink = $('.menu li');
    var slideMenu = function() {
        $menuLink.hover(function() {
            var submenu = $(this).find('.submenu');
            submenu.slideToggle('fast');
        });
    }

    var drilldownMenu = function() {

            $menuLink.on('click', function() {

                var submenu = $(this).find('.submenu');
                submenu.css('position', 'static');
                submenu.addClass('nested');
                submenu.slideToggle('fast');

                var img = $(this).find('img');

                img.toggleClass('rotate');
            });
        }
        /* trigger when page is ready */
    $(document).ready(function() {
        // Initialize Foundation
        $(document).foundation();

        // Toggle Slide on Responsive Menu
        $('.menu-icon').on(
            'click', function() {
                var dropdown = $('#mobile-nav');
                dropdown.slideToggle('fast');

            });

        // For Menu Animation. If mobile, drilldown, if not, slide.
        if ($width >= 640) {
            slideMenu();
        } else {
            drilldownMenu();
        }

        // Adds this class whenever there is a submenu
        $menuLink.has('.submenu').append('<img src="/wp-content/themes/ivtally/public/img/fi-play.svg" class="hide-for-medium">');
        $menuLink.has('ul').addClass('is-submenu-parent');

        Foundation.Abide.defaults.patterns['phone'] = /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/;

        $('#contact-form').on('submit', function(e) {

            e.preventDefault();

            var name = $('#name').val();
            var email = $('#email').val();
            var number = $('#number').val();
            var campus = $('.radio:checked').val();
            var comments = $('#comments').val();
            var address = $('#address').val();

            $.ajax({
                type: 'POST',
                url: window.location.origin + "/wp-admin/admin-ajax.php",
                data: {
                    action: 'mail',
                    name: name,
                    email: email,
                    number: number,
                    campus: campus,
                    comments: comments,
                    address: address
                },
                beforeSend: function() {
                    $('form').hide();
                   $('.fa-spin').removeClass('hide');
                },
                success: function(response) {
                   $('form').hide();
                   $('.fa-spin').addClass('hide');
                    $('.main-content').load(window.location.origin + "/wp-content/themes/ivtally/parts/thanks.php").hide().fadeIn();
                }
            });

        });
    });

    // Window Resize Events
    $(window).resize(function() {
        // Changes Menu Animation based on Window Size.
        if ($(this).width() >= 640) {
            $menuLink.unbind('mouseenter mouseleave click');
            slideMenu();
        } else {
            $menuLink.unbind('mouseenter mouseleave click');
            drilldownMenu();
        }
    });





})(window.jQuery);
//# sourceMappingURL=all.js.map
=======
!function(n){var e=n(window).width(),i=n(".menu li"),a=function(){i.hover(function(){var e=n(this).find(".submenu");e.slideToggle("fast")})},s=function(){i.on("click",function(){var e=n(this).find(".submenu");e.css("position","static"),e.addClass("nested"),e.slideToggle("fast");var i=n(this).find("img");i.toggleClass("rotate")})};n(document).ready(function(){n(document).foundation(),n(".menu-icon").on("click",function(){var e=n("#mobile-nav");e.slideToggle("fast")}),e>=640?a():s(),i.has(".submenu").append('<img src="/wp-content/themes/ivtally/public/img/fi-play.svg" class="hide-for-medium">'),i.has("ul").addClass("is-submenu-parent"),Foundation.Abide.defaults.patterns.phone=/^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/,n("#contact-form").on("submit",function(e){e.preventDefault();var i=n("#name").val(),a=n("#email").val(),s=n("#number").val(),o=n(".radio:checked").val(),t=n("#comments").val(),d=n("#address").val();n.ajax({type:"POST",url:window.location.origin+"/wp-admin/admin-ajax.php",data:{action:"mail",name:i,email:a,number:s,campus:o,comments:t,address:d},beforeSend:function(){n("form").hide(),n(".fa-spin").removeClass("hide")},success:function(e){n("form").hide(),n(".fa-spin").addClass("hide"),n(".main-content").load(window.location.origin+"/wp-content/themes/ivtally/parts/thanks.php").hide().fadeIn()}})})}),n(window).resize(function(){n(this).width()>=640?(i.unbind("mouseenter mouseleave click"),a()):(i.unbind("mouseenter mouseleave click"),s())})}(window.jQuery);
>>>>>>> 5a69c8315e2c22b72aebfba30e120d8848ed21e3
