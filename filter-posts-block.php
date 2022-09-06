<?php
/**
 * Plugin Name: Filter Posts Block
 * Plugin URI: 
 * Description: React for filtering posts
 * Version: 0.1
 * Text Domain: filter-posts-block
 * Author: Joona Heinilä
 */

// First register resources with init 
function filter_posts_block_init() {
    $path = "build/static";
    if(getenv('WP_ENV')=="development") {
        $path = "build/static";
    }
    wp_register_script("filter_posts_block_js", plugins_url($path."/js/main.js", __FILE__), array(), "1.0", false);
    wp_register_style("filter_posts_block_css", plugins_url($path."/css/main.css", __FILE__), array(), "1.0", "all");
}

add_action( 'init', 'filter_posts_block_init' );

// Function for the short code that call React app
function filter_posts_block() {
    wp_enqueue_script("filter_posts_block_js", '1.0', true);
    wp_enqueue_style("filter_posts_block_css");
    return "<div id=\"filter_posts_block\"></div>";
}

add_shortcode('filter_posts_block', 'filter_posts_block');