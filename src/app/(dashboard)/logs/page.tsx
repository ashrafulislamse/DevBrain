'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { mockLogs } from '@/lib/mock-data';
import {
  FileText,
  Search,
  Filter,
  Download,
  RefreshCw,
  AlertCircle,
  AlertTriangle,
  Info,
  XCircle,
} from 'lucide-react';

export default function LogsPage() {
  const [filter, setFilter] = useState<'all' | 'error' | 'warn' | 'info'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredLogs = mockLogs.filter((log) => {
    const matchesFilter = filter === 'all' || log.level === filter;
    const matchesSearch =
      searchQuery === '' ||
      log.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.source.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getLevelIcon = (level: string) => {
    switch (level) {
      case 'error':
        return <XCircle className="w-5 h-5 text-red-600" />;
      case 'warn':
        return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
      case 'info':
        return <Info className="w-5 h-5 text-blue-600" />;
      default:
        return <AlertCircle className="w-5 h-5 text-gray-600" />;
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'error':
        return 'bg-red-100 dark:bg-red-900/30 border-red-200 dark:border-red-800';
      case 'warn':
        return 'bg-yellow-100 dark:bg-yellow-900/30 border-yellow-200 dark:border-yellow-800';
      case 'info':
        return 'bg-blue-100 dark:bg-blue-900/30 border-blue-200 dark:border-blue-800';
      default:
        return 'bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <FileText className="w-8 h-8 text-purple-600" />
            Logs
          </h1>
          <p className="text-muted-foreground mt-1">
            Centralized logging from all your infrastructure
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Filters & Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search logs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={filter === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter('all')}
              >
                All
              </Button>
              <Button
                variant={filter === 'error' ? 'destructive' : 'outline'}
                size="sm"
                onClick={() => setFilter('error')}
              >
                Errors
              </Button>
              <Button
                variant={filter === 'warn' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter('warn')}
                className={filter === 'warn' ? 'bg-yellow-600 hover:bg-yellow-700' : ''}
              >
                Warnings
              </Button>
              <Button
                variant={filter === 'info' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter('info')}
                className={filter === 'info' ? 'bg-blue-600 hover:bg-blue-700' : ''}
              >
                Info
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Log Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Logs</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,543</div>
            <p className="text-xs text-muted-foreground">Last 24 hours</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Errors</CardTitle>
            <XCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">23</div>
            <p className="text-xs text-muted-foreground">Needs attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Warnings</CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">147</div>
            <p className="text-xs text-muted-foreground">Review recommended</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Info</CardTitle>
            <Info className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">2,373</div>
            <p className="text-xs text-muted-foreground">Informational</p>
          </CardContent>
        </Card>
      </div>

      {/* Log Stream */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Log Stream
            <Badge variant="outline">{filteredLogs.length} entries</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {filteredLogs.map((log, i) => (
              <div
                key={i}
                className={`p-4 rounded-lg border ${getLevelColor(log.level)} hover:shadow-md transition-shadow cursor-pointer`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3 flex-1">
                    {getLevelIcon(log.level)}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="outline" className="text-xs">
                          {log.level.toUpperCase()}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{log.source}</span>
                      </div>
                      <p className="font-mono text-sm break-all">{log.message}</p>
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">
                    {log.time}
                  </span>
                </div>
              </div>
            ))}

            {filteredLogs.length === 0 && (
              <div className="text-center py-12">
                <FileText className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No logs found matching your criteria</p>
              </div>
            )}
          </div>

          {filteredLogs.length > 0 && (
            <div className="flex items-center justify-center gap-2 mt-6">
              <Button variant="outline" size="sm">
                Previous
              </Button>
              <span className="text-sm text-muted-foreground">Page 1 of 42</span>
              <Button variant="outline" size="sm">
                Next
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
