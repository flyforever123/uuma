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
		<main id="main" class="category-work-content" role="main">

		<?php
		if ( have_posts() ) : ?>
			<?php
			/* Start the Loop */
			$i = 0;
			while ( have_posts() ) : the_post();
				if ($i % 2 == 0) : ?>
					<div class="row">
						<div class="column medium-6 text-right">
							<a href="<?php echo get_post_permalink(get_the_ID()) ?>">
								<?php echo get_the_post_thumbnail(get_the_ID(), 'full' ) ?>
							</a>							
						</div>
						<div class="column medium-6  text-left">
							<div class="testimonial-quote">
								<?php echo get_field('testimonial_quote' ) ?>
							</div>
							<div class="testimonial-customer">
								<?php echo get_field('testimonial_customer' ) ?>
							</div>
						</div>
						<hr />
						<span class="circle"></span>
					</div>
				<?php else : ?>
					<div class="row">
						<div class="column medium-6 text-right">
							<div class="testimonial-quote">
								<?php echo get_field('testimonial_quote' ) ?>
							</div>
							<div class="testimonial-customer">
								<?php echo get_field('testimonial_customer' ) ?>
							</div>
							
						</div>
						<div class="column medium-6 text-left">
							<a href="<?php echo get_post_permalink(get_the_ID()) ?>">
								<?php echo get_the_post_thumbnail(get_the_ID(), 'full' ) ?>
							</a>
						</div>
						<hr />
						<span class="circle"></span>
					</div>
				
				<?php endif;
				$i++;
			endwhile;
		else :

			get_template_part( 'template-parts/post/content', 'none' );

		endif; ?>

		</main><!-- #main -->
	</div><!-- #primary -->
	<?php get_sidebar(); ?>
</div><!-- .wrap -->

<?php get_footer();
