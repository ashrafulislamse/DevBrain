'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { mockWebsites, mockServers } from '@/lib/mock-data';
import {
  Activity,
  TrendingUp,
  TrendingDown,
  Clock,
  Globe,
  Server,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  XCircle,
} from 'lucide-react';

export default function MonitoringPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Activity className="w-8 h-8 text-purple-600" />
            Monitoring
          </h1>
          <p className="text-muted-foreground mt-1">
            Real-time monitoring of all your infrastructure
          </p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Monitor
        </Button>
      </div>

      {/* Overview Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Uptime</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">99.97%</div>
            <p className="text-xs text-green-600 mt-1">+0.03% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Response Time</CardTitle>
            <Clock className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">245ms</div>
            <p className="text-xs text-green-600 mt-1">-12ms from last week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Incidents</CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground mt-1">1 critical, 1 warning</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">SSL Certificates</CardTitle>
            <ShieldCheck className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12/12</div>
            <p className="text-xs text-green-600 mt-1">All valid</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Website Monitoring */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="w-5 h-5" />
              Website Monitoring
            </CardTitle>
            <CardDescription>Uptime and performance tracking</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockWebsites.map((site) => (
              <div key={site.id} className="space-y-2 pb-4 border-b last:border-0 last:pb-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {site.status === 'up' ? (
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-600" />
                    )}
                    <div>
                      <p className="font-medium">{site.name}</p>
                      <p className="text-sm text-muted-foreground">{site.url}</p>
                    </div>
                  </div>
                  <Badge variant={site.status === 'up' ? 'success' : 'destructive'}>
                    {site.status}
                  </Badge>
                </div>

                {site.status === 'up' && (
                  <div className="grid grid-cols-3 gap-4 text-sm pl-8">
                    <div>
                      <p className="text-muted-foreground">Uptime</p>
                      <p className="font-medium">{site.uptime}%</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Response</p>
                      <p className="font-medium">{site.responseTime}ms</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">SSL</p>
                      <p className={`font-medium ${site.sslDaysLeft < 30 ? 'text-red-600' : ''}`}>
                        {site.sslDaysLeft}d
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Server Monitoring */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Server className="w-5 h-5" />
              Server Health
            </CardTitle>
            <CardDescription>Infrastructure status</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockServers.map((server) => (
              <div key={server.id} className="space-y-2 pb-4 border-b last:border-0 last:pb-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {server.status === 'online' ? (
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-600" />
                    )}
                    <div>
                      <p className="font-medium">{server.name}</p>
                      <p className="text-sm text-muted-foreground">{server.host}</p>
                    </div>
                  </div>
                  <Badge variant={server.status === 'online' ? 'success' : 'destructive'}>
                    {server.status}
                  </Badge>
                </div>

                {server.status === 'online' && (
                  <div className="grid grid-cols-3 gap-4 text-sm pl-8">
                    <div>
                      <p className="text-muted-foreground">CPU</p>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-blue-500"
                            style={{ width: `${server.cpu}%` }}
                          />
                        </div>
                        <span className="font-medium">{server.cpu}%</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-muted-foreground">RAM</p>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-purple-500"
                            style={{ width: `${server.ram}%` }}
                          />
                        </div>
                        <span className="font-medium">{server.ram}%</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Disk</p>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-orange-500"
                            style={{ width: `${server.disk}%` }}
                          />
                        </div>
                        <span className="font-medium">{server.disk}%</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Recent Incidents */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            Recent Incidents
          </CardTitle>
          <CardDescription>Last 7 days</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                title: 'Blog website down',
                severity: 'critical',
                time: '2 hours ago',
                duration: '45 minutes',
                status: 'resolved',
              },
              {
                title: 'High CPU usage on Production Server',
                severity: 'warning',
                time: '1 day ago',
                duration: '2 hours',
                status: 'resolved',
              },
              {
                title: 'SSL certificate expiring soon',
                severity: 'warning',
                time: '3 days ago',
                duration: 'Ongoing',
                status: 'open',
              },
            ].map((incident, i) => (
              <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      incident.severity === 'critical' ? 'bg-red-500' : 'bg-yellow-500'
                    }`}
                  />
                  <div>
                    <p className="font-medium">{incident.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {incident.time} • Duration: {incident.duration}
                    </p>
                  </div>
                </div>
                <Badge variant={incident.status === 'resolved' ? 'success' : 'warning'}>
                  {incident.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function Plus({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
    </svg>
  );
}
