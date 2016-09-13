<?php

// Widgets
	if ( function_exists('register_sidebar' )) {
		function madmousetheme_widgets_init() {
			register_sidebar( array(
				'name'          => __( 'Sidebar Widgets', 'madmousetheme' ),
				'id'            => 'sidebar-primary',
				'before_widget' => '<aside id="%1$s" class="widget %2$s">',
				'after_widget'  => '</aside>',
				'before_title'  => '<h3 class="widget-title">',
				'after_title'   => '</h3>',
			) );
		}
		add_action( 'widgets_init', 'madmousetheme_widgets_init' );
	}

	// Posted On
	function posted_on() {
		printf( __( '<span class="sep">Posted </span><time class="entry-date" datetime="%3$s">%4$s</time> by <span class="byline author vcard">%5$s</span>', '' ),
			esc_url( get_permalink() ),
			esc_attr( get_the_time() ),
			esc_attr( get_the_date( 'c' ) ),
			esc_html( get_the_date() ),
			esc_attr( get_the_author() )
		);
	}
	
	// Remove width and height from featured image
	add_filter( 'post_thumbnail_html', 'remove_width_attribute', 10 );
	add_filter( 'image_send_to_editor', 'remove_width_attribute', 10 );
	
	function remove_width_attribute( $html ) {
	   $html = preg_replace( '/(width|height)="\d*"\s/', "", $html );
	   return $html;
	}	
	
	// Add Title Attribute for Featured Image
	function featured_image_titles($attr, $attachment = null){
		$attr['title'] = get_post($attachment->ID)->post_title;
		return $attr;
	}
	add_filter('wp_get_attachment_image_attributes', 'featured_image_titles', 10, 2);
	
	function wd_remove_hentry( $classes ) {
		if ( is_page() ) {
			$classes = array_diff( $classes, array( 'hentry' ) );
		}
	return $classes;
	}
	add_filter( 'post_class','wd_remove_hentry' );