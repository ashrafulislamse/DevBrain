'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Cloud,
  Shield,
  Zap,
  Globe,
  Lock,
  Activity,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  Settings,
  RefreshCw,
  Plus,
  Trash2,
  Eye,
  EyeOff,
} from 'lucide-react';

export default function CloudflarePage() {
  const [apiKey, setApiKey] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [zones, setZones] = useState([
    { id: '1', name: 'example.com', status: 'active', ssl: 'full', caching: 'standard' },
    { id: '2', name: 'app.example.com', status: 'active', ssl: 'strict', caching: 'aggressive' },
  ]);

  const stats = {
    requests: '1.2M',
    bandwidth: '45.3 GB',
    threats: '1,234',
    cached: '78%',
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 via-yellow-600 to-orange-600 bg-clip-text text-transparent">
            Cloudflare Integration
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage CDN, security, and performance
          </p>
        </div>
        <Badge className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white border-0">
          <Cloud className="w-3 h-3 mr-1" />
          {isConnected ? 'Connected' : 'Not Connected'}
        </Badge>
      </div>

      {!isConnected ? (
        <Card>
          <CardHeader>
            <CardTitle>Connect to Cloudflare</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">API Token</label>
              <div className="flex gap-2">
                <Input
                  type="password"
                  placeholder="Enter your Cloudflare API token"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  className="flex-1"
                />
                <Button
                  onClick={() => setIsConnected(true)}
                  className="bg-gradient-to-r from-orange-600 to-yellow-600"
                >
                  Connect
                </Button>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Get your API token from Cloudflare Dashboard → My Profile → API Tokens
              </p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <>
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Requests (24h)</p>
                    <p className="text-3xl font-bold text-blue-600">{stats.requests}</p>
                  </div>
                  <Activity className="w-12 h-12 text-blue-600/20" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Bandwidth</p>
                    <p className="text-3xl font-bold text-purple-600">{stats.bandwidth}</p>
                  </div>
                  <TrendingUp className="w-12 h-12 text-purple-600/20" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Threats Blocked</p>
                    <p className="text-3xl font-bold text-red-600">{stats.threats}</p>
                  </div>
                  <Shield className="w-12 h-12 text-red-600/20" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Cache Hit Rate</p>
                    <p className="text-3xl font-bold text-green-600">{stats.cached}</p>
                  </div>
                  <Zap className="w-12 h-12 text-green-600/20" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Zones */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Your Zones</CardTitle>
                <Button size="sm" variant="outline">
                  <Plus className="w-3 h-3 mr-1" />
                  Add Zone
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {zones.map((zone) => (
                  <div
                    key={zone.id}
                    className="flex items-center justify-between p-5 border rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-yellow-500 flex items-center justify-center text-white">
                        <Globe className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 dark:text-white mb-1">{zone.name}</h4>
                        <div className="flex items-center gap-2 text-xs">
                          <Badge variant="outline" className="text-green-600 border-green-600">
                            <CheckCircle2 className="w-3 h-3 mr-1" />
                            {zone.status}
                          </Badge>
                          <Badge variant="outline">
                            <Lock className="w-3 h-3 mr-1" />
                            SSL: {zone.ssl}
                          </Badge>
                          <Badge variant="outline">
                            <Zap className="w-3 h-3 mr-1" />
                            Cache: {zone.caching}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline">
                        <Settings className="w-3 h-3" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <RefreshCw className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="grid md:grid-cols-3 gap-4">
            <Card className="cursor-pointer hover:shadow-lg transition-all">
              <CardContent className="p-5">
                <Shield className="w-10 h-10 text-orange-600 mb-3" />
                <h4 className="font-semibold mb-1">Firewall Rules</h4>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Configure WAF and security rules
                </p>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-lg transition-all">
              <CardContent className="p-5">
                <Zap className="w-10 h-10 text-yellow-600 mb-3" />
                <h4 className="font-semibold mb-1">Cache Settings</h4>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Optimize caching and performance
                </p>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-lg transition-all">
              <CardContent className="p-5">
                <Globe className="w-10 h-10 text-blue-600 mb-3" />
                <h4 className="font-semibold mb-1">DNS Records</h4>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Manage DNS configuration
                </p>
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </div>
  );
}
