'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Brain,
  GitBranch,
  Sparkles,
  Code,
  RefreshCw,
  Clock,
  Layers,
  Zap,
  CheckCircle2,
  TrendingUp,
  Database,
  FileCode,
  Play,
  Download,
  Copy,
  Settings,
  Calendar,
} from 'lucide-react';

const AI_ADVANCED_TOOLS = [
  { id: 'dna', name: 'Project DNA', icon: GitBranch },
  { id: 'knowledge', name: 'Knowledge Brain', icon: Brain },
  { id: 'generator', name: 'Project Generator', icon: Sparkles },
  { id: 'mirror', name: 'Mirror Deploy', icon: Layers },
  { id: 'refactor', name: 'Code Refactor', icon: Code },
  { id: 'cron', name: 'Cron Manager', icon: Clock },
];

export default function AIAdvancedPage() {
  const [selectedTool, setSelectedTool] = useState('dna');
  const [isProcessing, setIsProcessing] = useState(false);
  const [repoUrl, setRepoUrl] = useState('');

  // Project DNA data
  const [dnaAnalysis, setDnaAnalysis] = useState({
    analyzed: false,
    architecture: 'Monolithic',
    framework: 'Next.js 14',
    language: 'TypeScript',
    patterns: ['MVC', 'Component-based', 'Server Components'],
    dependencies: 47,
    complexity: 'Medium',
    techStack: [
      { name: 'React', version: '18.3.1', type: 'Frontend' },
      { name: 'Next.js', version: '14.2.18', type: 'Framework' },
      { name: 'Prisma', version: '5.10.2', type: 'ORM' },
      { name: 'tRPC', version: '11.0.0', type: 'API' },
      { name: 'Tailwind', version: '3.4.1', type: 'Styling' },
    ],
    fileStructure: {
      totalFiles: 247,
      totalLines: 18945,
      breakdown: [
        { type: 'TypeScript/TSX', files: 143, lines: 14532 },
        { type: 'CSS/SCSS', files: 12, lines: 1234 },
        { type: 'Config', files: 15, lines: 456 },
        { type: 'Other', files: 77, lines: 2723 },
      ],
    },
    recommendations: [
      'Consider implementing code splitting for better performance',
      'Database queries could benefit from better indexing',
      'Some components exceed 300 lines - consider breaking them down',
      'Add unit tests - current coverage is 45%',
    ],
  });

  // Knowledge Brain data
  const [knowledgePatterns, setKnowledgePatterns] = useState([
    {
      pattern: 'Naming Convention',
      confidence: 98,
      example: 'camelCase for variables, PascalCase for components',
      frequency: 245,
    },
    {
      pattern: 'File Organization',
      confidence: 94,
      example: 'Group by feature, not by type',
      frequency: 89,
    },
    {
      pattern: 'Error Handling',
      confidence: 91,
      example: 'Try-catch with specific error types',
      frequency: 156,
    },
    {
      pattern: 'API Structure',
      confidence: 88,
      example: 'RESTful endpoints with consistent response format',
      frequency: 67,
    },
  ]);

  // Auto Project Generator
  const [projectPrompt, setProjectPrompt] = useState('');
  const [generatedProject, setGeneratedProject] = useState<any>(null);

  // Mirror Deploy
  const [deployments, setDeployments] = useState([
    {
      id: '1',
      server: 'Server A (US-East)',
      status: 'completed',
      score: 95,
      responseTime: '145ms',
      uptime: '99.9%',
      selected: true,
    },
    {
      id: '2',
      server: 'Server B (EU-West)',
      status: 'completed',
      score: 87,
      responseTime: '234ms',
      uptime: '99.7%',
      selected: false,
    },
  ]);

  // Cron Manager
  const [cronJobs, setCronJobs] = useState([
    {
      id: '1',
      name: 'Database Backup',
      schedule: '0 2 * * *',
      nextRun: '2024-01-16 02:00:00',
      lastRun: '2024-01-15 02:00:00',
      status: 'active',
      aiOptimized: true,
      suggestion: 'Best time: 2:30 AM (lowest traffic)',
    },
    {
      id: '2',
      name: 'Cache Cleanup',
      schedule: '*/15 * * * *',
      nextRun: '2024-01-15 15:15:00',
      lastRun: '2024-01-15 15:00:00',
      status: 'active',
      aiOptimized: true,
      suggestion: 'Frequency optimal based on usage patterns',
    },
    {
      id: '3',
      name: 'Email Queue',
      schedule: '*/5 * * * *',
      nextRun: '2024-01-15 15:05:00',
      lastRun: '2024-01-15 15:00:00',
      status: 'active',
      aiOptimized: false,
      suggestion: 'Could run every 10 min to reduce load',
    },
  ]);

  const analyzeProject = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setDnaAnalysis({ ...dnaAnalysis, analyzed: true });
      setIsProcessing(false);
    }, 2000);
  };

  const generateProject = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setGeneratedProject({
        name: 'AI-Generated Project',
        structure: [
          'src/',
          '  components/',
          '  pages/',
          '  utils/',
          '  api/',
          'public/',
          'tests/',
          'package.json',
          'tsconfig.json',
        ],
        files: 42,
        estimatedTime: '2 minutes',
      });
      setIsProcessing(false);
    }, 3000);
  };

  const renderToolContent = () => {
    switch (selectedTool) {
      case 'dna':
        return (
          <div className="space-y-6">
            <div className="flex gap-2">
              <Input
                placeholder="GitHub repo URL or local path..."
                value={repoUrl}
                onChange={(e) => setRepoUrl(e.target.value)}
                className="flex-1"
              />
              <Button
                onClick={analyzeProject}
                disabled={isProcessing}
                className="bg-gradient-to-r from-purple-600 to-pink-600"
              >
                {isProcessing ? 'Analyzing...' : (
                  <>
                    <GitBranch className="w-4 h-4 mr-2" />
                    Analyze
                  </>
                )}
              </Button>
            </div>

            {dnaAnalysis.analyzed && (
              <>
                <Card className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold mb-4">Project Overview</h3>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Architecture</p>
                        <p className="text-xl font-bold text-purple-600">{dnaAnalysis.architecture}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Framework</p>
                        <p className="text-xl font-bold text-pink-600">{dnaAnalysis.framework}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Complexity</p>
                        <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
                          {dnaAnalysis.complexity}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="grid md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Tech Stack</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {dnaAnalysis.techStack.map((tech, i) => (
                          <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
                            <div>
                              <p className="font-medium">{tech.name}</p>
                              <p className="text-xs text-gray-500">{tech.type}</p>
                            </div>
                            <Badge variant="outline">{tech.version}</Badge>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>File Structure</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="mb-4">
                        <div className="flex justify-between mb-2">
                          <span className="text-sm font-medium">Total Files</span>
                          <span className="text-xl font-bold">{dnaAnalysis.fileStructure.totalFiles}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">Total Lines</span>
                          <span className="text-xl font-bold">{dnaAnalysis.fileStructure.totalLines.toLocaleString()}</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        {dnaAnalysis.fileStructure.breakdown.map((item, i) => (
                          <div key={i} className="flex items-center justify-between text-sm">
                            <span>{item.type}</span>
                            <div className="flex items-center gap-2">
                              <span className="text-gray-500">{item.files} files</span>
                              <Badge variant="outline">{item.lines.toLocaleString()} lines</Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>AI Recommendations</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {dnaAnalysis.recommendations.map((rec, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <Sparkles className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </>
            )}
          </div>
        );

      case 'knowledge':
        return (
          <div className="space-y-6">
            <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Brain className="w-8 h-8 text-blue-600" />
                  <div>
                    <h3 className="text-lg font-bold">Learning Your Style</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      AI has analyzed 2,847 commits across 12 projects
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Patterns Learned</p>
                    <p className="text-3xl font-bold text-blue-600">{knowledgePatterns.length}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Avg Confidence</p>
                    <p className="text-3xl font-bold text-indigo-600">
                      {Math.round(knowledgePatterns.reduce((sum, p) => sum + p.confidence, 0) / knowledgePatterns.length)}%
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Auto-Applied</p>
                    <p className="text-3xl font-bold text-purple-600">1,234</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Learned Patterns</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {knowledgePatterns.map((pattern, i) => (
                    <div key={i} className="p-4 border rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h4 className="font-bold mb-1">{pattern.pattern}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                            {pattern.example}
                          </p>
                        </div>
                        <Badge variant="outline" className="bg-green-50 text-green-700">
                          {pattern.confidence}% confident
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <span>Applied {pattern.frequency} times</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'generator':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>AI Project Generator</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Describe Your Project</label>
                  <textarea
                    className="w-full h-32 p-3 border rounded-lg text-sm"
                    placeholder="Example: Build a full-stack e-commerce platform with Next.js, Stripe payments, user authentication, product catalog, shopping cart, and admin dashboard..."
                    value={projectPrompt}
                    onChange={(e) => setProjectPrompt(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Framework</label>
                    <select className="w-full p-2 border rounded-lg">
                      <option>Next.js 14</option>
                      <option>React + Vite</option>
                      <option>Vue 3</option>
                      <option>Svelte</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Database</label>
                    <select className="w-full p-2 border rounded-lg">
                      <option>PostgreSQL</option>
                      <option>MySQL</option>
                      <option>MongoDB</option>
                      <option>SQLite</option>
                    </select>
                  </div>
                </div>

                <Button
                  onClick={generateProject}
                  disabled={isProcessing}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600"
                >
                  {isProcessing ? 'Generating Project...' : (
                    <>
                      <Sparkles className="w-4 h-4 mr-2" />
                      Generate Complete Project
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {generatedProject && (
              <Card className="bg-green-50 dark:bg-green-900/20">
                <CardHeader>
                  <CardTitle className="text-green-900 dark:text-green-100">
                    ✓ Project Generated Successfully
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      Generated {generatedProject.files} files in {generatedProject.estimatedTime}
                    </p>
                    <div className="bg-gray-900 rounded-lg p-4">
                      <pre className="text-xs text-green-400 font-mono">
                        {generatedProject.structure.join('\n')}
                      </pre>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button className="flex-1">
                      <Download className="w-4 h-4 mr-2" />
                      Download Project
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <GitBranch className="w-4 h-4 mr-2" />
                      Push to GitHub
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        );

      case 'mirror':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Smart Mirror Deployments</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Deploy to multiple servers simultaneously and AI automatically selects the best performing one.
                </p>
                <div>
                  <label className="block text-sm font-medium mb-2">Select Servers</label>
                  <div className="space-y-2">
                    {['US-East-1', 'US-West-1', 'EU-West-1', 'Asia-Pacific'].map((region, i) => (
                      <label key={i} className="flex items-center gap-2 p-3 border rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50">
                        <input type="checkbox" defaultChecked={i < 2} className="w-4 h-4" />
                        <span className="font-medium">{region}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <Button className="w-full bg-gradient-to-r from-blue-600 to-cyan-600">
                  <Layers className="w-4 h-4 mr-2" />
                  Start Mirror Deployment
                </Button>
              </CardContent>
            </Card>

            <div className="space-y-3">
              {deployments.map((deploy) => (
                <Card key={deploy.id} className={deploy.selected ? 'ring-2 ring-green-500' : ''}>
                  <CardContent className="p-5">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                          deploy.selected
                            ? 'bg-gradient-to-br from-green-500 to-emerald-500'
                            : 'bg-gradient-to-br from-gray-500 to-slate-500'
                        }`}>
                          <Layers className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h4 className="font-bold">{deploy.server}</h4>
                          {deploy.selected && (
                            <Badge className="bg-green-600 text-white border-0">
                              <CheckCircle2 className="w-3 h-3 mr-1" />
                              Selected
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-3xl font-bold text-green-600">{deploy.score}</p>
                        <p className="text-xs text-gray-500">Performance Score</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600 dark:text-gray-400">Response Time:</span>
                        <span className="ml-2 font-bold">{deploy.responseTime}</span>
                      </div>
                      <div>
                        <span className="text-gray-600 dark:text-gray-400">Uptime:</span>
                        <span className="ml-2 font-bold">{deploy.uptime}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case 'refactor':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>AI Multi-file Code Refactor</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Select Files or Directory</label>
                  <Input placeholder="/src or select specific files..." />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Refactoring Goals</label>
                  <div className="space-y-2">
                    {['Extract duplicate code', 'Improve naming', 'Optimize performance', 'Update to modern patterns', 'Add type safety'].map((goal, i) => (
                      <label key={i} className="flex items-center gap-2">
                        <input type="checkbox" defaultChecked className="w-4 h-4" />
                        <span className="text-sm">{goal}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <Button className="w-full bg-gradient-to-r from-orange-600 to-red-600">
                  <Code className="w-4 h-4 mr-2" />
                  Start AI Refactoring
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-blue-50 dark:bg-blue-900/20">
              <CardContent className="p-6">
                <h4 className="font-bold mb-3">Refactoring Preview:</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" />
                    <span>Extracted 12 duplicate functions into shared utils</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" />
                    <span>Renamed 47 variables to follow consistent naming</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" />
                    <span>Optimized 8 heavy loops (40% performance improvement)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" />
                    <span>Added TypeScript types to 156 functions</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        );

      case 'cron':
        return (
          <div className="space-y-6">
            <Card className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Clock className="w-8 h-8 text-indigo-600" />
                  <div>
                    <h3 className="text-lg font-bold">AI Cron Manager</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Intelligent scheduling based on traffic patterns
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Active Jobs</p>
                    <p className="text-3xl font-bold text-indigo-600">{cronJobs.length}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">AI Optimized</p>
                    <p className="text-3xl font-bold text-purple-600">
                      {cronJobs.filter(j => j.aiOptimized).length}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Success Rate</p>
                    <p className="text-3xl font-bold text-green-600">99.8%</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Scheduled Jobs</CardTitle>
                  <Button size="sm" variant="outline">
                    <Calendar className="w-3 h-3 mr-1" />
                    Add Job
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {cronJobs.map((job) => (
                    <div key={job.id} className="p-4 border rounded-lg">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-bold">{job.name}</h4>
                            {job.aiOptimized && (
                              <Badge className="bg-gradient-to-r from-purple-500 to-blue-500 text-white border-0">
                                <Sparkles className="w-3 h-3 mr-1" />
                                AI Optimized
                              </Badge>
                            )}
                          </div>
                          <p className="text-xs text-gray-600 dark:text-gray-400 font-mono mb-2">
                            {job.schedule}
                          </p>
                        </div>
                        <Badge variant="outline" className="bg-green-50 text-green-700">
                          {job.status}
                        </Badge>
                      </div>

                      {job.aiOptimized && (
                        <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg mb-3">
                          <p className="text-xs font-semibold text-blue-900 dark:text-blue-100 mb-1">
                            AI Suggestion:
                          </p>
                          <p className="text-sm text-blue-800 dark:text-blue-200">{job.suggestion}</p>
                        </div>
                      )}

                      <div className="grid grid-cols-2 gap-4 text-xs">
                        <div>
                          <span className="text-gray-600 dark:text-gray-400">Next Run:</span>
                          <span className="ml-2 font-medium">{job.nextRun}</span>
                        </div>
                        <div>
                          <span className="text-gray-600 dark:text-gray-400">Last Run:</span>
                          <span className="ml-2 font-medium">{job.lastRun}</span>
                        </div>
                      </div>
                    </div>
                  ))}
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
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 via-blue-500 to-indigo-600 bg-clip-text text-transparent">
            AI Advanced Features
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Next-generation AI tools for project management and automation
          </p>
        </div>
        <Badge className="bg-gradient-to-r from-purple-500 to-blue-500 text-white border-0">
          <Brain className="w-3 h-3 mr-1" />
          {AI_ADVANCED_TOOLS.length} AI Tools
        </Badge>
      </div>

      {/* Tool Selection */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {AI_ADVANCED_TOOLS.map((tool) => (
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
            {AI_ADVANCED_TOOLS.find((t) => t.id === selectedTool)?.icon && (
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                {(() => {
                  const Icon = AI_ADVANCED_TOOLS.find((t) => t.id === selectedTool)!.icon;
                  return <Icon className="w-5 h-5 text-white" />;
                })()}
              </div>
            )}
            {AI_ADVANCED_TOOLS.find((t) => t.id === selectedTool)?.name}
          </CardTitle>
        </CardHeader>
        <CardContent>{renderToolContent()}</CardContent>
      </Card>
    </div>
  );
}
