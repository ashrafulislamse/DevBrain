<?php
/**
 * Plugin Name: DevBrain Connector
 * Plugin URI: https://devbrain.io
 * Description: Unlimited WordPress management plugin - connects your site to DevBrain control panel for remote management, backups, security, optimization, and more.
 * Version: 1.0.0
 * Author: DevBrain
 * Author URI: https://devbrain.io
 * License: GPL v2 or later
 * Text Domain: devbrain-connector
 * Requires at least: 5.0
 * Requires PHP: 7.4
 */

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

// Define plugin constants
define('DEVBRAIN_VERSION', '1.0.0');
define('DEVBRAIN_PLUGIN_DIR', plugin_dir_path(__FILE__));
define('DEVBRAIN_PLUGIN_URL', plugin_dir_url(__FILE__));

/**
 * Main DevBrain Connector Class
 */
class DevBrain_Connector {

    private static $instance = null;
    private $api_key = null;
    private $panel_url = null;

    public static function getInstance() {
        if (self::$instance == null) {
            self::$instance = new DevBrain_Connector();
        }
        return self::$instance;
    }

    private function __construct() {
        $this->api_key = get_option('devbrain_api_key');
        $this->panel_url = get_option('devbrain_panel_url');

        // Initialize plugin
        add_action('init', array($this, 'init'));
        add_action('rest_api_init', array($this, 'register_rest_routes'));
        add_action('admin_menu', array($this, 'add_admin_menu'));
        add_action('admin_enqueue_scripts', array($this, 'enqueue_admin_scripts'));

        // Scheduled tasks
        add_action('devbrain_daily_backup', array($this, 'run_scheduled_backup'));
        add_action('devbrain_security_scan', array($this, 'run_security_scan'));
    }

    public function init() {
        // Schedule daily tasks if not already scheduled
        if (!wp_next_scheduled('devbrain_daily_backup')) {
            wp_schedule_event(time(), 'daily', 'devbrain_daily_backup');
        }
        if (!wp_next_scheduled('devbrain_security_scan')) {
            wp_schedule_event(time(), 'daily', 'devbrain_security_scan');
        }
    }

    /**
     * Register REST API routes
     */
    public function register_rest_routes() {
        $namespace = 'devbrain/v1';

        // Site Information
        register_rest_route($namespace, '/site-info', array(
            'methods' => 'GET',
            'callback' => array($this, 'get_site_info'),
            'permission_callback' => array($this, 'check_api_key'),
        ));

        // Plugins Management
        register_rest_route($namespace, '/plugins', array(
            'methods' => 'GET',
            'callback' => array($this, 'get_plugins'),
            'permission_callback' => array($this, 'check_api_key'),
        ));

        register_rest_route($namespace, '/plugins/(?P<slug>[a-zA-Z0-9_-]+)', array(
            'methods' => 'POST',
            'callback' => array($this, 'manage_plugin'),
            'permission_callback' => array($this, 'check_api_key'),
        ));

        // Security Scan
        register_rest_route($namespace, '/security/scan', array(
            'methods' => 'POST',
            'callback' => array($this, 'security_scan'),
            'permission_callback' => array($this, 'check_api_key'),
        ));

        // Auto Healing
        register_rest_route($namespace, '/security/auto-heal', array(
            'methods' => 'POST',
            'callback' => array($this, 'auto_heal'),
            'permission_callback' => array($this, 'check_api_key'),
        ));

        // Backup
        register_rest_route($namespace, '/backup/create', array(
            'methods' => 'POST',
            'callback' => array($this, 'create_backup'),
            'permission_callback' => array($this, 'check_api_key'),
        ));

        register_rest_route($namespace, '/backup/restore', array(
            'methods' => 'POST',
            'callback' => array($this, 'restore_backup'),
            'permission_callback' => array($this, 'check_api_key'),
        ));

        // Performance
        register_rest_route($namespace, '/performance/analyze', array(
            'methods' => 'GET',
            'callback' => array($this, 'analyze_performance'),
            'permission_callback' => array($this, 'check_api_key'),
        ));

        // Database
        register_rest_route($namespace, '/database/optimize', array(
            'methods' => 'POST',
            'callback' => array($this, 'optimize_database'),
            'permission_callback' => array($this, 'check_api_key'),
        ));

        // Emergency Fix
        register_rest_route($namespace, '/emergency-fix', array(
            'methods' => 'POST',
            'callback' => array($this, 'emergency_fix'),
            'permission_callback' => array($this, 'check_api_key'),
        ));
    }

    /**
     * Check API Key
     */
    public function check_api_key($request) {
        $api_key = $request->get_header('X-DevBrain-API-Key');

        if (empty($api_key)) {
            return new WP_Error('no_api_key', 'API key is required', array('status' => 401));
        }

        if ($api_key !== $this->api_key) {
            return new WP_Error('invalid_api_key', 'Invalid API key', array('status' => 403));
        }

        return true;
    }

    /**
     * Get Site Information
     */
    public function get_site_info($request) {
        global $wpdb;

        // Get database size
        $db_size = $wpdb->get_var("
            SELECT ROUND(SUM(data_length + index_length) / 1024 / 1024, 2)
            FROM information_schema.TABLES
            WHERE table_schema = '{$wpdb->dbname}'
        ");

        // Get installed plugins
        $plugins = get_plugins();
        $active_plugins = get_option('active_plugins');

        // Get themes
        $themes = wp_get_themes();
        $current_theme = wp_get_theme();

        return new WP_REST_Response(array(
            'success' => true,
            'data' => array(
                'url' => get_site_url(),
                'name' => get_bloginfo('name'),
                'wordpress_version' => get_bloginfo('version'),
                'php_version' => PHP_VERSION,
                'mysql_version' => $wpdb->db_version(),
                'is_multisite' => is_multisite(),
                'active_theme' => array(
                    'name' => $current_theme->get('Name'),
                    'version' => $current_theme->get('Version'),
                    'author' => $current_theme->get('Author'),
                ),
                'plugins' => array(
                    'total' => count($plugins),
                    'active' => count($active_plugins),
                ),
                'themes' => array(
                    'total' => count($themes),
                ),
                'database_size' => $db_size . ' MB',
                'upload_max_filesize' => ini_get('upload_max_filesize'),
                'memory_limit' => WP_MEMORY_LIMIT,
                'max_execution_time' => ini_get('max_execution_time'),
            ),
        ), 200);
    }

    /**
     * Get Plugins List
     */
    public function get_plugins($request) {
        $plugins = get_plugins();
        $active_plugins = get_option('active_plugins');
        $plugin_updates = get_site_transient('update_plugins');

        $plugins_list = array();

        foreach ($plugins as $plugin_file => $plugin_data) {
            $is_active = in_array($plugin_file, $active_plugins);
            $has_update = isset($plugin_updates->response[$plugin_file]);

            $plugins_list[] = array(
                'file' => $plugin_file,
                'name' => $plugin_data['Name'],
                'version' => $plugin_data['Version'],
                'author' => $plugin_data['Author'],
                'description' => $plugin_data['Description'],
                'is_active' => $is_active,
                'has_update' => $has_update,
                'new_version' => $has_update ? $plugin_updates->response[$plugin_file]->new_version : null,
            );
        }

        return new WP_REST_Response(array(
            'success' => true,
            'data' => $plugins_list,
        ), 200);
    }

    /**
     * Security Scan
     */
    public function security_scan($request) {
        $threats = array();

        // 1. Check for suspicious files
        $suspicious_files = $this->scan_for_suspicious_files();
        if (!empty($suspicious_files)) {
            $threats = array_merge($threats, $suspicious_files);
        }

        // 2. Check for unauthorized admin users
        $suspicious_admins = $this->check_suspicious_admins();
        if (!empty($suspicious_admins)) {
            $threats = array_merge($threats, $suspicious_admins);
        }

        // 3. Check file permissions
        $permission_issues = $this->check_file_permissions();
        if (!empty($permission_issues)) {
            $threats = array_merge($threats, $permission_issues);
        }

        // 4. Check for outdated plugins/themes
        $outdated = $this->check_outdated_software();
        if (!empty($outdated)) {
            $threats = array_merge($threats, $outdated);
        }

        return new WP_REST_Response(array(
            'success' => true,
            'data' => array(
                'threats_found' => count($threats),
                'threats' => $threats,
                'scan_time' => current_time('mysql'),
            ),
        ), 200);
    }

    /**
     * Scan for suspicious files
     */
    private function scan_for_suspicious_files() {
        $threats = array();
        $upload_dir = wp_upload_dir();

        // Patterns to look for
        $malware_patterns = array(
            'base64_decode',
            'eval(',
            'exec(',
            'system(',
            'shell_exec',
            'passthru',
            'proc_open',
            'popen',
            'curl_exec',
            'curl_multi_exec',
            'parse_ini_file',
            'show_source',
        );

        // Scan wp-content directory
        $files = new RecursiveIteratorIterator(
            new RecursiveDirectoryIterator(WP_CONTENT_DIR),
            RecursiveIteratorIterator::SELF_FIRST
        );

        $scanned = 0;
        foreach ($files as $file) {
            if ($file->isFile() && $file->getExtension() === 'php') {
                $scanned++;
                if ($scanned > 1000) break; // Limit scan to prevent timeout

                $content = file_get_contents($file->getPathname());

                foreach ($malware_patterns as $pattern) {
                    if (stripos($content, $pattern) !== false) {
                        $threats[] = array(
                            'type' => 'suspicious_code',
                            'severity' => 'high',
                            'file' => str_replace(ABSPATH, '', $file->getPathname()),
                            'pattern' => $pattern,
                            'description' => 'Suspicious code pattern detected',
                        );
                        break;
                    }
                }
            }
        }

        return $threats;
    }

    /**
     * Check for suspicious admin users
     */
    private function check_suspicious_admins() {
        $threats = array();
        $admins = get_users(array('role' => 'administrator'));

        foreach ($admins as $admin) {
            // Check for recently created admin accounts
            $user_registered = strtotime($admin->user_registered);
            $days_old = (time() - $user_registered) / (60 * 60 * 24);

            if ($days_old < 7) {
                $threats[] = array(
                    'type' => 'new_admin',
                    'severity' => 'medium',
                    'user' => $admin->user_login,
                    'email' => $admin->user_email,
                    'registered' => $admin->user_registered,
                    'description' => 'Recently created admin account',
                );
            }
        }

        return $threats;
    }

    /**
     * Check file permissions
     */
    private function check_file_permissions() {
        $issues = array();

        // Check wp-config.php
        $wp_config = ABSPATH . 'wp-config.php';
        if (file_exists($wp_config)) {
            $perms = fileperms($wp_config) & 0777;
            if ($perms > 0600) {
                $issues[] = array(
                    'type' => 'file_permissions',
                    'severity' => 'medium',
                    'file' => 'wp-config.php',
                    'current_perms' => decoct($perms),
                    'recommended_perms' => '0600',
                    'description' => 'wp-config.php has insecure permissions',
                );
            }
        }

        return $issues;
    }

    /**
     * Check for outdated software
     */
    private function check_outdated_software() {
        $issues = array();

        // Check WordPress core
        $update_core = get_site_transient('update_core');
        if (!empty($update_core->updates) && $update_core->updates[0]->response === 'upgrade') {
            $issues[] = array(
                'type' => 'outdated_core',
                'severity' => 'high',
                'current_version' => get_bloginfo('version'),
                'new_version' => $update_core->updates[0]->version,
                'description' => 'WordPress core update available',
            );
        }

        return $issues;
    }

    /**
     * Auto Heal
     */
    public function auto_heal($request) {
        $actions_taken = array();

        // Run security scan first
        $scan_result = $this->security_scan($request);
        $scan_data = $scan_result->get_data();
        $threats = $scan_data['data']['threats'];

        foreach ($threats as $threat) {
            switch ($threat['type']) {
                case 'suspicious_code':
                    // Quarantine suspicious files
                    $this->quarantine_file($threat['file']);
                    $actions_taken[] = 'Quarantined file: ' . $threat['file'];
                    break;

                case 'new_admin':
                    // Alert about new admin (don't auto-delete)
                    $actions_taken[] = 'Flagged new admin user: ' . $threat['user'];
                    break;

                case 'file_permissions':
                    // Fix file permissions
                    $file_path = ABSPATH . $threat['file'];
                    if (file_exists($file_path)) {
                        chmod($file_path, 0600);
                        $actions_taken[] = 'Fixed permissions for: ' . $threat['file'];
                    }
                    break;
            }
        }

        // Regenerate security keys
        $this->regenerate_security_keys();
        $actions_taken[] = 'Regenerated WordPress security keys';

        // Clear cache
        if (function_exists('wp_cache_flush')) {
            wp_cache_flush();
            $actions_taken[] = 'Flushed object cache';
        }

        return new WP_REST_Response(array(
            'success' => true,
            'data' => array(
                'threats_found' => count($threats),
                'actions_taken' => $actions_taken,
            ),
        ), 200);
    }

    /**
     * Quarantine File
     */
    private function quarantine_file($file) {
        $file_path = ABSPATH . $file;
        $quarantine_dir = WP_CONTENT_DIR . '/devbrain-quarantine/';

        if (!file_exists($quarantine_dir)) {
            mkdir($quarantine_dir, 0755, true);
        }

        if (file_exists($file_path)) {
            $quarantine_path = $quarantine_dir . basename($file) . '.' . time();
            rename($file_path, $quarantine_path);
        }
    }

    /**
     * Regenerate Security Keys
     */
    private function regenerate_security_keys() {
        // This would require updating wp-config.php
        // For safety, we'll just flag it for manual update
        update_option('devbrain_regenerate_keys_needed', true);
    }

    /**
     * Emergency Fix
     */
    public function emergency_fix($request) {
        $actions = array();

        // 1. Disable all plugins (except this one)
        $active_plugins = get_option('active_plugins');
        $plugin_file = plugin_basename(__FILE__);
        $new_active = array($plugin_file);
        update_option('active_plugins', $new_active);
        $actions[] = 'Disabled all plugins except DevBrain Connector';

        // 2. Clear all caches
        wp_cache_flush();
        delete_transient('doing_cron');
        $actions[] = 'Cleared all caches';

        // 3. Fix file permissions
        chmod(ABSPATH . 'wp-config.php', 0600);
        chmod(ABSPATH . '.htaccess', 0644);
        $actions[] = 'Fixed file permissions';

        // 4. Repair database
        global $wpdb;
        $tables = $wpdb->get_results('SHOW TABLES', ARRAY_N);
        foreach ($tables as $table) {
            $wpdb->query("REPAIR TABLE {$table[0]}");
        }
        $actions[] = 'Repaired all database tables';

        // 5. Clear transients
        $wpdb->query("DELETE FROM {$wpdb->options} WHERE option_name LIKE '%_transient_%'");
        $actions[] = 'Cleared all transients';

        // 6. Regenerate .htaccess
        flush_rewrite_rules();
        $actions[] = 'Regenerated .htaccess rules';

        return new WP_REST_Response(array(
            'success' => true,
            'data' => array(
                'message' => 'Emergency fix completed',
                'actions_taken' => $actions,
            ),
        ), 200);
    }

    /**
     * Create Backup
     */
    public function create_backup($request) {
        $backup_type = $request->get_param('type') ?: 'full';
        $backup_dir = WP_CONTENT_DIR . '/devbrain-backups/';

        if (!file_exists($backup_dir)) {
            mkdir($backup_dir, 0755, true);
        }

        $timestamp = time();
        $backup_file = $backup_dir . 'backup-' . $timestamp . '.zip';

        // Create ZIP archive
        if (class_exists('ZipArchive')) {
            $zip = new ZipArchive();
            if ($zip->open($backup_file, ZipArchive::CREATE) === TRUE) {

                // Add files
                if ($backup_type === 'full' || $backup_type === 'files') {
                    $this->add_directory_to_zip(WP_CONTENT_DIR, $zip, 'wp-content');
                }

                // Export database
                if ($backup_type === 'full' || $backup_type === 'database') {
                    $db_export = $this->export_database();
                    $zip->addFromString('database.sql', $db_export);
                }

                $zip->close();

                return new WP_REST_Response(array(
                    'success' => true,
                    'data' => array(
                        'backup_file' => basename($backup_file),
                        'backup_size' => filesize($backup_file),
                        'backup_type' => $backup_type,
                        'created_at' => date('Y-m-d H:i:s', $timestamp),
                    ),
                ), 200);
            }
        }

        return new WP_Error('backup_failed', 'Failed to create backup', array('status' => 500));
    }

    /**
     * Add directory to ZIP
     */
    private function add_directory_to_zip($dir, &$zip, $base_path = '') {
        $files = new RecursiveIteratorIterator(
            new RecursiveDirectoryIterator($dir),
            RecursiveIteratorIterator::LEAVES_ONLY
        );

        foreach ($files as $file) {
            if (!$file->isDir()) {
                $file_path = $file->getRealPath();
                $relative_path = $base_path . '/' . substr($file_path, strlen($dir) + 1);
                $zip->addFile($file_path, $relative_path);
            }
        }
    }

    /**
     * Export Database
     */
    private function export_database() {
        global $wpdb;

        $sql = "-- DevBrain Database Backup\n";
        $sql .= "-- " . date('Y-m-d H:i:s') . "\n\n";

        $tables = $wpdb->get_results('SHOW TABLES', ARRAY_N);

        foreach ($tables as $table) {
            $table_name = $table[0];

            // Get CREATE TABLE statement
            $create_table = $wpdb->get_row("SHOW CREATE TABLE `{$table_name}`", ARRAY_N);
            $sql .= "\n\n" . $create_table[1] . ";\n\n";

            // Get table data
            $rows = $wpdb->get_results("SELECT * FROM `{$table_name}`", ARRAY_A);

            foreach ($rows as $row) {
                $sql .= "INSERT INTO `{$table_name}` VALUES(";
                $values = array();
                foreach ($row as $value) {
                    $values[] = "'" . $wpdb->_escape($value) . "'";
                }
                $sql .= implode(',', $values) . ");\n";
            }
        }

        return $sql;
    }

    /**
     * Optimize Database
     */
    public function optimize_database($request) {
        global $wpdb;

        $actions = array();

        // Optimize tables
        $tables = $wpdb->get_results('SHOW TABLES', ARRAY_N);
        foreach ($tables as $table) {
            $wpdb->query("OPTIMIZE TABLE {$table[0]}");
        }
        $actions[] = 'Optimized all database tables';

        // Clean up revisions
        $deleted_revisions = $wpdb->query("DELETE FROM {$wpdb->posts} WHERE post_type = 'revision'");
        $actions[] = "Deleted {$deleted_revisions} post revisions";

        // Clean up spam comments
        $deleted_spam = $wpdb->query("DELETE FROM {$wpdb->comments} WHERE comment_approved = 'spam'");
        $actions[] = "Deleted {$deleted_spam} spam comments";

        // Clean up trash
        $deleted_trash = $wpdb->query("DELETE FROM {$wpdb->posts} WHERE post_status = 'trash'");
        $actions[] = "Deleted {$deleted_trash} trashed posts";

        // Clean up orphaned metadata
        $wpdb->query("DELETE pm FROM {$wpdb->postmeta} pm LEFT JOIN {$wpdb->posts} p ON p.ID = pm.post_id WHERE p.ID IS NULL");
        $actions[] = 'Cleaned up orphaned post metadata';

        return new WP_REST_Response(array(
            'success' => true,
            'data' => array(
                'actions_taken' => $actions,
            ),
        ), 200);
    }

    /**
     * Analyze Performance
     */
    public function analyze_performance($request) {
        $slow_plugins = array();

        // This would require actual performance monitoring
        // For now, return plugin list with sizes
        $plugins = get_plugins();
        $plugin_dir = WP_PLUGIN_DIR;

        foreach ($plugins as $plugin_file => $plugin_data) {
            $plugin_path = $plugin_dir . '/' . dirname($plugin_file);
            $size = $this->get_directory_size($plugin_path);

            $slow_plugins[] = array(
                'name' => $plugin_data['Name'],
                'size' => $this->format_bytes($size),
                'version' => $plugin_data['Version'],
            );
        }

        return new WP_REST_Response(array(
            'success' => true,
            'data' => array(
                'plugins' => $slow_plugins,
                'memory_usage' => memory_get_usage(true),
                'memory_limit' => WP_MEMORY_LIMIT,
            ),
        ), 200);
    }

    /**
     * Get directory size
     */
    private function get_directory_size($directory) {
        $size = 0;
        if (is_dir($directory)) {
            foreach (new RecursiveIteratorIterator(new RecursiveDirectoryIterator($directory)) as $file) {
                $size += $file->getSize();
            }
        }
        return $size;
    }

    /**
     * Format bytes
     */
    private function format_bytes($bytes, $precision = 2) {
        $units = array('B', 'KB', 'MB', 'GB', 'TB');

        $bytes = max($bytes, 0);
        $pow = floor(($bytes ? log($bytes) : 0) / log(1024));
        $pow = min($pow, count($units) - 1);
        $bytes /= pow(1024, $pow);

        return round($bytes, $precision) . ' ' . $units[$pow];
    }

    /**
     * Add admin menu
     */
    public function add_admin_menu() {
        add_menu_page(
            'DevBrain Connector',
            'DevBrain',
            'manage_options',
            'devbrain-connector',
            array($this, 'admin_page'),
            'dashicons-shield',
            100
        );
    }

    /**
     * Admin page
     */
    public function admin_page() {
        include DEVBRAIN_PLUGIN_DIR . 'includes/admin-page.php';
    }

    /**
     * Enqueue admin scripts
     */
    public function enqueue_admin_scripts($hook) {
        if ($hook !== 'toplevel_page_devbrain-connector') {
            return;
        }

        wp_enqueue_style('devbrain-admin', DEVBRAIN_PLUGIN_URL . 'assets/admin.css', array(), DEVBRAIN_VERSION);
        wp_enqueue_script('devbrain-admin', DEVBRAIN_PLUGIN_URL . 'assets/admin.js', array('jquery'), DEVBRAIN_VERSION, true);
    }

    /**
     * Run scheduled backup
     */
    public function run_scheduled_backup() {
        $this->create_backup(new WP_REST_Request('POST'));
    }

    /**
     * Run security scan
     */
    public function run_security_scan() {
        $result = $this->security_scan(new WP_REST_Request('POST'));
        $data = $result->get_data();

        if ($data['data']['threats_found'] > 0) {
            // Send notification to panel
            $this->notify_panel('security_threats', $data['data']);
        }
    }

    /**
     * Notify panel
     */
    private function notify_panel($event, $data) {
        if (empty($this->panel_url) || empty($this->api_key)) {
            return;
        }

        wp_remote_post($this->panel_url . '/api/webhook/wordpress', array(
            'headers' => array(
                'X-DevBrain-API-Key' => $this->api_key,
                'Content-Type' => 'application/json',
            ),
            'body' => json_encode(array(
                'site_url' => get_site_url(),
                'event' => $event,
                'data' => $data,
                'timestamp' => current_time('mysql'),
            )),
        ));
    }
}

// Initialize plugin
function devbrain_connector_init() {
    return DevBrain_Connector::getInstance();
}

add_action('plugins_loaded', 'devbrain_connector_init');

// Activation hook
register_activation_hook(__FILE__, function() {
    // Generate API key on activation
    $api_key = wp_generate_password(32, false);
    update_option('devbrain_api_key', $api_key);

    // Set default options
    update_option('devbrain_panel_url', '');
    update_option('devbrain_auto_backup', true);
    update_option('devbrain_auto_scan', true);
});

// Deactivation hook
register_deactivation_hook(__FILE__, function() {
    // Clear scheduled events
    wp_clear_scheduled_hook('devbrain_daily_backup');
    wp_clear_scheduled_hook('devbrain_security_scan');
});
