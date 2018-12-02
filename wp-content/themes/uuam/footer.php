<?php
/**
 * The template for displaying the footer
 *
 * Contains the closing of the #content div and all content after.
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package WordPress
 * @subpackage Up_Up_AM
 * @since 1.0
 * @version 1.2
 */

?>

		</div><!-- #content -->

		<footer id="colophon" class="site-footer colour-background-light-light-grey" role="contentinfo">
			<div class="">
				<div class="row">
					<div class="column medium-6 colour-background-dark-grey">
						<div class="column medium-5">
							<h3>EXPLORE</h3>
							<?php
								if ( has_nav_menu( 'footer' ) ) : ?>
									<nav class="footer-navigation" role="navigation" aria-label="<?php esc_attr_e( 'Footer Social Links Menu', 'uuam' ); ?>">
										<?php
											wp_nav_menu( array(
												'theme_location' => 'footer',
												'menu_class'     => 'footer-menu',
												'depth'          => 1
											) );
										?>
									</nav><!-- .social-navigation -->
								<?php endif; ?>
						</div>
						<div class="column medium-7">
							<h3>Get in touch</h3>
							<?php
							if ( is_active_sidebar( 'sidebar-2' ) ) { ?>
								<div class="widget-column footer-widget-1">
									<?php dynamic_sidebar( 'sidebar-2' ); ?>
								</div>
							<?php } ?>
						</div>

						<?php get_template_part( 'template-parts/footer/site', 'info' );
						 ?>
					</div>
					<div class="column medium-6 colour-background-light-light-grey">
						<?php
						if ( is_active_sidebar( 'sidebar-3' ) ) { ?>
							<div class="widget-column footer-widget-2">
								<?php dynamic_sidebar( 'sidebar-3' ); ?>
							</div>
						<?php } ?>
					</div>
				</div>
			</div><!-- .wrap -->
		</footer><!-- #colophon -->
	</div><!-- .site-content-contain -->
</div><!-- #page -->
<?php wp_footer(); ?>

</body>
</html>
