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