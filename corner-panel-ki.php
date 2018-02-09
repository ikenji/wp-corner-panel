<?php
/**
 * @package Corner_Panel_Ki_Plugin
 * @version 1.0
 */
/*
Plugin Name: Corner Panel Ichihashi
Plugin URI:
Author: Kenji Ichihashi
Author URI: http://www.infonear.co.jp
Description: 開発中
Version: 1.0
 */

define('CORNER_PANEL_PLUGIN_DIR', plugin_dir_path( __FILE__ ) );


/* main */
add_action('wp_footer', 'corner_panel_ki_available', 1000000);
function corner_panel_ki_available() {
    $cpCss = plugins_url('corner-panel.css', __FILE__ );
    $cpJs = plugins_url('corner-panel.js', __FILE__);
    $cpTemplate = plugins_url('corner-panel-template.html', __FILE__);

    echo <<< EOM
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/vue"></script>
<link href="{$cpCss}" rel="stylesheet" type="text/css">
<script>var corner_panel_template = "{$cpTemplate}"</script>
<script src="{$cpJs}"></script>
<div id="corner_panel"></div>
EOM;
}

/* /main */

/* admin */
add_action( 'admin_menu', 'add_plugin_admin_menu' );
function add_plugin_admin_menu() {
     add_options_page(
          'Corner Panel', // page_title（オプションページのHTMLのタイトル）
          'Corner Panelの設定', // menu_title（メニューで表示されるタイトル）
          'administrator', // capability
          'corner-panel-ki', // menu_slug（URLのスラッグこの例だとoptions-general.php?page=hello-world）
          'display_plugin_corner_panel_admin_page' // function
     );
}

// 設定画面 HTML
function display_plugin_corner_panel_admin_page() {
     $cpTemplate = file_get_contents(CORNER_PANEL_PLUGIN_DIR . 'corner-panel-current-template.txt');
     echo '<div class="wrap">';
     echo '<h1>Corner Panelプラグインの設定</h1>';
     echo '<p>※開発中!</p>';
     echo '</div>';
}
/* /admin */
?>
