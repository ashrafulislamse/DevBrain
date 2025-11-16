'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { mockServers, mockWebsites, mockDeployments, mockMetrics, mockActivities } from '@/lib/mock-data';
import {
  Server,
  Globe,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  Clock,
  Activity,
  Zap,
  ArrowRight,
} from 'lucide-react';

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Welcome back! Here's what's happening.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Servers Online</CardTitle>
            <Server className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockMetrics.servers.online}/{mockMetrics.servers.total}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+2</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Websites Up</CardTitle>
            <Globe className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockMetrics.websites.up}/{mockMetrics.websites.total}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">99.9%</span> uptime this month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Deployments Today</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockMetrics.deployments.today}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">{mockMetrics.deployments.success} successful</span>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overall Uptime</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockMetrics.uptime}%</div>
            <p className="text-xs text-muted-foreground">Last 30 days average</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Server Status */}
        <Card>
          <CardHeader>
            <CardTitle>Server Status</CardTitle>
            <CardDescription>Real-time monitoring of your infrastructure</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockServers.map((server) => (
                <div key={server.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        server.status === 'online'
                          ? 'bg-green-100 dark:bg-green-900/30'
                          : 'bg-red-100 dark:bg-red-900/30'
                      }`}
                    >
                      <Server
                        className={`w-5 h-5 ${
                          server.status === 'online' ? 'text-green-600' : 'text-red-600'
                        }`}
                      />
                    </div>
                    <div>
                      <p className="font-medium">{server.name}</p>
                      <p className="text-sm text-muted-foreground">{server.host}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant={server.status === 'online' ? 'success' : 'destructive'}>
                      {server.status}
                    </Badge>
                    {server.status === 'online' && (
                      <p className="text-xs text-muted-foreground mt-1">
                        CPU: {server.cpu}%
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4">
              View All Servers <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest events from your dashboard</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockActivities.map((activity, index) => (
                <div key={index} className="flex gap-3">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      activity.type === 'deploy'
                        ? 'bg-blue-100 dark:bg-blue-900/30'
                        : activity.type === 'alert'
                        ? 'bg-yellow-100 dark:bg-yellow-900/30'
                        : 'bg-purple-100 dark:bg-purple-900/30'
                    }`}
                  >
                    {activity.type === 'deploy' ? (
                      <Zap className="w-4 h-4 text-blue-600" />
                    ) : activity.type === 'alert' ? (
                      <AlertCircle className="w-4 h-4 text-yellow-600" />
                    ) : (
                      <Activity className="w-4 h-4 text-purple-600" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{activity.message}</p>
                    <p className="text-xs text-muted-foreground">{activity.time} • {activity.user}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Deployments */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Deployments</CardTitle>
            <CardDescription>Latest deployment activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockDeployments.map((deploy) => (
                <div key={deploy.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {deploy.status === 'success' ? (
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                    ) : deploy.status === 'in_progress' ? (
                      <Clock className="w-5 h-5 text-blue-600 animate-spin" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-red-600" />
                    )}
                    <div>
                      <p className="font-medium">{deploy.project}</p>
                      <p className="text-xs text-muted-foreground">{deploy.branch}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge
                      variant={
                        deploy.status === 'success'
                          ? 'success'
                          : deploy.status === 'in_progress'
                          ? 'secondary'
                          : 'destructive'
                      }
                    >
                      {deploy.status.replace('_', ' ')}
                    </Badge>
                    <p className="text-xs text-muted-foreground mt-1">{deploy.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Website Health */}
        <Card>
          <CardHeader>
            <CardTitle>Website Health</CardTitle>
            <CardDescription>Uptime monitoring for all sites</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockWebsites.map((site) => (
                <div key={site.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        site.status === 'up'
                          ? 'bg-green-100 dark:bg-green-900/30'
                          : 'bg-red-100 dark:bg-red-900/30'
                      }`}
                    >
                      <Globe
                        className={`w-5 h-5 ${
                          site.status === 'up' ? 'text-green-600' : 'text-red-600'
                        }`}
                      />
                    </div>
                    <div>
                      <p className="font-medium">{site.name}</p>
                      <p className="text-xs text-muted-foreground">{site.url}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant={site.status === 'up' ? 'success' : 'destructive'}>
                      {site.status}
                    </Badge>
                    {site.status === 'up' && (
                      <p className="text-xs text-muted-foreground mt-1">{site.responseTime}ms</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4">
              View All Websites <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks you can perform</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-auto flex-col gap-2 py-4">
              <Zap className="w-6 h-6" />
              <span className="text-sm">Deploy</span>
            </Button>
            <Button variant="outline" className="h-auto flex-col gap-2 py-4">
              <Server className="w-6 h-6" />
              <span className="text-sm">Add Server</span>
            </Button>
            <Button variant="outline" className="h-auto flex-col gap-2 py-4">
              <Globe className="w-6 h-6" />
              <span className="text-sm">Monitor Site</span>
            </Button>
            <Button variant="outline" className="h-auto flex-col gap-2 py-4">
              <Activity className="w-6 h-6" />
              <span className="text-sm">View Logs</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
