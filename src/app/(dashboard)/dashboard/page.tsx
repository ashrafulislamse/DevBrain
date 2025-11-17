'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
  Rocket,
  Code,
  Users,
  BarChart3,
  Sparkles,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-500 dark:text-gray-400 animate-pulse">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const stats = [
    {
      title: 'Total Revenue',
      value: '$45,231',
      change: '+20.1%',
      changeType: 'positive' as const,
      icon: TrendingUp,
      description: 'from last month',
      gradient: 'from-green-500 to-emerald-600',
      bgGradient: 'from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20',
    },
    {
      title: 'Active Projects',
      value: '23',
      change: '+12.5%',
      changeType: 'positive' as const,
      icon: Rocket,
      description: 'projects in progress',
      gradient: 'from-blue-500 to-indigo-600',
      bgGradient: 'from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20',
    },
    {
      title: 'Servers Online',
      value: `${mockMetrics.servers.online}/${mockMetrics.servers.total}`,
      change: '+2',
      changeType: 'positive' as const,
      icon: Server,
      description: 'all systems operational',
      gradient: 'from-purple-500 to-pink-600',
      bgGradient: 'from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20',
    },
    {
      title: 'Team Members',
      value: '12',
      change: '+3',
      changeType: 'positive' as const,
      icon: Users,
      description: 'active this month',
      gradient: 'from-orange-500 to-red-600',
      bgGradient: 'from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20',
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Hero Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-600 p-8 shadow-2xl shadow-purple-500/30">
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-5 h-5 text-yellow-300" />
            <span className="text-sm font-semibold text-purple-100">Welcome back!</span>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">Dashboard</h1>
          <p className="text-purple-100 text-lg max-w-2xl">
            Here's what's happening with your projects today. Track your servers, deployments, and team activity.
          </p>
          <div className="flex items-center gap-4 mt-6">
            <Button className="bg-white text-purple-600 hover:bg-purple-50 shadow-lg">
              <Rocket className="w-4 h-4 mr-2" />
              Quick Deploy
            </Button>
            <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm">
              View Analytics
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat, index) => (
          <Card
            key={stat.title}
            className={`group relative overflow-hidden border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 hover:scale-[1.02] bg-gradient-to-br ${stat.bgGradient} ${
              mounted ? 'animate-in slide-in-from-bottom-4' : ''
            }`}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
                >
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <Badge
                  className={`${
                    stat.changeType === 'positive'
                      ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                      : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                  } border-0 font-semibold`}
                >
                  {stat.change}
                </Badge>
              </div>
              <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">{stat.title}</h3>
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{stat.value}</div>
              <p className="text-xs text-gray-500 dark:text-gray-500">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Activity Feed - Takes 2 columns */}
        <Card className="lg:col-span-2 border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                <CardTitle>Recent Activity</CardTitle>
              </div>
              <Button variant="ghost" size="sm" className="text-purple-600 hover:text-purple-700">
                View All
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockActivities.slice(0, 5).map((activity, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all duration-200 group cursor-pointer"
                >
                  <div
                    className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center ${
                      activity.type === 'deployment'
                        ? 'bg-green-100 dark:bg-green-900/30'
                        : activity.type === 'error'
                        ? 'bg-red-100 dark:bg-red-900/30'
                        : 'bg-blue-100 dark:bg-blue-900/30'
                    } group-hover:scale-110 transition-transform`}
                  >
                    {activity.type === 'deployment' ? (
                      <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />
                    ) : activity.type === 'error' ? (
                      <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
                    ) : (
                      <Code className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                      {activity.message}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">{activity.timestamp}</p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card className="border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              <CardTitle>Quick Stats</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Deployment Success Rate */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Deploy Success</span>
                <span className="text-sm font-bold text-green-600 dark:text-green-400">94%</span>
              </div>
              <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-green-500 to-emerald-600 rounded-full transition-all duration-1000" style={{ width: '94%' }}></div>
              </div>
            </div>

            {/* Response Time */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Avg Response</span>
                <span className="text-sm font-bold text-blue-600 dark:text-blue-400">245ms</span>
              </div>
              <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transition-all duration-1000" style={{ width: '65%' }}></div>
              </div>
            </div>

            {/* Uptime */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Uptime</span>
                <span className="text-sm font-bold text-purple-600 dark:text-purple-400">99.9%</span>
              </div>
              <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-purple-500 to-pink-600 rounded-full transition-all duration-1000" style={{ width: '99.9%' }}></div>
              </div>
            </div>

            {/* CPU Usage */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">CPU Usage</span>
                <span className="text-sm font-bold text-orange-600 dark:text-orange-400">45%</span>
              </div>
              <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-orange-500 to-red-600 rounded-full transition-all duration-1000" style={{ width: '45%' }}></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Deployments */}
      <Card className="border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              <CardTitle>Recent Deployments</CardTitle>
            </div>
            <Button variant="ghost" size="sm" className="text-purple-600 hover:text-purple-700">
              View All
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">Project</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">Environment</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">Status</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">Time</th>
                  <th className="text-right py-3 px-4 text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {mockDeployments.map((deployment, index) => (
                  <tr key={deployment.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group">
                    <td className="py-4 px-4">
                      <div className="font-medium text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                        {deployment.project}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <Badge variant="outline" className="font-medium">
                        {deployment.environment}
                      </Badge>
                    </td>
                    <td className="py-4 px-4">
                      <Badge
                        className={`${
                          deployment.status === 'success'
                            ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800'
                            : deployment.status === 'failed'
                            ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800'
                            : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800'
                        } border font-medium`}
                      >
                        {deployment.status}
                      </Badge>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-sm text-gray-600 dark:text-gray-400">{deployment.timestamp}</span>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                        View
                        <ChevronRight className="w-3 h-3 ml-1" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
