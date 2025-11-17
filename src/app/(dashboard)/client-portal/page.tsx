'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Users,
  Globe,
  Palette,
  Settings,
  Eye,
  Copy,
  CheckCircle2,
  FileText,
  Activity,
  Download,
  Link as LinkIcon,
  Sparkles,
  Lock,
  Mail,
  Key,
  Code,
  Package,
} from 'lucide-react';

export default function ClientPortalPage() {
  const [portalName, setPortalName] = useState('My Agency Portal');
  const [customDomain, setCustomDomain] = useState('clients.myagency.com');
  const [primaryColor, setPrimaryColor] = useState('#6366f1');
  const [logoUrl, setLogoUrl] = useState('');
  const [showPreview, setShowPreview] = useState(false);

  const [clients, setClients] = useState([
    {
      id: '1',
      name: 'Acme Corporation',
      email: 'contact@acme.com',
      projects: 3,
      status: 'active',
      lastLogin: '2 hours ago',
    },
    {
      id: '2',
      name: 'TechStart Inc',
      email: 'hello@techstart.io',
      projects: 5,
      status: 'active',
      lastLogin: '1 day ago',
    },
    {
      id: '3',
      name: 'Global Solutions',
      email: 'info@globalsol.com',
      projects: 2,
      status: 'inactive',
      lastLogin: '7 days ago',
    },
  ]);

  const features = [
    {
      id: 'projects',
      name: 'Project Dashboard',
      description: 'View all active projects and their status',
      icon: Package,
      enabled: true,
    },
    {
      id: 'files',
      name: 'File Sharing',
      description: 'Upload and download project files',
      icon: FileText,
      enabled: true,
    },
    {
      id: 'invoices',
      name: 'Invoices',
      description: 'View and pay invoices online',
      icon: FileText,
      enabled: true,
    },
    {
      id: 'support',
      name: 'Support Tickets',
      description: 'Submit and track support requests',
      icon: Mail,
      enabled: true,
    },
    {
      id: 'analytics',
      name: 'Analytics',
      description: 'View website and project analytics',
      icon: Activity,
      enabled: false,
    },
    {
      id: 'api',
      name: 'API Access',
      description: 'Manage API keys and integrations',
      icon: Key,
      enabled: false,
    },
  ];

  const copyPortalLink = () => {
    navigator.clipboard.writeText(`https://${customDomain}`);
  };

  const generateEmbedCode = () => {
    return `<!-- Client Portal Widget -->
<script>
  (function(w,d,s,o,f,js,fjs){
    w['ClientPortal']=o;w[o]=w[o]||function(){(w[o].q=w[o].q||[]).push(arguments)};
    js=d.createElement(s),fjs=d.getElementsByTagName(s)[0];
    js.id=o;js.src=f;js.async=1;fjs.parentNode.insertBefore(js,fjs);
  }(window,document,'script','cp','https://${customDomain}/widget.js'));
  cp('init', '${portalName.replace(/\s+/g, '-').toLowerCase()}');
</script>
<!-- End Client Portal Widget -->`;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-600 bg-clip-text text-transparent">
            Client Portal
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            White-label client portal with custom branding
          </p>
        </div>
        <Badge className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white border-0">
          <Sparkles className="w-3 h-3 mr-1" />
          {clients.filter((c) => c.status === 'active').length} Active Clients
        </Badge>
      </div>

      {/* Portal Configuration */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Portal Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Portal Name</label>
                <Input
                  value={portalName}
                  onChange={(e) => setPortalName(e.target.value)}
                  placeholder="My Agency Portal"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Custom Domain</label>
                <div className="flex gap-2">
                  <Input
                    value={customDomain}
                    onChange={(e) => setCustomDomain(e.target.value)}
                    placeholder="clients.myagency.com"
                    className="flex-1"
                  />
                  <Button variant="outline" onClick={copyPortalLink}>
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Point your CNAME to: portal.devbrain.io
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Logo URL (optional)</label>
                <Input
                  value={logoUrl}
                  onChange={(e) => setLogoUrl(e.target.value)}
                  placeholder="https://yoursite.com/logo.png"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Primary Color</label>
                <div className="flex gap-2">
                  <Input
                    type="color"
                    value={primaryColor}
                    onChange={(e) => setPrimaryColor(e.target.value)}
                    className="w-20 h-10"
                  />
                  <Input
                    value={primaryColor}
                    onChange={(e) => setPrimaryColor(e.target.value)}
                    placeholder="#6366f1"
                    className="flex-1"
                  />
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <Button
                  className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600"
                  onClick={() => setShowPreview(true)}
                >
                  <Eye className="w-4 h-4 mr-2" />
                  Preview
                </Button>
                <Button variant="outline" className="flex-1">
                  <LinkIcon className="w-4 h-4 mr-2" />
                  Visit Portal
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="w-5 h-5" />
                Branding
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Favicon</label>
                <Input type="file" accept="image/*" />
                <p className="text-xs text-gray-500 mt-1">
                  Recommended: 32x32px or 64x64px PNG
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Welcome Message</label>
                <textarea
                  className="w-full p-3 border rounded-lg text-sm"
                  rows={3}
                  placeholder="Welcome to our client portal. Access your projects, invoices, and support tickets."
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Footer Text</label>
                <Input placeholder="© 2024 My Agency. All rights reserved." />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Features & Clients */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="w-5 h-5" />
                Portal Features
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {features.map((feature) => (
                  <div
                    key={feature.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                        style={{
                          background: feature.enabled
                            ? `linear-gradient(to bottom right, ${primaryColor}, ${primaryColor}dd)`
                            : '#e5e7eb',
                        }}
                      >
                        <feature.icon
                          className={`w-5 h-5 ${feature.enabled ? 'text-white' : 'text-gray-400'}`}
                        />
                      </div>
                      <div>
                        <h4 className="font-medium text-sm">{feature.name}</h4>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={feature.enabled}
                        onChange={() => {}}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-600"></div>
                    </label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Active Clients
                </CardTitle>
                <Button size="sm" variant="outline">
                  <Users className="w-3 h-3 mr-1" />
                  Add Client
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {clients.map((client) => (
                  <div
                    key={client.id}
                    className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold"
                        style={{ background: primaryColor }}
                      >
                        {client.name[0]}
                      </div>
                      <div>
                        <h4 className="font-medium text-sm">{client.name}</h4>
                        <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                          <span>{client.email}</span>
                          <span>•</span>
                          <span>{client.projects} projects</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="outline"
                        className={
                          client.status === 'active'
                            ? 'bg-green-50 text-green-700 border-green-200'
                            : 'bg-gray-50 text-gray-700 border-gray-200'
                        }
                      >
                        {client.status}
                      </Badge>
                      <Button size="sm" variant="outline">
                        <Eye className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Embed Code */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code className="w-5 h-5" />
            Embed Widget
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
            Add this code to your website to embed the client portal login widget:
          </p>
          <div className="bg-gray-900 rounded-lg p-4 overflow-auto">
            <pre className="text-xs text-green-400 font-mono">{generateEmbedCode()}</pre>
          </div>
          <div className="flex gap-2 mt-3">
            <Button
              size="sm"
              variant="outline"
              onClick={() => navigator.clipboard.writeText(generateEmbedCode())}
            >
              <Copy className="w-3 h-3 mr-1" />
              Copy Code
            </Button>
            <Button size="sm" variant="outline">
              <Download className="w-3 h-3 mr-1" />
              Download SDK
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Clients</p>
                <p className="text-3xl font-bold text-indigo-600">{clients.length}</p>
              </div>
              <Users className="w-12 h-12 text-indigo-600/20" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Active Sessions</p>
                <p className="text-3xl font-bold text-purple-600">24</p>
              </div>
              <Activity className="w-12 h-12 text-purple-600/20" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-900/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Page Views</p>
                <p className="text-3xl font-bold text-pink-600">1,247</p>
              </div>
              <Globe className="w-12 h-12 text-pink-600/20" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Uptime</p>
                <p className="text-3xl font-bold text-blue-600">99.9%</p>
              </div>
              <CheckCircle2 className="w-12 h-12 text-blue-600/20" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Security */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="w-5 h-5" />
            Security Settings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h4 className="font-medium">Two-Factor Authentication</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Require 2FA for all client logins
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" checked className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h4 className="font-medium">IP Whitelist</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Restrict access to specific IP addresses
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h4 className="font-medium">Activity Logging</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Log all client portal activities
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" checked className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-600"></div>
              </label>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
