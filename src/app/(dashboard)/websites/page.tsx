'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { mockWebsites } from '@/lib/mock-data';
import { Globe, Plus, ExternalLink, ShieldCheck, TrendingUp } from 'lucide-react';

export default function WebsitesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Websites</h1>
          <p className="text-muted-foreground mt-1">Monitor uptime and performance</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Website
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {mockWebsites.map((site) => (
          <Card key={site.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      site.status === 'up'
                        ? 'bg-green-100 dark:bg-green-900/30'
                        : 'bg-red-100 dark:bg-red-900/30'
                    }`}
                  >
                    <Globe
                      className={`w-6 h-6 ${
                        site.status === 'up' ? 'text-green-600' : 'text-red-600'
                      }`}
                    />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{site.name}</CardTitle>
                    <a
                      href={site.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-muted-foreground hover:underline flex items-center gap-1"
                    >
                      {site.url}
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
                <Badge variant={site.status === 'up' ? 'success' : 'destructive'}>
                  {site.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {site.status === 'up' && (
                  <>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-muted-foreground" />
                        <span>Response Time</span>
                      </div>
                      <span className="font-medium">{site.responseTime}ms</span>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <Activity className="w-4 h-4 text-muted-foreground" />
                        <span>Uptime</span>
                      </div>
                      <span className="font-medium">{site.uptime}%</span>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-muted-foreground" />
                        <span>SSL Expires</span>
                      </div>
                      <span
                        className={`font-medium ${
                          site.sslDaysLeft < 30 ? 'text-red-600' : 'text-green-600'
                        }`}
                      >
                        {site.sslDaysLeft} days
                      </span>
                    </div>
                  </>
                )}

                <div className="flex gap-2 pt-2 border-t">
                  <Button variant="outline" size="sm" className="flex-1">
                    View Metrics
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    Settings
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function Activity({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
      />
    </svg>
  );
}
