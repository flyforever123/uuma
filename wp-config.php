<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://codex.wordpress.org/Editing_wp-config.php
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define('DB_NAME', 'uuam');

/** MySQL database username */
define('DB_USER', 'root');

/** MySQL database password */
define('DB_PASSWORD', '');

/** MySQL hostname */
define('DB_HOST', 'localhost');

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8mb4');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         '{sDgH<UHKf}q6JX[Nu9`~#,-JHTET_mZ)pW:7$5j4i&#tkP*7Sb|I{0O~hD`UFPx');
define('SECURE_AUTH_KEY',  '0(Q@STK=v)/Tym5h[Q]L;2Ka7tKZAYs0<7/@RP2]`Zs9/wB?Faj<?o!A/+FUdehh');
define('LOGGED_IN_KEY',    'l6Wrh6)Hy?Cr[h}/:hA_hCXRmI<L@6k@b<QN&N7#xR0 m0sT$<,n}j>Wm7iC$_y;');
define('NONCE_KEY',        '%XQk6; 5#[nlm?n.Y0]SHrFZ}ty1;E)JYcIzAKf?YGw&JCYeGfy%;1%y:hY6xTxp');
define('AUTH_SALT',        'j8vN@MB2#>R6gMR?PKSPe>LLq0f-]oAvW-[I-SZtzpnl.|G<A+(.}2Va3M}`N5Cj');
define('SECURE_AUTH_SALT', '^|D@=q/2)ndX8%z`-(9*x5Px{mqo2ybrktH0dg(e^$cJN6;U?P-sq`,tN(lSy{bv');
define('LOGGED_IN_SALT',   '*`vtg>~@,-^,&jF*NBdb{hI_V1HFAxT44#)F1_y:7EoOhfmNu|Wclcb$,am m$gj');
define('NONCE_SALT',       'wyZb&.}MQa#p;_B_|b<_0B}=iOLVTd!6tyA&Q)r2i!ybv!J1qm$V>>jDUx#3n(16');

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the Codex.
 *
 * @link https://codex.wordpress.org/Debugging_in_WordPress
 */
define('WP_DEBUG', false);

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');
