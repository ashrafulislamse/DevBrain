'use client';

import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Terminal,
  Server,
  Plus,
  X,
  Copy,
  Download,
  Upload,
  Settings,
  Lock,
  Play,
  Trash2,
  Eye,
  EyeOff,
} from 'lucide-react';

interface SavedConnection {
  id: string;
  name: string;
  host: string;
  port: number;
  username: string;
  lastUsed?: string;
}

export default function SSHTerminalPage() {
  const [isConnected, setIsConnected] = useState(false);
  const [host, setHost] = useState('');
  const [port, setPort] = useState('22');
  const [username, setUsername] = useState('root');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [terminalOutput, setTerminalOutput] = useState<string[]>([
    'DevBrain SSH Web Terminal v1.0.0',
    'Type "help" for available commands',
    '',
  ]);
  const [currentCommand, setCurrentCommand] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const terminalRef = useRef<HTMLDivElement>(null);

  const [savedConnections, setSavedConnections] = useState<SavedConnection[]>([
    {
      id: '1',
      name: 'Production Server',
      host: '192.168.1.100',
      port: 22,
      username: 'root',
      lastUsed: '2024-01-15 14:30',
    },
    {
      id: '2',
      name: 'Staging Server',
      host: 'staging.myapp.com',
      port: 22,
      username: 'deploy',
      lastUsed: '2024-01-14 10:15',
    },
    {
      id: '3',
      name: 'Dev VPS',
      host: '10.0.0.50',
      port: 2222,
      username: 'developer',
      lastUsed: '2024-01-13 16:45',
    },
  ]);

  // Simulated command execution
  const executeCommand = (cmd: string) => {
    setCommandHistory([...commandHistory, cmd]);
    setHistoryIndex(-1);

    const output = [...terminalOutput, `$ ${cmd}`];

    // Simulate command responses
    switch (cmd.toLowerCase().trim()) {
      case 'help':
        output.push(
          'Available commands:',
          '  ls [-la]         - List directory contents',
          '  pwd              - Print working directory',
          '  cd <dir>         - Change directory',
          '  cat <file>       - Display file contents',
          '  nano <file>      - Edit file',
          '  mkdir <dir>      - Create directory',
          '  rm <file>        - Remove file',
          '  top              - Show running processes',
          '  df -h            - Show disk usage',
          '  free -h          - Show memory usage',
          '  systemctl status - Show service status',
          '  clear            - Clear terminal',
          '  exit             - Close connection',
          ''
        );
        break;

      case 'ls':
      case 'ls -la':
        output.push(
          'total 48',
          'drwxr-xr-x  5 root root 4096 Jan 15 14:30 .',
          'drwxr-xr-x 20 root root 4096 Jan 10 09:15 ..',
          'drwxr-xr-x  2 root root 4096 Jan 15 10:20 backups',
          '-rw-r--r--  1 root root  220 Jan  1 00:00 .bashrc',
          'drwxr-xr-x  3 root root 4096 Jan 12 16:45 projects',
          '-rwxr-xr-x  1 root root 2048 Jan 14 11:30 deploy.sh',
          ''
        );
        break;

      case 'pwd':
        output.push('/root', '');
        break;

      case 'df -h':
        output.push(
          'Filesystem      Size  Used Avail Use% Mounted on',
          '/dev/vda1        50G   18G   30G  38% /',
          '/dev/vda2       100G   45G   50G  47% /var',
          'tmpfs           2.0G  1.2M  2.0G   1% /run',
          ''
        );
        break;

      case 'free -h':
        output.push(
          '              total        used        free      shared  buff/cache   available',
          'Mem:          7.8Gi       2.1Gi       3.2Gi       156Mi       2.5Gi       5.3Gi',
          'Swap:         2.0Gi          0B       2.0Gi',
          ''
        );
        break;

      case 'top':
        output.push(
          'top - 14:32:15 up 45 days, 12:34,  1 user,  load average: 0.15, 0.25, 0.20',
          'Tasks: 124 total,   1 running, 123 sleeping',
          '%Cpu(s):  2.5 us,  1.2 sy,  0.0 ni, 96.0 id,  0.3 wa',
          'MiB Mem :   8024.0 total,   3289.2 free,   2156.4 used,   2578.4 buff/cache',
          '',
          '  PID USER      PR  NI    VIRT    RES    SHR S  %CPU  %MEM     TIME+ COMMAND',
          ' 1234 www-data  20   0  512456  45678  12345 S   3.2   0.6   0:45.23 nginx',
          ' 5678 mysql     20   0 1234567 123456  23456 S   2.1   1.5  12:34.56 mysqld',
          ''
        );
        break;

      case 'clear':
        setTerminalOutput(['']);
        return;

      case 'exit':
        setIsConnected(false);
        output.push('Connection closed.', '');
        break;

      default:
        if (cmd.trim()) {
          output.push(`bash: ${cmd.split(' ')[0]}: command not found`, '');
        }
    }

    setTerminalOutput(output);
    setCurrentCommand('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      executeCommand(currentCommand);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex =
          historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setCurrentCommand(commandHistory[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex =
          historyIndex === commandHistory.length - 1 ? -1 : historyIndex + 1;
        setHistoryIndex(newIndex);
        setCurrentCommand(newIndex === -1 ? '' : commandHistory[newIndex]);
      }
    }
  };

  const connectToServer = () => {
    setIsConnected(true);
    setTerminalOutput([
      ...terminalOutput,
      `Connecting to ${username}@${host}:${port}...`,
      'Connected successfully!',
      `Last login: ${new Date().toLocaleString()}`,
      '',
    ]);
  };

  const quickConnect = (connection: SavedConnection) => {
    setHost(connection.host);
    setPort(connection.port.toString());
    setUsername(connection.username);
  };

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [terminalOutput]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 via-emerald-500 to-teal-600 bg-clip-text text-transparent">
            SSH Web Terminal
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Secure shell access directly from your browser
          </p>
        </div>
        <Badge
          className={`${
            isConnected
              ? 'bg-gradient-to-r from-green-500 to-emerald-500'
              : 'bg-gradient-to-r from-gray-500 to-slate-500'
          } text-white border-0`}
        >
          <Terminal className="w-3 h-3 mr-1" />
          {isConnected ? 'Connected' : 'Disconnected'}
        </Badge>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Connection Form */}
        <div className="space-y-6">
          {!isConnected && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Server className="w-5 h-5" />
                  SSH Connection
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Host</label>
                  <Input
                    placeholder="192.168.1.100 or example.com"
                    value={host}
                    onChange={(e) => setHost(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Port</label>
                    <Input
                      type="number"
                      placeholder="22"
                      value={port}
                      onChange={(e) => setPort(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Username</label>
                    <Input
                      placeholder="root"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Password</label>
                  <div className="relative">
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pr-10"
                    />
                    <button
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4 text-gray-400" />
                      ) : (
                        <Eye className="w-4 h-4 text-gray-400" />
                      )}
                    </button>
                  </div>
                </div>

                <Button
                  onClick={connectToServer}
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600"
                  disabled={!host || !username}
                >
                  <Play className="w-4 h-4 mr-2" />
                  Connect
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Saved Connections */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm">Saved Connections</CardTitle>
                <Button size="sm" variant="outline">
                  <Plus className="w-3 h-3 mr-1" />
                  Add
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {savedConnections.map((conn) => (
                  <div
                    key={conn.id}
                    className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all cursor-pointer"
                    onClick={() => quickConnect(conn)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                        <Server className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-medium text-sm">{conn.name}</h4>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          {conn.username}@{conn.host}:{conn.port}
                        </p>
                      </div>
                    </div>
                    <Button size="sm" variant="ghost">
                      <Trash2 className="w-3 h-3 text-red-600" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Terminal */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Terminal className="w-5 h-5" />
                Terminal
              </CardTitle>
              <div className="flex gap-2">
                <Button size="sm" variant="outline">
                  <Download className="w-3 h-3" />
                </Button>
                <Button size="sm" variant="outline">
                  <Upload className="w-3 h-3" />
                </Button>
                <Button size="sm" variant="outline">
                  <Settings className="w-3 h-3" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-900 rounded-lg p-4 h-[600px] flex flex-col">
              {/* Terminal Output */}
              <div
                ref={terminalRef}
                className="flex-1 overflow-y-auto font-mono text-sm text-green-400 mb-4"
              >
                {terminalOutput.map((line, i) => (
                  <div key={i}>{line}</div>
                ))}
              </div>

              {/* Command Input */}
              {isConnected && (
                <div className="flex items-center gap-2 font-mono text-sm">
                  <span className="text-green-400">
                    {username}@{host.split('.')[0] || 'server'}:~$
                  </span>
                  <input
                    type="text"
                    value={currentCommand}
                    onChange={(e) => setCurrentCommand(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="flex-1 bg-transparent text-green-400 outline-none border-none"
                    placeholder="Type command..."
                    autoFocus
                  />
                </div>
              )}
            </div>

            {/* Quick Commands */}
            {isConnected && (
              <div className="mt-4 flex flex-wrap gap-2">
                <Badge
                  variant="outline"
                  className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
                  onClick={() => executeCommand('ls -la')}
                >
                  ls -la
                </Badge>
                <Badge
                  variant="outline"
                  className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
                  onClick={() => executeCommand('df -h')}
                >
                  df -h
                </Badge>
                <Badge
                  variant="outline"
                  className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
                  onClick={() => executeCommand('free -h')}
                >
                  free -h
                </Badge>
                <Badge
                  variant="outline"
                  className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
                  onClick={() => executeCommand('top')}
                >
                  top
                </Badge>
                <Badge
                  variant="outline"
                  className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
                  onClick={() => executeCommand('clear')}
                >
                  clear
                </Badge>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Info */}
      <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Lock className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-blue-900 dark:text-blue-100 mb-1">
                Secure Connection
              </p>
              <p className="text-sm text-blue-800 dark:text-blue-200">
                All SSH connections are encrypted using TLS/SSL. Your credentials are never
                stored on our servers. For production use, consider using SSH key authentication
                instead of passwords.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
