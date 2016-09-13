<?php
/**
 * @package WordPress
 * @subpackage Mad_Mouse_Theme
 * @since Mad Mouse Creative 1.0
 */
get_header(); ?>

	<?php if (have_posts()) : while (have_posts()) : the_post(); ?>

    	<div class="row">
			
            <div class="large-8 columns">
    
                <h1><?php the_title(); ?></h1>
    
                <article class="entry-content post" id="post-<?php the_ID(); ?>">
                
                    <?php the_content(); ?>
                    
                    <?php wp_link_pages(array('before' => __('Pages: '), 'next_or_number' => 'number')); ?>
                    
                    <?php the_tags( __('Tags: '), ', ', ''); ?>
                    
                    <?php posted_on(); ?>
                    
                </article>
    
                <?php post_navigation(); ?>
                    
            </div>
            
            <div class="large-4 columns">
            
				<?php get_sidebar(); ?>
                
            </div>
        
       </div>

	<?php //comments_template(); ?>

	<?php endwhile; endif; ?>

<?php edit_post_link(__('Edit this entry'), '<div class="edit-post">', '</div>'); ?>

<?php get_footer(); ?>
