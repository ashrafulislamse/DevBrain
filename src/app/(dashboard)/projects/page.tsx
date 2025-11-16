'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Plus,
  MoreVertical,
  GitBranch,
  Calendar,
  User,
  Clock,
  CheckCircle2,
  AlertCircle,
  Circle,
  Star,
  Github,
  ExternalLink,
  Filter,
  Search,
  Grid3x3,
  LayoutList,
} from 'lucide-react';

interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  assignee: string;
  dueDate: string;
  labels: string[];
}

interface Project {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'archived';
  progress: number;
  tasks: { todo: Task[]; inProgress: Task[]; done: Task[] };
  githubUrl?: string;
  starred: boolean;
}

const mockProjects: Project[] = [
  {
    id: '1',
    name: 'E-Commerce Platform',
    description: 'Full-stack online store with Next.js and Stripe',
    status: 'active',
    progress: 65,
    starred: true,
    githubUrl: 'https://github.com/user/ecommerce',
    tasks: {
      todo: [
        {
          id: 't1',
          title: 'Implement product search',
          description: 'Add full-text search with filters',
          priority: 'high',
          assignee: 'John Doe',
          dueDate: '2024-12-20',
          labels: ['feature', 'frontend'],
        },
        {
          id: 't2',
          title: 'Add email notifications',
          description: 'Send order confirmation emails',
          priority: 'medium',
          assignee: 'Jane Smith',
          dueDate: '2024-12-22',
          labels: ['feature', 'backend'],
        },
      ],
      inProgress: [
        {
          id: 't3',
          title: 'Payment integration',
          description: 'Integrate Stripe checkout',
          priority: 'high',
          assignee: 'John Doe',
          dueDate: '2024-12-18',
          labels: ['feature', 'backend'],
        },
      ],
      done: [
        {
          id: 't4',
          title: 'Setup database schema',
          description: 'Prisma schema with PostgreSQL',
          priority: 'high',
          assignee: 'John Doe',
          dueDate: '2024-12-10',
          labels: ['setup', 'backend'],
        },
        {
          id: 't5',
          title: 'Design UI components',
          description: 'Create reusable component library',
          priority: 'medium',
          assignee: 'Jane Smith',
          dueDate: '2024-12-12',
          labels: ['design', 'frontend'],
        },
      ],
    },
  },
  {
    id: '2',
    name: 'DevBrain Dashboard',
    description: 'All-in-one developer control panel',
    status: 'active',
    progress: 85,
    starred: true,
    githubUrl: 'https://github.com/user/devbrain',
    tasks: {
      todo: [
        {
          id: 't6',
          title: 'Add AI Assistant',
          description: 'Integrate ChatGPT API for help',
          priority: 'high',
          assignee: 'You',
          dueDate: '2024-12-25',
          labels: ['feature', 'ai'],
        },
      ],
      inProgress: [
        {
          id: 't7',
          title: 'Improve playground',
          description: 'Add Python and Node.js support',
          priority: 'medium',
          assignee: 'You',
          dueDate: '2024-12-19',
          labels: ['enhancement'],
        },
      ],
      done: [
        {
          id: 't8',
          title: 'Build monitoring dashboard',
          description: 'Real-time server metrics',
          priority: 'high',
          assignee: 'You',
          dueDate: '2024-12-15',
          labels: ['feature'],
        },
      ],
    },
  },
];

export default function ProjectsPage() {
  const [projects] = useState<Project[]>(mockProjects);
  const [selectedProject, setSelectedProject] = useState<Project>(projects[0]);
  const [viewMode, setViewMode] = useState<'kanban' | 'list'>('kanban');

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800';
      case 'low':
        return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800';
    }
  };

  const TaskCard = ({ task }: { task: Task }) => (
    <Card className="group cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-[1.02] border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <h4 className="font-semibold text-sm text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
            {task.title}
          </h4>
          <button className="opacity-0 group-hover:opacity-100 transition-opacity">
            <MoreVertical className="w-4 h-4 text-gray-400" />
          </button>
        </div>
        <p className="text-xs text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
          {task.description}
        </p>
        <div className="flex flex-wrap gap-1.5 mb-3">
          {task.labels.map((label) => (
            <Badge
              key={label}
              variant="outline"
              className="text-xs px-2 py-0 bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800"
            >
              {label}
            </Badge>
          ))}
        </div>
        <div className="flex items-center justify-between text-xs">
          <Badge className={`px-2 py-0.5 text-xs font-medium border ${getPriorityColor(task.priority)}`}>
            {task.priority}
          </Badge>
          <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
            <Calendar className="w-3 h-3" />
            <span>{task.dueDate}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const KanbanColumn = ({
    title,
    tasks,
    icon: Icon,
    color,
  }: {
    title: string;
    tasks: Task[];
    icon: any;
    color: string;
  }) => (
    <div className="flex-1 min-w-[320px]">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Icon className={`w-5 h-5 ${color}`} />
          <h3 className="font-bold text-gray-900 dark:text-white">{title}</h3>
          <Badge variant="secondary" className="bg-gray-100 dark:bg-gray-800">
            {tasks.length}
          </Badge>
        </div>
        <Button size="icon" variant="ghost" className="h-8 w-8">
          <Plus className="w-4 h-4" />
        </Button>
      </div>
      <div className="space-y-3 bg-gray-50/50 dark:bg-gray-900/50 rounded-xl p-4 min-h-[500px] border border-gray-200/50 dark:border-gray-700/50">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
        {tasks.length === 0 && (
          <div className="flex flex-col items-center justify-center h-40 text-gray-400">
            <Circle className="w-12 h-12 mb-2 opacity-20" />
            <p className="text-sm">No tasks</p>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
            Projects
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your development projects with Kanban boards
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl">
            <Search className="w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search projects..."
              className="bg-transparent border-none outline-none text-sm w-48"
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="w-4 h-4" />
          </Button>
          <div className="flex gap-1 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
            <Button
              size="icon"
              variant={viewMode === 'kanban' ? 'default' : 'ghost'}
              className="h-8 w-8"
              onClick={() => setViewMode('kanban')}
            >
              <Grid3x3 className="w-4 h-4" />
            </Button>
            <Button
              size="icon"
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              className="h-8 w-8"
              onClick={() => setViewMode('list')}
            >
              <LayoutList className="w-4 h-4" />
            </Button>
          </div>
          <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg shadow-purple-500/30">
            <Plus className="w-4 h-4 mr-2" />
            New Project
          </Button>
        </div>
      </div>

      {/* Project Selector */}
      <div className="flex gap-3 overflow-x-auto pb-2">
        {projects.map((project) => (
          <Card
            key={project.id}
            className={`cursor-pointer transition-all duration-200 hover:shadow-lg flex-shrink-0 w-80 ${
              selectedProject.id === project.id
                ? 'ring-2 ring-purple-500 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20'
                : 'hover:scale-[1.02]'
            }`}
            onClick={() => setSelectedProject(project)}
          >
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-gray-900 dark:text-white">{project.name}</h3>
                    {project.starred && <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{project.description}</p>
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-gray-600 dark:text-gray-400">Progress</span>
                    <span className="font-semibold text-purple-600 dark:text-purple-400">
                      {project.progress}%
                    </span>
                  </div>
                  <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-purple-600 to-blue-600 rounded-full transition-all duration-500"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                </div>
                {project.githubUrl && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full border-gray-200 dark:border-gray-700"
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(project.githubUrl, '_blank');
                    }}
                  >
                    <Github className="w-3 h-3 mr-2" />
                    View on GitHub
                    <ExternalLink className="w-3 h-3 ml-2" />
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Kanban Board */}
      {viewMode === 'kanban' && (
        <div className="flex gap-6 overflow-x-auto pb-4">
          <KanbanColumn
            title="To Do"
            tasks={selectedProject.tasks.todo}
            icon={Circle}
            color="text-gray-500"
          />
          <KanbanColumn
            title="In Progress"
            tasks={selectedProject.tasks.inProgress}
            icon={Clock}
            color="text-blue-500"
          />
          <KanbanColumn
            title="Done"
            tasks={selectedProject.tasks.done}
            icon={CheckCircle2}
            color="text-green-500"
          />
        </div>
      )}

      {/* List View */}
      {viewMode === 'list' && (
        <Card>
          <CardHeader>
            <CardTitle>All Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {[...selectedProject.tasks.todo, ...selectedProject.tasks.inProgress, ...selectedProject.tasks.done].map(
                (task) => (
                  <div
                    key={task.id}
                    className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                  >
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm mb-1">{task.title}</h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400">{task.description}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <Badge className={`px-2 py-0.5 text-xs border ${getPriorityColor(task.priority)}`}>
                        {task.priority}
                      </Badge>
                      <span className="text-xs text-gray-500">{task.dueDate}</span>
                    </div>
                  </div>
                ),
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
