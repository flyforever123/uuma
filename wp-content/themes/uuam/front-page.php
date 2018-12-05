<?php
/**
 * The front page template file
 *
 * If the user has selected a static page for their homepage, this is what will
 * appear.
 * Learn more: https://codex.wordpress.org/Template_Hierarchy
 *
 * @package WordPress
 * @subpackage Up_Up_AM
 * @since 1.0
 * @version 1.0
 */

get_header(); ?>

<div id="primary" class="content-area">
	<main id="main" class="site-main" role="main">
		<div class="section padding-0x section-homepage section-main-slider">
			<div class="slideshow-page-header">
				<?php echo do_shortcode('[slider]'); ?>
			</div>
		</div>
		<div class="section padding-0x section-logo-slider">
			<div class="colour-background-light-grey section-homepage">
				<div class="section-container">
					<div class="row">
						<div class="column medium-10 large-8 xlarge-7 medium-centered align-center margin-bottom-5x medium-margin-bottom-2x large-margin-bottom-3x">
							<h2 class="margin-bottom-0x">
								We Aren’t <i class="blue-color">Just</i> a Web Design Agency.
							</h2>
							<p>We are a collective of individuals who care about what we do,<br /> who we work with, the businesses we partner with, and having fun.</p>
						</div>
					</div>
					<div class="row">
						<div class="column medium-12">
							<?php echo do_shortcode('[logo_slider]'); ?>
						</div>
					</div>
					<div class="row">
						<div class="column medium-10 large-8 xlarge-7 medium-centered align-center margin-bottom-5x medium-margin-bottom-2x large-margin-bottom-3x">
							<p>Whether you’re a local business, startup, or a global organization. <br />We treat you the same.</p>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="section padding-0x  section-analytics">
			<div class="colour-background-dark-grey section-homepage">
				<div class="section-container">
					<div class="row row-eq-height">
						<div class="column medium-5 align-center">
							<h2 class="pull-right">We Combine <span class="blue-color">Analytics</span> <br />with <span class="violet-color">Beautiful Design</span></h2>
						</div>
						<div class="column medium-7 align-left">
							<img src="<?php echo get_theme_file_uri('/assets/images/') ?>combine_design_and_analytics.png" alt="" />
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="section padding-0x  section-our-services">
			<div class="colour-background-light-grey section-homepage">
				<div class="section-container">
					<h2>Our Services</h2>
					<div class="row">
						<div class="column medium-12">
							<ul>
								<li>web <br />design</li>
								<li>e-commerce <br />web development</li>
								<li>seo</li>
								<li>paid <br />advertising</li>
								<li>branding</li>
							</ul>
							<div class="align-center margin-top-70">
								<a href="#" class="btn btn-15">LEARN MORE</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="section padding-0x section-testimonials">
			<div class="colour-background-dark-grey section-homepage">
				<div class="section-container">
					<h2>Testimonials</h2>
					<div class="row">
						<div class="column medium-12">
							<?php echo do_shortcode('[testimonials name="testimonials" numberposts="3"]'); ?>
						</div>
					</div>
					<div class="row">
						<div class="align-center margin-top-70">
							<a href="#" class="btn btn-15">LEARN MORE</a>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="section padding-0x section-projects">
			<div class="colour-background-light-grey section-homepage">
				<div class="section-container">
					<h2>Latest Projects</h2>
					<?php echo do_shortcode('[latest_projects name="work" numberposts="1"]') ?>
				</div>
			</div>
		</div>
		
	</main><!-- #main -->
</div><!-- #primary -->

<?php get_footer();
