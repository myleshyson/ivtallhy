<?php
/**
* @package WordPress
* @subpackage Mad_Mouse_Theme
* @since Mad Mouse Creative 1.0
*/
?>
<!DOCTYPE html>
<!--[if lt IE 7 ]> <html class="ie ie6 ie-lt10 ie-lt9 ie-lt8 ie-lt7 no-js" <?php language_attributes(); ?>> <![endif]-->
<!--[if IE 7 ]>    <html class="ie ie7 ie-lt10 ie-lt9 ie-lt8 no-js" <?php language_attributes(); ?>> <![endif]-->
<!--[if IE 8 ]>    <html class="ie ie8 ie-lt10 ie-lt9 no-js" <?php language_attributes(); ?>> <![endif]-->
<!--[if IE 9 ]>    <html class="ie ie9 ie-lt10 no-js" <?php language_attributes(); ?>> <![endif]-->
<!--[if gt IE 9]><!--><html class="no-js" <?php language_attributes(); ?>><!--<![endif]-->
<!-- the "no-js" class is for Modernizr. -->
<head id="<?php echo of_get_option('meta_headid'); ?>">
	<meta charset="<?php bloginfo('charset'); ?>">
	
	<!-- Always force latest IE rendering engine (even in intranet) & Chrome Frame -->
	<!--[if IE ]>
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<![endif]-->
	<?php if (is_search()) echo '<meta name="robots" content="noindex, nofollow" />'; ?>
	
	<title><?php wp_title( '|', true, 'right' ); ?></title>
	<?php if (true == of_get_option('meta_google')) echo '<meta name="google-site-verification" content="'.of_get_option("meta_google").'" />'; ?>
	<!--  Mobile Viewport meta tag
	j.mp/mobileviewport & davidbcalhoun.com/2010/viewport-metatag
	device-width : Occupy full width of the screen in its current orientation
	initial-scale = 1.0 retains dimensions instead of zooming out if page height > device height
	maximum-scale = 1.0 retains dimensions instead of zooming in if page width < device width -->
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
	<?php if (true == of_get_option('head_favicon')) {
	echo '<link rel="shortcut icon" href="'.of_get_option("head_favicon").'" />';
	echo '<!-- This is the traditional favicon.
		- size: 16x16 or 32x32
		- transparency is OK
	- see wikipedia for info on browser support: http://mky.be/favicon/ -->';
	} ?>
	<?php if (true == of_get_option('head_apple_touch_icon')) {
	echo '<link rel="apple-touch-icon" href="'.of_get_option("head_apple_touch_icon").'">';
	echo '<!-- The is the icon for iOS Web Clip.
		- size: 57x57 for older iPhones, 72x72 for iPads, 114x114 for iPhone4 retina display (IMHO, just go ahead and use the biggest one)
		- To prevent iOS from applying its styles to the icon name it thusly: apple-touch-icon-precomposed.png
	- Transparency is not recommended (iOS will put a black BG behind the icon) -->';
	} ?>
	<!-- CSS: Google Font -->
	<link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,700|Oxygen:400,700" rel="stylesheet">
	<script src="https://use.fontawesome.com/be0c963726.js"></script>
	<!-- CSS: screen, mobile & print are all in the same file -->
	<link rel="stylesheet" href="<?php bloginfo('stylesheet_url'); ?>">
	<!-- all our JS is at the bottom of the page, except for Modernizr. -->
	<!-- This is an un-minified, complete version of Modernizr.
	Before you move to production, you should generate a custom build that only has the detects you need. -->
	
	<link rel="profile" href="http://gmpg.org/xfn/11" />
	<link rel="pingback" href="<?php bloginfo('pingback_url'); ?>" />
	<?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>

<div class="hide-for-medium">
	<div class="title-bar"  data-responsive-toggle="mobile-nav" data-hide-for="medium">
	  <button class="menu-icon" type="button" ></button>
	  <div class="title-bar-title">Menu</div>
	</div>
	<div class="text-center top-bar" id="mobile-nav">
				<?php mmc_top_nav(); ?>
	</div>
</div>

					