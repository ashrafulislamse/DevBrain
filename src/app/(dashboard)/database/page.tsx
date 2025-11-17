'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Database,
  Table,
  FileCode,
  PlayCircle,
  Save,
  Download,
  Upload,
  GitBranch,
  Settings,
  Eye,
  Edit,
  Trash2,
  Plus,
  Search,
  Filter,
  RefreshCw,
  Copy,
  Check,
} from 'lucide-react';

interface QueryHistory {
  id: string;
  query: string;
  timestamp: string;
  rows: number;
  duration: string;
}

interface TableInfo {
  name: string;
  rows: number;
  size: string;
  engine: string;
}

const DB_TOOLS = [
  { id: 'query', name: 'Query Builder', icon: PlayCircle, color: 'from-blue-500 to-cyan-500' },
  { id: 'tables', name: 'Table Manager', icon: Table, color: 'from-purple-500 to-pink-500' },
  { id: 'designer', name: 'Schema Designer', icon: GitBranch, color: 'from-green-500 to-emerald-500' },
  { id: 'import', name: 'Import/Export', icon: Upload, color: 'from-orange-500 to-red-500' },
  { id: 'migrations', name: 'Migrations', icon: FileCode, color: 'from-indigo-500 to-purple-500' },
  { id: 'monitor', name: 'Performance', icon: Settings, color: 'from-pink-500 to-rose-500' },
];

export default function DatabasePage() {
  const [selectedTool, setSelectedTool] = useState('query');
  const [isConnected, setIsConnected] = useState(false);
  const [selectedDb, setSelectedDb] = useState('mysql');
  const [query, setQuery] = useState('SELECT * FROM users WHERE status = "active" LIMIT 10;');
  const [queryResult, setQueryResult] = useState<any>(null);
  const [isExecuting, setIsExecuting] = useState(false);
  const [queryHistory, setQueryHistory] = useState<QueryHistory[]>([
    { id: '1', query: 'SELECT * FROM orders ORDER BY created_at DESC', timestamp: '2 mins ago', rows: 150, duration: '45ms' },
    { id: '2', query: 'UPDATE users SET verified = true WHERE email_verified', timestamp: '15 mins ago', rows: 23, duration: '12ms' },
  ]);

  const [tables, setTables] = useState<TableInfo[]>([
    { name: 'users', rows: 2547, size: '1.2 MB', engine: 'InnoDB' },
    { name: 'orders', rows: 8934, size: '5.8 MB', engine: 'InnoDB' },
    { name: 'products', rows: 456, size: '890 KB', engine: 'InnoDB' },
    { name: 'sessions', rows: 12453, size: '3.4 MB', engine: 'InnoDB' },
  ]);

  const executeQuery = () => {
    setIsExecuting(true);
    setTimeout(() => {
      setQueryResult({
        columns: ['id', 'name', 'email', 'status', 'created_at'],
        rows: [
          { id: 1, name: 'John Doe', email: 'john@example.com', status: 'active', created_at: '2024-01-15' },
          { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'active', created_at: '2024-01-16' },
          { id: 3, name: 'Bob Johnson', email: 'bob@example.com', status: 'active', created_at: '2024-01-17' },
        ],
        rowCount: 3,
        duration: '28ms',
      });
      setIsExecuting(false);
    }, 800);
  };

  const renderToolContent = () => {
    switch (selectedTool) {
      case 'query':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <PlayCircle className="w-5 h-5 text-blue-500" />
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Total Queries</p>
                      <p className="text-2xl font-bold">1,247</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <Database className="w-5 h-5 text-green-500" />
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Avg Response</p>
                      <p className="text-2xl font-bold">45ms</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <Save className="w-5 h-5 text-purple-500" />
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Saved Queries</p>
                      <p className="text-2xl font-bold">34</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileCode className="w-5 h-5" />
                  SQL Editor
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <textarea
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full h-32 p-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg font-mono text-sm"
                    placeholder="Enter your SQL query..."
                  />
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={executeQuery}
                    disabled={isExecuting}
                    className="bg-gradient-to-r from-blue-600 to-cyan-600"
                  >
                    <PlayCircle className="w-4 h-4 mr-2" />
                    {isExecuting ? 'Executing...' : 'Execute Query'}
                  </Button>
                  <Button variant="outline">
                    <Save className="w-4 h-4 mr-2" />
                    Save Query
                  </Button>
                  <Button variant="outline">
                    <Copy className="w-4 h-4 mr-2" />
                    Copy
                  </Button>
                </div>

                {queryResult && (
                  <div className="mt-6">
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {queryResult.rowCount} rows in {queryResult.duration}
                      </p>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Export CSV
                      </Button>
                    </div>
                    <div className="overflow-x-auto border border-gray-200 dark:border-gray-700 rounded-lg">
                      <table className="w-full text-sm">
                        <thead className="bg-gray-50 dark:bg-gray-900">
                          <tr>
                            {queryResult.columns.map((col: string) => (
                              <th key={col} className="px-4 py-2 text-left font-medium">
                                {col}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {queryResult.rows.map((row: any, idx: number) => (
                            <tr key={idx} className="border-t border-gray-200 dark:border-gray-700">
                              {queryResult.columns.map((col: string) => (
                                <td key={col} className="px-4 py-2">
                                  {row[col]}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <RefreshCw className="w-5 h-5" />
                  Query History
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {queryHistory.map((item) => (
                    <div
                      key={item.id}
                      className="p-3 bg-gray-50 dark:bg-gray-900 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <code className="text-sm text-gray-900 dark:text-gray-100">{item.query}</code>
                          <div className="flex items-center gap-4 mt-2 text-xs text-gray-600 dark:text-gray-400">
                            <span>{item.timestamp}</span>
                            <span>{item.rows} rows</span>
                            <span>{item.duration}</span>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          <PlayCircle className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'tables':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Input placeholder="Search tables..." className="w-64" />
                <Button variant="outline">
                  <Filter className="w-4 h-4" />
                </Button>
              </div>
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600">
                <Plus className="w-4 h-4 mr-2" />
                Create Table
              </Button>
            </div>

            <div className="grid gap-4">
              {tables.map((table) => (
                <Card key={table.name}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                          <Table className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">{table.name}</h3>
                          <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                            <span>{table.rows.toLocaleString()} rows</span>
                            <span>{table.size}</span>
                            <Badge variant="outline">{table.engine}</Badge>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="w-4 h-4" />
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
          </div>
        );

      case 'designer':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GitBranch className="w-5 h-5" />
                  Schema Designer
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-96 bg-gray-50 dark:bg-gray-900 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-700 flex items-center justify-center">
                  <div className="text-center">
                    <GitBranch className="w-12 h-12 mx-auto text-gray-400 mb-3" />
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      Visual schema designer - drag and drop tables to create relationships
                    </p>
                    <Button className="bg-gradient-to-r from-green-600 to-emerald-600">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Table
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Generate SQL</CardTitle>
                </CardHeader>
                <CardContent>
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600">
                    <FileCode className="w-4 h-4 mr-2" />
                    Export SQL Schema
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Generate Diagram</CardTitle>
                </CardHeader>
                <CardContent>
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600">
                    <Download className="w-4 h-4 mr-2" />
                    Export ER Diagram
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      case 'import':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Upload className="w-5 h-5 text-blue-500" />
                    Import Data
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-8 text-center">
                    <Upload className="w-12 h-12 mx-auto text-gray-400 mb-3" />
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      Drop files here or click to browse
                    </p>
                    <p className="text-xs text-gray-500">Supports: SQL, CSV, JSON, Excel</p>
                    <Button className="mt-4 bg-gradient-to-r from-blue-600 to-cyan-600">
                      Select Files
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium">Target Table</label>
                    <Input placeholder="Select or create table..." />
                  </div>

                  <Button className="w-full bg-gradient-to-r from-green-600 to-emerald-600">
                    <Upload className="w-4 h-4 mr-2" />
                    Import Data
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Download className="w-5 h-5 text-green-500" />
                    Export Data
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium">Select Tables</label>
                    <div className="space-y-2">
                      {['users', 'orders', 'products', 'sessions'].map((table) => (
                        <label key={table} className="flex items-center gap-2">
                          <input type="checkbox" className="rounded" />
                          <span className="text-sm">{table}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium">Export Format</label>
                    <select className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800">
                      <option>SQL Dump</option>
                      <option>CSV</option>
                      <option>JSON</option>
                      <option>Excel</option>
                    </select>
                  </div>

                  <Button className="w-full bg-gradient-to-r from-orange-600 to-red-600">
                    <Download className="w-4 h-4 mr-2" />
                    Export Data
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      case 'migrations':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileCode className="w-5 h-5" />
                  Database Migrations
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Button className="bg-gradient-to-r from-indigo-600 to-purple-600">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Migration
                  </Button>
                  <Button variant="outline">
                    <PlayCircle className="w-4 h-4 mr-2" />
                    Run Pending
                  </Button>
                  <Button variant="outline">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Rollback
                  </Button>
                </div>

                <div className="space-y-2">
                  {[
                    { name: 'add_user_roles_table', status: 'completed', date: '2024-01-15' },
                    { name: 'add_email_verification', status: 'completed', date: '2024-01-14' },
                    { name: 'create_sessions_table', status: 'pending', date: '2024-01-16' },
                  ].map((migration, idx) => (
                    <div
                      key={idx}
                      className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg flex items-center justify-between"
                    >
                      <div>
                        <p className="font-medium">{migration.name}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{migration.date}</p>
                      </div>
                      <Badge className={migration.status === 'completed' ? 'bg-green-500' : 'bg-yellow-500'}>
                        {migration.status === 'completed' ? (
                          <Check className="w-3 h-3 mr-1" />
                        ) : null}
                        {migration.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'monitor':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <PlayCircle className="w-5 h-5 text-blue-500" />
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Active Connections</p>
                      <p className="text-2xl font-bold">47</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <Settings className="w-5 h-5 text-green-500" />
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Queries/sec</p>
                      <p className="text-2xl font-bold">128</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <Database className="w-5 h-5 text-purple-500" />
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Cache Hit Rate</p>
                      <p className="text-2xl font-bold">94.2%</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Slow Queries</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {[
                    { query: 'SELECT * FROM orders JOIN users...', duration: '2.4s', count: 23 },
                    { query: 'UPDATE products SET stock = stock - 1...', duration: '1.8s', count: 45 },
                  ].map((slow, idx) => (
                    <div key={idx} className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                      <code className="text-sm">{slow.query}</code>
                      <div className="flex items-center gap-4 mt-2 text-xs">
                        <Badge className="bg-red-500">{slow.duration}</Badge>
                        <span className="text-gray-600 dark:text-gray-400">{slow.count} executions</span>
                      </div>
                    </div>
                  ))}
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
            Database Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Powerful database client with query builder and schema designer
          </p>
        </div>
        <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0">
          <Database className="w-3 h-3 mr-1" />
          {DB_TOOLS.length} Tools
        </Badge>
      </div>

      {/* Connection */}
      {!isConnected && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Connect to Database</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Database Type</label>
                <select
                  value={selectedDb}
                  onChange={(e) => setSelectedDb(e.target.value)}
                  className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800"
                >
                  <option value="mysql">MySQL</option>
                  <option value="postgresql">PostgreSQL</option>
                  <option value="mongodb">MongoDB</option>
                  <option value="redis">Redis</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Host</label>
                <Input placeholder="localhost:3306" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Database Name</label>
                <Input placeholder="my_database" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Username</label>
                <Input placeholder="root" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Password</label>
                <Input type="password" placeholder="••••••••" />
              </div>
            </div>
            <Button
              onClick={() => setIsConnected(true)}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600"
            >
              <Database className="w-4 h-4 mr-2" />
              Connect to Database
            </Button>
          </CardContent>
        </Card>
      )}

      {isConnected && (
        <>
          {/* Tool Selection */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
            {DB_TOOLS.map((tool) => {
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
        </>
      )}
    </div>
  );
}
