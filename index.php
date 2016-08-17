<?php
/**
 * @package WordPress
 * @subpackage Mad_Mouse_Theme
 * @since Mad Mouse Creative 1.0
 */
get_header(); ?>

    <div class="row">
        
        <div class="large-8 columns">
            
            <h1><?php echo get_the_title($page_for_posts); ?></h1>
    
			<?php if (have_posts()) : while (have_posts()) : the_post(); ?>
        
                <article <?php post_class('blog-post') ?> id="post-<?php the_ID(); ?>">
                
                    <h2><a href="<?php the_permalink() ?>"><?php the_title(); ?></a></h2>
                    
                    <?php //posted_on(); ?>
                    
                    <div class="entry-content">
                    
                        <?php the_content(); ?>
                        
                    </div>
                    
                    <footer class="postmetadata">
                        <?php the_tags(__('Tags: ','madmousetheme'), ', ', '<br />'); ?>
                        <?php _e('Posted in','madmousetheme'); ?> <?php the_category(', ') ?> | 
                        <?php comments_popup_link(__('No Comments &#187;','madmousetheme'), __('1 Comment &#187;','madmousetheme'), __('% Comments &#187;','madmousetheme')); ?>
                    </footer>
                
                </article>      
                
				<?php post_navigation(); ?>
            
			<?php endwhile; ?>
            
        </div>

        <div class="large-4 columns">
        
			<?php get_sidebar(); ?>
        
        </div>

    </div>

	<?php else : ?>

		<h2><?php _e('Nothing Found','madmousetheme'); ?></h2>

	<?php endif; ?>

<?php get_footer(); ?>
