/*

[Master JS File (Unminified) : MAIN.JS]
––––––––––––––––––––––––––––––––––––––––––––––––––

 * Dyon - Simple vCard Resume Template
 * Author: Themesit, http://www.themesit.com
 */

(function($) {
    'use strict';

    /** Window on Load */
    $(window).on('load', function() {

        /** Loader */
        setTimeout(function() {
            $('.loader-wrapper').fadeOut(600);
        }, 1500);

    });


    /** Animation on scroll */
    function elementInView() {
        var $animatedElements = $('.anim');
        var $window = $(window);

        $window.on('scroll resize', function() {
            var windowHeight = $window.height();
            var windowTopPosition = $window.scrollTop();
            var windowBottPosition = (windowTopPosition + windowHeight);

            $.each($animatedElements, function() {
                var $element = $(this);
                var elementHeight = $element.outerHeight();
                var elementTopPosition = $element.offset().top;
                var elementBottPosition = (elementTopPosition + elementHeight);

                // Check to see if this current container is within viewport
                if ((elementBottPosition >= windowTopPosition) &&
                    (elementTopPosition <= windowBottPosition)) {
                    $element.addClass('animated');
                    //$element.removeClass('anim');

                    // Animate progress bar
                    if ($element.hasClass('progress-bar')) {
                        $element.css('width', $element.attr('data-percent') + '%');
                    }

                }
                //else {
                //$element.removeClass('animated');
                //}
            });
        });

        $window.trigger('scroll');
    }


    /** Document Ready */
    $(document).ready(function() {

        /** Animation on scroll */
        elementInView();

        /** Set Full Height for Intro/ Section */
        $('#intro, #birds-animation, .site-nav').height(parseInt($(window).height()));

        /** Background Image */
        $('.bg-image').each(function() {
            var $imgPath = $(this).attr('data-image');
            $(this).css('background-image', 'url(' + $imgPath + ')');
        });

        var navFixed = $('#intro').height() - 50;

        /** Nav fixed on scroll */
        $(window).on('scroll', function() {
            if ($(window).scrollTop() > navFixed) {
                $('body').addClass('navfixed');
            } else {
                $('body').removeClass('navfixed');
            }
        });

        /** Typed.js (Text typing effect) */
        $("#typed").typed({
            strings: ["^2100&nbsp;Soy Orlando Desarrollador web."],
            typeSpeed: 30,
            backDelay: 750,
            loop: false,
            cursorChar: "|",
            contentType: 'html', // or text
            loopCount: false, // defaults to false for infinite loop
        });

        /** Site Navigation LocalScroll */
        $('.site-nav ul').localScroll({
            target: 'body',
            offset: -30,
            queue: true,
            duration: 1000,
            hash: false,
        });

        /** Site Navigation Trigger*/
        $('.nav-toggler').on('click', function(e) {
            e.preventDefault();
            $('body').toggleClass('menu-open');
        });

        $('.site-nav ul li a').on('click', function() {
            if ($('body').hasClass('menu-open')) {
                $('body').removeClass('menu-open');
            };
        });

        /** Portfolio */
        var $container = $('.works-container');

        // checking if all images are loaded
        $container.imagesLoaded(function() {

            //init isotope once all images are loaded
            $container.isotope({
                // options
                itemSelector: '.works-item',
                layoutMode: 'masonry',
                transitionDuration: '0.8s'
            });

            // forcing a perfect masonry layout after initial load
            setTimeout(function() {
                $container.isotope('layout');
            }, 500);

            // triggering filtering
            $('.works-filter li a').on('click', function() {
                $('.works-filter li a').removeClass('active');
                $(this).addClass('active');

                var selector = $(this).attr('data-filter');
                $('.works-container').isotope({
                    filter: selector
                });
                setTimeout(function() {
                    $container.isotope('layout');
                }, 700);
                return false;
            });

            // Isotope ReLayout on Window Resize event.
            $(window).on('resize', function() {
                $container.isotope('layout');
                $('#intro, #birds-animation, .site-nav').height(parseInt($(window).height()));
            });

            // Isotope ReLayout on device orientation changes
            window.addEventListener('orientationchange', function() {
                $container.isotope('layout');
            }, false);

        });

        /** MagnificPopup For Portfolio */
        $('a.lightbox').magnificPopup({
            type: 'image',
        });

        $('a.lightbox-iframe').magnificPopup({
            type: 'iframe',
            iframe: {
                markup: '<div class="mfp-iframe-scaler">' + '<div class="mfp-close"></div>' + '<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>' + '</div>',

                patterns: {
                    youtube: {
                        index: 'youtube.com/',
                        id: 'v=',
                        src: 'http://www.youtube.com/embed/%id%?autoplay=1'
                    },
                    vimeo: {
                        index: 'vimeo.com/',
                        id: '/',
                        src: '//player.vimeo.com/video/%id%?autoplay=1'
                    },
                    gmaps: {
                        index: '//maps.google.',
                        src: '%id%&output=embed'
                    }
                },

                srcAction: 'iframe_src',
            }
        });

        /** Testimonial carousel */
        $('.testimonial-carousel').owlCarousel({
            autoplay: false,
            // autoplaySpeed: 1000,
            // autoplayTimeout: 5000,
            // autoplayHoverPause: true,
            autoWidth: false,
            autoHeight: false,
            items: 1,
            loop: false,
            nav: false,
            dots: false,
            navText: false,
            animateOut: 'fadeOut',
        });



    });

}(jQuery));
