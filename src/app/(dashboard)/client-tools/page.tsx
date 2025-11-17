'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Wand2,
  Send,
  FileEdit,
  Eye,
  CheckCircle2,
  AlertCircle,
  Mail,
  MessageSquare,
  Zap,
  RefreshCw,
  Image as ImageIcon,
  Download,
  Play,
  Clock,
  TrendingUp,
} from 'lucide-react';

const CLIENT_TOOLS = [
  { id: 'magic-fix', name: 'Magic Fix', icon: Wand2 },
  { id: 'auto-comm', name: 'Auto Communication', icon: Send },
  { id: 'cms', name: 'Client CMS', icon: FileEdit },
  { id: 'visual-diff', name: 'Visual Diff', icon: Eye },
];

export default function ClientToolsPage() {
  const [selectedTool, setSelectedTool] = useState('magic-fix');
  const [isProcessing, setIsProcessing] = useState(false);
  const [siteUrl, setSiteUrl] = useState('');

  // Magic Fix data
  const [fixResults, setFixResults] = useState<any>(null);
  const [detectedIssues, setDetectedIssues] = useState([
    { type: 'error', title: '404 Error on /contact page', severity: 'high', autoFixable: true },
    { type: 'warning', title: 'Slow loading images (3.2s)', severity: 'medium', autoFixable: true },
    { type: 'error', title: 'Broken external links (5 found)', severity: 'medium', autoFixable: true },
    { type: 'warning', title: 'Mixed content (HTTP/HTTPS)', severity: 'low', autoFixable: true },
  ]);

  // Auto Communication
  const [communications, setCommunications] = useState([
    {
      id: '1',
      client: 'Acme Corp',
      type: 'milestone',
      message: 'Phase 2 completed - Dashboard is now live!',
      status: 'sent',
      timestamp: '2024-01-15 14:30',
      channel: 'email',
    },
    {
      id: '2',
      client: 'TechStart',
      type: 'update',
      message: 'Weekly progress: Bug fixes and performance optimizations',
      status: 'scheduled',
      timestamp: '2024-01-16 09:00',
      channel: 'slack',
    },
    {
      id: '3',
      client: 'Global Solutions',
      type: 'alert',
      message: 'Server maintenance scheduled for tonight 2-4 AM',
      status: 'draft',
      timestamp: '2024-01-15 18:00',
      channel: 'email',
    },
  ]);

  // CMS pages
  const [cmsPages, setCmsPages] = useState([
    { id: '1', title: 'Home', url: '/', lastEdited: '2024-01-15', status: 'published' },
    { id: '2', title: 'About Us', url: '/about', lastEdited: '2024-01-14', status: 'published' },
    { id: '3', title: 'Services', url: '/services', lastEdited: '2024-01-13', status: 'draft' },
    { id: '4', title: 'Contact', url: '/contact', lastEdited: '2024-01-12', status: 'published' },
  ]);

  // Visual Diff
  const [diffResults, setDiffResults] = useState([
    {
      page: 'Homepage',
      changes: 3,
      type: 'layout',
      description: 'Header navigation layout modified',
      screenshot: true,
    },
    {
      page: 'Product Page',
      changes: 1,
      type: 'content',
      description: 'Price updated from $99 to $79',
      screenshot: true,
    },
    {
      page: 'Footer',
      changes: 2,
      type: 'style',
      description: 'Color scheme changed',
      screenshot: true,
    },
  ]);

  const runMagicFix = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setFixResults({
        fixed: 4,
        issues: detectedIssues.length,
        time: '12 seconds',
        details: [
          '✓ Fixed 404 error - created missing contact page',
          '✓ Optimized images - reduced size by 68%',
          '✓ Updated broken links to current URLs',
          '✓ Converted all HTTP links to HTTPS',
        ],
      });
      setIsProcessing(false);
    }, 3000);
  };

  const renderToolContent = () => {
    switch (selectedTool) {
      case 'magic-fix':
        return (
          <div className="space-y-6">
            <Card className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Wand2 className="w-8 h-8 text-purple-600" />
                  <div>
                    <h3 className="text-lg font-bold">One-Click Site Repair</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      AI automatically detects and fixes common issues
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-2">
              <Input
                placeholder="https://client-website.com"
                value={siteUrl}
                onChange={(e) => setSiteUrl(e.target.value)}
                className="flex-1"
              />
              <Button
                onClick={runMagicFix}
                disabled={isProcessing}
                className="bg-gradient-to-r from-purple-600 to-pink-600"
              >
                {isProcessing ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Fixing...
                  </>
                ) : (
                  <>
                    <Wand2 className="w-4 h-4 mr-2" />
                    Magic Fix
                  </>
                )}
              </Button>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Detected Issues</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {detectedIssues.map((issue, i) => (
                    <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <AlertCircle
                          className={`w-5 h-5 ${
                            issue.severity === 'high'
                              ? 'text-red-600'
                              : issue.severity === 'medium'
                                ? 'text-yellow-600'
                                : 'text-blue-600'
                          }`}
                        />
                        <div>
                          <p className="font-medium">{issue.title}</p>
                          <p className="text-xs text-gray-500">Severity: {issue.severity}</p>
                        </div>
                      </div>
                      <Badge variant="outline" className="bg-green-50 text-green-700">
                        Auto-fixable
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {fixResults && (
              <Card className="bg-green-50 dark:bg-green-900/20 border-green-200">
                <CardHeader>
                  <CardTitle className="text-green-900 dark:text-green-100 flex items-center gap-2">
                    <CheckCircle2 className="w-6 h-6" />
                    All Issues Fixed!
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Issues Fixed</p>
                      <p className="text-3xl font-bold text-green-600">{fixResults.fixed}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Total Issues</p>
                      <p className="text-3xl font-bold text-green-600">{fixResults.issues}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Time Taken</p>
                      <p className="text-xl font-bold text-green-600">{fixResults.time}</p>
                    </div>
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Fixes Applied:</h4>
                    <ul className="space-y-1">
                      {fixResults.details.map((detail: string, i: number) => (
                        <li key={i} className="text-sm text-gray-700 dark:text-gray-300">
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        );

      case 'auto-comm':
        return (
          <div className="space-y-6">
            <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Send className="w-8 h-8 text-blue-600" />
                  <div>
                    <h3 className="text-lg font-bold">Auto Client Communication</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      AI sends automatic updates to clients
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Messages Sent</p>
                    <p className="text-3xl font-bold text-blue-600">247</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Scheduled</p>
                    <p className="text-3xl font-bold text-indigo-600">12</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Response Rate</p>
                    <p className="text-3xl font-bold text-purple-600">94%</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Recent Communications</CardTitle>
                  <Button size="sm" variant="outline">
                    <Mail className="w-3 h-3 mr-1" />
                    New Message
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {communications.map((comm) => (
                    <div key={comm.id} className="p-4 border rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-bold">{comm.client}</h4>
                            <Badge variant="outline" className="text-xs">
                              {comm.type}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                            {comm.message}
                          </p>
                          <div className="flex items-center gap-3 text-xs text-gray-500">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {comm.timestamp}
                            </span>
                            <span className="flex items-center gap-1">
                              {comm.channel === 'email' ? (
                                <Mail className="w-3 h-3" />
                              ) : (
                                <MessageSquare className="w-3 h-3" />
                              )}
                              {comm.channel}
                            </span>
                          </div>
                        </div>
                        <Badge
                          variant="outline"
                          className={
                            comm.status === 'sent'
                              ? 'bg-green-50 text-green-700'
                              : comm.status === 'scheduled'
                                ? 'bg-blue-50 text-blue-700'
                                : 'bg-gray-50 text-gray-700'
                          }
                        >
                          {comm.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Communication Templates</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { title: 'Milestone Completed', icon: CheckCircle2, color: 'green' },
                    { title: 'Weekly Progress', icon: TrendingUp, color: 'blue' },
                    { title: 'Issue Alert', icon: AlertCircle, color: 'red' },
                    { title: 'Invoice Reminder', icon: Mail, color: 'purple' },
                  ].map((template, i) => (
                    <Card
                      key={i}
                      className="cursor-pointer hover:shadow-lg transition-all"
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-lg bg-${template.color}-100 flex items-center justify-center`}>
                            <template.icon className={`w-5 h-5 text-${template.color}-600`} />
                          </div>
                          <p className="font-medium text-sm">{template.title}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'cms':
        return (
          <div className="space-y-6">
            <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <FileEdit className="w-8 h-8 text-green-600" />
                  <div>
                    <h3 className="text-lg font-bold">Client CMS Panel</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Simple content management for static sites
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Pages</CardTitle>
                  <Button size="sm" variant="outline">
                    <FileEdit className="w-3 h-3 mr-1" />
                    New Page
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {cmsPages.map((page) => (
                    <div key={page.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all">
                      <div>
                        <h4 className="font-bold">{page.title}</h4>
                        <div className="flex items-center gap-3 text-xs text-gray-600 dark:text-gray-400 mt-1">
                          <span>{page.url}</span>
                          <span>•</span>
                          <span>Last edited: {page.lastEdited}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant="outline"
                          className={
                            page.status === 'published'
                              ? 'bg-green-50 text-green-700'
                              : 'bg-yellow-50 text-yellow-700'
                          }
                        >
                          {page.status}
                        </Badge>
                        <Button size="sm" variant="outline">
                          <FileEdit className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Content Editor</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Page Title</label>
                  <Input placeholder="Enter page title..." />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Content</label>
                  <div className="border rounded-lg p-4 min-h-[200px] bg-white dark:bg-gray-800">
                    <p className="text-sm text-gray-500">Rich text editor goes here...</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button className="bg-gradient-to-r from-green-600 to-emerald-600">
                    <CheckCircle2 className="w-4 h-4 mr-2" />
                    Publish
                  </Button>
                  <Button variant="outline">Save Draft</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'visual-diff':
        return (
          <div className="space-y-6">
            <Card className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Eye className="w-8 h-8 text-orange-600" />
                  <div>
                    <h3 className="text-lg font-bold">Visual Diff Detection</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Automatically detect visual changes to web pages
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-2">
              <Input placeholder="Website URL to monitor..." className="flex-1" />
              <Button className="bg-gradient-to-r from-orange-600 to-red-600">
                <Play className="w-4 h-4 mr-2" />
                Start Monitoring
              </Button>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Detected Changes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {diffResults.map((diff, i) => (
                    <div key={i} className="p-4 border rounded-lg">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-bold">{diff.page}</h4>
                            <Badge variant="outline" className="bg-orange-50 text-orange-700">
                              {diff.changes} changes
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                            {diff.description}
                          </p>
                          <Badge variant="outline" className="text-xs">
                            {diff.type}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="w-3 h-3 mr-1" />
                          View Diff
                        </Button>
                        <Button size="sm" variant="outline">
                          <ImageIcon className="w-3 h-3 mr-1" />
                          Screenshots
                        </Button>
                        <Button size="sm" variant="outline">
                          <Download className="w-3 h-3 mr-1" />
                          Export
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-blue-50 dark:bg-blue-900/20">
              <CardContent className="p-6">
                <h4 className="font-bold mb-3 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-blue-600" />
                  Monitoring Settings
                </h4>
                <div className="space-y-3">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" checked className="w-4 h-4" readOnly />
                    <span className="text-sm">Email alerts for changes</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" checked className="w-4 h-4" readOnly />
                    <span className="text-sm">Capture screenshots</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="w-4 h-4" readOnly />
                    <span className="text-sm">Track element movements</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="w-4 h-4" readOnly />
                    <span className="text-sm">Monitor text changes</span>
                  </label>
                </div>
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
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 via-pink-500 to-orange-600 bg-clip-text text-transparent">
            Client Management Tools
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Powerful tools to manage and communicate with clients
          </p>
        </div>
        <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0">
          <Wand2 className="w-3 h-3 mr-1" />
          {CLIENT_TOOLS.length} Tools
        </Badge>
      </div>

      {/* Tool Selection */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {CLIENT_TOOLS.map((tool) => (
          <Card
            key={tool.id}
            onClick={() => setSelectedTool(tool.id)}
            className={`cursor-pointer transition-all ${
              selectedTool === tool.id
                ? 'ring-2 ring-purple-500 bg-purple-50 dark:bg-purple-900/20'
                : 'hover:shadow-lg'
            }`}
          >
            <CardContent className="p-4 text-center">
              <tool.icon className="w-8 h-8 mx-auto mb-2 text-purple-600" />
              <p className="text-xs font-medium">{tool.name}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tool Content */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {CLIENT_TOOLS.find((t) => t.id === selectedTool)?.icon && (
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                {(() => {
                  const Icon = CLIENT_TOOLS.find((t) => t.id === selectedTool)!.icon;
                  return <Icon className="w-5 h-5 text-white" />;
                })()}
              </div>
            )}
            {CLIENT_TOOLS.find((t) => t.id === selectedTool)?.name}
          </CardTitle>
        </CardHeader>
        <CardContent>{renderToolContent()}</CardContent>
      </Card>
    </div>
  );
}
