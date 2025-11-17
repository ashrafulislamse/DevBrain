'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { isAuthenticated, logout, getUser } from '@/lib/auth';
import {
  LayoutDashboard,
  Server,
  Globe,
  Code,
  Plug,
  RefreshCw,
  Activity,
  FileText,
  Settings,
  LogOut,
  Menu,
  X,
  Bell,
  Search,
  Brain,
  ChevronLeft,
  ChevronRight,
  FolderKanban,
  Workflow,
  Briefcase,
  Bot,
  Wrench,
  Receipt,
  FileSignature,
  Shield,
  FileCode,
  TrendingUp,
  CreditCard,
  Zap,
  Users as UsersIcon,
  Terminal as TerminalIcon,
  Wand2,
  Globe as Wordpress,
  GitBranch,
  Database,
  Image as ImageIcon,
  BookOpen,
  BarChart3,
  Sparkles,
  GitPullRequest,
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Projects', href: '/projects', icon: FolderKanban, badge: '5' },
  { name: 'Servers', href: '/servers', icon: Server, badge: '3' },
  { name: 'Websites', href: '/websites', icon: Globe, badge: '12' },
  { name: 'Playground', href: '/playground', icon: Code },
  { name: 'API Tester', href: '/api-tester', icon: Plug },
  { name: 'Converters', href: '/converters', icon: RefreshCw },
  { name: 'Dev Tools', href: '/dev-tools', icon: Wrench, badge: '12' },
  { name: 'Workflows', href: '/workflows', icon: Workflow },
  { name: 'Freelance', href: '/freelance', icon: Briefcase },
  { name: 'Invoices', href: '/invoices', icon: Receipt },
  { name: 'Proposals', href: '/proposals', icon: FileSignature },
  { name: 'Contracts', href: '/contracts', icon: FileSignature },
  { name: 'Client Portal', href: '/client-portal', icon: UsersIcon },
  { name: 'Security', href: '/security', icon: Shield, badge: '5' },
  { name: 'Config Gen', href: '/config-generators', icon: FileCode },
  { name: 'SEO Suite', href: '/seo-suite', icon: TrendingUp, badge: '6' },
  { name: 'SSH Terminal', href: '/ssh-terminal', icon: TerminalIcon },
  { name: 'AI DevOps', href: '/ai-devops', icon: Zap, badge: '8' },
  { name: 'AI Advanced', href: '/ai-advanced', icon: GitBranch, badge: '6' },
  { name: 'Client Tools', href: '/client-tools', icon: Wand2, badge: '4' },
  { name: 'WordPress Suite', href: '/wordpress', icon: Wordpress, badge: '25+' },
  { name: 'Database', href: '/database', icon: Database, badge: '6' },
  { name: 'Git Manager', href: '/git-manager', icon: GitPullRequest, badge: '6' },
  { name: 'Media Tools', href: '/media-tools', icon: ImageIcon, badge: '6' },
  { name: 'Knowledge', href: '/knowledge-base', icon: BookOpen, badge: '5' },
  { name: 'Notifications', href: '/notifications', icon: Bell },
  { name: 'Analytics', href: '/analytics', icon: BarChart3, badge: '4' },
  { name: 'AI Docs', href: '/ai-docs', icon: Sparkles, badge: '4' },
  { name: 'Stripe', href: '/integrations/stripe', icon: CreditCard },
  { name: 'Advanced Int', href: '/integrations/advanced', icon: Plug },
  { name: 'AI Assistant', href: '/ai-assistant', icon: Bot },
  { name: 'Monitoring', href: '/monitoring', icon: Activity },
  { name: 'Logs', href: '/logs', icon: FileText },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const user = getUser();

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/auth/login');
    }
    // Load collapsed state from localStorage
    const collapsed = localStorage.getItem('sidebar-collapsed') === 'true';
    setSidebarCollapsed(collapsed);
  }, [router]);

  const handleLogout = () => {
    logout();
    router.push('/auth/login');
  };

  const toggleCollapse = () => {
    const newState = !sidebarCollapsed;
    setSidebarCollapsed(newState);
    localStorage.setItem('sidebar-collapsed', String(newState));
  };

  if (!isAuthenticated()) {
    return null;
  }

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-950 dark:via-slate-900 dark:to-gray-900">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 shadow-xl flex flex-col transform transition-all duration-300 ease-in-out lg:translate-x-0 lg:static ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } ${sidebarCollapsed ? 'w-20' : 'w-64'}`}
      >
        {/* Logo */}
        <div className="flex-shrink-0 flex items-center gap-3 h-16 px-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-blue-600 shadow-lg shadow-purple-500/50">
            <Brain className="w-6 h-6 text-white" />
          </div>
          {!sidebarCollapsed && (
            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent whitespace-nowrap">
              DevBrain
            </span>
          )}
        </div>

        {/* Collapse Toggle (Desktop) */}
        <button
          onClick={toggleCollapse}
          className="hidden lg:flex absolute -right-3 top-20 w-6 h-6 items-center justify-center bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full shadow-md hover:shadow-lg transition-all duration-200 hover:scale-110 z-10"
        >
          {sidebarCollapsed ? (
            <ChevronRight className="w-3 h-3" />
          ) : (
            <ChevronLeft className="w-3 h-3" />
          )}
        </button>

        {/* Navigation - Scrollable */}
        <nav className="flex-1 overflow-y-auto overflow-x-hidden p-3 space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`group flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/30'
                    : 'text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 hover:scale-[1.02]'
                }`}
                onClick={() => setSidebarOpen(false)}
                title={sidebarCollapsed ? item.name : ''}
              >
                <div className="flex items-center gap-3">
                  <item.icon className={`w-5 h-5 transition-transform group-hover:scale-110 ${sidebarCollapsed ? 'mx-auto' : ''}`} />
                  {!sidebarCollapsed && <span className="whitespace-nowrap">{item.name}</span>}
                </div>
                {!sidebarCollapsed && item.badge && (
                  <Badge variant="secondary" className="text-xs bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 border-0 font-semibold">
                    {item.badge}
                  </Badge>
                )}
              </Link>
            );
          })}
        </nav>

        {/* User Profile */}
        <div className="flex-shrink-0 p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
          {!sidebarCollapsed ? (
            <>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-semibold shadow-lg shadow-purple-500/30">
                  {user?.name?.[0] || 'A'}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold truncate text-gray-900 dark:text-white">{user?.name}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400 truncate">{user?.email}</p>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="w-full border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 hover:bg-red-50 hover:border-red-300 hover:text-red-600 dark:hover:bg-red-900/30 transition-all duration-200"
                onClick={handleLogout}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="w-10 h-10 mx-auto flex items-center justify-center rounded-lg hover:bg-red-50 dark:hover:bg-red-900/30 text-gray-900 dark:text-gray-100 hover:text-red-600 transition-all duration-200"
              title="Logout"
            >
              <LogOut className="w-5 h-5" />
            </button>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-700/50 flex items-center justify-between px-6 shadow-sm">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden hover:bg-purple-50 dark:hover:bg-purple-900/20"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>

            {/* Search */}
            <div className="hidden md:flex items-center gap-2 px-4 py-2.5 bg-gray-100/80 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-200/50 dark:border-gray-700/50 focus-within:ring-2 focus-within:ring-purple-500/50 transition-all duration-200">
              <Search className="w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search anything... (⌘K)"
                className="bg-transparent border-none outline-none text-sm w-64 placeholder:text-gray-400"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Notifications */}
            <Button variant="ghost" size="icon" className="relative hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all duration-200">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white dark:ring-gray-900 animate-pulse"></span>
            </Button>

            {/* Status */}
            <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-full border border-green-200/50 dark:border-green-700/50">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-lg shadow-green-500/50"></div>
              <span className="text-xs font-semibold text-green-700 dark:text-green-300">
                All Systems Operational
              </span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto overflow-x-hidden">
            <div className="container mx-auto p-6 max-w-[1920px]">{children}</div>
          </div>

          {/* Footer - Simple */}
          <footer className="flex-shrink-0 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
            <div className="container mx-auto px-6 py-4 max-w-[1920px]">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
                    <Brain className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">DevBrain</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">© 2024</span>
                </div>
                <div className="flex items-center gap-6">
                  <Link href="/dashboard" className="text-xs text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                    Dashboard
                  </Link>
                  <Link href="/playground" className="text-xs text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                    Playground
                  </Link>
                  <a href="#" className="text-xs text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                    Docs
                  </a>
                  <a href="#" className="text-xs text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                    Support
                  </a>
                </div>
              </div>
            </div>
          </footer>
        </main>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
