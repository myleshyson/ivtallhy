<?php
/**
 * @package WordPress
 * @subpackage Mad_Mouse_Theme
 * @since Mad Mouse Creative 1.0
 */
get_header(); ?>

<?php if (have_posts()) : while (have_posts()) : the_post(); ?>

<div id="header" style="background-image: url('<?php echo get_the_post_thumbnail_url(); ?>'); ">
 	<h1 class="header-title text-center"><?php the_title(); ?></h1>
 	<i class="fa fa-angle-down animated bounce" aria-hidden="true"></i>
 	<div class="header-gradient" style="background-image: linear-gradient( 0deg, rgba(14,17,17, .6), rgba(14,17,17, .6) ); "></div>
</div>
<div data-sticky-container>
  <div data-sticky data-margin-top='0' data-top-anchor="header:bottom" data-btm-anchor="content:bottom">
    <?php get_template_part('parts/top-nav'); ?>
  </div>
</div>

<div class="row expanded front-content" id="content">

	<div class="row">
		<div class="small-10 small-offset-1 columns intro-content">	
			<?php the_content(); ?>
		</div>
	</div>

	<div class="row connect-content text-center">
		<h2 class="connect-title">Learn More About Our...</h2>
		<div class="medium-6 columns">
			<a href="<?php echo get_page_link(8) ?>">
			<i class="fa fa-book" aria-hidden="true"></i>
			<h2>Small Groups</h2>
			</a>
		</div>
		<div class="medium-6 columns">
		<a href="<?php echo get_page_link(46) ?>">
			<i class="fa fa-heart" aria-hidden="true"></i>
			<h2>Core Values</h2>
			</a>
		</div>
		<!-- <div class="medium-4 columns">
		<a href="<?php echo get_page_link(46) ?>">
		<i class="fa fa-users" aria-hidden="true"></i>
			<h2>Staff</h2>
		</a>
		</div> -->
	</div>
	<div class="row the-word">
		<div class="word-wrap small-8 small-offset-2 columns">
			<h2 class="word-title ">Common Ground</h2>
			<div class="word-content"><?php the_field('word_content'); ?></div>
		</div>
	</div>	
</div>
	<?php endwhile; endif; ?>

<?php get_footer(); ?>
