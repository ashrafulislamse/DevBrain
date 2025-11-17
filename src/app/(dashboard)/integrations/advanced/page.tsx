'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Globe,
  MessageSquare,
  Send,
  Bot,
  Plus,
  Check,
  X,
  Copy,
  RefreshCw,
  Settings,
  Zap,
  Webhook,
  Bell,
  Code,
} from 'lucide-react';

const INTEGRATION_TYPES = [
  { id: 'namecheap', name: 'Namecheap DNS', icon: Globe },
  { id: 'slack', name: 'Slack', icon: MessageSquare },
  { id: 'telegram', name: 'Telegram', icon: Send },
  { id: 'whatsapp', name: 'WhatsApp', icon: MessageSquare },
];

export default function AdvancedIntegrationsPage() {
  const [selectedType, setSelectedType] = useState('namecheap');

  // Namecheap state
  const [namecheapConnected, setNamecheapConnected] = useState(false);
  const [namecheapApiKey, setNamecheapApiKey] = useState('');
  const [domains, setDomains] = useState([
    {
      id: '1',
      domain: 'example.com',
      registrar: 'Namecheap',
      expiry: '2024-12-15',
      autoRenew: true,
      dnsRecords: 12,
    },
    {
      id: '2',
      domain: 'myapp.io',
      registrar: 'Namecheap',
      expiry: '2024-08-22',
      autoRenew: false,
      dnsRecords: 8,
    },
  ]);

  // Communication bots state
  const [slackConnected, setSlackConnected] = useState(false);
  const [telegramConnected, setTelegramConnected] = useState(false);
  const [whatsappConnected, setWhatsappConnected] = useState(false);

  const [webhooks, setWebhooks] = useState([
    {
      id: '1',
      name: 'Deploy Notifications',
      platform: 'Slack',
      channel: '#deployments',
      events: ['deploy.success', 'deploy.failed'],
      active: true,
    },
    {
      id: '2',
      name: 'Error Alerts',
      platform: 'Telegram',
      channel: 'DevOps Team',
      events: ['error.critical', 'server.down'],
      active: true,
    },
    {
      id: '3',
      name: 'Client Updates',
      platform: 'WhatsApp',
      channel: 'Clients Group',
      events: ['project.milestone', 'invoice.sent'],
      active: false,
    },
  ]);

  const generateWebhookUrl = (platform: string) => {
    const baseUrl = 'https://devbrain.io/webhooks';
    const id = Math.random().toString(36).substring(7);
    return `${baseUrl}/${platform.toLowerCase()}/${id}`;
  };

  const renderContent = () => {
    switch (selectedType) {
      case 'namecheap':
        return (
          <div className="space-y-6">
            {!namecheapConnected ? (
              <Card>
                <CardHeader>
                  <CardTitle>Connect Namecheap</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">API Key</label>
                    <Input
                      type="password"
                      placeholder="Enter your Namecheap API key"
                      value={namecheapApiKey}
                      onChange={(e) => setNamecheapApiKey(e.target.value)}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Get your API key from{' '}
                      <a
                        href="https://ap.www.namecheap.com/settings/tools/apiaccess/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        Namecheap Dashboard
                      </a>
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Username</label>
                    <Input placeholder="Your Namecheap username" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Whitelisted IP (optional)
                    </label>
                    <Input placeholder="Your server IP address" />
                  </div>

                  <Button
                    onClick={() => setNamecheapConnected(true)}
                    className="w-full bg-gradient-to-r from-orange-600 to-red-600"
                  >
                    <Globe className="w-4 h-4 mr-2" />
                    Connect Namecheap
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <>
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Managed Domains</CardTitle>
                      <Button size="sm" variant="outline">
                        <Plus className="w-3 h-3 mr-1" />
                        Add Domain
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {domains.map((domain) => (
                        <div
                          key={domain.id}
                          className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all"
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
                              <Globe className="w-6 h-6 text-white" />
                            </div>
                            <div>
                              <h4 className="font-bold">{domain.domain}</h4>
                              <div className="flex items-center gap-3 text-xs text-gray-600 dark:text-gray-400 mt-1">
                                <span>Expires: {domain.expiry}</span>
                                <span>•</span>
                                <span>{domain.dnsRecords} DNS records</span>
                                <span>•</span>
                                <Badge
                                  variant="outline"
                                  className={
                                    domain.autoRenew
                                      ? 'bg-green-50 text-green-700'
                                      : 'bg-gray-50 text-gray-700'
                                  }
                                >
                                  {domain.autoRenew ? 'Auto-renew ON' : 'Auto-renew OFF'}
                                </Badge>
                              </div>
                            </div>
                          </div>
                          <Button size="sm" variant="outline">
                            <Settings className="w-3 h-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>DNS Management</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Select Domain</label>
                      <select className="w-full p-2 border rounded-lg">
                        {domains.map((domain) => (
                          <option key={domain.id} value={domain.domain}>
                            {domain.domain}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold">DNS Records</h4>
                        <Button size="sm" variant="outline">
                          <Plus className="w-3 h-3 mr-1" />
                          Add Record
                        </Button>
                      </div>

                      <div className="space-y-2">
                        {[
                          { type: 'A', name: '@', value: '192.168.1.100', ttl: '300' },
                          { type: 'A', name: 'www', value: '192.168.1.100', ttl: '300' },
                          { type: 'CNAME', name: 'blog', value: 'example.com', ttl: '3600' },
                          { type: 'MX', name: '@', value: 'mail.example.com', ttl: '3600' },
                        ].map((record, i) => (
                          <div
                            key={i}
                            className="grid grid-cols-5 gap-2 p-2 border rounded hover:bg-gray-50 dark:hover:bg-gray-800/50"
                          >
                            <Badge variant="outline" className="text-xs">
                              {record.type}
                            </Badge>
                            <span className="text-sm font-mono">{record.name}</span>
                            <span className="text-sm font-mono col-span-2">{record.value}</span>
                            <span className="text-xs text-gray-500">{record.ttl}s</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
          </div>
        );

      case 'slack':
        return (
          <div className="space-y-6">
            {!slackConnected ? (
              <Card>
                <CardHeader>
                  <CardTitle>Connect Slack</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Webhook URL</label>
                    <Input placeholder="https://hooks.slack.com/services/..." />
                    <p className="text-xs text-gray-500 mt-1">
                      Create a webhook in your{' '}
                      <a
                        href="https://api.slack.com/messaging/webhooks"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        Slack workspace settings
                      </a>
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Default Channel</label>
                    <Input placeholder="#deployments" />
                  </div>

                  <Button
                    onClick={() => setSlackConnected(true)}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600"
                  >
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Connect Slack
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>Slack Integration Active</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <Check className="w-6 h-6 text-green-600" />
                    <div>
                      <p className="font-semibold text-green-900 dark:text-green-100">
                        Connected to Slack
                      </p>
                      <p className="text-sm text-green-800 dark:text-green-200">
                        Sending notifications to #deployments
                      </p>
                    </div>
                  </div>

                  <div>
                    <Button variant="outline" className="w-full">
                      <Send className="w-4 h-4 mr-2" />
                      Send Test Message
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        );

      case 'telegram':
        return (
          <div className="space-y-6">
            {!telegramConnected ? (
              <Card>
                <CardHeader>
                  <CardTitle>Connect Telegram</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Bot Token</label>
                    <Input type="password" placeholder="Enter your Telegram bot token" />
                    <p className="text-xs text-gray-500 mt-1">
                      Create a bot with{' '}
                      <a
                        href="https://t.me/BotFather"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        @BotFather
                      </a>
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Chat ID</label>
                    <Input placeholder="Your Telegram chat ID" />
                    <p className="text-xs text-gray-500 mt-1">
                      Get your chat ID from{' '}
                      <a
                        href="https://t.me/userinfobot"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        @userinfobot
                      </a>
                    </p>
                  </div>

                  <Button
                    onClick={() => setTelegramConnected(true)}
                    className="w-full bg-gradient-to-r from-blue-600 to-cyan-600"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Connect Telegram
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>Telegram Bot Active</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <Check className="w-6 h-6 text-blue-600" />
                    <div>
                      <p className="font-semibold text-blue-900 dark:text-blue-100">
                        Connected to Telegram
                      </p>
                      <p className="text-sm text-blue-800 dark:text-blue-200">
                        Bot is ready to send notifications
                      </p>
                    </div>
                  </div>

                  <div>
                    <Button variant="outline" className="w-full">
                      <Send className="w-4 h-4 mr-2" />
                      Send Test Message
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        );

      case 'whatsapp':
        return (
          <div className="space-y-6">
            {!whatsappConnected ? (
              <Card>
                <CardHeader>
                  <CardTitle>Connect WhatsApp Business</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Phone Number ID</label>
                    <Input placeholder="Your WhatsApp Business Phone Number ID" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Access Token</label>
                    <Input type="password" placeholder="WhatsApp Business API access token" />
                    <p className="text-xs text-gray-500 mt-1">
                      Get credentials from{' '}
                      <a
                        href="https://business.facebook.com/wa/manage/home/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        Meta Business
                      </a>
                    </p>
                  </div>

                  <Button
                    onClick={() => setWhatsappConnected(true)}
                    className="w-full bg-gradient-to-r from-green-600 to-emerald-600"
                  >
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Connect WhatsApp
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>WhatsApp Business Active</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <Check className="w-6 h-6 text-green-600" />
                    <div>
                      <p className="font-semibold text-green-900 dark:text-green-100">
                        Connected to WhatsApp Business
                      </p>
                      <p className="text-sm text-green-800 dark:text-green-200">
                        Ready to send client notifications
                      </p>
                    </div>
                  </div>

                  <div>
                    <Button variant="outline" className="w-full">
                      <Send className="w-4 h-4 mr-2" />
                      Send Test Message
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-500 to-pink-600 bg-clip-text text-transparent">
            Advanced Integrations
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            DNS management and communication bot integrations
          </p>
        </div>
        <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0">
          <Zap className="w-3 h-3 mr-1" />
          {INTEGRATION_TYPES.length} Integrations
        </Badge>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Integration Types */}
        <div className="space-y-3">
          {INTEGRATION_TYPES.map((type) => (
            <Card
              key={type.id}
              onClick={() => setSelectedType(type.id)}
              className={`cursor-pointer transition-all ${
                selectedType === type.id
                  ? 'ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : 'hover:shadow-lg'
              }`}
            >
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                    <type.icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">{type.name}</h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      {type.id === 'namecheap' ? 'DNS Management' : 'Notifications'}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Integration Content */}
        <div className="lg:col-span-2">{renderContent()}</div>
      </div>

      {/* Webhooks Section */}
      {(slackConnected || telegramConnected || whatsappConnected) && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Webhook className="w-5 h-5" />
                Active Webhooks
              </CardTitle>
              <Button size="sm" variant="outline">
                <Plus className="w-3 h-3 mr-1" />
                Create Webhook
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {webhooks.map((webhook) => (
                <div
                  key={webhook.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        webhook.active
                          ? 'bg-gradient-to-br from-green-500 to-emerald-500'
                          : 'bg-gray-200 dark:bg-gray-700'
                      }`}
                    >
                      <Bell className={`w-5 h-5 ${webhook.active ? 'text-white' : 'text-gray-400'}`} />
                    </div>
                    <div>
                      <h4 className="font-medium">{webhook.name}</h4>
                      <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400 mt-1">
                        <span>{webhook.platform}</span>
                        <span>•</span>
                        <span>{webhook.channel}</span>
                        <span>•</span>
                        <span>{webhook.events.length} events</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="outline"
                      className={
                        webhook.active
                          ? 'bg-green-50 text-green-700'
                          : 'bg-gray-50 text-gray-700'
                      }
                    >
                      {webhook.active ? 'Active' : 'Paused'}
                    </Badge>
                    <Button size="sm" variant="outline">
                      <Settings className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
