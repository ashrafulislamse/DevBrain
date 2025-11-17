'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Globe,
  Shield,
  Zap,
  Database,
  Copy,
  RefreshCw,
  Download,
  Upload,
  Settings,
  Eye,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Trash2,
  Play,
  Pause,
  Search,
  Filter,
  Plus,
  Sparkles,
  Activity,
  Lock,
  Unlock,
  FileText,
  Image as ImageIcon,
  Code,
  Wrench,
  BarChart3,
  Users,
  Bell,
  Clock,
  HardDrive,
  Server,
} from 'lucide-react';

const WP_TOOL_CATEGORIES = [
  {
    id: 'security',
    name: 'Security & Healing',
    icon: Shield,
    color: 'from-red-500 to-rose-500',
    tools: [
      { id: 'auto-healing', name: 'AI Auto-Healing Scanner', icon: Sparkles },
      { id: 'emergency-fix', name: '1-Click Emergency Fix', icon: Zap },
      { id: 'malware-scan', name: 'Malware Scanner', icon: Shield },
      { id: 'hardening', name: 'WP Hardening', icon: Lock },
      { id: 'admin-detection', name: 'Malicious Admin Detection', icon: Users },
    ],
  },
  {
    id: 'backup',
    name: 'Backup & Migration',
    icon: HardDrive,
    color: 'from-blue-500 to-cyan-500',
    tools: [
      { id: 'backup', name: 'Unlimited Backup', icon: HardDrive },
      { id: 'migration', name: '1-Click Migration', icon: Upload },
      { id: 'staging', name: 'Staging Environment', icon: Copy },
      { id: 'blueprint', name: 'Blueprint Cloner', icon: FileText },
    ],
  },
  {
    id: 'performance',
    name: 'Performance & Speed',
    icon: Zap,
    color: 'from-orange-500 to-yellow-500',
    tools: [
      { id: 'optimizer', name: 'Speed Optimizer', icon: Zap },
      { id: 'plugin-heatmap', name: 'Plugin Performance Heatmap', icon: BarChart3 },
      { id: 'db-optimizer', name: 'Database Query Inspector', icon: Database },
      { id: 'cache', name: 'Smart Cache Manager', icon: RefreshCw },
    ],
  },
  {
    id: 'monitoring',
    name: 'Monitoring & Reports',
    icon: Activity,
    color: 'from-purple-500 to-pink-500',
    tools: [
      { id: 'uptime', name: 'Uptime & Health Check', icon: Activity },
      { id: 'visual-monitor', name: 'Visual Change Detection', icon: Eye },
      { id: 'reports', name: 'Client Reports', icon: FileText },
      { id: 'alerts', name: 'Smart Alerts', icon: Bell },
    ],
  },
  {
    id: 'management',
    name: 'Site Management',
    icon: Settings,
    color: 'from-green-500 to-emerald-500',
    tools: [
      { id: 'multi-site', name: 'Multi-Site Manager', icon: Globe },
      { id: 'plugin-doctor', name: 'Smart Plugin Detector', icon: Wrench },
      { id: 'file-explorer', name: 'File Explorer & Diff', icon: Code },
      { id: 'config-gen', name: 'Server Config Generator', icon: Settings },
    ],
  },
  {
    id: 'client',
    name: 'Client Tools',
    icon: Users,
    color: 'from-indigo-500 to-blue-500',
    tools: [
      { id: 'content-editor', name: 'Safe Content Editor', icon: FileText },
      { id: 'support-bot', name: 'White-Label Support Bot', icon: Sparkles },
      { id: 'task-inbox', name: 'Client Task Inbox', icon: Bell },
      { id: 'ai-blog', name: 'AI Blog Generator', icon: Sparkles },
    ],
  },
];

interface WordPressSite {
  id: string;
  name: string;
  url: string;
  status: 'online' | 'offline' | 'warning';
  phpVersion: string;
  wpVersion: string;
  plugins: number;
  themes: number;
  dbSize: string;
  lastBackup: string;
  issues: number;
  performanceScore: number;
}

export default function WordPressProPage() {
  const [selectedCategory, setSelectedCategory] = useState('security');
  const [selectedTool, setSelectedTool] = useState('auto-healing');
  const [connectedSites, setConnectedSites] = useState<WordPressSite[]>([
    {
      id: '1',
      name: 'Main Website',
      url: 'https://example.com',
      status: 'online',
      phpVersion: '8.2',
      wpVersion: '6.4',
      plugins: 23,
      themes: 3,
      dbSize: '245 MB',
      lastBackup: '2 hours ago',
      issues: 0,
      performanceScore: 94,
    },
    {
      id: '2',
      name: 'Client Site #1',
      url: 'https://client1.com',
      status: 'warning',
      phpVersion: '7.4',
      wpVersion: '6.3',
      plugins: 45,
      themes: 5,
      dbSize: '1.2 GB',
      lastBackup: '1 day ago',
      issues: 3,
      performanceScore: 67,
    },
    {
      id: '3',
      name: 'Blog Site',
      url: 'https://myblog.com',
      status: 'online',
      phpVersion: '8.1',
      wpVersion: '6.4',
      plugins: 18,
      themes: 2,
      dbSize: '89 MB',
      lastBackup: '6 hours ago',
      issues: 0,
      performanceScore: 89,
    },
  ]);

  const [scanResults, setScanResults] = useState<any>(null);
  const [isScanning, setIsScanning] = useState(false);

  const runAutoHealing = () => {
    setIsScanning(true);
    setTimeout(() => {
      setScanResults({
        threats: [
          { type: 'Malware', file: 'wp-content/themes/old-theme/footer.php', severity: 'critical', cleaned: true },
          { type: 'Suspicious Admin', user: 'hacker123', severity: 'critical', cleaned: true },
          { type: 'Base64 Injection', file: 'wp-includes/js/custom.js', severity: 'high', cleaned: true },
        ],
        actions: [
          'Removed 3 infected files',
          'Deleted 1 suspicious admin user',
          'Regenerated security salts',
          'Updated file permissions',
          'Blocked 5 malicious IPs',
        ],
        aiAnalysis: 'The infection occurred through an outdated plugin (Contact Form 7 v3.2). The attacker used a known exploit to upload malicious files. Recommendation: Update all plugins, change admin password, and enable 2FA.',
      });
      setIsScanning(false);
    }, 3000);
  };

  const renderToolContent = () => {
    const currentCategory = WP_TOOL_CATEGORIES.find(cat => cat.id === selectedCategory);

    switch (selectedTool) {
      case 'auto-healing':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-yellow-500" />
                  AI Auto-Healing WordPress Scanner
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Automatically scans, detects, and removes malware, suspicious code, and security threats.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {['Malware Detection', 'File Integrity', 'Admin Security'].map((feature) => (
                    <div key={feature} className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                      <CheckCircle2 className="w-4 h-4 text-green-500 mb-1" />
                      <p className="text-sm font-medium">{feature}</p>
                    </div>
                  ))}
                </div>

                <Button
                  onClick={runAutoHealing}
                  disabled={isScanning}
                  className="w-full bg-gradient-to-r from-red-600 to-rose-600"
                >
                  {isScanning ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Scanning & Healing...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-2" />
                      Run Auto-Healing Scan
                    </>
                  )}
                </Button>

                {scanResults && (
                  <div className="space-y-4">
                    <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                      <h3 className="font-semibold text-red-700 dark:text-red-400 mb-3">
                        Threats Detected & Cleaned
                      </h3>
                      <div className="space-y-2">
                        {scanResults.threats.map((threat: any, idx: number) => (
                          <div key={idx} className="flex items-start gap-2 text-sm">
                            <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5" />
                            <div>
                              <p className="font-medium">{threat.type}</p>
                              <p className="text-gray-600 dark:text-gray-400">
                                {threat.file || threat.user}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                      <h3 className="font-semibold text-blue-700 dark:text-blue-400 mb-3">
                        AI Analysis & Prevention
                      </h3>
                      <p className="text-sm">{scanResults.aiAnalysis}</p>
                    </div>

                    <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                      <h3 className="font-semibold text-green-700 dark:text-green-400 mb-3">
                        Actions Taken
                      </h3>
                      <ul className="space-y-1">
                        {scanResults.actions.map((action: string, idx: number) => (
                          <li key={idx} className="text-sm flex items-center gap-2">
                            <CheckCircle2 className="w-3 h-3 text-green-500" />
                            {action}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        );

      case 'emergency-fix':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-yellow-500" />
                  1-Click Emergency Fix
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                  <p className="text-sm text-yellow-800 dark:text-yellow-400">
                    <strong>Warning:</strong> This will perform multiple fixes on your WordPress site. Use when site is broken or compromised.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    'Remove Malware',
                    'Clear All Cache',
                    'Reset File Permissions',
                    'Fix WP-Cron',
                    'Disable All Plugins',
                    'Regenerate .htaccess',
                    'Repair Database Tables',
                    'Fix Memory Limits',
                    'Clear Transients',
                    'Optimize Autoload',
                  ].map((action) => (
                    <div key={action} className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-900 rounded">
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                      <span className="text-sm">{action}</span>
                    </div>
                  ))}
                </div>

                <Button className="w-full bg-gradient-to-r from-red-600 to-orange-600 text-lg py-6">
                  <Zap className="w-5 h-5 mr-2" />
                  Fix My WordPress Now!
                </Button>
              </CardContent>
            </Card>
          </div>
        );

      case 'multi-site':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">All WordPress Sites</h2>
              <div className="flex gap-2">
                <Button variant="outline">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Site
                </Button>
                <Button className="bg-gradient-to-r from-blue-600 to-cyan-600">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Bulk Actions
                </Button>
              </div>
            </div>

            <div className="grid gap-4">
              {connectedSites.map((site) => (
                <Card key={site.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start gap-3">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                          site.status === 'online' ? 'bg-green-100 dark:bg-green-900/30' :
                          site.status === 'warning' ? 'bg-yellow-100 dark:bg-yellow-900/30' :
                          'bg-red-100 dark:bg-red-900/30'
                        }`}>
                          <Globe className={`w-6 h-6 ${
                            site.status === 'online' ? 'text-green-500' :
                            site.status === 'warning' ? 'text-yellow-500' :
                            'text-red-500'
                          }`} />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">{site.name}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{site.url}</p>
                          <div className="flex items-center gap-3 mt-2">
                            <Badge className={
                              site.status === 'online' ? 'bg-green-500' :
                              site.status === 'warning' ? 'bg-yellow-500' :
                              'bg-red-500'
                            }>
                              {site.status}
                            </Badge>
                            <span className="text-xs text-gray-600 dark:text-gray-400">
                              WP {site.wpVersion} • PHP {site.phpVersion}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-green-500">{site.performanceScore}</div>
                        <p className="text-xs text-gray-600 dark:text-gray-400">Performance</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                      <div className="text-center p-2 bg-gray-50 dark:bg-gray-900 rounded">
                        <p className="text-xs text-gray-600 dark:text-gray-400">Plugins</p>
                        <p className="font-semibold">{site.plugins}</p>
                      </div>
                      <div className="text-center p-2 bg-gray-50 dark:bg-gray-900 rounded">
                        <p className="text-xs text-gray-600 dark:text-gray-400">Themes</p>
                        <p className="font-semibold">{site.themes}</p>
                      </div>
                      <div className="text-center p-2 bg-gray-50 dark:bg-gray-900 rounded">
                        <p className="text-xs text-gray-600 dark:text-gray-400">DB Size</p>
                        <p className="font-semibold">{site.dbSize}</p>
                      </div>
                      <div className="text-center p-2 bg-gray-50 dark:bg-gray-900 rounded">
                        <p className="text-xs text-gray-600 dark:text-gray-400">Issues</p>
                        <p className="font-semibold">{site.issues}</p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Eye className="w-3 h-3 mr-1" />
                        Manage
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <HardDrive className="w-3 h-3 mr-1" />
                        Backup
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Shield className="w-3 h-3 mr-1" />
                        Scan
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Zap className="w-3 h-3 mr-1" />
                        Optimize
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case 'backup':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HardDrive className="w-5 h-5" />
                  Unlimited WordPress Backup
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Backup Type</p>
                    <select className="w-full mt-1 p-2 border rounded">
                      <option>Full Backup</option>
                      <option>Files Only</option>
                      <option>Database Only</option>
                      <option>Incremental</option>
                    </select>
                  </div>
                  <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Storage</p>
                    <select className="w-full mt-1 p-2 border rounded">
                      <option>Local Server</option>
                      <option>Amazon S3</option>
                      <option>Google Drive</option>
                      <option>Dropbox</option>
                    </select>
                  </div>
                  <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Encryption</p>
                    <select className="w-full mt-1 p-2 border rounded">
                      <option>AES-256</option>
                      <option>None</option>
                    </select>
                  </div>
                </div>

                <Button className="w-full bg-gradient-to-r from-blue-600 to-cyan-600">
                  <HardDrive className="w-4 h-4 mr-2" />
                  Start Backup Now
                </Button>

                <div className="space-y-2">
                  <h3 className="font-semibold">Recent Backups</h3>
                  {[
                    { date: '2 hours ago', size: '1.2 GB', type: 'Full', status: 'completed' },
                    { date: '1 day ago', size: '1.1 GB', type: 'Full', status: 'completed' },
                    { date: '3 days ago', size: '89 MB', type: 'Database', status: 'completed' },
                  ].map((backup, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900 rounded">
                      <div>
                        <p className="font-medium">{backup.type} Backup</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          {backup.date} • {backup.size}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Download className="w-3 h-3" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <RefreshCw className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400">Select a tool to get started</p>
          </div>
        );
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            WordPress Pro Management Suite
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Ultimate WordPress control panel with unlimited tools & AI automation
          </p>
        </div>
        <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0 px-4 py-2">
          <Globe className="w-4 h-4 mr-2" />
          {connectedSites.length} Sites Connected
        </Badge>
      </div>

      {/* Stats Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-blue-500" />
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Sites</p>
                <p className="text-2xl font-bold">{connectedSites.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Online</p>
                <p className="text-2xl font-bold">
                  {connectedSites.filter(s => s.status === 'online').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-yellow-500" />
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Issues</p>
                <p className="text-2xl font-bold">
                  {connectedSites.reduce((sum, s) => sum + s.issues, 0)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <HardDrive className="w-5 h-5 text-purple-500" />
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Backups Today</p>
                <p className="text-2xl font-bold">5</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-orange-500" />
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Avg Performance</p>
                <p className="text-2xl font-bold">83</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Category Selection */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        {WP_TOOL_CATEGORIES.map((category) => {
          const Icon = category.icon;
          return (
            <Card
              key={category.id}
              className={`cursor-pointer transition-all hover:scale-105 ${
                selectedCategory === category.id
                  ? 'ring-2 ring-blue-500 shadow-lg'
                  : ''
              }`}
              onClick={() => {
                setSelectedCategory(category.id);
                setSelectedTool(category.tools[0].id);
              }}
            >
              <CardContent className="p-4 text-center">
                <div className={`w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <p className="text-sm font-medium">{category.name}</p>
                <Badge variant="outline" className="mt-2">
                  {category.tools.length} tools
                </Badge>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Tool List */}
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">
                {WP_TOOL_CATEGORIES.find(c => c.id === selectedCategory)?.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-1">
                {WP_TOOL_CATEGORIES.find(c => c.id === selectedCategory)?.tools.map((tool) => {
                  const Icon = tool.icon;
                  return (
                    <button
                      key={tool.id}
                      onClick={() => setSelectedTool(tool.id)}
                      className={`w-full text-left px-4 py-3 flex items-center gap-3 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${
                        selectedTool === tool.id ? 'bg-blue-50 dark:bg-blue-900/30 border-l-4 border-l-blue-500' : ''
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="text-sm font-medium">{tool.name}</span>
                    </button>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tool Content */}
        <div className="md:col-span-3">
          {renderToolContent()}
        </div>
      </div>
    </div>
  );
}
