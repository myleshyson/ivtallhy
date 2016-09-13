<?php
/**
 * @package WordPress
 * @subpackage Mad_Mouse_Theme
 * @since Mad Mouse Creative 1.0
 */
get_header(); ?>

    <div class="row">
        
        <div class="large-8 columns">
    
            <h2><?php _e('Error 404 - Page Not Found','madmousetheme'); ?></h2>
            
            <p>&nbsp;</p>
            
            <ul>
                <?php wp_list_pages('title_li='); ?>
            </ul>
    
        <div class="large-4 columns">
        
            <?php get_sidebar(); ?>
            
        </div>
    
   </div>
		
<?php get_footer(); ?>