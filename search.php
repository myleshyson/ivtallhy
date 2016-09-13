<?php
/**
 * @package WordPress
 * @subpackage Mad_Mouse_Theme
 * @since Mad Mouse Creative 1.0
 */
get_header(); ?>

	<?php if (have_posts()) : ?>

		<h2><?php _e('Search Results','madmousetheme'); ?></h2>

		<?php post_navigation(); ?>

		<?php while (have_posts()) : the_post(); ?>

			<article <?php post_class() ?> id="post-<?php the_ID(); ?>">

				<h2><?php the_title(); ?></h2>

				<?php posted_on(); ?>

				<div class="entry-content">

					<?php the_excerpt(); ?>

				</div>

			</article>

		<?php endwhile; ?>

		<?php post_navigation(); ?>

	<?php else : ?>

		<h2><?php _e('Nothing Found','madmousetheme'); ?></h2>

	<?php endif; ?>

<?php get_sidebar(); ?>

<?php get_footer(); ?>
