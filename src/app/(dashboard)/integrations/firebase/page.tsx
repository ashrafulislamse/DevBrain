'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Flame,
  Database,
  Users,
  Bell,
  Shield,
  BarChart3,
  Server,
  Cloud,
  Key,
  CheckCircle2,
  Settings,
  Plus,
  TrendingUp,
} from 'lucide-react';

export default function FirebasePage() {
  const [isConnected, setIsConnected] = useState(false);
  const [projectId, setProjectId] = useState('');

  const stats = {
    users: '12,450',
    documents: '45,230',
    storage: '12.5 GB',
    requests: '2.4M',
  };

  const projects = [
    { id: '1', name: 'production-app', env: 'production', users: 12450, status: 'healthy' },
    { id: '2', name: 'staging-app', env: 'staging', users: 150, status: 'healthy' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 via-yellow-500 to-orange-600 bg-clip-text text-transparent">
            Firebase Integration
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage Firebase projects, auth, and databases
          </p>
        </div>
        <Badge className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white border-0">
          <Flame className="w-3 h-3 mr-1" />
          {isConnected ? 'Connected' : 'Not Connected'}
        </Badge>
      </div>

      {!isConnected ? (
        <Card>
          <CardHeader>
            <CardTitle>Connect to Firebase</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Project ID</label>
              <Input
                placeholder="my-firebase-project"
                value={projectId}
                onChange={(e) => setProjectId(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Service Account Key (JSON)</label>
              <textarea
                className="w-full h-32 p-3 border rounded-lg font-mono text-xs"
                placeholder="Paste your service account JSON here..."
              />
            </div>
            <Button
              onClick={() => setIsConnected(true)}
              className="bg-gradient-to-r from-orange-600 to-yellow-600"
            >
              <Flame className="w-4 h-4 mr-2" />
              Connect Firebase
            </Button>
          </CardContent>
        </Card>
      ) : (
        <>
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-orange-900/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Total Users</p>
                    <p className="text-3xl font-bold text-orange-600">{stats.users}</p>
                  </div>
                  <Users className="w-12 h-12 text-orange-600/20" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Documents</p>
                    <p className="text-3xl font-bold text-blue-600">{stats.documents}</p>
                  </div>
                  <Database className="w-12 h-12 text-blue-600/20" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Storage</p>
                    <p className="text-3xl font-bold text-purple-600">{stats.storage}</p>
                  </div>
                  <Cloud className="w-12 h-12 text-purple-600/20" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">API Requests</p>
                    <p className="text-3xl font-bold text-green-600">{stats.requests}</p>
                  </div>
                  <TrendingUp className="w-12 h-12 text-green-600/20" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Projects */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Firebase Projects</CardTitle>
                <Button size="sm" variant="outline">
                  <Plus className="w-3 h-3 mr-1" />
                  Add Project
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {projects.map((project) => (
                  <div
                    key={project.id}
                    className="flex items-center justify-between p-5 border rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-yellow-500 flex items-center justify-center text-white">
                        <Flame className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 dark:text-white mb-1">{project.name}</h4>
                        <div className="flex items-center gap-2 text-xs">
                          <Badge variant="outline" className={project.env === 'production' ? 'text-green-600' : 'text-blue-600'}>
                            {project.env}
                          </Badge>
                          <Badge variant="outline">
                            <Users className="w-3 h-3 mr-1" />
                            {project.users.toLocaleString()} users
                          </Badge>
                          <Badge variant="outline" className="text-green-600 border-green-600">
                            <CheckCircle2 className="w-3 h-3 mr-1" />
                            {project.status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      <Settings className="w-3 h-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Services */}
          <div className="grid md:grid-cols-3 gap-4">
            <Card className="cursor-pointer hover:shadow-lg transition-all">
              <CardContent className="p-5">
                <Shield className="w-10 h-10 text-orange-600 mb-3" />
                <h4 className="font-semibold mb-1">Authentication</h4>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Manage users and auth providers
                </p>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-lg transition-all">
              <CardContent className="p-5">
                <Database className="w-10 h-10 text-blue-600 mb-3" />
                <h4 className="font-semibold mb-1">Firestore</h4>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  NoSQL database collections
                </p>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-lg transition-all">
              <CardContent className="p-5">
                <Bell className="w-10 h-10 text-purple-600 mb-3" />
                <h4 className="font-semibold mb-1">Cloud Messaging</h4>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Push notifications
                </p>
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </div>
  );
}
