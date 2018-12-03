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
	<?php if ( have_posts() ) : ?>
		<header class="page-header">
			<?php
				the_archive_title( '<h1 class="page-title">', '</h1>' );
			?>
		</header><!-- .page-header -->
	<?php endif; ?>

	<div id="primary" class="content-area">
		<main id="main" class="site-main" role="main">

		<?php
		if ( have_posts() ) : ?>
			<?php
			/* Start the Loop */
			while ( have_posts() ) : the_post();

				/*
				 * Include the Post-Format-specific template for the content.
				 * If you want to override this in a child theme, then include a file
				 * called content-___.php (where ___ is the Post Format name) and that will be used instead.
				 */
				get_template_part( 'template-parts/post/content', get_post_format() );

			endwhile;

			the_posts_pagination( array(
				'prev_text' => uuam_get_svg( array( 'icon' => 'arrow-left' ) ) . '<span class="screen-reader-text">' . __( 'Previous page', 'uuam' ) . '</span>',
				'next_text' => '<span class="screen-reader-text">' . __( 'Next page', 'uuam' ) . '</span>' . uuam_get_svg( array( 'icon' => 'arrow-right' ) ),
				'before_page_number' => '<span class="meta-nav screen-reader-text">' . __( 'Page', 'uuam' ) . ' </span>',
			) );

		else :

			get_template_part( 'template-parts/post/content', 'none' );

		endif; ?>

		</main><!-- #main -->
	</div><!-- #primary -->
	<?php get_sidebar(); ?>
</div><!-- .wrap -->

<?php get_footer();
