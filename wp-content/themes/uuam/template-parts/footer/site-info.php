<?php
/**
 * Displays footer site info
 *
 * @package WordPress
 * @subpackage Up_Up_AM
 * @since 1.0
 * @version 1.0
 */

?>
<div class="site-info">
	<?php
	if ( function_exists( 'the_privacy_policy_link' ) ) {
		the_privacy_policy_link( '', '<span role="separator" aria-hidden="true"></span>' );
	}
	?>
	<a href="<?php echo esc_url( __( 'https://wordpress.org/', 'uuam' ) ); ?>" class="imprint">
		<?php printf( __( 'Proudly powered by %s', 'uuam' ), 'WordPress' ); ?>
	</a>
</div><!-- .site-info -->
