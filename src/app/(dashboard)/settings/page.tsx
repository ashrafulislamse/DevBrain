'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  User,
  Shield,
  Bell,
  CreditCard,
  Key,
  Users,
  Palette,
  Database,
  Save,
  Trash2,
} from 'lucide-react';
import { getUser } from '@/lib/auth';

export default function SettingsPage() {
  const user = getUser();
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'billing', label: 'Billing', icon: CreditCard },
    { id: 'api', label: 'API Keys', icon: Key },
    { id: 'team', label: 'Team', icon: Users },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'data', label: 'Data & Privacy', icon: Database },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground mt-1">Manage your account and preferences</p>
      </div>

      <div className="grid lg:grid-cols-[240px_1fr] gap-6">
        {/* Sidebar Navigation */}
        <div className="space-y-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                activeTab === tab.id
                  ? 'bg-primary text-primary-foreground'
                  : 'hover:bg-accent'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              <span className="font-medium">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Settings Content */}
        <div className="space-y-6">
          {activeTab === 'profile' && <ProfileSettings user={user} />}
          {activeTab === 'security' && <SecuritySettings />}
          {activeTab === 'notifications' && <NotificationSettings />}
          {activeTab === 'billing' && <BillingSettings />}
          {activeTab === 'api' && <APISettings />}
          {activeTab === 'team' && <TeamSettings />}
          {activeTab === 'appearance' && <AppearanceSettings />}
          {activeTab === 'data' && <DataSettings />}
        </div>
      </div>
    </div>
  );
}

function ProfileSettings({ user }: { user: any }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Information</CardTitle>
        <CardDescription>Update your personal details</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-2xl font-bold">
            {user?.name?.[0] || 'A'}
          </div>
          <div>
            <Button variant="outline" size="sm">
              Change Avatar
            </Button>
            <p className="text-xs text-muted-foreground mt-1">JPG, PNG or GIF. Max 2MB</p>
          </div>
        </div>

        <div className="grid gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Full Name</label>
            <Input defaultValue={user?.name || ''} />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Email</label>
            <Input type="email" defaultValue={user?.email || ''} />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Role</label>
            <Input value={user?.role || 'ADMIN'} disabled />
          </div>
        </div>

        <div className="flex gap-2 pt-4">
          <Button>
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
          <Button variant="outline">Cancel</Button>
        </div>
      </CardContent>
    </Card>
  );
}

function SecuritySettings() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Password</CardTitle>
          <CardDescription>Change your password regularly for security</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Current Password</label>
            <Input type="password" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">New Password</label>
            <Input type="password" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Confirm New Password</label>
            <Input type="password" />
          </div>
          <Button>Update Password</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Two-Factor Authentication</CardTitle>
          <CardDescription>Add an extra layer of security</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">2FA Status</p>
              <p className="text-sm text-muted-foreground">Currently disabled</p>
            </div>
            <Button>Enable 2FA</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Active Sessions</CardTitle>
          <CardDescription>Devices where you're currently logged in</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            { device: 'Chrome on macOS', location: 'New York, US', active: true },
            { device: 'Safari on iPhone', location: 'New York, US', active: false },
          ].map((session, i) => (
            <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <p className="font-medium">{session.device}</p>
                <p className="text-sm text-muted-foreground">{session.location}</p>
              </div>
              <div className="flex items-center gap-2">
                {session.active && <Badge variant="success">Active</Badge>}
                <Button variant="outline" size="sm">Revoke</Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

function NotificationSettings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Notification Preferences</CardTitle>
        <CardDescription>Manage how you receive notifications</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {[
          { title: 'Email Notifications', description: 'Receive email updates' },
          { title: 'Push Notifications', description: 'Browser push notifications' },
          { title: 'Server Alerts', description: 'Get notified when servers go down' },
          { title: 'Deployment Updates', description: 'Notifications for deployments' },
          { title: 'SSL Expiry Warnings', description: 'Alert before SSL expires' },
        ].map((item, i) => (
          <div key={i} className="flex items-center justify-between">
            <div>
              <p className="font-medium">{item.title}</p>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </div>
            <input type="checkbox" defaultChecked className="w-5 h-5" />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

function BillingSettings() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Current Plan</CardTitle>
          <CardDescription>You're on the Pro plan</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <p className="font-semibold text-lg">Pro Plan</p>
                <p className="text-muted-foreground">$19/month</p>
              </div>
              <Badge>Active</Badge>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Servers</p>
                <p className="font-medium">10 servers</p>
              </div>
              <div>
                <p className="text-muted-foreground">Websites</p>
                <p className="font-medium">25 websites</p>
              </div>
              <div>
                <p className="text-muted-foreground">API Calls</p>
                <p className="font-medium">10,000/day</p>
              </div>
              <div>
                <p className="text-muted-foreground">Storage</p>
                <p className="font-medium">100 GB</p>
              </div>
            </div>
            <Button variant="outline" className="w-full">Upgrade to Business</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Payment Method</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-3">
              <CreditCard className="w-8 h-8" />
              <div>
                <p className="font-medium">•••• •••• •••• 4242</p>
                <p className="text-sm text-muted-foreground">Expires 12/24</p>
              </div>
            </div>
            <Button variant="outline" size="sm">Update</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function APISettings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>API Keys</CardTitle>
        <CardDescription>Manage your API keys for programmatic access</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button>
          <Key className="w-4 h-4 mr-2" />
          Generate New API Key
        </Button>

        <div className="space-y-3">
          {[
            { name: 'Production Key', key: 'db_prod_••••••••••••••••', created: '2 months ago' },
            { name: 'Development Key', key: 'db_dev_••••••••••••••••', created: '1 week ago' },
          ].map((api, i) => (
            <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <p className="font-medium">{api.name}</p>
                <p className="text-sm font-mono text-muted-foreground">{api.key}</p>
                <p className="text-xs text-muted-foreground mt-1">Created {api.created}</p>
              </div>
              <Button variant="outline" size="sm">
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function TeamSettings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Team Members</CardTitle>
        <CardDescription>Invite and manage your team</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button>Invite Team Member</Button>

        <div className="space-y-3">
          {[
            { name: 'Demo Admin', email: 'admin@devbrain.dev', role: 'Admin' },
            { name: 'John Developer', email: 'john@company.com', role: 'Developer' },
            { name: 'Jane Viewer', email: 'jane@company.com', role: 'Viewer' },
          ].map((member, i) => (
            <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-semibold">
                  {member.name[0]}
                </div>
                <div>
                  <p className="font-medium">{member.name}</p>
                  <p className="text-sm text-muted-foreground">{member.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline">{member.role}</Badge>
                <Button variant="outline" size="sm">Manage</Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function AppearanceSettings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Appearance</CardTitle>
        <CardDescription>Customize how DevBrain looks</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <label className="text-sm font-medium mb-2 block">Theme</label>
          <div className="grid grid-cols-3 gap-4">
            {['Light', 'Dark', 'System'].map((theme) => (
              <div
                key={theme}
                className="p-4 border rounded-lg cursor-pointer hover:border-primary transition-colors text-center"
              >
                <Palette className="w-6 h-6 mx-auto mb-2" />
                <p className="text-sm font-medium">{theme}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">Accent Color</label>
          <div className="flex gap-2">
            {['bg-purple-500', 'bg-blue-500', 'bg-green-500', 'bg-pink-500', 'bg-orange-500'].map(
              (color) => (
                <div
                  key={color}
                  className={`w-10 h-10 rounded-full ${color} cursor-pointer border-2 border-transparent hover:border-gray-400`}
                />
              )
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function DataSettings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Data & Privacy</CardTitle>
        <CardDescription>Manage your data and privacy settings</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Button variant="outline">
            <Database className="w-4 h-4 mr-2" />
            Export All Data
          </Button>
          <p className="text-sm text-muted-foreground mt-2">
            Download all your data in JSON format
          </p>
        </div>

        <div className="pt-4 border-t">
          <h3 className="font-semibold text-red-600 mb-2">Danger Zone</h3>
          <Button variant="destructive">
            <Trash2 className="w-4 h-4 mr-2" />
            Delete Account
          </Button>
          <p className="text-sm text-muted-foreground mt-2">
            Permanently delete your account and all data
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
