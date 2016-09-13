<?php
/**
 * @package WordPress
 * @subpackage Mad_Mouse_Theme
 * @since Mad Mouse Creative 1.0
 */
get_header(); ?>

    <div class="row">
        
        <div class="large-8 columns">
    
			<?php if (have_posts()) : ?>
        
                <?php $post = $posts[0]; // Hack. Set $post so that the_date() works. ?>
        
                <?php /* If this is a category archive */ if (is_category()) { ?>
                    <h2><?php _e('Archive for the','madmousetheme'); ?> &#8216;<?php single_cat_title(); ?>&#8217; <?php _e('Category','madmousetheme'); ?></h2>
        
                <?php /* If this is a tag archive */ } elseif( is_tag() ) { ?>
                    <h2><?php _e('Posts Tagged','madmousetheme'); ?> &#8216;<?php single_tag_title(); ?>&#8217;</h2>
        
                <?php /* If this is a daily archive */ } elseif (is_day()) { ?>
                    <h2><?php _e('Archive for','madmousetheme'); ?> <?php the_time('F jS, Y'); ?></h2>
        
                <?php /* If this is a monthly archive */ } elseif (is_month()) { ?>
                    <h2><?php _e('Archive for','madmousetheme'); ?> <?php the_time('F, Y'); ?></h2>
        
                <?php /* If this is a yearly archive */ } elseif (is_year()) { ?>
                    <h2 class="pagetitle"><?php _e('Archive for','madmousetheme'); ?> <?php the_time('Y'); ?></h2>
        
                <?php /* If this is an author archive */ } elseif (is_author()) { ?>
                    <h2 class="pagetitle"><?php _e('Author Archive','madmousetheme'); ?></h2>
        
                <?php /* If this is a paged archive */ } elseif (isset($_GET['paged']) && !empty($_GET['paged'])) { ?>
                    <h2 class="pagetitle"><?php _e('Blog Archives','madmousetheme'); ?></h2>
                
                <?php } ?>
        
                <?php //post_navigation(); ?>
        
                <?php while (have_posts()) : the_post(); ?>
                
                    <article <?php post_class('blog-post') ?> id="post-<?php the_ID(); ?>">
                    
                        <h2><a href="<?php the_permalink() ?>"><?php the_title(); ?></a></h2>
                        
						<?php //posted_on(); ?>
    
                        <div class="entry-content">
                        
                            <?php the_content(); ?>
                            
                        </div>
        
                    </article>
        
                <?php endwhile; ?>
        
                <?php post_navigation(); ?>
                    
            <?php else : ?>
        
                <h2><?php _e('Nothing Found','foundation-mmc'); ?></h2>
        
            <?php endif; ?>

        </div>
        
        <div class="large-4 columns">
        
            <?php get_sidebar(); ?>
            
        </div>
    
   </div>

<?php get_footer(); ?>
