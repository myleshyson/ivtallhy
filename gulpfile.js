var gulp = require('gulp');
var elixir = require('laravel-elixir');
require('laravel-elixir-imagemin');


/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks.
 |
 |Run gulp in your terminal within the theme directory. This will minify files, compiles sass, and combine all of the necessary css and javascript files.
 |
 |When before pushing up to remote, run gulp --production in the terminal. This will minify all of the files!
 |
 | If you would like to minify images, add a img folder to the assets folder and place your images there. 
 |
 */

elixir(function(mix) {

    // Compiles sass files. Includes paths for Foundation.
    mix.sass('app.scss', './style.css', {
        includePaths: ['node_modules/foundation-sites/scss', 'node_modules/motion-ui', 'node_modules/normalize-sass', 'node_modules/bourbon/app/assets/stylesheets']
    });

    // Uncoment and add files located in assets/css
    // mix.styles();

    // mix.browserSync({
    //       proxy: 'your sites url here'
    //   });

    // Compiles Foundation files down using babel
    mix.babel([

        // Required for foundation javascript.
        'foundation/foundation.core.js',
        'foundation/foundation.util.*.js',

        // Paths to individual JS components defined below. Use what you need for your project.
        'foundation/foundation.abide.js',
        'foundation/foundation.accordion.js',
        'foundation/foundation.accordionMenu.js',
        'foundation/foundation.drilldown.js',
        'foundation/foundation.equalizer.js',
        'foundation/foundation.interchange.js',
        'foundation/foundation.magellan.js',
        'foundation/foundation.offcanvas.js',
        'foundation/foundation.orbit.js',
        'foundation/foundation.responsiveMenu.js',
        'foundation/foundation.responsiveToggle.js',
        'foundation/foundation.reveal.js',
        'foundation/foundation.slider.js',
        'foundation/foundation.sticky.js',
        'foundation/foundation.tabs.js',
        'foundation/foundation.toggler.js',
        'foundation/foundation.tooltip.js',

    ], './public/js/foundation.js');

    // Compiles Javascript files into 
    mix.scripts([
        'functions.js',
    ]);

    mix.imagemin();
});