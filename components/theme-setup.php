<?php

// Options Framework (https://github.com/devinsays/options-framework-plugin)
	if ( !function_exists( 'optionsframework_init' ) ) {
		define( 'OPTIONS_FRAMEWORK_DIRECTORY', get_template_directory_uri() . '/public/inc/' );
		require_once (get_template_directory() . '/public/inc/options-framework.php');
	}

	// Theme Setup
	function madmouse_theme_setup() {
		load_theme_textdomain( 'madmousetheme', get_template_directory() . '/languages' );
		add_theme_support( 'automatic-feed-links' ); // Add RSS links to <head> section
		//add_theme_support( 'structured-post-formats', array( 'link', 'video' ) );
		//add_theme_support( 'post-formats', array( 'aside', 'audio', 'chat', 'gallery', 'image', 'quote', 'status' ) );
		add_theme_support( 'post-thumbnails' );
		add_filter('widget_text', 'do_shortcode');
	}
	add_action( 'after_setup_theme', 'madmouse_theme_setup' );