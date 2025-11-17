'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  BarChart3,
  PieChart,
  LineChart,
  TrendingUp,
  Download,
  FileSpreadsheet,
  FileText,
  Plus,
  Calendar,
  Filter,
  Eye,
  Edit,
  Trash2,
  Share2,
  Clock,
  Users,
  DollarSign,
  Activity,
  Target,
} from 'lucide-react';

const ANALYTICS_TOOLS = [
  { id: 'dashboard', name: 'Dashboards', icon: BarChart3, color: 'from-blue-500 to-cyan-500' },
  { id: 'reports', name: 'Reports', icon: FileText, color: 'from-purple-500 to-pink-500' },
  { id: 'metrics', name: 'Metrics', icon: TrendingUp, color: 'from-green-500 to-emerald-500' },
  { id: 'export', name: 'Export', icon: Download, color: 'from-orange-500 to-red-500' },
];

interface Report {
  id: string;
  name: string;
  type: string;
  lastRun: string;
  schedule: string;
  format: string;
}

export default function AnalyticsPage() {
  const [selectedTool, setSelectedTool] = useState('dashboard');

  const [reports, setReports] = useState<Report[]>([
    { id: '1', name: 'Monthly Revenue Report', type: 'Financial', lastRun: '2 days ago', schedule: 'Monthly', format: 'PDF' },
    { id: '2', name: 'Server Performance', type: 'Performance', lastRun: '5 hours ago', schedule: 'Daily', format: 'Excel' },
    { id: '3', name: 'Client Activity', type: 'Usage', lastRun: '1 day ago', schedule: 'Weekly', format: 'PDF' },
  ]);

  const renderToolContent = () => {
    switch (selectedTool) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Business Intelligence Dashboard</h2>
              <div className="flex gap-2">
                <Button variant="outline">
                  <Calendar className="w-4 h-4 mr-2" />
                  Last 30 Days
                </Button>
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-5">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Total Revenue</p>
                    <DollarSign className="w-5 h-5 text-green-500" />
                  </div>
                  <p className="text-3xl font-bold">$45,231</p>
                  <div className="flex items-center gap-1 mt-2 text-sm">
                    <TrendingUp className="w-4 h-4 text-green-500" />
                    <span className="text-green-500 font-medium">+20.1%</span>
                    <span className="text-gray-600 dark:text-gray-400">vs last month</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-5">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Active Users</p>
                    <Users className="w-5 h-5 text-blue-500" />
                  </div>
                  <p className="text-3xl font-bold">2,547</p>
                  <div className="flex items-center gap-1 mt-2 text-sm">
                    <TrendingUp className="w-4 h-4 text-green-500" />
                    <span className="text-green-500 font-medium">+12.5%</span>
                    <span className="text-gray-600 dark:text-gray-400">vs last month</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-5">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Conversion Rate</p>
                    <Target className="w-5 h-5 text-purple-500" />
                  </div>
                  <p className="text-3xl font-bold">4.2%</p>
                  <div className="flex items-center gap-1 mt-2 text-sm">
                    <TrendingUp className="w-4 h-4 text-green-500" />
                    <span className="text-green-500 font-medium">+0.8%</span>
                    <span className="text-gray-600 dark:text-gray-400">vs last month</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-5">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Avg. Response Time</p>
                    <Activity className="w-5 h-5 text-orange-500" />
                  </div>
                  <p className="text-3xl font-bold">245ms</p>
                  <div className="flex items-center gap-1 mt-2 text-sm">
                    <TrendingUp className="w-4 h-4 text-green-500" />
                    <span className="text-green-500 font-medium">-15%</span>
                    <span className="text-gray-600 dark:text-gray-400">faster</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <LineChart className="w-5 h-5" />
                    Revenue Trend
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg flex items-center justify-center">
                    <div className="text-center text-gray-500">
                      <LineChart className="w-16 h-16 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">Line chart visualization</p>
                      <p className="text-xs">Revenue over time</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChart className="w-5 h-5" />
                    Traffic Sources
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg flex items-center justify-center">
                    <div className="text-center text-gray-500">
                      <PieChart className="w-16 h-16 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">Pie chart visualization</p>
                      <p className="text-xs">Traffic distribution</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    Top Pages
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { page: '/dashboard', views: 12453, change: '+12%' },
                      { page: '/projects', views: 8934, change: '+8%' },
                      { page: '/api-tester', views: 6721, change: '+15%' },
                      { page: '/playground', views: 5432, change: '+5%' },
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between">
                        <div className="flex-1">
                          <p className="font-medium text-sm">{item.page}</p>
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-1">
                            <div
                              className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                              style={{ width: `${(item.views / 12453) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                        <div className="ml-4 text-right">
                          <p className="font-semibold">{item.views.toLocaleString()}</p>
                          <p className="text-xs text-green-500">{item.change}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    User Growth
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-48 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg flex items-center justify-center">
                    <div className="text-center text-gray-500">
                      <BarChart3 className="w-16 h-16 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">Bar chart visualization</p>
                      <p className="text-xs">New users per month</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      case 'reports':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Scheduled Reports</h2>
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600">
                <Plus className="w-4 h-4 mr-2" />
                Create Report
              </Button>
            </div>

            <div className="grid gap-4">
              {reports.map((report) => (
                <Card key={report.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3 flex-1">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                          <FileText className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold mb-1">{report.name}</h3>
                          <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                            <Badge variant="outline">{report.type}</Badge>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {report.schedule}
                            </span>
                            <span>Last run: {report.lastRun}</span>
                            <Badge className="bg-blue-500">{report.format}</Badge>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="w-4 h-4" />
                        </Button>
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

            <Card>
              <CardHeader>
                <CardTitle>Create Custom Report</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Report Name</label>
                  <Input placeholder="Monthly Performance Report" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Report Type</label>
                    <select className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800">
                      <option>Financial</option>
                      <option>Performance</option>
                      <option>Usage</option>
                      <option>Custom</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Schedule</label>
                    <select className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800">
                      <option>Daily</option>
                      <option>Weekly</option>
                      <option>Monthly</option>
                      <option>Quarterly</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Export Format</label>
                  <div className="grid grid-cols-3 gap-3">
                    {['PDF', 'Excel', 'CSV'].map((format) => (
                      <Card key={format} className="cursor-pointer hover:shadow-lg transition-all">
                        <CardContent className="p-4 text-center">
                          <FileSpreadsheet className="w-8 h-8 mx-auto mb-2 text-purple-500" />
                          <p className="font-medium">{format}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Report
                </Button>
              </CardContent>
            </Card>
          </div>
        );

      case 'metrics':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Key Performance Indicators</h2>
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  name: 'Monthly Recurring Revenue',
                  value: '$45,231',
                  change: '+20.1%',
                  target: '$50,000',
                  progress: 90,
                  icon: DollarSign,
                  color: 'green',
                },
                {
                  name: 'Customer Acquisition Cost',
                  value: '$127',
                  change: '-8.2%',
                  target: '$100',
                  progress: 78,
                  icon: Users,
                  color: 'blue',
                },
                {
                  name: 'Churn Rate',
                  value: '2.4%',
                  change: '-0.5%',
                  target: '< 3%',
                  progress: 92,
                  icon: Activity,
                  color: 'purple',
                },
                {
                  name: 'Average Order Value',
                  value: '$342',
                  change: '+15.3%',
                  target: '$400',
                  progress: 85,
                  icon: Target,
                  color: 'orange',
                },
              ].map((metric, idx) => {
                const Icon = metric.icon;
                return (
                  <Card key={idx}>
                    <CardContent className="p-5">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-12 h-12 rounded-xl bg-${metric.color}-100 dark:bg-${metric.color}-900/30 flex items-center justify-center`}>
                            <Icon className={`w-6 h-6 text-${metric.color}-500`} />
                          </div>
                          <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{metric.name}</p>
                            <p className="text-2xl font-bold">{metric.value}</p>
                          </div>
                        </div>
                        <Badge className={`bg-${metric.change.startsWith('+') ? 'green' : 'red'}-500`}>
                          {metric.change}
                        </Badge>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600 dark:text-gray-400">Target: {metric.target}</span>
                          <span className="font-medium">{metric.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div
                            className={`bg-gradient-to-r from-${metric.color}-500 to-${metric.color}-600 h-2 rounded-full`}
                            style={{ width: `${metric.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        );

      case 'export':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-2">Export Data</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Export your analytics data in various formats
              </p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Export Options</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Data Range</label>
                  <div className="grid grid-cols-2 gap-4">
                    <Input type="date" />
                    <Input type="date" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Select Metrics</label>
                  <div className="space-y-2">
                    {['Revenue', 'Users', 'Traffic', 'Conversions', 'Performance'].map((metric) => (
                      <label key={metric} className="flex items-center gap-2 p-2 border rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800">
                        <input type="checkbox" className="rounded" defaultChecked />
                        <span className="text-sm">{metric}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Export Format</label>
                  <div className="grid grid-cols-3 gap-3">
                    <Button variant="outline" className="h-20 flex-col">
                      <FileText className="w-8 h-8 mb-2" />
                      <span>PDF</span>
                    </Button>
                    <Button variant="outline" className="h-20 flex-col">
                      <FileSpreadsheet className="w-8 h-8 mb-2" />
                      <span>Excel</span>
                    </Button>
                    <Button variant="outline" className="h-20 flex-col">
                      <Download className="w-8 h-8 mb-2" />
                      <span>CSV</span>
                    </Button>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button className="flex-1 bg-gradient-to-r from-orange-600 to-red-600">
                    <Download className="w-4 h-4 mr-2" />
                    Export Now
                  </Button>
                  <Button variant="outline">
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                </div>
              </CardContent>
            </Card>
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
            Analytics & Business Intelligence
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Comprehensive analytics with custom reports and data visualization
          </p>
        </div>
        <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0">
          <BarChart3 className="w-3 h-3 mr-1" />
          {ANALYTICS_TOOLS.length} Tools
        </Badge>
      </div>

      {/* Tool Selection */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {ANALYTICS_TOOLS.map((tool) => {
          const Icon = tool.icon;
          return (
            <Card
              key={tool.id}
              className={`cursor-pointer transition-all hover:scale-105 ${
                selectedTool === tool.id
                  ? 'ring-2 ring-blue-500 shadow-lg'
                  : ''
              }`}
              onClick={() => setSelectedTool(tool.id)}
            >
              <CardContent className="p-4 text-center">
                <div className={`w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br ${tool.color} flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <p className="text-sm font-medium">{tool.name}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Tool Content */}
      {renderToolContent()}
    </div>
  );
}
