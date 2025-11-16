'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { mockServers } from '@/lib/mock-data';
import { Server, Plus, Terminal, Activity, HardDrive } from 'lucide-react';

export default function ServersPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Servers</h1>
          <p className="text-muted-foreground mt-1">Manage and monitor all your VPS servers</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Server
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {mockServers.map((server) => (
          <Card key={server.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      server.status === 'online'
                        ? 'bg-green-100 dark:bg-green-900/30'
                        : 'bg-red-100 dark:bg-red-900/30'
                    }`}
                  >
                    <Server
                      className={`w-6 h-6 ${
                        server.status === 'online' ? 'text-green-600' : 'text-red-600'
                      }`}
                    />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{server.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{server.host}</p>
                  </div>
                </div>
                <Badge variant={server.status === 'online' ? 'success' : 'destructive'}>
                  {server.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Location</span>
                  <span className="font-medium">{server.location}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Uptime</span>
                  <span className="font-medium">{server.uptime}%</span>
                </div>

                {server.status === 'online' && (
                  <>
                    <div className="space-y-2 pt-2 border-t">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <Activity className="w-4 h-4 text-muted-foreground" />
                          <span>CPU</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-24 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-blue-500"
                              style={{ width: `${server.cpu}%` }}
                            />
                          </div>
                          <span className="font-medium w-12 text-right">{server.cpu}%</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <Activity className="w-4 h-4 text-muted-foreground" />
                          <span>RAM</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-24 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-purple-500"
                              style={{ width: `${server.ram}%` }}
                            />
                          </div>
                          <span className="font-medium w-12 text-right">{server.ram}%</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <HardDrive className="w-4 h-4 text-muted-foreground" />
                          <span>Disk</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-24 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-orange-500"
                              style={{ width: `${server.disk}%` }}
                            />
                          </div>
                          <span className="font-medium w-12 text-right">{server.disk}%</span>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Terminal className="w-4 h-4 mr-2" />
                    SSH
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Activity className="w-4 h-4 mr-2" />
                    Logs
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
