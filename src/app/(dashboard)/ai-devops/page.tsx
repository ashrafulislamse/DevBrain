'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Bot,
  Zap,
  Shield,
  Code,
  TrendingUp,
  Activity,
  FileSearch,
  Wrench,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Play,
  RefreshCw,
  Eye,
  Download,
  Sparkles,
  Cpu,
  Database,
  Terminal,
} from 'lucide-react';

const AI_TOOLS = [
  { id: 'predictive', name: 'Predictive Deploy', icon: TrendingUp },
  { id: 'self-heal', name: 'Self-Healing VPS', icon: Shield },
  { id: 'code-doctor', name: 'Code Doctor', icon: Code },
  { id: 'log-analyzer', name: 'Log Analyzer', icon: FileSearch },
  { id: 'migration', name: 'Migration Assistant', icon: RefreshCw },
  { id: 'bug-fixer', name: 'Auto Bug Fixer', icon: Wrench },
  { id: 'dependencies', name: 'Dependency Guardian', icon: Activity },
  { id: 'watchdog', name: 'Website Watchdog', icon: Eye },
];

export default function AIDevOpsPage() {
  const [selectedTool, setSelectedTool] = useState('predictive');
  const [isProcessing, setIsProcessing] = useState(false);

  // Predictive Deploy data
  const [predictions, setPredictions] = useState([
    {
      severity: 'high',
      prediction: 'Database connection pool may exhaust under load',
      confidence: 94,
      timeframe: '2-3 days',
      recommendation: 'Increase max_connections to 200 or implement connection pooling',
    },
    {
      severity: 'medium',
      prediction: 'Memory usage will exceed 80% during peak hours',
      confidence: 87,
      timeframe: '5-7 days',
      recommendation: 'Scale to 8GB RAM or optimize memory-intensive queries',
    },
    {
      severity: 'low',
      prediction: 'SSL certificate expiring soon',
      confidence: 100,
      timeframe: '14 days',
      recommendation: 'Auto-renewal configured, monitoring in place',
    },
  ]);

  // Self-Healing VPS data
  const [healingEvents, setHealingEvents] = useState([
    {
      timestamp: '2024-01-15 14:32:15',
      issue: 'High CPU usage detected (95%)',
      action: 'Restarted stuck cron job',
      status: 'resolved',
      duration: '15s',
    },
    {
      timestamp: '2024-01-15 12:18:42',
      issue: 'Disk space critical (92%)',
      action: 'Cleaned old log files, freed 2.3GB',
      status: 'resolved',
      duration: '8s',
    },
    {
      timestamp: '2024-01-15 09:45:20',
      issue: 'Nginx process crashed',
      action: 'Automatically restarted Nginx service',
      status: 'resolved',
      duration: '3s',
    },
  ]);

  // Bug fixes
  const [bugFixes, setBugFixes] = useState([
    {
      file: 'src/api/users.ts',
      issue: 'SQL Injection vulnerability in WHERE clause',
      fix: 'Implemented parameterized queries',
      confidence: 98,
      status: 'fixed',
    },
    {
      file: 'src/components/UserForm.tsx',
      issue: 'XSS vulnerability in user input',
      fix: 'Added input sanitization with DOMPurify',
      confidence: 95,
      status: 'fixed',
    },
    {
      file: 'src/utils/auth.ts',
      issue: 'Weak password hashing (MD5)',
      fix: 'Migrated to bcrypt with salt rounds=12',
      confidence: 100,
      status: 'fixed',
    },
  ]);

  // Dependency issues
  const [dependencies, setDependencies] = useState([
    {
      package: 'lodash',
      current: '4.17.15',
      latest: '4.17.21',
      severity: 'critical',
      vulnerabilities: 2,
    },
    {
      package: 'axios',
      current: '0.21.1',
      latest: '1.6.2',
      severity: 'high',
      vulnerabilities: 1,
    },
    {
      package: 'react',
      current: '18.2.0',
      latest: '18.3.1',
      severity: 'low',
      vulnerabilities: 0,
    },
  ]);

  // Log analysis
  const [logAnalysis, setLogAnalysis] = useState({
    totalLogs: 145230,
    errors: 234,
    warnings: 1456,
    patterns: [
      { pattern: 'Failed login attempts from IP 192.168.1.x', count: 45, severity: 'high' },
      { pattern: 'Slow query detected (>1s)', count: 23, severity: 'medium' },
      { pattern: 'API rate limit exceeded', count: 12, severity: 'low' },
    ],
    anomalies: [
      'Unusual traffic spike at 2:00 AM (300% increase)',
      'Database connection timeout increased by 45%',
    ],
  });

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const renderToolContent = () => {
    switch (selectedTool) {
      case 'predictive':
        return (
          <div className="space-y-6">
            <div className="flex gap-2">
              <Input placeholder="Project or server to analyze..." className="flex-1" />
              <Button
                onClick={() => setIsProcessing(true)}
                className="bg-gradient-to-r from-purple-600 to-blue-600"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Analyze
              </Button>
            </div>

            <Card className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20">
              <CardContent className="p-6">
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Predictions</p>
                    <p className="text-3xl font-bold text-purple-600">{predictions.length}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Avg Confidence</p>
                    <p className="text-3xl font-bold text-blue-600">
                      {Math.round(
                        predictions.reduce((sum, p) => sum + p.confidence, 0) /
                          predictions.length
                      )}
                      %
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Risk Level</p>
                    <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-0">
                      Medium
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-3">
              {predictions.map((prediction, i) => (
                <Card key={i}>
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline" className={getSeverityColor(prediction.severity)}>
                            {prediction.severity.toUpperCase()}
                          </Badge>
                          <Badge variant="outline">
                            {prediction.confidence}% confidence
                          </Badge>
                          <Badge variant="outline">
                            <Clock className="w-3 h-3 mr-1" />
                            {prediction.timeframe}
                          </Badge>
                        </div>
                        <h4 className="font-bold mb-2">{prediction.prediction}</h4>
                        <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg border-l-4 border-blue-500">
                          <p className="text-sm font-semibold text-blue-900 dark:text-blue-100">
                            Recommendation:
                          </p>
                          <p className="text-sm text-blue-800 dark:text-blue-200">
                            {prediction.recommendation}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        Apply Fix
                      </Button>
                      <Button size="sm" variant="outline">
                        More Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case 'self-heal':
        return (
          <div className="space-y-6">
            <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20">
              <CardContent className="p-6">
                <div className="grid grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Status</p>
                    <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0">
                      <CheckCircle2 className="w-3 h-3 mr-1" />
                      Active
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Issues Resolved</p>
                    <p className="text-3xl font-bold text-green-600">{healingEvents.length}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Uptime</p>
                    <p className="text-3xl font-bold text-green-600">99.9%</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Avg Response</p>
                    <p className="text-3xl font-bold text-green-600">8.7s</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Self-Healing Events</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {healingEvents.map((event, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <CheckCircle2 className="w-4 h-4 text-green-600" />
                          <span className="font-medium">{event.issue}</span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 ml-6">
                          {event.action}
                        </p>
                        <p className="text-xs text-gray-500 ml-6 mt-1">{event.timestamp}</p>
                      </div>
                      <div className="text-right">
                        <Badge variant="outline" className="bg-green-50 text-green-700">
                          {event.status}
                        </Badge>
                        <p className="text-xs text-gray-500 mt-1">{event.duration}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'code-doctor':
        return (
          <div className="space-y-6">
            <div className="flex gap-2">
              <Input placeholder="File path or paste code..." className="flex-1" />
              <Button className="bg-gradient-to-r from-blue-600 to-indigo-600">
                <Code className="w-4 h-4 mr-2" />
                Analyze
              </Button>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>AI-Powered Code Fixes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {bugFixes.map((fix, i) => (
                    <div key={i} className="p-4 border rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="font-mono text-sm text-gray-600 dark:text-gray-400 mb-1">
                            {fix.file}
                          </p>
                          <h4 className="font-bold text-red-600">{fix.issue}</h4>
                        </div>
                        <Badge variant="outline" className="bg-green-50 text-green-700">
                          {fix.confidence}% confident
                        </Badge>
                      </div>
                      <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg border-l-4 border-green-500 mt-3">
                        <p className="text-sm font-semibold text-green-900 dark:text-green-100">
                          Applied Fix:
                        </p>
                        <p className="text-sm text-green-800 dark:text-green-200">{fix.fix}</p>
                      </div>
                      <div className="flex gap-2 mt-3">
                        <Button size="sm" variant="outline">
                          <Eye className="w-3 h-3 mr-1" />
                          View Diff
                        </Button>
                        <Button size="sm" variant="outline">
                          Revert
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'log-analyzer':
        return (
          <div className="space-y-6">
            <div className="flex gap-2">
              <Input placeholder="Log file path or paste logs..." className="flex-1" />
              <Button className="bg-gradient-to-r from-orange-600 to-red-600">
                <FileSearch className="w-4 h-4 mr-2" />
                Analyze
              </Button>
            </div>

            <Card className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20">
              <CardContent className="p-6">
                <div className="grid grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Total Logs</p>
                    <p className="text-3xl font-bold text-orange-600">
                      {logAnalysis.totalLogs.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Errors</p>
                    <p className="text-3xl font-bold text-red-600">{logAnalysis.errors}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Warnings</p>
                    <p className="text-3xl font-bold text-yellow-600">{logAnalysis.warnings}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Patterns Found</p>
                    <p className="text-3xl font-bold text-purple-600">
                      {logAnalysis.patterns.length}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Detected Patterns</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {logAnalysis.patterns.map((pattern, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-3 border rounded-lg"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <AlertTriangle
                            className={`w-4 h-4 ${
                              pattern.severity === 'high'
                                ? 'text-red-600'
                                : pattern.severity === 'medium'
                                  ? 'text-yellow-600'
                                  : 'text-blue-600'
                            }`}
                          />
                          <span className="font-medium">{pattern.pattern}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge variant="outline">{pattern.count} occurrences</Badge>
                        <Badge variant="outline" className={getSeverityColor(pattern.severity)}>
                          {pattern.severity}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-red-600">Anomalies Detected</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {logAnalysis.anomalies.map((anomaly, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{anomaly}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        );

      case 'dependencies':
        return (
          <div className="space-y-6">
            <div className="flex gap-2">
              <Button className="bg-gradient-to-r from-green-600 to-emerald-600">
                <RefreshCw className="w-4 h-4 mr-2" />
                Scan Dependencies
              </Button>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export Report
              </Button>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Dependency Health</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {dependencies.map((dep, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Database className="w-4 h-4 text-gray-600" />
                          <span className="font-bold">{dep.package}</span>
                          {dep.vulnerabilities > 0 && (
                            <Badge variant="outline" className="bg-red-50 text-red-700">
                              {dep.vulnerabilities} vulnerabilities
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Current: {dep.current} → Latest: {dep.latest}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className={getSeverityColor(dep.severity)}>
                          {dep.severity}
                        </Badge>
                        <Button size="sm" variant="outline">
                          Update
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'migration':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Migration Assistant</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Current Framework</label>
                  <select className="w-full p-2 border rounded-lg">
                    <option>PHP 7.4</option>
                    <option>Node.js 14</option>
                    <option>Python 3.8</option>
                    <option>React 17</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Target Version</label>
                  <select className="w-full p-2 border rounded-lg">
                    <option>PHP 8.3</option>
                    <option>Node.js 20 LTS</option>
                    <option>Python 3.12</option>
                    <option>React 18</option>
                  </select>
                </div>
                <Button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Generate Migration Plan
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-blue-50 dark:bg-blue-900/20">
              <CardContent className="p-6">
                <h4 className="font-bold mb-3">AI-Generated Migration Checklist:</h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" />
                    <span className="text-sm">Update composer.json dependencies</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Clock className="w-4 h-4 text-yellow-600 mt-0.5" />
                    <span className="text-sm">Replace deprecated functions (12 found)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Clock className="w-4 h-4 text-yellow-600 mt-0.5" />
                    <span className="text-sm">Update type hints and return types</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Clock className="w-4 h-4 text-yellow-600 mt-0.5" />
                    <span className="text-sm">Test all critical paths</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        );

      case 'bug-fixer':
        return (
          <div className="space-y-6">
            <Card className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20">
              <CardContent className="p-6">
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Bugs Fixed</p>
                    <p className="text-3xl font-bold text-purple-600">47</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Auto-Deployed</p>
                    <p className="text-3xl font-bold text-pink-600">38</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Success Rate</p>
                    <p className="text-3xl font-bold text-green-600">94%</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Automatic Bug Detection & Fixing</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  AI continuously monitors your code, detects bugs, applies fixes, runs tests, and
                  deploys automatically.
                </p>
                <div className="flex gap-2">
                  <Button className="bg-gradient-to-r from-purple-600 to-pink-600">
                    <Play className="w-4 h-4 mr-2" />
                    Enable Auto-Fixing
                  </Button>
                  <Button variant="outline">
                    <Terminal className="w-4 h-4 mr-2" />
                    View Fix History
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'watchdog':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Website Monitoring</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Website URL</label>
                  <Input placeholder="https://example.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Check Interval</label>
                  <select className="w-full p-2 border rounded-lg">
                    <option>Every 1 minute</option>
                    <option>Every 5 minutes</option>
                    <option>Every 15 minutes</option>
                    <option>Every 1 hour</option>
                  </select>
                </div>
                <Button className="w-full bg-gradient-to-r from-blue-600 to-cyan-600">
                  <Eye className="w-4 h-4 mr-2" />
                  Start Monitoring
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-green-50 dark:bg-green-900/20">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <CheckCircle2 className="w-6 h-6 text-green-600" />
                  <div>
                    <h4 className="font-bold">All Systems Operational</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Monitoring 12 websites • 100% uptime
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 mt-4">
                  <div>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Avg Response</p>
                    <p className="text-2xl font-bold text-green-600">145ms</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Uptime</p>
                    <p className="text-2xl font-bold text-green-600">99.9%</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Checks/day</p>
                    <p className="text-2xl font-bold text-green-600">17,280</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return <p>Select a tool to get started</p>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 via-pink-500 to-orange-600 bg-clip-text text-transparent">
            AI-Powered DevOps Suite
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Intelligent automation for deployment, monitoring, and code quality
          </p>
        </div>
        <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0">
          <Bot className="w-3 h-3 mr-1" />
          {AI_TOOLS.length} AI Tools
        </Badge>
      </div>

      {/* Tool Selection */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {AI_TOOLS.map((tool) => (
          <Card
            key={tool.id}
            onClick={() => setSelectedTool(tool.id)}
            className={`cursor-pointer transition-all ${
              selectedTool === tool.id
                ? 'ring-2 ring-purple-500 bg-purple-50 dark:bg-purple-900/20'
                : 'hover:shadow-lg'
            }`}
          >
            <CardContent className="p-4 text-center">
              <tool.icon className="w-8 h-8 mx-auto mb-2 text-purple-600" />
              <p className="text-xs font-medium">{tool.name}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tool Content */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {AI_TOOLS.find((t) => t.id === selectedTool)?.icon && (
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                {(() => {
                  const Icon = AI_TOOLS.find((t) => t.id === selectedTool)!.icon;
                  return <Icon className="w-5 h-5 text-white" />;
                })()}
              </div>
            )}
            {AI_TOOLS.find((t) => t.id === selectedTool)?.name}
          </CardTitle>
        </CardHeader>
        <CardContent>{renderToolContent()}</CardContent>
      </Card>
    </div>
  );
}
