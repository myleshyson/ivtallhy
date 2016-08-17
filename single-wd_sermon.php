<?php
/**
 * @package WordPress
 * @subpackage Mad_Mouse_Theme
 * @since Mad Mouse Creative 1.0
 */
get_header(); ?>

	<?php if (have_posts()) : while (have_posts()) : the_post(); ?>
			
		<article class="post" id="post-<?php the_ID(); ?>">

			<h2><?php the_title(); ?></h2>

			<div class="entry-content">

				<?php the_content(); ?>
                
                <?php if ( get_post_meta( get_the_ID(), '_wd_sermon_date', true ) ) : ?>
                	<?php $timeToConvert = get_post_meta( get_the_ID(), '_wd_sermon_date', true ); ?>
                    <p><?php echo date('F j, Y', $timeToConvert); ?></p>
                <?php endif; ?>
                <?php if ( get_post_meta( get_the_ID(), '_wd_speaker_selection', true ) ) : ?>
                    <p>Speaker: <?php echo get_the_term_list($post->ID, 'wd_sermon_speakers', '', ', ',''); ?></p>
                <?php endif; ?>
                <?php if ( get_post_meta( get_the_ID(), '_wd_sermon_series_selection', true ) ) : ?>
                    <p>Series: <?php echo get_the_term_list($post->ID, 'wd_sermon_series', '', ', ',''); ?></p>
                <?php endif; ?>
                
				<?php if ( get_post_meta( get_the_ID(), '_wd_sermon_notes', true ) ) : ?>
                	<a href="<?php echo get_post_meta( get_the_ID(), '_wd_sermon_notes', true ); ?>" download="<?php get_the_title(); ?>" title="Download notes for <?php get_the_title(); ?>">Download Sermon Notes</a>
                <?php endif; ?>
                
				<?php if ( get_post_meta( get_the_ID(), '_wd_sermon_text', true ) ) : ?>
                
                    <h3><?php echo get_post_meta( get_the_ID(), '_wd_sermon_text', true ); ?></h3>
                    
                    <?php // ESV API
                        $key = "3c2214fb4d062da8"; // Replace with custom API Key - http://www.esvapi.org/signup
                        $scriptureRef = get_post_meta( get_the_ID(), '_wd_sermon_text', true );
                        $passage = urlencode($scriptureRef);
                        $options = "include-passage-references=false";
                        $options = "include-headings=true";
                        $options = "include-passage-references=false";
                        $url = "http://www.esvapi.org/v2/rest/passageQuery?key=$key&passage=$passage&$options";
                        $ch = curl_init($url); 
                        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1); 
                        $response = curl_exec($ch);
                        curl_close($ch);
                        print $response;
                    ?>
                
                <?php endif; ?>
                                
				<?php //wp_link_pages(array('before' => __('Pages: '), 'next_or_number' => 'number')); ?>

			</div>

			<?php edit_post_link(__('Edit this entry.'), '<p>', '</p>'); ?>

		</article>
		
		<?php endwhile; endif; ?>
        
<?php get_sidebar(); ?>

<?php get_footer(); ?>
