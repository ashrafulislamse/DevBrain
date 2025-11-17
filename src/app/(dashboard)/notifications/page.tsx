'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Bell,
  Mail,
  MessageSquare,
  Smartphone,
  Send,
  Settings,
  Volume2,
  Moon,
  Users,
  AlertTriangle,
  CheckCircle2,
  Info,
  XCircle,
  Clock,
  Plus,
  Trash2,
  Edit,
  Eye,
} from 'lucide-react';

const NOTIFICATION_CHANNELS = [
  { id: 'email', name: 'Email', icon: Mail, color: 'from-blue-500 to-cyan-500', enabled: true },
  { id: 'sms', name: 'SMS', icon: Smartphone, color: 'from-purple-500 to-pink-500', enabled: false },
  { id: 'push', name: 'Push', icon: Bell, color: 'from-green-500 to-emerald-500', enabled: true },
  { id: 'slack', name: 'Slack', icon: MessageSquare, color: 'from-orange-500 to-red-500', enabled: true },
  { id: 'discord', name: 'Discord', icon: Send, color: 'from-indigo-500 to-purple-500', enabled: false },
  { id: 'telegram', name: 'Telegram', icon: Send, color: 'from-pink-500 to-rose-500', enabled: false },
];

interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  channel: string;
  timestamp: string;
  read: boolean;
}

interface AlertRule {
  id: string;
  name: string;
  condition: string;
  channels: string[];
  enabled: boolean;
}

export default function NotificationsPage() {
  const [selectedView, setSelectedView] = useState('inbox');
  const [notifications, setNotifications] = useState<Notification[]>([
    { id: '1', type: 'error', title: 'Server Down', message: 'Production server VPS-3 is not responding', channel: 'email, slack', timestamp: '2 mins ago', read: false },
    { id: '2', type: 'success', title: 'Deployment Complete', message: 'Successfully deployed version 2.1.0 to production', channel: 'push', timestamp: '15 mins ago', read: false },
    { id: '3', type: 'warning', title: 'High CPU Usage', message: 'Server VPS-1 CPU usage at 85%', channel: 'email', timestamp: '1 hour ago', read: true },
    { id: '4', type: 'info', title: 'Backup Complete', message: 'Daily backup completed successfully', channel: 'email', timestamp: '2 hours ago', read: true },
  ]);

  const [alertRules, setAlertRules] = useState<AlertRule[]>([
    { id: '1', name: 'Server Down', condition: 'server.status == offline', channels: ['email', 'slack', 'push'], enabled: true },
    { id: '2', name: 'High CPU', condition: 'cpu.usage > 80', channels: ['email', 'slack'], enabled: true },
    { id: '3', name: 'Deployment Failed', condition: 'deployment.status == failed', channels: ['email', 'slack', 'push'], enabled: true },
    { id: '4', name: 'SSL Expiring', condition: 'ssl.expiry < 7 days', channels: ['email'], enabled: true },
  ]);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'error':
        return <XCircle className="w-5 h-5 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'success':
        return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      default:
        return <Info className="w-5 h-5 text-blue-500" />;
    }
  };

  const renderContent = () => {
    switch (selectedView) {
      case 'inbox':
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Notifications</h2>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">Mark All Read</Button>
                <Button variant="outline" size="sm">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" size="sm">All ({notifications.length})</Button>
              <Button variant="outline" size="sm">Unread ({notifications.filter(n => !n.read).length})</Button>
              <Button variant="outline" size="sm">Errors ({notifications.filter(n => n.type === 'error').length})</Button>
              <Button variant="outline" size="sm">Warnings ({notifications.filter(n => n.type === 'warning').length})</Button>
            </div>

            <div className="space-y-2">
              {notifications.map((notification) => (
                <Card
                  key={notification.id}
                  className={`cursor-pointer transition-all hover:shadow-lg ${
                    !notification.read ? 'bg-blue-50 dark:bg-blue-900/10 border-l-4 border-l-blue-500' : ''
                  }`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-1">
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-1">
                          <h3 className="font-semibold">{notification.title}</h3>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-xs">
                              {notification.channel}
                            </Badge>
                            <span className="text-xs text-gray-600 dark:text-gray-400">
                              {notification.timestamp}
                            </span>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {notification.message}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case 'channels':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-2">Notification Channels</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Configure how and where you receive notifications
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {NOTIFICATION_CHANNELS.map((channel) => {
                const Icon = channel.icon;
                return (
                  <Card key={channel.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-5">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${channel.color} flex items-center justify-center`}>
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h3 className="font-semibold">{channel.name}</h3>
                            <Badge className={channel.enabled ? 'bg-green-500' : 'bg-gray-500'}>
                              {channel.enabled ? 'Enabled' : 'Disabled'}
                            </Badge>
                          </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={channel.enabled}
                            readOnly
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        </label>
                      </div>

                      {channel.enabled && (
                        <div className="space-y-2">
                          {channel.id === 'email' && (
                            <>
                              <Input placeholder="Email address" defaultValue="admin@example.com" />
                              <Button variant="outline" size="sm" className="w-full">
                                Test Email
                              </Button>
                            </>
                          )}
                          {channel.id === 'slack' && (
                            <>
                              <Input placeholder="Webhook URL" defaultValue="https://hooks.slack.com/..." />
                              <Button variant="outline" size="sm" className="w-full">
                                Test Slack Message
                              </Button>
                            </>
                          )}
                          {channel.id === 'push' && (
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                              Push notifications are configured via browser permissions
                            </div>
                          )}
                        </div>
                      )}

                      {!channel.enabled && (
                        <Button className={`w-full bg-gradient-to-r ${channel.color}`}>
                          <Plus className="w-4 h-4 mr-2" />
                          Connect {channel.name}
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        );

      case 'rules':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold mb-2">Alert Rules</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Configure automatic alerts based on conditions
                </p>
              </div>
              <Button className="bg-gradient-to-r from-blue-600 to-cyan-600">
                <Plus className="w-4 h-4 mr-2" />
                Create Rule
              </Button>
            </div>

            <div className="space-y-3">
              {alertRules.map((rule) => (
                <Card key={rule.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold">{rule.name}</h3>
                          <Badge className={rule.enabled ? 'bg-green-500' : 'bg-gray-500'}>
                            {rule.enabled ? 'Active' : 'Inactive'}
                          </Badge>
                        </div>
                        <code className="block p-2 bg-gray-50 dark:bg-gray-900 rounded text-sm mb-2">
                          {rule.condition}
                        </code>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-600 dark:text-gray-400">Channels:</span>
                          {rule.channels.map((channel) => (
                            <Badge key={channel} variant="outline" className="text-xs">
                              {channel}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case 'settings':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-2">Notification Settings</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Customize your notification preferences
              </p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Moon className="w-5 h-5" />
                  Quiet Hours
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Enable Quiet Hours</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Suppress non-critical notifications during specified hours
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Start Time</label>
                    <Input type="time" defaultValue="22:00" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">End Time</label>
                    <Input type="time" defaultValue="08:00" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Alert Preferences
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { label: 'Server Status Changes', enabled: true },
                  { label: 'Deployment Notifications', enabled: true },
                  { label: 'Security Alerts', enabled: true },
                  { label: 'Performance Warnings', enabled: true },
                  { label: 'Backup Confirmations', enabled: false },
                  { label: 'SSL Certificate Expiry', enabled: true },
                ].map((pref, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                    <span className="text-sm">{pref.label}</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" checked={pref.enabled} readOnly />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Volume2 className="w-5 h-5" />
                  Sound & Appearance
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Enable notification sounds</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm">Show desktop notifications</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Notification Duration</label>
                  <select className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800">
                    <option>3 seconds</option>
                    <option>5 seconds</option>
                    <option>10 seconds</option>
                    <option>Until dismissed</option>
                  </select>
                </div>
              </CardContent>
            </Card>

            <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600">
              Save Settings
            </Button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Notifications & Alerts
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Multi-channel notification system with smart alert rules
          </p>
        </div>
        <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0">
          <Bell className="w-3 h-3 mr-1" />
          {notifications.filter(n => !n.read).length} Unread
        </Badge>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-blue-500" />
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Notifications</p>
                <p className="text-2xl font-bold">{notifications.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Mail className="w-5 h-5 text-green-500" />
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Channels Active</p>
                <p className="text-2xl font-bold">{NOTIFICATION_CHANNELS.filter(c => c.enabled).length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Settings className="w-5 h-5 text-purple-500" />
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Alert Rules</p>
                <p className="text-2xl font-bold">{alertRules.filter(r => r.enabled).length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <XCircle className="w-5 h-5 text-red-500" />
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Critical Alerts</p>
                <p className="text-2xl font-bold">{notifications.filter(n => n.type === 'error').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Navigation */}
      <div className="flex gap-2 mb-6">
        <Button
          variant={selectedView === 'inbox' ? 'default' : 'outline'}
          onClick={() => setSelectedView('inbox')}
        >
          <Bell className="w-4 h-4 mr-2" />
          Inbox
        </Button>
        <Button
          variant={selectedView === 'channels' ? 'default' : 'outline'}
          onClick={() => setSelectedView('channels')}
        >
          <Send className="w-4 h-4 mr-2" />
          Channels
        </Button>
        <Button
          variant={selectedView === 'rules' ? 'default' : 'outline'}
          onClick={() => setSelectedView('rules')}
        >
          <AlertTriangle className="w-4 h-4 mr-2" />
          Alert Rules
        </Button>
        <Button
          variant={selectedView === 'settings' ? 'default' : 'outline'}
          onClick={() => setSelectedView('settings')}
        >
          <Settings className="w-4 h-4 mr-2" />
          Settings
        </Button>
      </div>

      {/* Content */}
      {renderContent()}
    </div>
  );
}
