'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  FileText,
  Code,
  BookOpen,
  MessageSquare,
  Sparkles,
  Upload,
  Download,
  Copy,
  RefreshCw,
  Check,
  FileCode,
  FolderTree,
  Lightbulb,
} from 'lucide-react';

const AI_DOC_TOOLS = [
  { id: 'readme', name: 'README Generator', icon: FileText, color: 'from-blue-500 to-cyan-500' },
  { id: 'api', name: 'API Docs', icon: Code, color: 'from-purple-500 to-pink-500' },
  { id: 'comments', name: 'Code Comments', icon: MessageSquare, color: 'from-green-500 to-emerald-500' },
  { id: 'architecture', name: 'Architecture', icon: FolderTree, color: 'from-orange-500 to-red-500' },
];

export default function AIDocsPage() {
  const [selectedTool, setSelectedTool] = useState('readme');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleGenerate = (type: string) => {
    setIsGenerating(true);
    setTimeout(() => {
      let content = '';

      switch (type) {
        case 'readme':
          content = `# DevBrain - Ultimate DevOps Dashboard

## Overview
DevBrain is a comprehensive DevOps and developer productivity platform that combines server management, code tools, and AI-powered features in one unified dashboard.

## Features
- 🖥️ **Multi-VPS Management** - Monitor and manage multiple servers
- 🚀 **Deployment Control** - One-click deployments with rollback
- 🔧 **Developer Tools** - API testing, code runner, converters
- 🤖 **AI Assistant** - GPT-powered development helper
- 📊 **Analytics** - Business intelligence and custom reports

## Installation
\`\`\`bash
npm install
npm run dev
\`\`\`

## Usage
1. Clone the repository
2. Install dependencies
3. Configure environment variables
4. Run development server

## Tech Stack
- Next.js 14
- TypeScript
- Tailwind CSS
- Prisma
- PostgreSQL

## License
MIT License`;
          break;

        case 'api':
          content = `# API Documentation

## Authentication
All API requests require an API key in the Authorization header:
\`\`\`
Authorization: Bearer YOUR_API_KEY
\`\`\`

## Endpoints

### GET /api/servers
Retrieve list of all servers.

**Response:**
\`\`\`json
{
  "servers": [
    {
      "id": "srv_123",
      "name": "Production VPS",
      "status": "online",
      "cpu": 45.2,
      "memory": 67.8
    }
  ]
}
\`\`\`

### POST /api/deployments
Create a new deployment.

**Request Body:**
\`\`\`json
{
  "server_id": "srv_123",
  "branch": "main",
  "commit": "abc123"
}
\`\`\`

**Response:**
\`\`\`json
{
  "deployment_id": "dep_456",
  "status": "pending"
}
\`\`\``;
          break;

        case 'comments':
          content = `/**
 * Deploys application to specified server
 *
 * @param {string} serverId - The ID of the target server
 * @param {string} branch - Git branch to deploy
 * @param {string} commit - Specific commit hash
 * @returns {Promise<Deployment>} Deployment object with status
 * @throws {Error} If server is offline or deployment fails
 *
 * @example
 * const deployment = await deployToServer('srv_123', 'main', 'abc123');
 * console.log(deployment.status); // 'pending'
 */
async function deployToServer(serverId, branch, commit) {
  // Validate server status
  const server = await getServer(serverId);
  if (server.status !== 'online') {
    throw new Error('Server is offline');
  }

  // Create deployment record
  const deployment = await createDeployment({
    serverId,
    branch,
    commit,
    status: 'pending'
  });

  // Execute deployment
  await executeDeployment(deployment.id);

  return deployment;
}`;
          break;

        case 'architecture':
          content = `# Architecture Overview

## System Components

### Frontend Layer
- **Next.js Application**: React-based UI with server-side rendering
- **State Management**: Zustand for client state
- **API Client**: tRPC for type-safe API calls

### Backend Layer
- **API Gateway**: Next.js API routes with tRPC
- **Authentication**: NextAuth.js with JWT
- **Business Logic**: Service layer with dependency injection

### Data Layer
- **Primary Database**: PostgreSQL with Prisma ORM
- **Cache Layer**: Redis for session and data caching
- **File Storage**: S3-compatible object storage

### Infrastructure
- **Container Runtime**: Docker containers
- **Orchestration**: Docker Compose / Kubernetes
- **Monitoring**: Prometheus + Grafana
- **Logging**: Winston + ELK Stack

## Data Flow
1. User interaction → Next.js UI
2. UI → tRPC Client
3. tRPC → API Routes
4. API Routes → Service Layer
5. Service Layer → Database/Cache
6. Response propagated back to UI

## Security
- JWT-based authentication
- Role-based access control (RBAC)
- Encrypted credentials storage
- Rate limiting on API endpoints
- HTTPS/TLS encryption`;
          break;
      }

      setGeneratedContent(content);
      setIsGenerating(false);
    }, 1500);
  };

  const handleCopy = () => {
    if (generatedContent) {
      navigator.clipboard.writeText(generatedContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const renderToolContent = () => {
    switch (selectedTool) {
      case 'readme':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Generate README.md
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-8 text-center">
                  <Upload className="w-12 h-12 mx-auto text-gray-400 mb-3" />
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    Upload your project files or paste repository URL
                  </p>
                  <Input placeholder="https://github.com/username/repo" className="mb-3" />
                  <Button variant="outline">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Files
                  </Button>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Project Name</label>
                  <Input placeholder="My Awesome Project" />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Description</label>
                  <textarea
                    className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800"
                    rows={3}
                    placeholder="Brief description of your project..."
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Tech Stack</label>
                    <Input placeholder="React, Node.js, MongoDB" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">License</label>
                    <select className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800">
                      <option>MIT</option>
                      <option>Apache 2.0</option>
                      <option>GPL v3</option>
                      <option>BSD</option>
                    </select>
                  </div>
                </div>

                <Button
                  onClick={() => handleGenerate('readme')}
                  disabled={isGenerating}
                  className="w-full bg-gradient-to-r from-blue-600 to-cyan-600"
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-2" />
                      Generate README
                    </>
                  )}
                </Button>

                {generatedContent && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">Generated README:</p>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={handleCopy}>
                          {copied ? (
                            <Check className="w-4 h-4 text-green-500" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <pre className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg overflow-x-auto text-sm border border-gray-200 dark:border-gray-700">
                      <code>{generatedContent}</code>
                    </pre>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        );

      case 'api':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="w-5 h-5" />
                  Generate API Documentation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Import API Spec</label>
                  <div className="grid grid-cols-2 gap-3">
                    <Button variant="outline">
                      <FileCode className="w-4 h-4 mr-2" />
                      OpenAPI / Swagger
                    </Button>
                    <Button variant="outline">
                      <FileCode className="w-4 h-4 mr-2" />
                      Postman Collection
                    </Button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Or Paste Code</label>
                  <textarea
                    className="w-full h-32 p-3 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg font-mono text-sm"
                    placeholder="Paste your API routes code here..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Documentation Style</label>
                  <select className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800">
                    <option>REST API</option>
                    <option>GraphQL</option>
                    <option>gRPC</option>
                  </select>
                </div>

                <Button
                  onClick={() => handleGenerate('api')}
                  disabled={isGenerating}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600"
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-2" />
                      Generate API Docs
                    </>
                  )}
                </Button>

                {generatedContent && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">Generated API Documentation:</p>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={handleCopy}>
                          {copied ? (
                            <Check className="w-4 h-4 text-green-500" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <pre className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg overflow-x-auto text-sm border border-gray-200 dark:border-gray-700">
                      <code>{generatedContent}</code>
                    </pre>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        );

      case 'comments':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  Generate Code Comments
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Paste Your Code</label>
                  <textarea
                    className="w-full h-48 p-3 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg font-mono text-sm"
                    placeholder="function myFunction() {&#10;  // Your code here&#10;}"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Language</label>
                    <select className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800">
                      <option>JavaScript</option>
                      <option>TypeScript</option>
                      <option>Python</option>
                      <option>Java</option>
                      <option>Go</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Comment Style</label>
                    <select className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800">
                      <option>JSDoc</option>
                      <option>Docstring</option>
                      <option>Javadoc</option>
                      <option>Inline</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" defaultChecked />
                    <span className="text-sm">Include parameter descriptions</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" defaultChecked />
                    <span className="text-sm">Include return type</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" defaultChecked />
                    <span className="text-sm">Include examples</span>
                  </label>
                </div>

                <Button
                  onClick={() => handleGenerate('comments')}
                  disabled={isGenerating}
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600"
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-2" />
                      Generate Comments
                    </>
                  )}
                </Button>

                {generatedContent && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">Commented Code:</p>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={handleCopy}>
                          {copied ? (
                            <Check className="w-4 h-4 text-green-500" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                    <pre className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg overflow-x-auto text-sm border border-gray-200 dark:border-gray-700">
                      <code>{generatedContent}</code>
                    </pre>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        );

      case 'architecture':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FolderTree className="w-5 h-5" />
                  Project Architecture Documentation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-8 text-center">
                  <FolderTree className="w-12 h-12 mx-auto text-gray-400 mb-3" />
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    Upload project structure or connect repository
                  </p>
                  <Input placeholder="https://github.com/username/repo" className="mb-3" />
                  <Button variant="outline">
                    <Upload className="w-4 h-4 mr-2" />
                    Scan Repository
                  </Button>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Documentation Sections</label>
                  <div className="space-y-2">
                    {[
                      'System Overview',
                      'Component Architecture',
                      'Data Flow',
                      'Security Model',
                      'Deployment Architecture',
                      'Technology Stack',
                    ].map((section) => (
                      <label key={section} className="flex items-center gap-2 p-2 border rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800">
                        <input type="checkbox" className="rounded" defaultChecked />
                        <span className="text-sm">{section}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <Button
                  onClick={() => handleGenerate('architecture')}
                  disabled={isGenerating}
                  className="w-full bg-gradient-to-r from-orange-600 to-red-600"
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-2" />
                      Generate Architecture Docs
                    </>
                  )}
                </Button>

                {generatedContent && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">Architecture Documentation:</p>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={handleCopy}>
                          {copied ? (
                            <Check className="w-4 h-4 text-green-500" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <pre className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg overflow-x-auto text-sm border border-gray-200 dark:border-gray-700">
                      <code>{generatedContent}</code>
                    </pre>
                  </div>
                )}
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
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            AI Documentation Generator
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Auto-generate comprehensive documentation with AI
          </p>
        </div>
        <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0">
          <Sparkles className="w-3 h-3 mr-1" />
          {AI_DOC_TOOLS.length} Tools
        </Badge>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-500" />
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Docs Generated</p>
                <p className="text-2xl font-bold">247</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-yellow-500" />
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">AI Suggestions</p>
                <p className="text-2xl font-bold">1,234</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Code className="w-5 h-5 text-purple-500" />
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Code Analyzed</p>
                <p className="text-2xl font-bold">45K</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-green-500" />
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Time Saved</p>
                <p className="text-2xl font-bold">127h</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tool Selection */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {AI_DOC_TOOLS.map((tool) => {
          const Icon = tool.icon;
          return (
            <Card
              key={tool.id}
              className={`cursor-pointer transition-all hover:scale-105 ${
                selectedTool === tool.id
                  ? 'ring-2 ring-purple-500 shadow-lg'
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
