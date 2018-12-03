<?php
/**
 * The template for displaying archive pages
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package WordPress
 * @subpackage Up_Up_AM
 * @since 1.0
 * @version 1.0
 */

get_header(); ?>


	<?php 
	// get the current taxonomy term
	$term = get_queried_object();
	// vars
	$headerImage = get_field('header_image', $term);
	if (!$headerImage) {
		$headerImage = get_theme_file_uri('/assets/images/works-page-cover.jpg');
	}
	?>
<div class="category-header" style="background: url(<?php echo $headerImage ?>) no-repeat top center; background-size: 100% auto;">
	<?php the_archive_description( '<div class="category-description">', '</div>' ); ?>
</div>
	<div id="primary" class="content-area">
		<main id="main" class="category-about-content" role="main">
			<div class="section-container">
				<div class="row">
					<?php
					if ( have_posts() ) : ?>
						<?php
						/* Start the Loop */
						while ( have_posts() ) : the_post(); ?>
							<div class="column medium-4 text-left">
								<div class="column-frame">
									<a class="about-thumbnail" href="<?php echo get_post_permalink(get_the_ID()) ?>">
										<?php echo get_the_post_thumbnail(get_the_ID(), 'full' ) ?>
									</a>
									<p class="about-name">
										<?php echo the_title() ?>
									</p>
									<p class="about-job-description">
										<?php echo get_field('job_description' ) ?>
									</p>
								</div>
							</div>
							<?php
						endwhile;
					else :

						get_template_part( 'template-parts/post/content', 'none' );

					endif; ?>
				</div>
			</div>
		</main><!-- #main -->
	</div><!-- #primary -->
	<?php get_sidebar(); ?>
</div><!-- .wrap -->

<?php get_footer();
