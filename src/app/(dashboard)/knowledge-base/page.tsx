'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  BookOpen,
  Code,
  FileText,
  Terminal,
  Bookmark,
  Plus,
  Search,
  Tag,
  Clock,
  Star,
  Copy,
  Edit,
  Trash2,
  Eye,
  Filter,
  FolderOpen,
  Check,
} from 'lucide-react';

const KB_TOOLS = [
  { id: 'snippets', name: 'Code Snippets', icon: Code, color: 'from-blue-500 to-cyan-500' },
  { id: 'commands', name: 'Commands', icon: Terminal, color: 'from-purple-500 to-pink-500' },
  { id: 'notes', name: 'Quick Notes', icon: FileText, color: 'from-green-500 to-emerald-500' },
  { id: 'wiki', name: 'Wiki Pages', icon: BookOpen, color: 'from-orange-500 to-red-500' },
  { id: 'resources', name: 'Resources', icon: Bookmark, color: 'from-indigo-500 to-purple-500' },
];

interface Snippet {
  id: string;
  title: string;
  language: string;
  code: string;
  tags: string[];
  created: string;
  starred: boolean;
}

interface Command {
  id: string;
  command: string;
  description: string;
  category: string;
  starred: boolean;
}

export default function KnowledgeBasePage() {
  const [selectedTool, setSelectedTool] = useState('snippets');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const [snippets, setSnippets] = useState<Snippet[]>([
    {
      id: '1',
      title: 'Express.js Basic Server',
      language: 'javascript',
      code: `const express = require('express');\nconst app = express();\n\napp.get('/', (req, res) => {\n  res.send('Hello World!');\n});\n\napp.listen(3000, () => {\n  console.log('Server running on port 3000');\n});`,
      tags: ['nodejs', 'express', 'backend'],
      created: '2 days ago',
      starred: true,
    },
    {
      id: '2',
      title: 'React useState Hook',
      language: 'typescript',
      code: `import { useState } from 'react';\n\nfunction Counter() {\n  const [count, setCount] = useState(0);\n\n  return (\n    <div>\n      <p>Count: {count}</p>\n      <button onClick={() => setCount(count + 1)}>\n        Increment\n      </button>\n    </div>\n  );\n}`,
      tags: ['react', 'hooks', 'typescript'],
      created: '5 days ago',
      starred: false,
    },
  ]);

  const [commands, setCommands] = useState<Command[]>([
    { id: '1', command: 'docker ps -a', description: 'List all Docker containers', category: 'Docker', starred: true },
    { id: '2', command: 'git log --oneline --graph', description: 'Show Git commit history as graph', category: 'Git', starred: true },
    { id: '3', command: 'npm run build', description: 'Build production bundle', category: 'NPM', starred: false },
    { id: '4', command: 'ssh user@host -p 2222', description: 'SSH with custom port', category: 'SSH', starred: false },
  ]);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const renderToolContent = () => {
    switch (selectedTool) {
      case 'snippets':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 flex-1">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Search snippets..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button variant="outline">
                  <Filter className="w-4 h-4" />
                </Button>
              </div>
              <Button className="bg-gradient-to-r from-blue-600 to-cyan-600">
                <Plus className="w-4 h-4 mr-2" />
                New Snippet
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <Code className="w-5 h-5 text-blue-500" />
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Total Snippets</p>
                      <p className="text-2xl font-bold">{snippets.length}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-yellow-500" />
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Starred</p>
                      <p className="text-2xl font-bold">{snippets.filter(s => s.starred).length}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-4">
              {snippets.map((snippet) => (
                <Card key={snippet.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-2 flex-1">
                        {snippet.starred && <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />}
                        <div className="flex-1">
                          <CardTitle className="text-lg">{snippet.title}</CardTitle>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge variant="outline">{snippet.language}</Badge>
                            {snippet.tags.map((tag) => (
                              <Badge key={tag} className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleCopy(snippet.id, snippet.code)}
                        >
                          {copiedId === snippet.id ? (
                            <Check className="w-4 h-4 text-green-500" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <pre className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg overflow-x-auto text-sm">
                      <code>{snippet.code}</code>
                    </pre>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-3 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      Created {snippet.created}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case 'commands':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 flex-1">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Search commands..."
                    className="pl-10"
                  />
                </div>
                <Button variant="outline">
                  <Filter className="w-4 h-4" />
                </Button>
              </div>
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600">
                <Plus className="w-4 h-4 mr-2" />
                Add Command
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              {['All', 'Git', 'Docker', 'SSH', 'NPM'].map((cat) => (
                <Button key={cat} variant="outline" size="sm">
                  {cat}
                </Button>
              ))}
            </div>

            <div className="grid gap-3">
              {commands.map((cmd) => (
                <Card key={cmd.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3 flex-1">
                        {cmd.starred && (
                          <Star className="w-5 h-5 text-yellow-500 fill-yellow-500 flex-shrink-0 mt-1" />
                        )}
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="outline">{cmd.category}</Badge>
                          </div>
                          <code className="block p-3 bg-gray-50 dark:bg-gray-900 rounded-lg text-sm mb-2">
                            {cmd.command}
                          </code>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {cmd.description}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleCopy(cmd.id, cmd.command)}
                        >
                          {copiedId === cmd.id ? (
                            <Check className="w-4 h-4 text-green-500" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case 'notes':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Quick Notes</h2>
              <Button className="bg-gradient-to-r from-green-600 to-emerald-600">
                <Plus className="w-4 h-4 mr-2" />
                New Note
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { title: 'API Endpoints', content: 'Production API: https://api.example.com\nStaging: https://staging-api.example.com', color: 'blue' },
                { title: 'Database Credentials', content: 'Host: db.example.com\nPort: 5432\nDatabase: prod_db', color: 'purple' },
                { title: 'Meeting Notes - Jan 15', content: '- Discussed new feature requirements\n- Set deadline for March 1\n- Assigned tasks to team', color: 'green' },
              ].map((note, idx) => (
                <Card key={idx} className="hover:shadow-lg transition-shadow">
                  <CardHeader className={`bg-gradient-to-r from-${note.color}-500 to-${note.color}-600 text-white`}>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">{note.title}</CardTitle>
                      <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <pre className="text-sm whitespace-pre-wrap">{note.content}</pre>
                    <div className="flex gap-2 mt-4">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Copy className="w-3 h-3 mr-1" />
                        Copy
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash2 className="w-3 h-3 text-red-500" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case 'wiki':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Wiki Pages</h2>
              <Button className="bg-gradient-to-r from-orange-600 to-red-600">
                <Plus className="w-4 h-4 mr-2" />
                New Page
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="md:col-span-1">
                <CardHeader>
                  <CardTitle className="text-base">Categories</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {['Getting Started', 'Development', 'Deployment', 'Architecture', 'API Reference'].map((cat) => (
                    <button
                      key={cat}
                      className="w-full text-left p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center gap-2"
                    >
                      <FolderOpen className="w-4 h-4" />
                      <span className="text-sm">{cat}</span>
                    </button>
                  ))}
                </CardContent>
              </Card>

              <div className="md:col-span-3 space-y-3">
                {[
                  { title: 'Setting up Development Environment', category: 'Getting Started', updated: '2 days ago', views: 45 },
                  { title: 'API Authentication Guide', category: 'Development', updated: '5 days ago', views: 89 },
                  { title: 'Deployment Checklist', category: 'Deployment', updated: '1 week ago', views: 123 },
                ].map((page, idx) => (
                  <Card key={idx} className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3 flex-1">
                          <BookOpen className="w-5 h-5 text-orange-500 flex-shrink-0 mt-1" />
                          <div className="flex-1">
                            <h3 className="font-semibold mb-1">{page.title}</h3>
                            <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                              <Badge variant="outline">{page.category}</Badge>
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {page.updated}
                              </span>
                              <span className="flex items-center gap-1">
                                <Eye className="w-3 h-3" />
                                {page.views} views
                              </span>
                            </div>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        );

      case 'resources':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Learning Resources</h2>
              <Button className="bg-gradient-to-r from-indigo-600 to-purple-600">
                <Plus className="w-4 h-4 mr-2" />
                Add Resource
              </Button>
            </div>

            <div className="grid gap-4">
              {[
                { title: 'React Official Documentation', url: 'react.dev', category: 'Documentation', tags: ['react', 'frontend'], starred: true },
                { title: 'Node.js Best Practices', url: 'github.com/goldbergyoni/nodebestpractices', category: 'Tutorial', tags: ['nodejs', 'backend'], starred: true },
                { title: 'TypeScript Deep Dive', url: 'basarat.gitbook.io/typescript', category: 'Book', tags: ['typescript'], starred: false },
                { title: 'Docker Getting Started', url: 'docs.docker.com', category: 'Documentation', tags: ['docker', 'devops'], starred: false },
              ].map((resource, idx) => (
                <Card key={idx} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3 flex-1">
                        {resource.starred && (
                          <Star className="w-5 h-5 text-yellow-500 fill-yellow-500 flex-shrink-0 mt-1" />
                        )}
                        <div className="flex-1">
                          <h3 className="font-semibold mb-2">{resource.title}</h3>
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="outline">{resource.category}</Badge>
                            {resource.tags.map((tag) => (
                              <Badge key={tag} className="bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          <p className="text-sm text-blue-600 dark:text-blue-400">{resource.url}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Bookmark className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
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
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Knowledge Base
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Your personal wiki, code snippets, and learning resources
          </p>
        </div>
        <Badge className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white border-0">
          <BookOpen className="w-3 h-3 mr-1" />
          {KB_TOOLS.length} Collections
        </Badge>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Code className="w-5 h-5 text-blue-500" />
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Snippets</p>
                <p className="text-2xl font-bold">{snippets.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Terminal className="w-5 h-5 text-purple-500" />
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Commands</p>
                <p className="text-2xl font-bold">{commands.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-orange-500" />
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Wiki Pages</p>
                <p className="text-2xl font-bold">15</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Bookmark className="w-5 h-5 text-indigo-500" />
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Resources</p>
                <p className="text-2xl font-bold">23</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tool Selection */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        {KB_TOOLS.map((tool) => {
          const Icon = tool.icon;
          return (
            <Card
              key={tool.id}
              className={`cursor-pointer transition-all hover:scale-105 ${
                selectedTool === tool.id
                  ? 'ring-2 ring-indigo-500 shadow-lg'
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
