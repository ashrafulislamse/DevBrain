'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Wordpress,
  Plug,
  Palette,
  Database,
  Shield,
  Zap,
  Download,
  RefreshCw,
  Upload,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Settings,
  Play,
  Trash2,
  Eye,
  Clock,
  TrendingUp,
  HardDrive,
} from 'lucide-react';

const WP_TOOLS = [
  { id: 'plugins', name: 'Plugin Manager', icon: Plug },
  { id: 'themes', name: 'Theme Manager', icon: Palette },
  { id: 'database', name: 'DB Optimizer', icon: Database },
  { id: 'security', name: 'Security', icon: Shield },
  { id: 'performance', name: 'Performance', icon: Zap },
  { id: 'backup', name: 'Backups', icon: HardDrive },
  { id: 'updates', name: 'Updates', icon: RefreshCw },
  { id: 'migration', name: 'Migration', icon: Upload },
];

export default function WordPressPage() {
  const [selectedTool, setSelectedTool] = useState('plugins');
  const [isProcessing, setIsProcessing] = useState(false);
  const [siteUrl, setSiteUrl] = useState('');
  const [isConnected, setIsConnected] = useState(false);

  // Plugins data
  const [plugins, setPlugins] = useState([
    {
      id: '1',
      name: 'WooCommerce',
      version: '8.5.2',
      status: 'active',
      updateAvailable: true,
      newVersion: '8.6.0',
    },
    {
      id: '2',
      name: 'Yoast SEO',
      version: '21.8',
      status: 'active',
      updateAvailable: false,
    },
    {
      id: '3',
      name: 'Contact Form 7',
      version: '5.8.6',
      status: 'inactive',
      updateAvailable: true,
      newVersion: '5.9.0',
    },
    {
      id: '4',
      name: 'WP Rocket',
      version: '3.15.5',
      status: 'active',
      updateAvailable: false,
    },
  ]);

  // Themes data
  const [themes, setThemes] = useState([
    { id: '1', name: 'Astra', version: '4.6.0', active: true, updateAvailable: false },
    { id: '2', name: 'Hello Elementor', version: '2.9.0', active: false, updateAvailable: true },
    { id: '3', name: 'Twenty Twenty-Four', version: '1.0', active: false, updateAvailable: false },
  ]);

  // Database optimization
  const [dbStats, setDbStats] = useState({
    size: '245.6 MB',
    tables: 42,
    overhead: '12.3 MB',
    postRevisions: 1247,
    spam: 89,
    trash: 156,
  });

  // Security issues
  const [securityIssues, setSecurityIssues] = useState([
    {
      severity: 'high',
      title: 'WordPress version outdated',
      description: 'Running 6.3.2, latest is 6.4.2',
      fix: 'Update WordPress core',
    },
    {
      severity: 'medium',
      title: 'File permissions too permissive',
      description: 'wp-config.php has 777 permissions',
      fix: 'Change to 600',
    },
    {
      severity: 'low',
      title: 'Default admin username',
      description: 'Admin user still named "admin"',
      fix: 'Change admin username',
    },
  ]);

  // Performance metrics
  const [performance, setPerformance] = useState({
    pageSpeed: 78,
    loadTime: '2.4s',
    requests: 47,
    pageSize: '1.2 MB',
    cacheHitRate: '89%',
    databaseQueries: 34,
  });

  // Backups
  const [backups, setBackups] = useState([
    {
      id: '1',
      date: '2024-01-15 02:00',
      size: '523 MB',
      type: 'Full',
      status: 'completed',
    },
    {
      id: '2',
      date: '2024-01-14 02:00',
      size: '521 MB',
      type: 'Full',
      status: 'completed',
    },
    {
      id: '3',
      date: '2024-01-13 02:00',
      size: '518 MB',
      type: 'Full',
      status: 'completed',
    },
  ]);

  const renderToolContent = () => {
    switch (selectedTool) {
      case 'plugins':
        return (
          <div className="space-y-6">
            <div className="flex gap-2">
              <Input placeholder="Search plugins..." className="flex-1" />
              <Button className="bg-gradient-to-r from-blue-600 to-indigo-600">
                <Plug className="w-4 h-4 mr-2" />
                Install Plugin
              </Button>
            </div>

            <div className="grid grid-cols-4 gap-4">
              <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20">
                <CardContent className="p-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total Plugins</p>
                  <p className="text-3xl font-bold text-blue-600">{plugins.length}</p>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20">
                <CardContent className="p-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Active</p>
                  <p className="text-3xl font-bold text-green-600">
                    {plugins.filter((p) => p.status === 'active').length}
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20">
                <CardContent className="p-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Updates</p>
                  <p className="text-3xl font-bold text-yellow-600">
                    {plugins.filter((p) => p.updateAvailable).length}
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-gray-50 to-slate-50 dark:from-gray-900/20">
                <CardContent className="p-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Inactive</p>
                  <p className="text-3xl font-bold text-gray-600">
                    {plugins.filter((p) => p.status === 'inactive').length}
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Installed Plugins</CardTitle>
                  <Button size="sm" variant="outline">
                    Update All
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {plugins.map((plugin) => (
                    <div
                      key={plugin.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all"
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                            plugin.status === 'active'
                              ? 'bg-gradient-to-br from-green-500 to-emerald-500'
                              : 'bg-gray-200 dark:bg-gray-700'
                          }`}
                        >
                          <Plug
                            className={`w-6 h-6 ${plugin.status === 'active' ? 'text-white' : 'text-gray-400'}`}
                          />
                        </div>
                        <div>
                          <h4 className="font-bold">{plugin.name}</h4>
                          <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                            <span>v{plugin.version}</span>
                            {plugin.updateAvailable && (
                              <>
                                <span>→</span>
                                <Badge variant="outline" className="bg-yellow-50 text-yellow-700">
                                  v{plugin.newVersion} available
                                </Badge>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant="outline"
                          className={
                            plugin.status === 'active'
                              ? 'bg-green-50 text-green-700'
                              : 'bg-gray-50 text-gray-700'
                          }
                        >
                          {plugin.status}
                        </Badge>
                        {plugin.updateAvailable && (
                          <Button size="sm" variant="outline">
                            <RefreshCw className="w-3 h-3 mr-1" />
                            Update
                          </Button>
                        )}
                        <Button size="sm" variant="outline">
                          <Settings className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'themes':
        return (
          <div className="space-y-6">
            <div className="flex gap-2">
              <Input placeholder="Search themes..." className="flex-1" />
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600">
                <Palette className="w-4 h-4 mr-2" />
                Install Theme
              </Button>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Installed Themes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {themes.map((theme) => (
                    <Card
                      key={theme.id}
                      className={theme.active ? 'ring-2 ring-purple-500' : ''}
                    >
                      <CardContent className="p-5">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h4 className="font-bold text-lg">{theme.name}</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              Version {theme.version}
                            </p>
                          </div>
                          {theme.active && (
                            <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0">
                              Active
                            </Badge>
                          )}
                        </div>
                        <div className="h-32 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/20 rounded-lg mb-3 flex items-center justify-center">
                          <Palette className="w-12 h-12 text-purple-400" />
                        </div>
                        <div className="flex gap-2">
                          {!theme.active && (
                            <Button size="sm" className="flex-1">
                              Activate
                            </Button>
                          )}
                          <Button size="sm" variant="outline" className="flex-1">
                            <Eye className="w-3 h-3 mr-1" />
                            Preview
                          </Button>
                          {theme.updateAvailable && (
                            <Button size="sm" variant="outline">
                              Update
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'database':
        return (
          <div className="space-y-6">
            <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold mb-4">Database Overview</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Database Size</p>
                    <p className="text-3xl font-bold text-blue-600">{dbStats.size}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Tables</p>
                    <p className="text-3xl font-bold text-cyan-600">{dbStats.tables}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Overhead</p>
                    <p className="text-3xl font-bold text-yellow-600">{dbStats.overhead}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Optimization Tasks</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  {
                    title: 'Remove Post Revisions',
                    count: dbStats.postRevisions,
                    saving: '8.4 MB',
                    icon: RefreshCw,
                  },
                  { title: 'Delete Spam Comments', count: dbStats.spam, saving: '0.3 MB', icon: Trash2 },
                  { title: 'Empty Trash', count: dbStats.trash, saving: '2.1 MB', icon: Trash2 },
                  { title: 'Optimize Tables', count: dbStats.tables, saving: dbStats.overhead, icon: Database },
                ].map((task, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50"
                  >
                    <div className="flex items-center gap-3">
                      <task.icon className="w-5 h-5 text-blue-600" />
                      <div>
                        <p className="font-medium">{task.title}</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          {task.count} items • Save {task.saving}
                        </p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      <Play className="w-3 h-3 mr-1" />
                      Run
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Button className="w-full bg-gradient-to-r from-blue-600 to-cyan-600">
              <Zap className="w-4 h-4 mr-2" />
              Optimize All
            </Button>
          </div>
        );

      case 'security':
        return (
          <div className="space-y-6">
            <Card className="bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/20">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="w-8 h-8 text-red-600" />
                  <div>
                    <h3 className="text-lg font-bold">Security Status</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {securityIssues.length} issues found
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">High</p>
                    <p className="text-3xl font-bold text-red-600">
                      {securityIssues.filter((i) => i.severity === 'high').length}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Medium</p>
                    <p className="text-3xl font-bold text-yellow-600">
                      {securityIssues.filter((i) => i.severity === 'medium').length}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Low</p>
                    <p className="text-3xl font-bold text-blue-600">
                      {securityIssues.filter((i) => i.severity === 'low').length}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Security Issues</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {securityIssues.map((issue, i) => (
                    <div
                      key={i}
                      className={`p-4 border-l-4 rounded-lg ${
                        issue.severity === 'high'
                          ? 'border-red-600 bg-red-50 dark:bg-red-900/20'
                          : issue.severity === 'medium'
                            ? 'border-yellow-600 bg-yellow-50 dark:bg-yellow-900/20'
                            : 'border-blue-600 bg-blue-50 dark:bg-blue-900/20'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h4 className="font-bold mb-1">{issue.title}</h4>
                          <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                            {issue.description}
                          </p>
                          <div className="bg-white dark:bg-gray-800 p-2 rounded text-xs">
                            <strong>Fix:</strong> {issue.fix}
                          </div>
                        </div>
                        <Badge
                          variant="outline"
                          className={
                            issue.severity === 'high'
                              ? 'bg-red-100 text-red-800'
                              : issue.severity === 'medium'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-blue-100 text-blue-800'
                          }
                        >
                          {issue.severity}
                        </Badge>
                      </div>
                      <Button size="sm" variant="outline" className="mt-2">
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        Apply Fix
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'performance':
        return (
          <div className="space-y-6">
            <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold mb-4">Performance Metrics</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Page Speed Score</p>
                    <p className="text-5xl font-bold text-green-600">{performance.pageSpeed}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Load Time</p>
                    <p className="text-3xl font-bold text-emerald-600">{performance.loadTime}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Cache Hit Rate</p>
                    <p className="text-3xl font-bold text-teal-600">{performance.cacheHitRate}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-4">
              {[
                { label: 'HTTP Requests', value: performance.requests, icon: TrendingUp },
                { label: 'Page Size', value: performance.pageSize, icon: HardDrive },
                { label: 'DB Queries', value: performance.databaseQueries, icon: Database },
                { label: 'Cache Hit Rate', value: performance.cacheHitRate, icon: Zap },
              ].map((metric, i) => (
                <Card key={i}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{metric.label}</p>
                        <p className="text-2xl font-bold">{metric.value}</p>
                      </div>
                      <metric.icon className="w-8 h-8 text-green-600/20" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Performance Recommendations</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {[
                    'Enable browser caching for static assets',
                    'Minify CSS and JavaScript files',
                    'Optimize images - convert to WebP format',
                    'Enable Gzip compression',
                    'Reduce database queries by implementing caching',
                  ].map((rec, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{rec}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        );

      case 'backup':
        return (
          <div className="space-y-6">
            <div className="flex gap-2">
              <Button className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600">
                <Download className="w-4 h-4 mr-2" />
                Create Backup Now
              </Button>
              <Button variant="outline">
                <Settings className="w-4 h-4 mr-2" />
                Schedule
              </Button>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Recent Backups</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {backups.map((backup) => (
                    <div
                      key={backup.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center">
                          <HardDrive className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <p className="font-medium">{backup.type} Backup</p>
                          <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                            <Clock className="w-3 h-3" />
                            <span>{backup.date}</span>
                            <span>•</span>
                            <span>{backup.size}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="bg-green-50 text-green-700">
                          {backup.status}
                        </Badge>
                        <Button size="sm" variant="outline">
                          <Download className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'updates':
        return (
          <div className="space-y-6">
            <Card className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold mb-4">Available Updates</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">WordPress Core</p>
                    <p className="text-3xl font-bold text-purple-600">1</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Plugins</p>
                    <p className="text-3xl font-bold text-blue-600">
                      {plugins.filter((p) => p.updateAvailable).length}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Themes</p>
                    <p className="text-3xl font-bold text-indigo-600">
                      {themes.filter((t) => t.updateAvailable).length}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600">
              <RefreshCw className="w-4 h-4 mr-2" />
              Update Everything
            </Button>

            <Card className="bg-blue-50 dark:bg-blue-900/20">
              <CardContent className="p-6">
                <h4 className="font-bold mb-3 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-blue-600" />
                  Auto-Update Settings
                </h4>
                <div className="space-y-2">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" checked className="w-4 h-4" readOnly />
                    <span className="text-sm">Auto-update WordPress core</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="w-4 h-4" readOnly />
                    <span className="text-sm">Auto-update plugins</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="w-4 h-4" readOnly />
                    <span className="text-sm">Auto-update themes</span>
                  </label>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'migration':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>WordPress Migration Tool</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Source Site URL</label>
                  <Input placeholder="https://old-site.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Destination Site URL</label>
                  <Input placeholder="https://new-site.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Migration Options</label>
                  <div className="space-y-2">
                    {['Database', 'Media files', 'Themes', 'Plugins', 'Settings'].map((option, i) => (
                      <label key={i} className="flex items-center gap-2">
                        <input type="checkbox" defaultChecked className="w-4 h-4" />
                        <span className="text-sm">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <Button className="w-full bg-gradient-to-r from-green-600 to-emerald-600">
                  <Upload className="w-4 h-4 mr-2" />
                  Start Migration
                </Button>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return <p>Select a tool to get started</p>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 bg-clip-text text-transparent">
            WordPress Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Professional WordPress site management tools
          </p>
        </div>
        <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0">
          <Wordpress className="w-3 h-3 mr-1" />
          {WP_TOOLS.length} Tools
        </Badge>
      </div>

      {/* Connection */}
      {!isConnected && (
        <Card>
          <CardHeader>
            <CardTitle>Connect WordPress Site</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Site URL</label>
              <Input
                placeholder="https://yoursite.com"
                value={siteUrl}
                onChange={(e) => setSiteUrl(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">API Key</label>
              <Input type="password" placeholder="WordPress REST API Key" />
            </div>
            <Button
              onClick={() => setIsConnected(true)}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600"
            >
              <Wordpress className="w-4 h-4 mr-2" />
              Connect Site
            </Button>
          </CardContent>
        </Card>
      )}

      {isConnected && (
        <>
          {/* Tool Selection */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {WP_TOOLS.map((tool) => (
              <Card
                key={tool.id}
                onClick={() => setSelectedTool(tool.id)}
                className={`cursor-pointer transition-all ${
                  selectedTool === tool.id
                    ? 'ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'hover:shadow-lg'
                }`}
              >
                <CardContent className="p-4 text-center">
                  <tool.icon className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                  <p className="text-xs font-medium">{tool.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Tool Content */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {WP_TOOLS.find((t) => t.id === selectedTool)?.icon && (
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                    {(() => {
                      const Icon = WP_TOOLS.find((t) => t.id === selectedTool)!.icon;
                      return <Icon className="w-5 h-5 text-white" />;
                    })()}
                  </div>
                )}
                {WP_TOOLS.find((t) => t.id === selectedTool)?.name}
              </CardTitle>
            </CardHeader>
            <CardContent>{renderToolContent()}</CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
