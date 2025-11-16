// Mock data for the dashboard (no real database needed)

export const mockServers = [
  {
    id: '1',
    name: 'Production Server',
    host: '142.250.185.78',
    status: 'online' as const,
    cpu: 45,
    ram: 68,
    disk: 72,
    uptime: 99.98,
    location: 'US East',
  },
  {
    id: '2',
    name: 'Staging Server',
    host: '172.217.164.110',
    status: 'online' as const,
    cpu: 23,
    ram: 42,
    disk: 58,
    uptime: 99.95,
    location: 'EU West',
  },
  {
    id: '3',
    name: 'Dev Server',
    host: '192.168.1.100',
    status: 'offline' as const,
    cpu: 0,
    ram: 0,
    disk: 0,
    uptime: 85.2,
    location: 'Local',
  },
];

export const mockWebsites = [
  {
    id: '1',
    name: 'My Portfolio',
    url: 'https://myportfolio.dev',
    status: 'up' as const,
    responseTime: 245,
    uptime: 99.99,
    sslDaysLeft: 87,
    lastCheck: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Client Site',
    url: 'https://client-website.com',
    status: 'up' as const,
    responseTime: 312,
    uptime: 99.95,
    sslDaysLeft: 23,
    lastCheck: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'Blog',
    url: 'https://myblog.dev',
    status: 'down' as const,
    responseTime: 0,
    uptime: 98.5,
    sslDaysLeft: 156,
    lastCheck: new Date().toISOString(),
  },
];

export const mockDeployments = [
  {
    id: '1',
    project: 'Portfolio',
    branch: 'main',
    status: 'success' as const,
    duration: '2m 34s',
    time: '5 minutes ago',
  },
  {
    id: '2',
    project: 'API Server',
    branch: 'develop',
    status: 'in_progress' as const,
    duration: '1m 12s',
    time: 'Just now',
  },
  {
    id: '3',
    project: 'Frontend App',
    branch: 'feature/auth',
    status: 'failed' as const,
    duration: '45s',
    time: '1 hour ago',
  },
];

export const mockLogs = [
  { level: 'error', message: 'Connection timeout to database', time: '2 mins ago', source: 'API Server' },
  { level: 'warn', message: 'High memory usage detected (85%)', time: '15 mins ago', source: 'Production Server' },
  { level: 'info', message: 'Deployment completed successfully', time: '1 hour ago', source: 'CI/CD' },
  { level: 'error', message: 'SSL certificate expiring in 30 days', time: '2 hours ago', source: 'Monitor' },
];

export const mockMetrics = {
  servers: {
    total: 5,
    online: 4,
    offline: 1,
  },
  websites: {
    total: 12,
    up: 11,
    down: 1,
  },
  deployments: {
    today: 8,
    success: 6,
    failed: 2,
  },
  uptime: 99.97,
};

export const mockActivities = [
  { type: 'deploy', message: 'Deployed Portfolio to production', time: '5 mins ago', user: 'You' },
  { type: 'alert', message: 'Server CPU usage exceeded 80%', time: '1 hour ago', user: 'System' },
  { type: 'deploy', message: 'Deployed API Server to staging', time: '3 hours ago', user: 'You' },
  { type: 'monitor', message: 'SSL certificate renewed for myblog.dev', time: '1 day ago', user: 'System' },
];
