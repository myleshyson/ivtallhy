<?php
/**
 * @package WordPress
 * @subpackage Mad_Mouse_Theme
 * @since Mad Mouse Creative 1.0
 */
get_header(); ?>
    <?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
    <div class="page-header" id="page-header" style="
    <?php if(has_post_thumbnail()) { ?>
    background-image: url('<?php echo get_the_post_thumbnail_url(); } ?>');
    ">
        <h1 class="header-title text-center"><?php the_title(); ?></h1>
    </div>
    <div data-sticky-container>
  <div data-sticky data-margin-top='0' data-top-anchor="page-header:bottom" data-btm-anchor="content:bottom">
    <?php get_template_part('parts/top-nav'); ?>
  </div>
</div>
    <div class="row main-content" id="content">
        <div class="small-8 small-offset-2 main-content columns">
            <?php the_content(); ?>
             <?php edit_post_link(__('Edit this entry'), '<div class="button large alert">', '</div>'); ?>
        </div>
    </div>
<?php endwhile; endif; ?>
    <?php get_footer(); ?>
