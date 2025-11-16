'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Play,
  Pause,
  RotateCcw,
  Plus,
  GitBranch,
  CheckCircle2,
  XCircle,
  Clock,
  AlertCircle,
  Code,
  Rocket,
  TestTube,
  Package,
  FileCode,
  Terminal,
  Zap,
  TrendingUp,
  Calendar,
  Filter,
  Download,
} from 'lucide-react';

interface WorkflowRun {
  id: string;
  status: 'success' | 'failed' | 'running' | 'pending';
  branch: string;
  commit: string;
  author: string;
  duration: string;
  timestamp: string;
}

interface Workflow {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'disabled';
  trigger: string;
  lastRun: WorkflowRun;
  runs: WorkflowRun[];
  steps: { name: string; status: 'success' | 'failed' | 'running' | 'pending' }[];
}

const mockWorkflows: Workflow[] = [
  {
    id: '1',
    name: 'CI/CD Pipeline',
    description: 'Build, test, and deploy to production',
    status: 'active',
    trigger: 'push to main',
    lastRun: {
      id: 'r1',
      status: 'success',
      branch: 'main',
      commit: 'feat: add new feature',
      author: 'John Doe',
      duration: '3m 24s',
      timestamp: '2 hours ago',
    },
    runs: [
      {
        id: 'r1',
        status: 'success',
        branch: 'main',
        commit: 'feat: add new feature',
        author: 'John Doe',
        duration: '3m 24s',
        timestamp: '2 hours ago',
      },
      {
        id: 'r2',
        status: 'failed',
        branch: 'develop',
        commit: 'fix: bug in authentication',
        author: 'Jane Smith',
        duration: '2m 15s',
        timestamp: '5 hours ago',
      },
      {
        id: 'r3',
        status: 'success',
        branch: 'main',
        commit: 'docs: update README',
        author: 'John Doe',
        duration: '2m 45s',
        timestamp: '1 day ago',
      },
    ],
    steps: [
      { name: 'Checkout Code', status: 'success' },
      { name: 'Install Dependencies', status: 'success' },
      { name: 'Run Tests', status: 'success' },
      { name: 'Build Application', status: 'success' },
      { name: 'Deploy to Production', status: 'success' },
    ],
  },
  {
    id: '2',
    name: 'Test Suite',
    description: 'Run unit and integration tests',
    status: 'active',
    trigger: 'pull request',
    lastRun: {
      id: 'r4',
      status: 'running',
      branch: 'feature/new-ui',
      commit: 'wip: redesign dashboard',
      author: 'Jane Smith',
      duration: '1m 12s',
      timestamp: 'Just now',
    },
    runs: [
      {
        id: 'r4',
        status: 'running',
        branch: 'feature/new-ui',
        commit: 'wip: redesign dashboard',
        author: 'Jane Smith',
        duration: '1m 12s',
        timestamp: 'Just now',
      },
    ],
    steps: [
      { name: 'Checkout Code', status: 'success' },
      { name: 'Install Dependencies', status: 'success' },
      { name: 'Run Unit Tests', status: 'running' },
      { name: 'Run Integration Tests', status: 'pending' },
      { name: 'Generate Report', status: 'pending' },
    ],
  },
  {
    id: '3',
    name: 'Code Quality Check',
    description: 'Lint, format, and security scan',
    status: 'active',
    trigger: 'schedule (daily)',
    lastRun: {
      id: 'r5',
      status: 'success',
      branch: 'main',
      commit: 'refactor: improve performance',
      author: 'John Doe',
      duration: '1m 45s',
      timestamp: '6 hours ago',
    },
    runs: [],
    steps: [
      { name: 'ESLint Check', status: 'success' },
      { name: 'Prettier Format', status: 'success' },
      { name: 'Security Audit', status: 'success' },
      { name: 'Type Check', status: 'success' },
    ],
  },
];

export default function WorkflowsPage() {
  const [workflows] = useState<Workflow[]>(mockWorkflows);
  const [selectedWorkflow, setSelectedWorkflow] = useState<Workflow>(workflows[0]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      case 'failed':
        return <XCircle className="w-5 h-5 text-red-500" />;
      case 'running':
        return <Clock className="w-5 h-5 text-blue-500 animate-spin" />;
      case 'pending':
        return <AlertCircle className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800';
      case 'failed':
        return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800';
      case 'running':
        return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800';
      case 'pending':
        return 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400 border-gray-200 dark:border-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
            Workflows
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Automate your CI/CD pipelines and development workflows
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg shadow-purple-500/30">
            <Plus className="w-4 h-4 mr-2" />
            New Workflow
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-gray-200 dark:border-gray-700 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Successful Runs</p>
                <p className="text-3xl font-bold text-green-600 dark:text-green-400">127</p>
              </div>
              <div className="w-14 h-14 rounded-2xl bg-green-500/20 flex items-center justify-center">
                <CheckCircle2 className="w-7 h-7 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-4 text-sm">
              <TrendingUp className="w-4 h-4 text-green-600" />
              <span className="text-green-600 dark:text-green-400 font-semibold">+12%</span>
              <span className="text-gray-600 dark:text-gray-400">from last week</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-200 dark:border-gray-700 bg-gradient-to-br from-red-50 to-rose-50 dark:from-red-900/20 dark:to-rose-900/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Failed Runs</p>
                <p className="text-3xl font-bold text-red-600 dark:text-red-400">8</p>
              </div>
              <div className="w-14 h-14 rounded-2xl bg-red-500/20 flex items-center justify-center">
                <XCircle className="w-7 h-7 text-red-600 dark:text-red-400" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-4 text-sm">
              <TrendingUp className="w-4 h-4 text-red-600 rotate-180" />
              <span className="text-red-600 dark:text-red-400 font-semibold">-3%</span>
              <span className="text-gray-600 dark:text-gray-400">from last week</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-200 dark:border-gray-700 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Avg. Duration</p>
                <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">2m 45s</p>
              </div>
              <div className="w-14 h-14 rounded-2xl bg-blue-500/20 flex items-center justify-center">
                <Clock className="w-7 h-7 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-4 text-sm">
              <Zap className="w-4 h-4 text-blue-600" />
              <span className="text-blue-600 dark:text-blue-400 font-semibold">Fast</span>
              <span className="text-gray-600 dark:text-gray-400">performance</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-200 dark:border-gray-700 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Active Workflows</p>
                <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">12</p>
              </div>
              <div className="w-14 h-14 rounded-2xl bg-purple-500/20 flex items-center justify-center">
                <Rocket className="w-7 h-7 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-4 text-sm">
              <span className="text-purple-600 dark:text-purple-400 font-semibold">3 running</span>
              <span className="text-gray-600 dark:text-gray-400">right now</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Workflow List */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-3">
          <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-3">All Workflows</h3>
          {workflows.map((workflow) => (
            <Card
              key={workflow.id}
              className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                selectedWorkflow.id === workflow.id
                  ? 'ring-2 ring-purple-500 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20'
                  : 'hover:scale-[1.02]'
              }`}
              onClick={() => setSelectedWorkflow(workflow)}
            >
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900 dark:text-white mb-1">{workflow.name}</h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400">{workflow.description}</p>
                  </div>
                  {getStatusIcon(workflow.lastRun.status)}
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                    <GitBranch className="w-3 h-3" />
                    <span>{workflow.trigger}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                    <Clock className="w-3 h-3" />
                    <span>Last run: {workflow.lastRun.timestamp}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Workflow Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Current Workflow Header */}
          <Card className="border-gray-200 dark:border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {selectedWorkflow.name}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">{selectedWorkflow.description}</p>
                </div>
                <Badge
                  className={`px-3 py-1 text-xs font-semibold border ${getStatusColor(selectedWorkflow.lastRun.status)}`}
                >
                  {selectedWorkflow.lastRun.status}
                </Badge>
              </div>
              <div className="flex items-center gap-3">
                <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
                  <Play className="w-4 h-4 mr-2" />
                  Run Workflow
                </Button>
                <Button variant="outline">
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Re-run
                </Button>
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Download Logs
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Workflow Steps */}
          <Card className="border-gray-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle>Pipeline Steps</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {selectedWorkflow.steps.map((step, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-4 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                  >
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800">
                      <span className="text-sm font-bold text-gray-600 dark:text-gray-400">{index + 1}</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm text-gray-900 dark:text-white">{step.name}</h4>
                    </div>
                    {getStatusIcon(step.status)}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Runs */}
          <Card className="border-gray-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle>Recent Runs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {selectedWorkflow.runs.map((run) => (
                  <div
                    key={run.id}
                    className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      {getStatusIcon(run.status)}
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <GitBranch className="w-3 h-3 text-gray-500" />
                          <span className="text-sm font-semibold text-gray-900 dark:text-white">
                            {run.branch}
                          </span>
                        </div>
                        <p className="text-xs text-gray-600 dark:text-gray-400">{run.commit}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">{run.duration}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{run.timestamp}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
