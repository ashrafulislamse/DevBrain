# WordPress Suite - Complete Architecture & Usage Guide

## 🎯 How It Works - The Complete Flow

### Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    DevBrain Control Panel                    │
│                      (Next.js Dashboard)                     │
│                                                              │
│  ┌────────────────────────────────────────────────────┐    │
│  │  WordPress Suite Page (/wordpress)                 │    │
│  │  - Multi-Site Dashboard                            │    │
│  │  - 25+ Management Tools                            │    │
│  │  - Migration Tools                                 │    │
│  │  - Backup Manager                                  │    │
│  └────────────────────────────────────────────────────┘    │
│                           │                                  │
│                           │ REST API Calls                   │
│                           │ (HTTP + API Key Auth)            │
└───────────────────────────┼──────────────────────────────────┘
                            │
                            ▼
        ┌─────────────────────────────────────────┐
        │                                         │
        ▼                                         ▼
┌──────────────────┐                  ┌──────────────────┐
│  WordPress Site #1│                  │  WordPress Site #2│
│  example.com     │                  │  client.com      │
│                  │                  │                  │
│  ┌────────────┐  │                  │  ┌────────────┐  │
│  │ DevBrain   │  │                  │  │ DevBrain   │  │
│  │ Connector  │  │                  │  │ Connector  │  │
│  │ Plugin     │  │                  │  │ Plugin     │  │
│  │            │  │                  │  │            │  │
│  │ ✓ API Key  │  │                  │  │ ✓ API Key  │  │
│  │ ✓ Endpoints│  │                  │  │ ✓ Endpoints│  │
│  └────────────┘  │                  │  └────────────┘  │
└──────────────────┘                  └──────────────────┘
```

## 📋 Step-by-Step Setup Process

### Step 1: Install Plugin on WordPress Site

**Two Methods:**

#### Method A: From WordPress Dashboard (Easiest)
1. Download `devbrain-connector.zip` from your DevBrain panel
2. Go to WordPress → Plugins → Add New
3. Click "Upload Plugin"
4. Select the ZIP file
5. Click "Install Now" → "Activate"

#### Method B: Manual Upload (via FTP/SSH)
1. Upload `devbrain-connector/` folder to `/wp-content/plugins/`
2. Activate via WordPress admin → Plugins

### Step 2: Get API Key from WordPress

1. After activation, go to WordPress → DevBrain menu
2. Copy the auto-generated API key
3. (Optional) Enter your DevBrain Panel URL

### Step 3: Connect Site in DevBrain Panel

1. Open DevBrain Panel → WordPress Suite
2. Click "+ Add Site"
3. Enter:
   - **Site Name**: "My Client Site"
   - **Site URL**: "https://example.com"
   - **API Key**: Paste from WordPress
4. Click "Connect"
5. Panel will verify connection and fetch site info

### Step 4: Start Managing

Now you can:
- Run security scans
- Create backups
- Migrate sites
- Optimize performance
- Monitor uptime
- And 20+ more features!

## 🔄 How Migration Works

### Migration Types Supported

#### 1. **Plugin-to-Plugin Migration** (Easiest)
Both source and destination have DevBrain Connector installed.

**Flow:**
```
Source Site (with plugin)
    ↓
[DevBrain Panel triggers]
    ↓
1. Create full backup on source
2. Upload backup to staging area
3. Transfer to destination
4. Plugin on destination extracts & restores
    ↓
Done! ✓
```

**Steps in Panel:**
1. Go to WordPress Suite → Migration Tool
2. Select source site (from connected sites)
3. Select destination site (from connected sites)
4. Choose migration type (Full/Files Only/Database Only)
5. Click "Start Migration"
6. Monitor progress in real-time
7. Automatic URL replacement & permalink regeneration

#### 2. **Plugin-to-New Migration**
Source has plugin, destination is empty server.

**Flow:**
```
Source Site (with plugin)
    ↓
1. Backup created
    ↓
2. Upload to destination via SSH/FTP
    ↓
3. Extract files
    ↓
4. Import database
    ↓
5. Update wp-config.php
    ↓
6. Replace URLs
    ↓
Done! ✓
```

**Steps in Panel:**
1. Go to WordPress Suite → Migration Tool
2. Select source site
3. Enter destination server details:
   - SSH Host
   - SSH User
   - SSH Password/Key
   - Destination path
4. Click "Start Migration"
5. Panel handles everything automatically

#### 3. **Manual Migration** (No Plugin on Source)
When you can't install plugin on source.

**Flow:**
```
Manual Backup
    ↓
Upload to DevBrain Panel
    ↓
Select destination
    ↓
Automatic deployment
```

**Steps in Panel:**
1. WordPress Suite → Migration Tool → Manual Migration
2. Upload backup file (ZIP or SQL+Files)
3. Select destination
4. Configure settings
5. Deploy

## 🛡️ How Security Scanning Works

### Without Panel Connection
Plugin runs local scans on schedule (daily by default):
- Scans files for malware patterns
- Checks admin users
- Monitors file changes
- Logs results locally

### With Panel Connection
Panel can trigger scans remotely + get results:
```
Panel sends request → Plugin scans → Returns threats → Panel displays
```

You can:
- Run scans from panel
- View results centrally for all sites
- Enable auto-healing
- Get real-time alerts

## 💾 How Backup Works

### Local Backups (Free Forever)
Plugin stores backups in: `/wp-content/devbrain-backups/`

### Cloud Backups (When Configured)
Plugin uploads to:
- Amazon S3
- Google Drive
- Dropbox
- Your custom FTP/SFTP

### Scheduled Backups
Set in WordPress → DevBrain → Settings:
- Daily (default)
- Weekly
- Monthly
- Before updates (automatic)

### Remote Backups via Panel
Panel can trigger backups and download them:
```
Panel → Trigger backup → Plugin creates → Upload to cloud → Panel downloads
```

## 🔧 What Each Tool Does

### 1. AI Auto-Healing Scanner
- Scans all PHP files
- Detects: base64_decode, eval(), shell_exec, etc.
- Quarantines infected files
- Removes malicious admin users
- Regenerates security keys
- Blocks attacking IPs
- **AI explains how hack happened**

### 2. 1-Click Emergency Fix
One button to fix broken sites:
- Disable all plugins (except DevBrain)
- Clear all caches
- Repair database tables
- Fix file permissions (644/755)
- Regenerate .htaccess
- Clear transients
- Fix memory limits

### 3. Smart Plugin Detector
Analyzes installed plugins:
- Last updated date (abandoned plugins)
- Known vulnerabilities
- Performance impact
- Compatibility issues
- Suggests alternatives

### 4. AI Patch Generator
- Reads custom theme/plugin code
- Finds deprecated WordPress functions
- Suggests modern alternatives
- Generates patch file
- Can auto-apply (with backup)

### 5. Visual Change Monitoring
- Takes daily screenshots
- Compares with previous day
- Alerts if layout changes drastically
- Helps detect defacement
- Can auto-rollback

### 6. Multi-Site Broadcasting
Run actions across ALL connected sites:
- Update all plugins
- Clear all caches
- Run security scan
- Backup all sites
- Update WordPress core

### 7. Unlimited Backup Engine
- No file size limits
- Incremental backups (only changed files)
- Differential backups
- Encrypted (AES-256)
- Multi-cloud storage
- Automatic cleanup (old backups)

### 8. 1-Click Migration
Handles everything:
- File transfer (rsync/FTP/SSH)
- Database export/import
- URL replacement (old → new domain)
- Permalink regeneration
- Mixed content fixes
- wp-config updates
- PHP version check

### 9. Blueprint Cloner
Save site as template:
- Plugin list
- Theme
- Settings
- Menus
- Widgets
- WooCommerce config
Then deploy to new sites in 1-click!

### 10. Staging Environment
Create staging copy:
- Duplicate files
- Duplicate database
- Disable cache
- Enable WP_DEBUG
- Separate subdomain (staging.example.com)
- Sync changes back to production

### 11. Speed Optimizer
Auto-optimizes:
- Minify CSS/JS/HTML
- Image compression (WebP)
- Lazy loading
- CDN setup
- Database cleanup
- Remove unused CSS
- Defer JavaScript
- Enable Gzip/Brotli

### 12. Plugin Performance Heatmap
Shows exactly which plugins are slow:
- Load time per plugin
- Database queries count
- Memory usage
- HTTP requests
Color-coded heatmap!

### 13. Database Query Inspector
Finds slow queries:
- N+1 query problems
- Missing indexes
- Slow WooCommerce queries
- Heavy admin-ajax calls
Auto-adds indexes where needed!

### 14-25. (All other tools...)

## 🚫 What You CANNOT Do Without Plugin

You **CANNOT**:
- Run remote security scans
- Create backups remotely
- Migrate sites automatically
- Get real-time monitoring
- Execute emergency fixes remotely
- Access file explorer
- Run database optimizer

You **CAN STILL**:
- View sites you manually added
- Check DNS/SSL externally
- Monitor uptime (via HTTP ping)
- Store manual backups you upload

## ✅ Summary

| Feature | Without Plugin | With Plugin |
|---------|---------------|-------------|
| Add site to panel | ✅ Yes | ✅ Yes |
| External uptime monitoring | ✅ Yes | ✅ Yes |
| SSL/DNS checks | ✅ Yes | ✅ Yes |
| Security scanning | ❌ No | ✅ Yes |
| Remote backups | ❌ No | ✅ Yes |
| Migration | ❌ No | ✅ Yes |
| Plugin management | ❌ No | ✅ Yes |
| File explorer | ❌ No | ✅ Yes |
| Database access | ❌ No | ✅ Yes |
| Emergency fixes | ❌ No | ✅ Yes |

## 💡 Best Practice Workflow

1. **For Your Sites**: Install plugin immediately
2. **For Client Sites**: Install plugin during setup
3. **For Sites You Don't Control**: Monitor externally only
4. **For Migration**: Install plugin on destination first

## 🎯 Recommended Setup

### For Freelancers:
```
Install DevBrain Connector on:
- All client WordPress sites
- Your staging environments
- Your localhost (optional)

Result: Manage everything from one panel!
```

### For Agencies:
```
Create Blueprint with:
- DevBrain Connector pre-installed
- Common plugins
- Standard theme
- Security hardening applied

Deploy blueprint to every new client site = instant management!
```

## 📞 Quick Start Guide

1. Download DevBrain Connector from panel
2. Install on WordPress site
3. Copy API key
4. Add site in panel
5. Start managing!

**That's it!** 🎉

---

Need help? Check the full documentation or contact support.
