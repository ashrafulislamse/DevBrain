'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  CreditCard,
  DollarSign,
  TrendingUp,
  Users,
  Receipt,
  RefreshCw,
  CheckCircle2,
  XCircle,
  Clock,
  Download,
  Eye,
  Plus,
  Wallet,
  BarChart3,
  Link as LinkIcon,
} from 'lucide-react';

export default function StripePage() {
  const [isConnected, setIsConnected] = useState(false);
  const [apiKey, setApiKey] = useState('');

  const stats = {
    revenue: '$24,567.89',
    transactions: '1,234',
    customers: '456',
    successRate: '98.5%',
  };

  const recentTransactions = [
    {
      id: 'pi_1234567890',
      customer: 'John Doe',
      email: 'john@example.com',
      amount: 129.99,
      status: 'succeeded',
      date: '2024-01-15 14:32',
      method: 'Visa •••• 4242',
    },
    {
      id: 'pi_0987654321',
      customer: 'Jane Smith',
      email: 'jane@example.com',
      amount: 79.5,
      status: 'succeeded',
      date: '2024-01-15 12:15',
      method: 'Mastercard •••• 5555',
    },
    {
      id: 'pi_5555555555',
      customer: 'Bob Johnson',
      email: 'bob@example.com',
      amount: 249.0,
      status: 'pending',
      date: '2024-01-15 10:45',
      method: 'Amex •••• 0005',
    },
    {
      id: 'pi_4444444444',
      customer: 'Alice Brown',
      email: 'alice@example.com',
      amount: 59.99,
      status: 'failed',
      date: '2024-01-15 09:20',
      method: 'Visa •••• 1111',
    },
  ];

  const products = [
    {
      id: 'prod_1',
      name: 'Premium Plan',
      description: 'Monthly subscription',
      price: 49.99,
      interval: 'month',
      active: true,
    },
    {
      id: 'prod_2',
      name: 'Enterprise Plan',
      description: 'Annual subscription',
      price: 499.99,
      interval: 'year',
      active: true,
    },
    {
      id: 'prod_3',
      name: 'One-time Setup',
      description: 'Initial setup fee',
      price: 199.0,
      interval: 'one-time',
      active: true,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'succeeded':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'failed':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'succeeded':
        return <CheckCircle2 className="w-4 h-4" />;
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'failed':
        return <XCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 via-blue-500 to-indigo-600 bg-clip-text text-transparent">
            Stripe Integration
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage payments, subscriptions, and customers
          </p>
        </div>
        <Badge className="bg-gradient-to-r from-purple-500 to-blue-500 text-white border-0">
          <CreditCard className="w-3 h-3 mr-1" />
          {isConnected ? 'Connected' : 'Not Connected'}
        </Badge>
      </div>

      {!isConnected ? (
        <Card>
          <CardHeader>
            <CardTitle>Connect to Stripe</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Stripe API Key</label>
              <Input
                type="password"
                placeholder="sk_live_..."
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
              />
              <p className="text-xs text-gray-500 mt-1">
                Get your API key from{' '}
                <a
                  href="https://dashboard.stripe.com/apikeys"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-600 hover:underline"
                >
                  Stripe Dashboard
                </a>
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Webhook Secret (optional)</label>
              <Input type="password" placeholder="whsec_..." />
              <p className="text-xs text-gray-500 mt-1">
                Configure webhooks to receive real-time updates
              </p>
            </div>
            <Button
              onClick={() => setIsConnected(true)}
              className="bg-gradient-to-r from-purple-600 to-blue-600"
            >
              <CreditCard className="w-4 h-4 mr-2" />
              Connect Stripe
            </Button>
          </CardContent>
        </Card>
      ) : (
        <>
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Total Revenue</p>
                    <p className="text-3xl font-bold text-purple-600">{stats.revenue}</p>
                  </div>
                  <DollarSign className="w-12 h-12 text-purple-600/20" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Transactions</p>
                    <p className="text-3xl font-bold text-blue-600">{stats.transactions}</p>
                  </div>
                  <Receipt className="w-12 h-12 text-blue-600/20" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Customers</p>
                    <p className="text-3xl font-bold text-green-600">{stats.customers}</p>
                  </div>
                  <Users className="w-12 h-12 text-green-600/20" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-orange-900/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Success Rate</p>
                    <p className="text-3xl font-bold text-orange-600">{stats.successRate}</p>
                  </div>
                  <TrendingUp className="w-12 h-12 text-orange-600/20" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Transactions */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Recent Transactions</CardTitle>
                <Button size="sm" variant="outline">
                  <RefreshCw className="w-3 h-3 mr-1" />
                  Refresh
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentTransactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between p-4 border rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all"
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white">
                        <CreditCard className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-bold text-gray-900 dark:text-white">
                            {transaction.customer}
                          </h4>
                          <Badge variant="outline" className={getStatusColor(transaction.status)}>
                            {getStatusIcon(transaction.status)}
                            <span className="ml-1">{transaction.status}</span>
                          </Badge>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-gray-600 dark:text-gray-400">
                          <span>{transaction.email}</span>
                          <span>•</span>
                          <span>{transaction.method}</span>
                          <span>•</span>
                          <span>{transaction.date}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold text-purple-600">
                          ${transaction.amount.toFixed(2)}
                        </p>
                        <p className="text-xs text-gray-500 font-mono">{transaction.id}</p>
                      </div>
                    </div>
                    <div className="ml-4 flex gap-2">
                      <Button size="sm" variant="outline">
                        <Eye className="w-3 h-3" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Download className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Products & Pricing */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Products & Pricing</CardTitle>
                <Button size="sm" variant="outline">
                  <Plus className="w-3 h-3 mr-1" />
                  Add Product
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                {products.map((product) => (
                  <Card key={product.id} className="hover:shadow-lg transition-all">
                    <CardContent className="p-5">
                      <div className="flex items-start justify-between mb-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                          <Wallet className="w-5 h-5 text-white" />
                        </div>
                        <Badge
                          className={
                            product.active
                              ? 'bg-green-100 text-green-800 border-green-200'
                              : 'bg-gray-100 text-gray-800 border-gray-200'
                          }
                        >
                          {product.active ? 'Active' : 'Inactive'}
                        </Badge>
                      </div>
                      <h4 className="font-bold text-lg mb-1">{product.name}</h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">
                        {product.description}
                      </p>
                      <div className="flex items-baseline gap-1 mb-4">
                        <span className="text-3xl font-bold text-purple-600">
                          ${product.price}
                        </span>
                        {product.interval !== 'one-time' && (
                          <span className="text-sm text-gray-500">/{product.interval}</span>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="flex-1">
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600"
                        >
                          <LinkIcon className="w-3 h-3 mr-1" />
                          Get Link
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="grid md:grid-cols-3 gap-4">
            <Card className="cursor-pointer hover:shadow-lg transition-all">
              <CardContent className="p-5">
                <BarChart3 className="w-10 h-10 text-purple-600 mb-3" />
                <h4 className="font-semibold mb-1">Analytics</h4>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  View detailed payment analytics
                </p>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-lg transition-all">
              <CardContent className="p-5">
                <RefreshCw className="w-10 h-10 text-blue-600 mb-3" />
                <h4 className="font-semibold mb-1">Subscriptions</h4>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Manage recurring subscriptions
                </p>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-lg transition-all">
              <CardContent className="p-5">
                <Users className="w-10 h-10 text-green-600 mb-3" />
                <h4 className="font-semibold mb-1">Customers</h4>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  View and manage customers
                </p>
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </div>
  );
}
