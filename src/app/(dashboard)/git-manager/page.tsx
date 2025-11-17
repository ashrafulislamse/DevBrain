'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  GitBranch,
  GitCommit,
  GitPullRequest,
  GitMerge,
  FileCode,
  Eye,
  Check,
  X,
  MessageSquare,
  Star,
  GitFork,
  Clock,
  Users,
  Tag,
  Plus,
  Search,
  Filter,
  RefreshCw,
  Download,
  Upload,
} from 'lucide-react';

const GIT_TOOLS = [
  { id: 'repos', name: 'Repositories', icon: FileCode, color: 'from-blue-500 to-cyan-500' },
  { id: 'branches', name: 'Branches', icon: GitBranch, color: 'from-purple-500 to-pink-500' },
  { id: 'commits', name: 'Commits', icon: GitCommit, color: 'from-green-500 to-emerald-500' },
  { id: 'prs', name: 'Pull Requests', icon: GitPullRequest, color: 'from-orange-500 to-red-500' },
  { id: 'releases', name: 'Releases', icon: Tag, color: 'from-indigo-500 to-purple-500' },
  { id: 'compare', name: 'Compare', icon: GitMerge, color: 'from-pink-500 to-rose-500' },
];

interface Repository {
  name: string;
  description: string;
  stars: number;
  forks: number;
  language: string;
  updated: string;
}

interface PullRequest {
  id: number;
  title: string;
  author: string;
  status: 'open' | 'closed' | 'merged';
  comments: number;
  created: string;
}

export default function GitManagerPage() {
  const [selectedTool, setSelectedTool] = useState('repos');
  const [isConnected, setIsConnected] = useState(false);
  const [provider, setProvider] = useState('github');

  const [repositories, setRepositories] = useState<Repository[]>([
    { name: 'devbrain', description: 'Ultimate DevOps Dashboard', stars: 234, forks: 45, language: 'TypeScript', updated: '2 hours ago' },
    { name: 'api-gateway', description: 'Microservices API Gateway', stars: 89, forks: 12, language: 'Node.js', updated: '1 day ago' },
    { name: 'mobile-app', description: 'React Native Mobile App', stars: 156, forks: 23, language: 'JavaScript', updated: '3 days ago' },
  ]);

  const [pullRequests, setPullRequests] = useState<PullRequest[]>([
    { id: 123, title: 'Add dark mode support', author: 'johndoe', status: 'open', comments: 5, created: '2 hours ago' },
    { id: 122, title: 'Fix authentication bug', author: 'janesmith', status: 'merged', comments: 12, created: '1 day ago' },
    { id: 121, title: 'Improve performance', author: 'bobwilson', status: 'open', comments: 3, created: '2 days ago' },
  ]);

  const [commits, setCommits] = useState([
    { hash: 'a3f2c1d', message: 'feat: add user authentication', author: 'John Doe', time: '2 hours ago', branch: 'main' },
    { hash: 'b8e4f2a', message: 'fix: resolve database connection issue', author: 'Jane Smith', time: '5 hours ago', branch: 'main' },
    { hash: 'c9d5e3b', message: 'refactor: improve code structure', author: 'Bob Wilson', time: '1 day ago', branch: 'develop' },
  ]);

  const renderToolContent = () => {
    switch (selectedTool) {
      case 'repos':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Input placeholder="Search repositories..." className="w-64" />
                <Button variant="outline">
                  <Filter className="w-4 h-4" />
                </Button>
              </div>
              <Button className="bg-gradient-to-r from-blue-600 to-cyan-600">
                <Plus className="w-4 h-4 mr-2" />
                Add Repository
              </Button>
            </div>

            <div className="grid gap-4">
              {repositories.map((repo, idx) => (
                <Card key={idx} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <FileCode className="w-5 h-5 text-blue-500" />
                          <h3 className="text-lg font-semibold">{repo.name}</h3>
                          <Badge variant="outline">{repo.language}</Badge>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                          {repo.description}
                        </p>
                        <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                          <span className="flex items-center gap-1">
                            <Star className="w-4 h-4" />
                            {repo.stars}
                          </span>
                          <span className="flex items-center gap-1">
                            <GitFork className="w-4 h-4" />
                            {repo.forks}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {repo.updated}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <GitBranch className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case 'branches':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Branches</h2>
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600">
                <Plus className="w-4 h-4 mr-2" />
                New Branch
              </Button>
            </div>

            <div className="grid gap-3">
              {[
                { name: 'main', commits: 234, status: 'protected', ahead: 0, behind: 0 },
                { name: 'develop', commits: 189, status: 'active', ahead: 12, behind: 3 },
                { name: 'feature/new-ui', commits: 45, status: 'active', ahead: 5, behind: 8 },
                { name: 'hotfix/auth-bug', commits: 12, status: 'active', ahead: 2, behind: 1 },
              ].map((branch, idx) => (
                <Card key={idx}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <GitBranch className="w-5 h-5 text-purple-500" />
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold">{branch.name}</h3>
                            {branch.status === 'protected' && (
                              <Badge className="bg-blue-500">Protected</Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {branch.commits} commits • {branch.ahead} ahead, {branch.behind} behind
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <GitMerge className="w-4 h-4 mr-1" />
                          Merge
                        </Button>
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case 'commits':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Commit History</h2>
              <div className="flex gap-2">
                <Button variant="outline">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              {commits.map((commit, idx) => (
                <Card key={idx}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center flex-shrink-0">
                          <GitCommit className="w-4 h-4 text-white" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium mb-1">{commit.message}</p>
                          <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                            <span className="flex items-center gap-1">
                              <Users className="w-3 h-3" />
                              {commit.author}
                            </span>
                            <code className="px-2 py-0.5 bg-gray-100 dark:bg-gray-800 rounded">
                              {commit.hash}
                            </code>
                            <Badge variant="outline">{commit.branch}</Badge>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {commit.time}
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
        );

      case 'prs':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Pull Requests</h2>
              <Button className="bg-gradient-to-r from-orange-600 to-red-600">
                <Plus className="w-4 h-4 mr-2" />
                New Pull Request
              </Button>
            </div>

            <div className="flex gap-2 mb-4">
              <Button variant="outline" size="sm">Open ({pullRequests.filter(pr => pr.status === 'open').length})</Button>
              <Button variant="outline" size="sm">Merged ({pullRequests.filter(pr => pr.status === 'merged').length})</Button>
              <Button variant="outline" size="sm">Closed ({pullRequests.filter(pr => pr.status === 'closed').length})</Button>
            </div>

            <div className="grid gap-3">
              {pullRequests.map((pr) => (
                <Card key={pr.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex gap-3 flex-1">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                          pr.status === 'open' ? 'bg-green-500' :
                          pr.status === 'merged' ? 'bg-purple-500' :
                          'bg-red-500'
                        }`}>
                          {pr.status === 'open' && <GitPullRequest className="w-4 h-4 text-white" />}
                          {pr.status === 'merged' && <GitMerge className="w-4 h-4 text-white" />}
                          {pr.status === 'closed' && <X className="w-4 h-4 text-white" />}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold">{pr.title}</h3>
                            <Badge className={
                              pr.status === 'open' ? 'bg-green-500' :
                              pr.status === 'merged' ? 'bg-purple-500' :
                              'bg-red-500'
                            }>
                              {pr.status}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                            <span>#{pr.id}</span>
                            <span className="flex items-center gap-1">
                              <Users className="w-3 h-3" />
                              {pr.author}
                            </span>
                            <span className="flex items-center gap-1">
                              <MessageSquare className="w-3 h-3" />
                              {pr.comments}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {pr.created}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        {pr.status === 'open' && (
                          <>
                            <Button size="sm" className="bg-green-600">
                              <Check className="w-4 h-4 mr-1" />
                              Merge
                            </Button>
                            <Button variant="outline" size="sm">
                              <Eye className="w-4 h-4" />
                            </Button>
                          </>
                        )}
                        {pr.status === 'merged' && (
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case 'releases':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Releases</h2>
              <Button className="bg-gradient-to-r from-indigo-600 to-purple-600">
                <Plus className="w-4 h-4 mr-2" />
                Create Release
              </Button>
            </div>

            <div className="grid gap-4">
              {[
                { version: 'v2.1.0', name: 'Feature Release', tag: 'latest', date: '2024-01-15', downloads: 1234 },
                { version: 'v2.0.5', name: 'Hotfix Release', tag: 'stable', date: '2024-01-10', downloads: 2456 },
                { version: 'v2.0.0', name: 'Major Release', tag: 'stable', date: '2024-01-01', downloads: 5678 },
              ].map((release, idx) => (
                <Card key={idx}>
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
                          <Tag className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-lg font-semibold">{release.version}</h3>
                            <Badge className="bg-green-500">{release.tag}</Badge>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                            {release.name}
                          </p>
                          <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {release.date}
                            </span>
                            <span className="flex items-center gap-1">
                              <Download className="w-3 h-3" />
                              {release.downloads.toLocaleString()} downloads
                            </span>
                          </div>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-1" />
                        Download
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case 'compare':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GitMerge className="w-5 h-5" />
                  Compare Branches
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                  <div>
                    <label className="block text-sm font-medium mb-2">Base Branch</label>
                    <select className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800">
                      <option>main</option>
                      <option>develop</option>
                      <option>staging</option>
                    </select>
                  </div>
                  <div className="flex items-center justify-center">
                    <GitMerge className="w-6 h-6 text-gray-400" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Compare Branch</label>
                    <select className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800">
                      <option>develop</option>
                      <option>feature/new-ui</option>
                      <option>hotfix/bug</option>
                    </select>
                  </div>
                </div>

                <Button className="w-full bg-gradient-to-r from-pink-600 to-rose-600">
                  <GitMerge className="w-4 h-4 mr-2" />
                  Compare Branches
                </Button>

                <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-2xl font-bold text-green-500">+245</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Additions</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-red-500">-89</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Deletions</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-blue-500">12</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Files Changed</p>
                    </div>
                  </div>
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
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Git & Version Control
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage repositories, branches, commits and pull requests
          </p>
        </div>
        <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0">
          <GitBranch className="w-3 h-3 mr-1" />
          {GIT_TOOLS.length} Tools
        </Badge>
      </div>

      {/* Connection */}
      {!isConnected && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Connect Git Provider</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {['github', 'gitlab', 'bitbucket'].map((p) => (
                <Card
                  key={p}
                  className={`cursor-pointer transition-all hover:scale-105 ${
                    provider === p ? 'ring-2 ring-purple-500' : ''
                  }`}
                  onClick={() => setProvider(p)}
                >
                  <CardContent className="p-4 text-center">
                    <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                      <GitBranch className="w-6 h-6 text-white" />
                    </div>
                    <p className="font-medium capitalize">{p}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Personal Access Token</label>
              <Input type="password" placeholder="ghp_xxxxxxxxxxxxxxxxxxxx" />
            </div>

            <Button
              onClick={() => setIsConnected(true)}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600"
            >
              <GitBranch className="w-4 h-4 mr-2" />
              Connect to {provider.charAt(0).toUpperCase() + provider.slice(1)}
            </Button>
          </CardContent>
        </Card>
      )}

      {isConnected && (
        <>
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <FileCode className="w-5 h-5 text-blue-500" />
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Repositories</p>
                    <p className="text-2xl font-bold">{repositories.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <GitPullRequest className="w-5 h-5 text-green-500" />
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Open PRs</p>
                    <p className="text-2xl font-bold">{pullRequests.filter(pr => pr.status === 'open').length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <GitCommit className="w-5 h-5 text-purple-500" />
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Total Commits</p>
                    <p className="text-2xl font-bold">2,847</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-500" />
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Total Stars</p>
                    <p className="text-2xl font-bold">479</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tool Selection */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
            {GIT_TOOLS.map((tool) => {
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
        </>
      )}
    </div>
  );
}
