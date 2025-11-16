'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Plus,
  FileText,
  Clock,
  DollarSign,
  Users,
  Calendar,
  Download,
  Send,
  Eye,
  CheckCircle2,
  XCircle,
  AlertCircle,
  TrendingUp,
  Play,
  Pause,
  Square,
  MoreVertical,
  Edit,
  Trash2,
} from 'lucide-react';

interface Invoice {
  id: string;
  client: string;
  amount: number;
  status: 'paid' | 'pending' | 'overdue';
  dueDate: string;
  issueDate: string;
}

interface TimeEntry {
  id: string;
  project: string;
  description: string;
  duration: string;
  date: string;
  isRunning?: boolean;
}

interface Client {
  id: string;
  name: string;
  email: string;
  company: string;
  projects: number;
  revenue: number;
  status: 'active' | 'inactive';
}

const mockInvoices: Invoice[] = [
  {
    id: 'INV-001',
    client: 'Acme Corp',
    amount: 5500,
    status: 'paid',
    dueDate: '2024-12-15',
    issueDate: '2024-12-01',
  },
  {
    id: 'INV-002',
    client: 'Tech Solutions',
    amount: 3200,
    status: 'pending',
    dueDate: '2024-12-20',
    issueDate: '2024-12-05',
  },
  {
    id: 'INV-003',
    client: 'StartupXYZ',
    amount: 4800,
    status: 'overdue',
    dueDate: '2024-12-10',
    issueDate: '2024-11-25',
  },
];

const mockTimeEntries: TimeEntry[] = [
  {
    id: '1',
    project: 'E-Commerce Platform',
    description: 'Implemented payment gateway integration',
    duration: '2h 30m',
    date: 'Today',
  },
  {
    id: '2',
    project: 'DevBrain Dashboard',
    description: 'Built freelance tools page',
    duration: '1h 45m',
    date: 'Today',
    isRunning: true,
  },
  {
    id: '3',
    project: 'Mobile App',
    description: 'Fixed authentication bugs',
    duration: '3h 15m',
    date: 'Yesterday',
  },
];

const mockClients: Client[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john@acmecorp.com',
    company: 'Acme Corp',
    projects: 3,
    revenue: 15000,
    status: 'active',
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah@techsolutions.com',
    company: 'Tech Solutions',
    projects: 2,
    revenue: 8500,
    status: 'active',
  },
  {
    id: '3',
    name: 'Mike Brown',
    email: 'mike@startupxyz.com',
    company: 'StartupXYZ',
    projects: 1,
    revenue: 4800,
    status: 'inactive',
  },
];

export default function FreelancePage() {
  const [invoices] = useState<Invoice[]>(mockInvoices);
  const [timeEntries, setTimeEntries] = useState<TimeEntry[]>(mockTimeEntries);
  const [clients] = useState<Client[]>(mockClients);
  const [activeTab, setActiveTab] = useState<'invoices' | 'time' | 'clients'>('invoices');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
      case 'active':
        return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800';
      case 'pending':
        return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800';
      case 'overdue':
        return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400 border-gray-200 dark:border-gray-800';
    }
  };

  const totalRevenue = invoices.filter((inv) => inv.status === 'paid').reduce((sum, inv) => sum + inv.amount, 0);
  const pendingRevenue = invoices.filter((inv) => inv.status === 'pending').reduce((sum, inv) => sum + inv.amount, 0);
  const overdueRevenue = invoices.filter((inv) => inv.status === 'overdue').reduce((sum, inv) => sum + inv.amount, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
            Freelance Tools
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage invoices, track time, and organize clients
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            className={activeTab === 'invoices' ? 'bg-purple-50 dark:bg-purple-900/20' : ''}
            onClick={() => setActiveTab('invoices')}
          >
            <FileText className="w-4 h-4 mr-2" />
            Invoices
          </Button>
          <Button
            variant="outline"
            className={activeTab === 'time' ? 'bg-purple-50 dark:bg-purple-900/20' : ''}
            onClick={() => setActiveTab('time')}
          >
            <Clock className="w-4 h-4 mr-2" />
            Time Tracking
          </Button>
          <Button
            variant="outline"
            className={activeTab === 'clients' ? 'bg-purple-50 dark:bg-purple-900/20' : ''}
            onClick={() => setActiveTab('clients')}
          >
            <Users className="w-4 h-4 mr-2" />
            Clients
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-gray-200 dark:border-gray-700 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Revenue</p>
                <p className="text-3xl font-bold text-green-600 dark:text-green-400">${totalRevenue.toLocaleString()}</p>
              </div>
              <div className="w-14 h-14 rounded-2xl bg-green-500/20 flex items-center justify-center">
                <DollarSign className="w-7 h-7 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-4 text-sm">
              <TrendingUp className="w-4 h-4 text-green-600" />
              <span className="text-green-600 dark:text-green-400 font-semibold">+18%</span>
              <span className="text-gray-600 dark:text-gray-400">from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-200 dark:border-gray-700 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Pending</p>
                <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">${pendingRevenue.toLocaleString()}</p>
              </div>
              <div className="w-14 h-14 rounded-2xl bg-blue-500/20 flex items-center justify-center">
                <Clock className="w-7 h-7 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-4 text-sm">
              <span className="text-blue-600 dark:text-blue-400 font-semibold">{invoices.filter((inv) => inv.status === 'pending').length} invoices</span>
              <span className="text-gray-600 dark:text-gray-400">waiting</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-200 dark:border-gray-700 bg-gradient-to-br from-red-50 to-rose-50 dark:from-red-900/20 dark:to-rose-900/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Overdue</p>
                <p className="text-3xl font-bold text-red-600 dark:text-red-400">${overdueRevenue.toLocaleString()}</p>
              </div>
              <div className="w-14 h-14 rounded-2xl bg-red-500/20 flex items-center justify-center">
                <AlertCircle className="w-7 h-7 text-red-600 dark:text-red-400" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-4 text-sm">
              <span className="text-red-600 dark:text-red-400 font-semibold">Action required</span>
              <span className="text-gray-600 dark:text-gray-400">urgently</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-200 dark:border-gray-700 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Active Clients</p>
                <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                  {clients.filter((c) => c.status === 'active').length}
                </p>
              </div>
              <div className="w-14 h-14 rounded-2xl bg-purple-500/20 flex items-center justify-center">
                <Users className="w-7 h-7 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-4 text-sm">
              <span className="text-purple-600 dark:text-purple-400 font-semibold">{clients.length} total</span>
              <span className="text-gray-600 dark:text-gray-400">clients</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Invoices Tab */}
      {activeTab === 'invoices' && (
        <Card className="border-gray-200 dark:border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Invoices</CardTitle>
            <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg shadow-purple-500/30">
              <Plus className="w-4 h-4 mr-2" />
              New Invoice
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {invoices.map((invoice) => (
                <div
                  key={invoice.id}
                  className="flex items-center justify-between p-5 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all duration-200 hover:shadow-md"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold shadow-lg shadow-purple-500/30">
                      <FileText className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white mb-1">{invoice.id}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{invoice.client}</p>
                      <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                        <span>Issued: {invoice.issueDate}</span>
                        <span>•</span>
                        <span>Due: {invoice.dueDate}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        ${invoice.amount.toLocaleString()}
                      </p>
                      <Badge className={`mt-2 px-3 py-1 text-xs font-semibold border ${getStatusColor(invoice.status)}`}>
                        {invoice.status}
                      </Badge>
                    </div>
                    <div className="flex gap-2">
                      <Button size="icon" variant="outline">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button size="icon" variant="outline">
                        <Download className="w-4 h-4" />
                      </Button>
                      <Button size="icon" variant="outline">
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Time Tracking Tab */}
      {activeTab === 'time' && (
        <Card className="border-gray-200 dark:border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Time Entries</CardTitle>
            <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-lg shadow-green-500/30">
              <Play className="w-4 h-4 mr-2" />
              Start Timer
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {timeEntries.map((entry) => (
                <div
                  key={entry.id}
                  className="flex items-center justify-between p-5 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all duration-200"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${entry.isRunning ? 'bg-gradient-to-br from-green-500 to-emerald-500 animate-pulse' : 'bg-gradient-to-br from-blue-500 to-indigo-500'} text-white shadow-lg`}>
                      <Clock className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-900 dark:text-white mb-1">{entry.project}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{entry.description}</p>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Calendar className="w-3 h-3" />
                        <span>{entry.date}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">{entry.duration}</p>
                      {entry.isRunning && (
                        <Badge className="mt-2 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800">
                          Running
                        </Badge>
                      )}
                    </div>
                    <div className="flex gap-2">
                      {entry.isRunning ? (
                        <>
                          <Button size="icon" variant="outline" className="bg-red-50 hover:bg-red-100">
                            <Square className="w-4 h-4 text-red-600" />
                          </Button>
                          <Button size="icon" variant="outline" className="bg-yellow-50 hover:bg-yellow-100">
                            <Pause className="w-4 h-4 text-yellow-600" />
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button size="icon" variant="outline">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button size="icon" variant="outline">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Clients Tab */}
      {activeTab === 'clients' && (
        <Card className="border-gray-200 dark:border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Clients</CardTitle>
            <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg shadow-purple-500/30">
              <Plus className="w-4 h-4 mr-2" />
              Add Client
            </Button>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {clients.map((client) => (
                <Card
                  key={client.id}
                  className="border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-200 hover:scale-[1.02]"
                >
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-rose-500 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-purple-500/30">
                        {client.name[0]}
                      </div>
                      <Badge className={`px-2 py-1 text-xs font-semibold border ${getStatusColor(client.status)}`}>
                        {client.status}
                      </Badge>
                    </div>
                    <h4 className="font-bold text-gray-900 dark:text-white mb-1">{client.name}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{client.company}</p>
                    <p className="text-xs text-gray-500 mb-4">{client.email}</p>
                    <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                      <div>
                        <p className="text-xs text-gray-500">Projects</p>
                        <p className="text-lg font-bold text-gray-900 dark:text-white">{client.projects}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-500">Revenue</p>
                        <p className="text-lg font-bold text-green-600 dark:text-green-400">
                          ${client.revenue.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
