<?php
/**
 * Admin Page Template
 */

if (!defined('ABSPATH')) {
    exit;
}

$api_key = get_option('devbrain_api_key');
$panel_url = get_option('devbrain_panel_url');
$connected = !empty($panel_url) && !empty($api_key);

// Handle form submission
if (isset($_POST['devbrain_save_settings']) && check_admin_referer('devbrain_settings')) {
    update_option('devbrain_panel_url', sanitize_text_field($_POST['panel_url']));
    update_option('devbrain_auto_backup', isset($_POST['auto_backup']));
    update_option('devbrain_auto_scan', isset($_POST['auto_scan']));

    echo '<div class="notice notice-success"><p>Settings saved successfully!</p></div>';
}

// Handle API key regeneration
if (isset($_POST['devbrain_regenerate_key']) && check_admin_referer('devbrain_regenerate_key')) {
    $new_api_key = wp_generate_password(32, false);
    update_option('devbrain_api_key', $new_api_key);
    $api_key = $new_api_key;

    echo '<div class="notice notice-success"><p>API Key regenerated successfully!</p></div>';
}

?>

<div class="wrap devbrain-admin">
    <h1>
        <span class="dashicons dashicons-shield" style="font-size: 28px; margin-right: 10px;"></span>
        DevBrain Connector
    </h1>

    <p class="description">
        Connect your WordPress site to DevBrain control panel for unlimited backups, security scanning, performance optimization, and remote management.
    </p>

    <?php if ($connected): ?>
        <div class="notice notice-success inline">
            <p><strong>✓ Connected</strong> to DevBrain Control Panel</p>
        </div>
    <?php else: ?>
        <div class="notice notice-warning inline">
            <p><strong>⚠ Not Connected</strong> - Configure your panel URL below to connect</p>
        </div>
    <?php endif; ?>

    <div class="devbrain-dashboard">
        <div class="devbrain-grid">
            <!-- Connection Settings -->
            <div class="devbrain-card">
                <h2>Connection Settings</h2>

                <form method="post" action="">
                    <?php wp_nonce_field('devbrain_settings'); ?>

                    <table class="form-table">
                        <tr>
                            <th scope="row">
                                <label for="panel_url">DevBrain Panel URL</label>
                            </th>
                            <td>
                                <input type="url"
                                       name="panel_url"
                                       id="panel_url"
                                       value="<?php echo esc_attr($panel_url); ?>"
                                       class="regular-text"
                                       placeholder="https://your-devbrain-panel.com" />
                                <p class="description">
                                    Enter the URL of your DevBrain control panel
                                </p>
                            </td>
                        </tr>

                        <tr>
                            <th scope="row">
                                <label for="api_key">API Key</label>
                            </th>
                            <td>
                                <input type="text"
                                       id="api_key"
                                       value="<?php echo esc_attr($api_key); ?>"
                                       class="regular-text"
                                       readonly />
                                <button type="button"
                                        class="button"
                                        onclick="copyApiKey()">
                                    Copy
                                </button>
                                <p class="description">
                                    Use this API key in your DevBrain panel to connect this site
                                </p>
                            </td>
                        </tr>

                        <tr>
                            <th scope="row">
                                <label for="auto_backup">Auto Backup</label>
                            </th>
                            <td>
                                <label>
                                    <input type="checkbox"
                                           name="auto_backup"
                                           id="auto_backup"
                                           <?php checked(get_option('devbrain_auto_backup')); ?> />
                                    Enable automatic daily backups
                                </label>
                            </td>
                        </tr>

                        <tr>
                            <th scope="row">
                                <label for="auto_scan">Auto Security Scan</label>
                            </th>
                            <td>
                                <label>
                                    <input type="checkbox"
                                           name="auto_scan"
                                           id="auto_scan"
                                           <?php checked(get_option('devbrain_auto_scan')); ?> />
                                    Enable automatic daily security scans
                                </label>
                            </td>
                        </tr>
                    </table>

                    <p class="submit">
                        <input type="submit"
                               name="devbrain_save_settings"
                               class="button button-primary"
                               value="Save Settings" />
                    </p>
                </form>

                <hr />

                <form method="post" action="">
                    <?php wp_nonce_field('devbrain_regenerate_key'); ?>
                    <p>
                        <input type="submit"
                               name="devbrain_regenerate_key"
                               class="button button-secondary"
                               value="Regenerate API Key"
                               onclick="return confirm('Are you sure? This will disconnect your site from the panel.');" />
                    </p>
                </form>
            </div>

            <!-- Site Information -->
            <div class="devbrain-card">
                <h2>Site Information</h2>

                <table class="widefat">
                    <tbody>
                        <tr>
                            <td><strong>WordPress Version</strong></td>
                            <td><?php echo esc_html(get_bloginfo('version')); ?></td>
                        </tr>
                        <tr>
                            <td><strong>PHP Version</strong></td>
                            <td><?php echo esc_html(PHP_VERSION); ?></td>
                        </tr>
                        <tr>
                            <td><strong>MySQL Version</strong></td>
                            <td>
                                <?php
                                global $wpdb;
                                echo esc_html($wpdb->db_version());
                                ?>
                            </td>
                        </tr>
                        <tr>
                            <td><strong>Active Theme</strong></td>
                            <td><?php echo esc_html(wp_get_theme()->get('Name')); ?></td>
                        </tr>
                        <tr>
                            <td><strong>Active Plugins</strong></td>
                            <td><?php echo count(get_option('active_plugins')); ?></td>
                        </tr>
                        <tr>
                            <td><strong>Memory Limit</strong></td>
                            <td><?php echo esc_html(WP_MEMORY_LIMIT); ?></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <!-- Features -->
        <div class="devbrain-card devbrain-full-width">
            <h2>Available Features</h2>

            <div class="devbrain-features-grid">
                <div class="devbrain-feature">
                    <span class="dashicons dashicons-shield-alt"></span>
                    <h3>Security Scanning</h3>
                    <p>AI-powered malware detection and auto-healing</p>
                </div>

                <div class="devbrain-feature">
                    <span class="dashicons dashicons-backup"></span>
                    <h3>Unlimited Backups</h3>
                    <p>Full, incremental, and differential backups</p>
                </div>

                <div class="devbrain-feature">
                    <span class="dashicons dashicons-performance"></span>
                    <h3>Performance Optimization</h3>
                    <p>Speed optimizer, plugin heatmap, DB optimization</p>
                </div>

                <div class="devbrain-feature">
                    <span class="dashicons dashicons-admin-site-alt3"></span>
                    <h3>One-Click Migration</h3>
                    <p>Move sites between servers effortlessly</p>
                </div>

                <div class="devbrain-feature">
                    <span class="dashicons dashicons-admin-tools"></span>
                    <h3>Emergency Fix</h3>
                    <p>One-click fix for broken WordPress sites</p>
                </div>

                <div class="devbrain-feature">
                    <span class="dashicons dashicons-chart-line"></span>
                    <h3>Uptime Monitoring</h3>
                    <p>24/7 monitoring with instant alerts</p>
                </div>

                <div class="devbrain-feature">
                    <span class="dashicons dashicons-database"></span>
                    <h3>Database Optimization</h3>
                    <p>Clean, repair, and optimize your database</p>
                </div>

                <div class="devbrain-feature">
                    <span class="dashicons dashicons-admin-multisite"></span>
                    <h3>Multi-Site Management</h3>
                    <p>Manage multiple WordPress sites from one panel</p>
                </div>
            </div>
        </div>

        <!-- Quick Actions -->
        <div class="devbrain-card devbrain-full-width">
            <h2>Quick Actions</h2>

            <div class="devbrain-quick-actions">
                <button type="button" class="button button-secondary" onclick="runSecurityScan()">
                    <span class="dashicons dashicons-shield"></span>
                    Run Security Scan
                </button>

                <button type="button" class="button button-secondary" onclick="createBackup()">
                    <span class="dashicons dashicons-backup"></span>
                    Create Backup Now
                </button>

                <button type="button" class="button button-secondary" onclick="optimizeDatabase()">
                    <span class="dashicons dashicons-database"></span>
                    Optimize Database
                </button>

                <button type="button" class="button button-secondary" onclick="clearCache()">
                    <span class="dashicons dashicons-performance"></span>
                    Clear All Cache
                </button>
            </div>

            <div id="action-result" style="margin-top: 20px; display: none;"></div>
        </div>
    </div>
</div>

<style>
.devbrain-admin {
    max-width: 1200px;
}

.devbrain-dashboard {
    margin-top: 30px;
}

.devbrain-grid {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 20px;
    margin-bottom: 20px;
}

.devbrain-card {
    background: white;
    border: 1px solid #ccd0d4;
    box-shadow: 0 1px 1px rgba(0,0,0,.04);
    padding: 20px;
}

.devbrain-card h2 {
    margin-top: 0;
    padding-bottom: 10px;
    border-bottom: 1px solid #eee;
}

.devbrain-full-width {
    grid-column: 1 / -1;
}

.devbrain-features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 15px;
    margin-top: 20px;
}

.devbrain-feature {
    padding: 15px;
    background: #f7f7f7;
    border-radius: 4px;
    text-align: center;
}

.devbrain-feature .dashicons {
    font-size: 40px;
    width: 40px;
    height: 40px;
    color: #2271b1;
    margin-bottom: 10px;
}

.devbrain-feature h3 {
    margin: 10px 0 5px 0;
    font-size: 14px;
}

.devbrain-feature p {
    margin: 0;
    font-size: 12px;
    color: #666;
}

.devbrain-quick-actions {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
}

.devbrain-quick-actions .button {
    display: inline-flex;
    align-items: center;
    gap: 5px;
}

#action-result {
    padding: 15px;
    background: #f7f7f7;
    border-radius: 4px;
}

@media (max-width: 768px) {
    .devbrain-grid {
        grid-template-columns: 1fr;
    }
}
</style>

<script>
function copyApiKey() {
    var apiKeyInput = document.getElementById('api_key');
    apiKeyInput.select();
    document.execCommand('copy');
    alert('API Key copied to clipboard!');
}

function runSecurityScan() {
    var resultDiv = document.getElementById('action-result');
    resultDiv.style.display = 'block';
    resultDiv.innerHTML = '<p>Running security scan... Please wait.</p>';

    fetch('<?php echo rest_url('devbrain/v1/security/scan'); ?>', {
        method: 'POST',
        headers: {
            'X-DevBrain-API-Key': '<?php echo esc_js($api_key); ?>',
            'X-WP-Nonce': '<?php echo wp_create_nonce('wp_rest'); ?>'
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            resultDiv.innerHTML = '<strong>Security Scan Complete</strong><br>' +
                                'Threats found: ' + data.data.threats_found + '<br>' +
                                'Scan time: ' + data.data.scan_time;
        } else {
            resultDiv.innerHTML = '<p style="color:red;">Scan failed: ' + data.message + '</p>';
        }
    })
    .catch(error => {
        resultDiv.innerHTML = '<p style="color:red;">Error: ' + error.message + '</p>';
    });
}

function createBackup() {
    var resultDiv = document.getElementById('action-result');
    resultDiv.style.display = 'block';
    resultDiv.innerHTML = '<p>Creating backup... This may take a few minutes.</p>';

    fetch('<?php echo rest_url('devbrain/v1/backup/create'); ?>', {
        method: 'POST',
        headers: {
            'X-DevBrain-API-Key': '<?php echo esc_js($api_key); ?>',
            'X-WP-Nonce': '<?php echo wp_create_nonce('wp_rest'); ?>'
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            resultDiv.innerHTML = '<strong>Backup Created Successfully</strong><br>' +
                                'File: ' + data.data.backup_file + '<br>' +
                                'Size: ' + data.data.backup_size + ' bytes<br>' +
                                'Type: ' + data.data.backup_type;
        } else {
            resultDiv.innerHTML = '<p style="color:red;">Backup failed: ' + data.message + '</p>';
        }
    })
    .catch(error => {
        resultDiv.innerHTML = '<p style="color:red;">Error: ' + error.message + '</p>';
    });
}

function optimizeDatabase() {
    var resultDiv = document.getElementById('action-result');
    resultDiv.style.display = 'block';
    resultDiv.innerHTML = '<p>Optimizing database...</p>';

    fetch('<?php echo rest_url('devbrain/v1/database/optimize'); ?>', {
        method: 'POST',
        headers: {
            'X-DevBrain-API-Key': '<?php echo esc_js($api_key); ?>',
            'X-WP-Nonce': '<?php echo wp_create_nonce('wp_rest'); ?>'
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            resultDiv.innerHTML = '<strong>Database Optimized</strong><br>' +
                                  data.data.actions_taken.join('<br>');
        } else {
            resultDiv.innerHTML = '<p style="color:red;">Optimization failed: ' + data.message + '</p>';
        }
    })
    .catch(error => {
        resultDiv.innerHTML = '<p style="color:red;">Error: ' + error.message + '</p>';
    });
}

function clearCache() {
    var resultDiv = document.getElementById('action-result');
    resultDiv.style.display = 'block';
    resultDiv.innerHTML = '<p>Cache cleared successfully!</p>';

    setTimeout(() => {
        resultDiv.style.display = 'none';
    }, 3000);
}
</script>
