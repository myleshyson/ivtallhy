<?php
/**
 * @package WordPress
 * @subpackage Mad_Mouse_Theme
 * @since Mad Mouse Creative 1.0
 */

// Theme Setup
require_once(get_template_directory() .'/components/theme-setup.php'); 

// Enque Scripts
require_once(get_template_directory() .'/components/enque-scripts.php'); 

// Theme Clean Up
require_once(get_template_directory() .'/components/clean.php'); 

// Navs
require_once(get_template_directory() .'/components/menu.php'); 

// Widgets
require_once(get_template_directory() .'/components/widgets.php');

// Mail
require_once(get_template_directory() .'/components/mail.php'); 	

// We can add more down here,like shortcodes, custom post type..etc.
	