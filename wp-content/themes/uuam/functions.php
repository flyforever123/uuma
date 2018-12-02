<?php
/**
 * Up Up Away Media functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package WordPress
 * @subpackage Up_Up_AM
 * @since 1.0
 */

/**
 * Up Up Away Media only works in WordPress 4.7 or later.
 */
if ( version_compare( $GLOBALS['wp_version'], '4.7-alpha', '<' ) ) {
	require get_template_directory() . '/inc/back-compat.php';
	return;
}

/**
 * Sets up theme defaults and registers support for various WordPress features.
 *
 * Note that this function is hooked into the after_setup_theme hook, which
 * runs before the init hook. The init hook is too late for some features, such
 * as indicating support for post thumbnails.
 */
function uuam_setup() {
	/*
	 * Make theme available for translation.
	 * Translations can be filed at WordPress.org. See: https://translate.wordpress.org/projects/wp-themes/uuam
	 * If you're building a theme based on Up Up Away Media, use a find and replace
	 * to change 'uuam' to the name of your theme in all the template files.
	 */
	load_theme_textdomain( 'uuam' );

	// Add default posts and comments RSS feed links to head.
	add_theme_support( 'automatic-feed-links' );

	/*
	 * Let WordPress manage the document title.
	 * By adding theme support, we declare that this theme does not use a
	 * hard-coded <title> tag in the document head, and expect WordPress to
	 * provide it for us.
	 */
	add_theme_support( 'title-tag' );

	/*
	 * Enable support for Post Thumbnails on posts and pages.
	 *
	 * @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
	 */
	add_theme_support( 'post-thumbnails' );

	add_image_size( 'uuam-featured-image', 2000, 1200, true );

	add_image_size( 'uuam-thumbnail-avatar', 100, 100, true );

	// Set the default content width.
	$GLOBALS['content_width'] = 525;

	// This theme uses wp_nav_menu() in two locations.
	register_nav_menus( array(
		'top'    => __( 'Top Menu', 'uuam' ),
		'social' => __( 'Social Links Menu', 'uuam' ),
		'footer' => __( 'Footer Menu', 'uuam' ),
	) );

	/*
	 * Switch default core markup for search form, comment form, and comments
	 * to output valid HTML5.
	 */
	add_theme_support( 'html5', array(
		'comment-form',
		'comment-list',
		'gallery',
		'caption',
	) );

	/*
	 * Enable support for Post Formats.
	 *
	 * See: https://codex.wordpress.org/Post_Formats
	 */
	add_theme_support( 'post-formats', array(
		'aside',
		'image',
		'video',
		'quote',
		'link',
		'gallery',
		'audio',
	) );

	// Add theme support for Custom Logo.
	add_theme_support( 'custom-logo', array(
		'width'       => 250,
		'height'      => 250,
		'flex-width'  => true,
	) );

	// Add theme support for selective refresh for widgets.
	add_theme_support( 'customize-selective-refresh-widgets' );

	/*
	 * This theme styles the visual editor to resemble the theme style,
	 * specifically font, colors, and column width.
 	 */
	add_editor_style( array( 'assets/css/editor-style.css', uuam_fonts_url() ) );

	// Define and register starter content to showcase the theme on new sites.
	$starter_content = array(
		'widgets' => array(
			// Place three core-defined widgets in the sidebar area.
			'sidebar-1' => array(
				'text_business_info',
				'search',
				'text_about',
			),

			// Add the core-defined business info widget to the footer 1 area.
			'sidebar-2' => array(
				'text_business_info',
			),

			// Put two core-defined widgets in the footer 2 area.
			'sidebar-3' => array(
				'text_about',
				'search',
			),
		),

		// Specify the core-defined pages to create and add custom thumbnails to some of them.
		'posts' => array(
			'home',
			'about' => array(
				'thumbnail' => '{{image-sandwich}}',
			),
			'contact' => array(
				'thumbnail' => '{{image-espresso}}',
			),
			'blog' => array(
				'thumbnail' => '{{image-coffee}}',
			),
			'homepage-section' => array(
				'thumbnail' => '{{image-espresso}}',
			),
		),

		// Create the custom image attachments used as post thumbnails for pages.
		'attachments' => array(
			'image-espresso' => array(
				'post_title' => _x( 'Espresso', 'Theme starter content', 'uuam' ),
				'file' => 'assets/images/espresso.jpg', // URL relative to the template directory.
			),
			'image-sandwich' => array(
				'post_title' => _x( 'Sandwich', 'Theme starter content', 'uuam' ),
				'file' => 'assets/images/sandwich.jpg',
			),
			'image-coffee' => array(
				'post_title' => _x( 'Coffee', 'Theme starter content', 'uuam' ),
				'file' => 'assets/images/coffee.jpg',
			),
		),

		// Default to a static front page and assign the front and posts pages.
		'options' => array(
			'show_on_front' => 'page',
			'page_on_front' => '{{home}}',
			'page_for_posts' => '{{blog}}',
		),

		// Set the front page section theme mods to the IDs of the core-registered pages.
		'theme_mods' => array(
			'panel_1' => '{{homepage-section}}',
			'panel_2' => '{{about}}',
			'panel_3' => '{{blog}}',
			'panel_4' => '{{contact}}',
		),

		// Set up nav menus for each of the two areas registered in the theme.
		'nav_menus' => array(
			// Assign a menu to the "top" location.
			'top' => array(
				'name' => __( 'Top Menu', 'uuam' ),
				'items' => array(
					'link_home', // Note that the core "home" page is actually a link in case a static front page is not used.
					'page_about',
					'page_blog',
					'page_contact',
				),
			),

			// Assign a menu to the "social" location.
			'social' => array(
				'name' => __( 'Social Links Menu', 'uuam' ),
				'items' => array(
					'link_yelp',
					'link_facebook',
					'link_twitter',
					'link_instagram',
					'link_email',
				),
			),
		),
	);

	/**
	 * Filters Up Up Away Media array of starter content.
	 *
	 * @since Up Up Away Media 1.1
	 *
	 * @param array $starter_content Array of starter content.
	 */
	$starter_content = apply_filters( 'uuam_starter_content', $starter_content );

	add_theme_support( 'starter-content', $starter_content );
}
add_action( 'after_setup_theme', 'uuam_setup' );

/**
 * Set the content width in pixels, based on the theme's design and stylesheet.
 *
 * Priority 0 to make it available to lower priority callbacks.
 *
 * @global int $content_width
 */
function uuam_content_width() {

	$content_width = $GLOBALS['content_width'];

	// Get layout.
	$page_layout = get_theme_mod( 'page_layout' );

	// Check if layout is one column.
	if ( 'one-column' === $page_layout ) {
		if ( uuam_is_frontpage() ) {
			$content_width = 644;
		} elseif ( is_page() ) {
			$content_width = 740;
		}
	}

	// Check if is single post and there is no sidebar.
	if ( is_single() && ! is_active_sidebar( 'sidebar-1' ) ) {
		$content_width = 740;
	}

	/**
	 * Filter Up Up Away Media content width of the theme.
	 *
	 * @since Up Up Away Media 1.0
	 *
	 * @param int $content_width Content width in pixels.
	 */
	$GLOBALS['content_width'] = apply_filters( 'uuam_content_width', $content_width );
}
add_action( 'template_redirect', 'uuam_content_width', 0 );

/**
 * Register custom fonts.
 */
function uuam_fonts_url() {
	$fonts_url = '';

	/*
	 * Translators: If there are characters in your language that are not
	 * supported by Libre Franklin, translate this to 'off'. Do not translate
	 * into your own language.
	 */
	$libre_franklin = _x( 'on', 'Libre Franklin font: on or off', 'uuam' );

	if ( 'off' !== $libre_franklin ) {
		$font_families = array();

		$font_families[] = 'Libre Franklin:300,300i,400,400i,600,600i,800,800i';

		$query_args = array(
			'family' => urlencode( implode( '|', $font_families ) ),
			'subset' => urlencode( 'latin,latin-ext' ),
		);

		$fonts_url = add_query_arg( $query_args, 'https://fonts.googleapis.com/css' );
	}

	return esc_url_raw( $fonts_url );
}

/**
 * Add preconnect for Google Fonts.
 *
 * @since Up Up Away Media 1.0
 *
 * @param array  $urls           URLs to print for resource hints.
 * @param string $relation_type  The relation type the URLs are printed.
 * @return array $urls           URLs to print for resource hints.
 */
function uuam_resource_hints( $urls, $relation_type ) {
	if ( wp_style_is( 'uuam-fonts', 'queue' ) && 'preconnect' === $relation_type ) {
		$urls[] = array(
			'href' => 'https://fonts.gstatic.com',
			'crossorigin',
		);
	}

	return $urls;
}
add_filter( 'wp_resource_hints', 'uuam_resource_hints', 10, 2 );

/**
 * Register widget area.
 *
 * @link https://developer.wordpress.org/themes/functionality/sidebars/#registering-a-sidebar
 */
function uuam_widgets_init() {
	register_sidebar( array(
		'name'          => __( 'Blog Sidebar', 'uuam' ),
		'id'            => 'sidebar-1',
		'description'   => __( 'Add widgets here to appear in your sidebar on blog posts and archive pages.', 'uuam' ),
		'before_widget' => '<section id="%1$s" class="widget %2$s">',
		'after_widget'  => '</section>',
		'before_title'  => '<h2 class="widget-title">',
		'after_title'   => '</h2>',
	) );

	register_sidebar( array(
		'name'          => __( 'Footer 1', 'uuam' ),
		'id'            => 'sidebar-2',
		'description'   => __( 'Add widgets here to appear in your footer.', 'uuam' ),
		'before_widget' => '<section id="%1$s" class="widget %2$s">',
		'after_widget'  => '</section>',
		'before_title'  => '<h2 class="widget-title">',
		'after_title'   => '</h2>',
	) );

	register_sidebar( array(
		'name'          => __( 'Footer 2', 'uuam' ),
		'id'            => 'sidebar-3',
		'description'   => __( 'Add widgets here to appear in your footer.', 'uuam' ),
		'before_widget' => '<section id="%1$s" class="widget %2$s">',
		'after_widget'  => '</section>',
		'before_title'  => '<h2 class="widget-title">',
		'after_title'   => '</h2>',
	) );
}
add_action( 'widgets_init', 'uuam_widgets_init' );

/**
 * Replaces "[...]" (appended to automatically generated excerpts) with ... and
 * a 'Continue reading' link.
 *
 * @since Up Up Away Media 1.0
 *
 * @param string $link Link to single post/page.
 * @return string 'Continue reading' link prepended with an ellipsis.
 */
function uuam_excerpt_more( $link ) {
	if ( is_admin() ) {
		return $link;
	}

	$link = sprintf( '<p class="link-more"><a href="%1$s" class="more-link">%2$s</a></p>',
		esc_url( get_permalink( get_the_ID() ) ),
		/* translators: %s: Name of current post */
		sprintf( __( 'Continue reading<span class="screen-reader-text"> "%s"</span>', 'uuam' ), get_the_title( get_the_ID() ) )
	);
	return ' &hellip; ' . $link;
}
add_filter( 'excerpt_more', 'uuam_excerpt_more' );

/**
 * Handles JavaScript detection.
 *
 * Adds a `js` class to the root `<html>` element when JavaScript is detected.
 *
 * @since Up Up Away Media 1.0
 */
function uuam_javascript_detection() {
	echo "<script>(function(html){html.className = html.className.replace(/\bno-js\b/,'js')})(document.documentElement);</script>\n";
}
add_action( 'wp_head', 'uuam_javascript_detection', 0 );

/**
 * Add a pingback url auto-discovery header for singularly identifiable articles.
 */
function uuam_pingback_header() {
	if ( is_singular() && pings_open() ) {
		printf( '<link rel="pingback" href="%s">' . "\n", get_bloginfo( 'pingback_url' ) );
	}
}
add_action( 'wp_head', 'uuam_pingback_header' );

/**
 * Display custom color CSS.
 */
function uuam_colors_css_wrap() {
	if ( 'custom' !== get_theme_mod( 'colorscheme' ) && ! is_customize_preview() ) {
		return;
	}

	require_once( get_parent_theme_file_path( '/inc/color-patterns.php' ) );
	$hue = absint( get_theme_mod( 'colorscheme_hue', 250 ) );
?>
	<style type="text/css" id="custom-theme-colors" <?php if ( is_customize_preview() ) { echo 'data-hue="' . $hue . '"'; } ?>>
		<?php echo uuam_custom_colors_css(); ?>
	</style>
<?php }
add_action( 'wp_head', 'uuam_colors_css_wrap' );

/**
 * Enqueue scripts and styles.
 */
function uuam_scripts() {
	// Add custom fonts, used in the main stylesheet.
	wp_enqueue_style( 'uuam-fonts', uuam_fonts_url(), array(), null );
	wp_enqueue_style( 'uuam-slick', get_theme_file_uri( '/assets/css/slick.css' ), array( 'uuam-style' ), '1.0' );
	wp_enqueue_style( 'uuam-custom', get_theme_file_uri( '/assets/css/custom.css' ), array( 'uuam-style' ), '1.0' );
	// Theme stylesheet.
	wp_enqueue_style( 'uuam-style', get_stylesheet_uri() );

	// Load the dark colorscheme.
	if ( 'dark' === get_theme_mod( 'colorscheme', 'light' ) || is_customize_preview() ) {
		wp_enqueue_style( 'uuam-colors-dark', get_theme_file_uri( '/assets/css/colors-dark.css' ), array( 'uuam-style' ), '1.0' );
	}

	// Load the Internet Explorer 9 specific stylesheet, to fix display issues in the Customizer.
	if ( is_customize_preview() ) {
		wp_enqueue_style( 'uuam-ie9', get_theme_file_uri( '/assets/css/ie9.css' ), array( 'uuam-style' ), '1.0' );
		wp_style_add_data( 'uuam-ie9', 'conditional', 'IE 9' );
	}

	// Load the Internet Explorer 8 specific stylesheet.
	wp_enqueue_style( 'uuam-ie8', get_theme_file_uri( '/assets/css/ie8.css' ), array( 'uuam-style' ), '1.0' );
	wp_style_add_data( 'uuam-ie8', 'conditional', 'lt IE 9' );

	// Load the html5 shiv.
	wp_enqueue_script( 'html5', get_theme_file_uri( '/assets/js/html5.js' ), array(), '3.7.3' );
	wp_script_add_data( 'html5', 'conditional', 'lt IE 9' );

	wp_enqueue_script( 'uuam-skip-link-focus-fix', get_theme_file_uri( '/assets/js/skip-link-focus-fix.js' ), array(), '1.0', true );

	$uuam_l10n = array(
		'quote'          => uuam_get_svg( array( 'icon' => 'quote-right' ) ),
	);

	if ( has_nav_menu( 'top' ) ) {
		wp_enqueue_script( 'uuam-navigation', get_theme_file_uri( '/assets/js/navigation.js' ), array( 'jquery' ), '1.0', true );
		$uuam_l10n['expand']         = __( 'Expand child menu', 'uuam' );
		$uuam_l10n['collapse']       = __( 'Collapse child menu', 'uuam' );
		$uuam_l10n['icon']           = uuam_get_svg( array( 'icon' => 'angle-down', 'fallback' => true ) );
	}

	wp_enqueue_script( 'uuam-global', get_theme_file_uri( '/assets/js/global.js' ), array( 'jquery' ), '1.0', true );

	wp_enqueue_script( 'jquery-scrollto', get_theme_file_uri( '/assets/js/jquery.scrollTo.js' ), array( 'jquery' ), '2.1.2', true );
	wp_enqueue_script( 'jquery-custom', get_theme_file_uri( '/assets/js/jquery.custom.js' ), array( 'jquery' ), '2.1.2', true );

	wp_localize_script( 'uuam-skip-link-focus-fix', 'uuamScreenReaderText', $uuam_l10n );

	if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
		wp_enqueue_script( 'comment-reply' );
	}
}
add_action( 'wp_enqueue_scripts', 'uuam_scripts' );

/**
 * Add custom image sizes attribute to enhance responsive image functionality
 * for content images.
 *
 * @since Up Up Away Media 1.0
 *
 * @param string $sizes A source size value for use in a 'sizes' attribute.
 * @param array  $size  Image size. Accepts an array of width and height
 *                      values in pixels (in that order).
 * @return string A source size value for use in a content image 'sizes' attribute.
 */
function uuam_content_image_sizes_attr( $sizes, $size ) {
	$width = $size[0];

	if ( 740 <= $width ) {
		$sizes = '(max-width: 706px) 89vw, (max-width: 767px) 82vw, 740px';
	}

	if ( is_active_sidebar( 'sidebar-1' ) || is_archive() || is_search() || is_home() || is_page() ) {
		if ( ! ( is_page() && 'one-column' === get_theme_mod( 'page_options' ) ) && 767 <= $width ) {
			 $sizes = '(max-width: 767px) 89vw, (max-width: 1000px) 54vw, (max-width: 1071px) 543px, 580px';
		}
	}

	return $sizes;
}
add_filter( 'wp_calculate_image_sizes', 'uuam_content_image_sizes_attr', 10, 2 );

/**
 * Filter the `sizes` value in the header image markup.
 *
 * @since Up Up Away Media 1.0
 *
 * @param string $html   The HTML image tag markup being filtered.
 * @param object $header The custom header object returned by 'get_custom_header()'.
 * @param array  $attr   Array of the attributes for the image tag.
 * @return string The filtered header image HTML.
 */
function uuam_header_image_tag( $html, $header, $attr ) {
	if ( isset( $attr['sizes'] ) ) {
		$html = str_replace( $attr['sizes'], '100vw', $html );
	}
	return $html;
}
add_filter( 'get_header_image_tag', 'uuam_header_image_tag', 10, 3 );

/**
 * Add custom image sizes attribute to enhance responsive image functionality
 * for post thumbnails.
 *
 * @since Up Up Away Media 1.0
 *
 * @param array $attr       Attributes for the image markup.
 * @param int   $attachment Image attachment ID.
 * @param array $size       Registered image size or flat array of height and width dimensions.
 * @return array The filtered attributes for the image markup.
 */
function uuam_post_thumbnail_sizes_attr( $attr, $attachment, $size ) {
	if ( is_archive() || is_search() || is_home() ) {
		$attr['sizes'] = '(max-width: 767px) 89vw, (max-width: 1000px) 54vw, (max-width: 1071px) 543px, 580px';
	} else {
		$attr['sizes'] = '100vw';
	}

	return $attr;
}
add_filter( 'wp_get_attachment_image_attributes', 'uuam_post_thumbnail_sizes_attr', 10, 3 );

/**
 * Use front-page.php when Front page displays is set to a static page.
 *
 * @since Up Up Away Media 1.0
 *
 * @param string $template front-page.php.
 *
 * @return string The template to be used: blank if is_home() is true (defaults to index.php), else $template.
 */
function uuam_front_page_template( $template ) {
	return is_home() ? '' : $template;
}
add_filter( 'frontpage_template',  'uuam_front_page_template' );

/**
 * Modifies tag cloud widget arguments to display all tags in the same font size
 * and use list format for better accessibility.
 *
 * @since Up Up Away Media 1.4
 *
 * @param array $args Arguments for tag cloud widget.
 * @return array The filtered arguments for tag cloud widget.
 */
function uuam_widget_tag_cloud_args( $args ) {
	$args['largest']  = 1;
	$args['smallest'] = 1;
	$args['unit']     = 'em';
	$args['format']   = 'list';

	return $args;
}
add_filter( 'widget_tag_cloud_args', 'uuam_widget_tag_cloud_args' );

// [slider name="foo-value"]
function homepage_slider( $atts ) {
	$htmlShortCode = '';
	$slideContainer = '';
	$slidePagination = '';
	$slideHeaderBottom = '';
	$args = array(
        'post_status' => 'inherit',
        'post_type'=> 'attachment',
        'post_mime_type' => 'image/jpeg,image/gif,image/jpg,image/png',
		'meta_query'	=> array(
			'relation'		=> 'AND',
			array(
				'key'		=> 'homepage_slider_image',
				'compare'	=> '=',
				'value'		=> '1',
			)
		)
	);
	// query
	$the_query = new WP_Query( $args );
	if ($the_query->have_posts()):
		$i = 0;
		while ( $the_query->have_posts() ) : $the_query->the_post(); 
			$slideContainer .= '<div class="slideshow-page-header-slides">';
               	$slideContainer .= '<div class="section-container">';
                  	$slideContainer .= '<div class="row slideshow-page-header-row">';
                     	$slideContainer .= '<div class="column small-medium-9 medium-6 large-5 small-padding-0x slideshow-page-header-title">';
                     		$slideContainer .= '<h3 class="large-margin-bottom-1-5x" data-splitting="words">';
                     			$slideContainer .= get_post_meta( get_the_ID(), "image_description", true );
                     		$slideContainer .= '</h3>';
                        	$slideContainer .= '<h1 class="large-margin-bottom-0-5x" data-splitting="words">';
                        		$slideContainer .= get_post_meta( get_the_ID(), 'image_header', true );
                        	$slideContainer .= '</h1>';
	                        $slideContainer .= '<div class="slideshow-page-header-button">';
	                           	$slideContainer .= '<a href="' . get_post_meta( get_the_ID(), 'image_link', true ) . '" data-splitting=words>';
	                           	$slideContainer .= get_post_meta( get_the_ID(), 'image_button_name', true );
	                           	$slideContainer .= '</a>';
	                        $slideContainer .= '</div>';
                     	$slideContainer .= '</div>';
                     	$slideContainer .= '<div class="slideshow-page-header-image">';
                     		$slideContainer .= wp_get_attachment_image( get_the_ID(), 'full' );
                     	$slideContainer .= '</div>';
                  	$slideContainer .= '</div>';
               	$slideContainer .= '</div>';
            $slideContainer .= '</div>';
            $slidePagination .= '<li><a href="#" data-slideshow-slide-index="'. $i . '" class="'. ($i == 0 ? 'is-active' : '') .'">'. ($i + 1) .'</a></li>';
    		$slideHeaderBottom .= '<li><a href="#" data-slideshow-slide-index="'. $i . '" class="'. ($i == 0 ? 'is-active' : '') .'"><span>';
    		$slideHeaderBottom .= get_post_meta( get_the_ID(), "image_title_bottom", true );
    		$slideHeaderBottom .= '</span></a></li>';
            $i++;
		endwhile;
	endif;
	if (!empty($slideContainer)) {
		$htmlShortCode .= '<div class="slideshow-page-header-container js-slideshow-slick" data-slideshow-type="slideshow-page-header">';
			$htmlShortCode .= $slideContainer;
		$htmlShortCode .= '</div>';
		$htmlShortCode .= '<ul class="slideshow-page-header-dots js-slideshow-slick-pagination hide-for-large" data-slideshow-pagination="slideshow-page-header">';
			$htmlShortCode .= $slidePagination;
		$htmlShortCode .= '</ul>';
		$htmlShortCode .= '<div class="slideshow-page-header-bottom">';
			$htmlShortCode .= '<div class="section-container">';
				$htmlShortCode .= '<div class="row margin-bottom-2x">';
	               $htmlShortCode .= '<div class="column medium-12">';
						$htmlShortCode .= '<nav class="slideshow-page-header-tabs js-slideshow-slick-pagination">';
							$htmlShortCode .= '<ul data-slideshow-pagination="slideshow-page-header">';
								$htmlShortCode .= $slideHeaderBottom;
							$htmlShortCode .= '</ul>';
						$htmlShortCode .= '</nav>';
					$htmlShortCode .= '</div>';
				$htmlShortCode .= '</div>';
				/*$htmlShortCode .= '<div class="row align-center large-margin-bottom-1x">';
					$htmlShortCode .= '<a href="#" class="header-scroll-icon">Scroll Down</a>';
				$htmlShortCode .= '</div>';*/
			$htmlShortCode .= '</div>';
		$htmlShortCode .= '</div>';
	}
	return $htmlShortCode;
}
add_shortcode( 'slider', 'homepage_slider' );

// [logo_slider name="foo-value"]
function homepage_logo_slider( $atts ) {
	$htmlShortCode = '';
	$args = array(
        'post_status' => 'inherit',
        'post_type'=> 'attachment',
        'post_mime_type' => 'image/jpeg,image/gif,image/jpg,image/png',
		'meta_query'	=> array(
			'relation'		=> 'AND',
			array(
				'key'		=> 'logo_slider_image',
				'compare'	=> '=',
				'value'		=> '1',
			)
		)
	);
	// query
	$the_query = new WP_Query( $args );
	if ($the_query->have_posts()):
		$htmlShortCode .= '<div class="logo-carousel">';
			$htmlShortCode .= '<div class="slideshow js-slideshow" data-slideshow-type="carousel-logos">';
		while ( $the_query->have_posts() ) : $the_query->the_post(); 
	         	$htmlShortCode .= '<div class="logo-carousel-item colour-fill-dark-grey">';
	         		$htmlShortCode .= wp_get_attachment_image( get_the_ID(), 'full' );
	         	$htmlShortCode .= '</div>';
		endwhile;
			$htmlShortCode .= '</div>';
		$htmlShortCode .= '</div>';
	endif;

	return $htmlShortCode;
}
add_shortcode( 'logo_slider', 'homepage_logo_slider' );

// [testimonials name="cat-slug" numberposts="3"]
function uuam_testimonials( $atts ) {
	$htmlShortCode = '';
	$args = array(
        'category_name' => $atts['name'],
        'numberposts'=> $atts['numberposts']
	);
	// query
	$the_query = new WP_Query( $args );
	if ($the_query->have_posts()):
		$htmlShortCode .= '<ul>';
		while ( $the_query->have_posts() ) : $the_query->the_post(); 
         	$htmlShortCode .= '<li>';
				$htmlShortCode .= '<div class="testimonial-item-image">';
				$htmlShortCode .= get_the_post_thumbnail(get_the_ID(), 'full' );
				$htmlShortCode .= '</div>';
				$htmlShortCode .= '<div class="testimonial-item-content">';
				$htmlShortCode .= get_the_content(get_the_ID());
				$htmlShortCode .= '</div>';
				$htmlShortCode .= '<div class="testimonial-item-name">';
				$htmlShortCode .= get_the_title(get_the_ID());
				$htmlShortCode .= '</div>';
			$htmlShortCode .= '</li>';
		endwhile;
		$htmlShortCode .= '</ul>';
	endif;

	return $htmlShortCode;
}
add_shortcode( 'testimonials', 'uuam_testimonials' );

// [latest_projects name="cat-slug" numberposts="1"]
function uuam_latest_projects( $atts ) {
	$htmlShortCode = '';
	$args = array(
        'category_name' => $atts['name'],
        'numberposts'=> $atts['numberposts'],
        'orderby'          => 'date',
		'order'            => 'DESC',
	);
	// query
	$the_query = new WP_Query( $args );
	if ($the_query->have_posts()):
		$htmlShortCode .= '<div class="row">';
		while ( $the_query->have_posts() ) : $the_query->the_post(); 
         	$htmlShortCode .= '<div class="column medium-5 text-right">';
				$htmlShortCode .= '<div class="projects-item-image"><a href="' . get_post_permalink(get_the_ID()) . '">';
				$htmlShortCode .= get_the_post_thumbnail(get_the_ID(), 'full' );
				$htmlShortCode .= '</a></div>';
			$htmlShortCode .= '</div>';
			$htmlShortCode .= '<div class="column medium-7 text-left">';
				$htmlShortCode .= '<div class="projects-item-title">';
				$htmlShortCode .= get_the_title(get_the_ID());
				$htmlShortCode .= '</div>';
				$htmlShortCode .= '<p><a class="readmore" href="' . get_post_permalink(get_the_ID()) . '">Read More</a></p>';
			$htmlShortCode .= '</div>';
		endwhile;
		$htmlShortCode .= '</ul>';
	endif;

	return $htmlShortCode;
}
add_shortcode( 'latest_projects', 'uuam_latest_projects' );


/**
 * Implement the Custom Header feature.
 */
require get_parent_theme_file_path( '/inc/custom-header.php' );

/**
 * Custom template tags for this theme.
 */
require get_parent_theme_file_path( '/inc/template-tags.php' );

/**
 * Additional features to allow styling of the templates.
 */
require get_parent_theme_file_path( '/inc/template-functions.php' );

/**
 * Customizer additions.
 */
require get_parent_theme_file_path( '/inc/customizer.php' );

/**
 * SVG icons functions and filters.
 */
require get_parent_theme_file_path( '/inc/icon-functions.php' );
