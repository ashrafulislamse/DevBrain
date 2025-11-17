# DevBrain Connector - WordPress Plugin

## The Ultimate WordPress Management Plugin (Unlimited & Free)

DevBrain Connector is a powerful WordPress plugin that connects your WordPress site to the DevBrain control panel, providing unlimited backups, security scanning, performance optimization, and complete remote management capabilities.

## 🚀 Features

### Security & Protection
- **AI Auto-Healing Scanner** - Automatically detects and removes malware
- **Malware Detection** - Scans for suspicious code, base64 injections, and backdoors
- **Suspicious Admin Detection** - Alerts about unauthorized admin accounts
- **File Integrity Monitoring** - Checks for modified core files
- **Emergency Fix Button** - One-click emergency repairs

### Backup & Migration
- **Unlimited Backups** - No file size or frequency limits
- **Full Backups** - Complete site + database backups
- **Incremental Backups** - Only changed files
- **Database-Only Backups** - Quick database exports
- **Cloud Storage** - S3, Google Drive, Dropbox support
- **Encrypted Backups** - AES-256 encryption
- **One-Click Restore** - Easy backup restoration

### Performance Optimization
- **Smart Speed Optimizer** - Automatic performance enhancements
- **Plugin Performance Heatmap** - Identify slow plugins
- **Database Optimizer** - Clean and optimize database
- **Cache Management** - Clear all caches
- **Query Inspector** - Find slow database queries

### Remote Management
- **REST API** - Secure API for remote control
- **Multi-Site Support** - Manage from one dashboard
- **Plugin Management** - Install, update, activate remotely
- **Theme Management** - Remote theme control
- **File Explorer** - Browse and edit files remotely

### Monitoring & Alerts
- **Uptime Monitoring** - 24/7 site monitoring
- **Health Checks** - Regular site health scans
- **Smart Alerts** - Get notified of issues
- **Performance Reports** - Detailed analytics

## 📦 Installation

### From WordPress Admin

1. Download the plugin ZIP file
2. Go to `Plugins > Add New` in WordPress
3. Click `Upload Plugin` and select the ZIP file
4. Click `Install Now` and then `Activate`
5. Go to `DevBrain` in the admin menu
6. Copy your API key
7. Add this site in your DevBrain control panel

### Manual Installation

1. Upload the `devbrain-connector` folder to `/wp-content/plugins/`
2. Activate the plugin through the 'Plugins' menu in WordPress
3. Go to `DevBrain` in the admin menu
4. Copy your API key
5. Add this site in your DevBrain control panel

## 🔧 Configuration

1. Navigate to `DevBrain` in your WordPress admin menu
2. Enter your DevBrain Panel URL
3. Copy the generated API key
4. In your DevBrain panel, add a new WordPress site using:
   - Site URL: Your WordPress site URL
   - API Key: The key from step 3

## 🔌 API Endpoints

The plugin exposes the following REST API endpoints:

### Site Information
```
GET /wp-json/devbrain/v1/site-info
```

### Plugins
```
GET /wp-json/devbrain/v1/plugins
POST /wp-json/devbrain/v1/plugins/{slug}
```

### Security
```
POST /wp-json/devbrain/v1/security/scan
POST /wp-json/devbrain/v1/security/auto-heal
```

### Backup
```
POST /wp-json/devbrain/v1/backup/create
POST /wp-json/devbrain/v1/backup/restore
```

### Performance
```
GET /wp-json/devbrain/v1/performance/analyze
```

### Database
```
POST /wp-json/devbrain/v1/database/optimize
```

### Emergency Fix
```
POST /wp-json/devbrain/v1/emergency-fix
```

All endpoints require the `X-DevBrain-API-Key` header.

## 🔐 Security

- **API Key Authentication** - All requests require valid API key
- **Encrypted Backups** - AES-256 encryption for backups
- **Secure Communication** - HTTPS required for API calls
- **Permission Checks** - WordPress capability checks
- **File Quarantine** - Suspicious files are quarantined, not deleted
- **Audit Logging** - All actions are logged

## 📊 Requirements

- **WordPress**: 5.0 or higher
- **PHP**: 7.4 or higher
- **MySQL**: 5.6 or higher
- **Extensions**: ZipArchive (for backups)
- **Permissions**: Read/write access to wp-content directory

## 🎯 Use Cases

### For Freelancers
- Manage all client sites from one dashboard
- Automated backups before updates
- Security monitoring and alerts
- Performance optimization

### For Agencies
- Centralized multi-site management
- White-label client reports
- Bulk updates and optimizations
- Emergency response tools

### For Developers
- Staging environment management
- File version control
- Database optimization
- Performance profiling

### For Site Owners
- Automated backups
- Security protection
- Performance optimization
- Peace of mind

## 🛠️ Advanced Features

### Scheduled Tasks
- Daily automated backups
- Daily security scans
- Weekly database optimization
- Monthly cleanup tasks

### Notifications
- Security threat alerts
- Backup completion notifications
- Performance degradation warnings
- Update available notifications

### Automation
- Auto-update plugins (configurable)
- Auto-clean spam comments
- Auto-optimize database
- Auto-regenerate thumbnails

## 📝 Changelog

### Version 1.0.0
- Initial release
- Security scanning and auto-healing
- Unlimited backups
- Performance optimization
- Database management
- Emergency fix functionality
- REST API implementation

## 🤝 Support

For support, documentation, and updates:
- Website: https://devbrain.io
- Documentation: https://docs.devbrain.io
- Support: support@devbrain.io

## 📄 License

GPL v2 or later

## 🔒 Privacy

DevBrain Connector respects your privacy:
- No data is sent to third-party servers
- All backups are stored where you choose
- API communication is encrypted
- No tracking or analytics
- Open source code

## ⚡ Performance

- Lightweight plugin (~100KB)
- Minimal database queries
- Efficient API endpoints
- Optimized background tasks
- No frontend impact

## 🌟 Why DevBrain Connector?

Unlike other WordPress management plugins:

1. **Truly Unlimited** - No limits on backups, sites, or features
2. **No Premium Tiers** - All features included
3. **Open Source** - Full transparency
4. **Self-Hosted** - Your data stays with you
5. **AI-Powered** - Smart automation and analysis
6. **Fast & Lightweight** - Minimal overhead
7. **Developer Friendly** - Extensive API

## 🚨 Emergency Features

### One-Click Emergency Fix
When your site breaks, one click:
- Disables all plugins (except this one)
- Clears all caches
- Repairs database tables
- Fixes file permissions
- Regenerates .htaccess
- Clears transients

### Auto-Healing
Automatically:
- Removes malware
- Blocks malicious IPs
- Removes suspicious admin users
- Regenerates security keys
- Quarantines infected files

## 📞 Quick Start

1. Install plugin
2. Get API key
3. Connect to panel
4. Start managing

That's it! Your WordPress site is now protected, backed up, and optimized.

---

Made with ❤️ by DevBrain
