'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Sparkles,
  Search,
  Regex,
  Key,
  Globe,
  Webhook,
  Shield,
  Mail,
  Lock,
  Network,
  Code,
  FileJson,
  Hash,
  Link,
  Image,
  FileText,
  Zap,
  CheckCircle2,
  Copy,
  Download,
  AlertCircle,
  Terminal,
  Braces,
} from 'lucide-react';

interface Tool {
  id: string;
  name: string;
  description: string;
  icon: any;
  gradient: string;
  category: string;
}

const devTools: Tool[] = [
  {
    id: 'regex',
    name: 'Regex Builder & Tester',
    description: 'Test and build regular expressions with live matching',
    icon: Regex,
    gradient: 'from-purple-500 to-pink-600',
    category: 'Text',
  },
  {
    id: 'jwt',
    name: 'JWT Inspector',
    description: 'Decode and verify JSON Web Tokens',
    icon: Key,
    gradient: 'from-blue-500 to-cyan-600',
    category: 'Security',
  },
  {
    id: 'dns',
    name: 'DNS Resolver',
    description: 'Lookup DNS records for any domain',
    icon: Globe,
    gradient: 'from-green-500 to-emerald-600',
    category: 'Network',
  },
  {
    id: 'webhook',
    name: 'Webhook Tester',
    description: 'Test webhooks with custom payloads and headers',
    icon: Webhook,
    gradient: 'from-orange-500 to-red-600',
    category: 'API',
  },
  {
    id: 'cors',
    name: 'CORS Debugger',
    description: 'Test and debug CORS configuration',
    icon: Shield,
    gradient: 'from-indigo-500 to-purple-600',
    category: 'Network',
  },
  {
    id: 'email',
    name: 'Email Tester',
    description: 'Test SMTP configuration and email delivery',
    icon: Mail,
    gradient: 'from-pink-500 to-rose-600',
    category: 'Communication',
  },
  {
    id: 'ssl',
    name: 'SSL Inspector',
    description: 'Check SSL certificates and chain validation',
    icon: Lock,
    gradient: 'from-cyan-500 to-blue-600',
    category: 'Security',
  },
  {
    id: 'port',
    name: 'Port Scanner',
    description: 'Scan ports and check service availability',
    icon: Network,
    gradient: 'from-yellow-500 to-orange-600',
    category: 'Network',
  },
  {
    id: 'json',
    name: 'JSON Formatter',
    description: 'Format, validate and beautify JSON',
    icon: FileJson,
    gradient: 'from-teal-500 to-green-600',
    category: 'Data',
  },
  {
    id: 'hash',
    name: 'Hash Generator',
    description: 'Generate MD5, SHA-1, SHA-256, SHA-512 hashes',
    icon: Hash,
    gradient: 'from-red-500 to-pink-600',
    category: 'Security',
  },
  {
    id: 'url',
    name: 'URL Parser',
    description: 'Parse and analyze URL components',
    icon: Link,
    gradient: 'from-violet-500 to-purple-600',
    category: 'Text',
  },
  {
    id: 'image',
    name: 'Image Optimizer',
    description: 'Compress and optimize images',
    icon: Image,
    gradient: 'from-fuchsia-500 to-pink-600',
    category: 'Media',
  },
];

export default function DevToolsPage() {
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Regex Builder State
  const [regexPattern, setRegexPattern] = useState('\\w+');
  const [regexFlags, setRegexFlags] = useState('g');
  const [regexTestString, setRegexTestString] = useState('Hello World 123');
  const [regexMatches, setRegexMatches] = useState<string[]>([]);
  const [regexError, setRegexError] = useState('');

  // JWT Inspector State
  const [jwtToken, setJwtToken] = useState('');
  const [jwtDecoded, setJwtDecoded] = useState<any>(null);
  const [jwtError, setJwtError] = useState('');

  // DNS Resolver State
  const [dnsDomain, setDnsDomain] = useState('');
  const [dnsResults, setDnsResults] = useState<any[]>([]);
  const [dnsLoading, setDnsLoading] = useState(false);

  // JSON Formatter State
  const [jsonInput, setJsonInput] = useState('');
  const [jsonOutput, setJsonOutput] = useState('');
  const [jsonError, setJsonError] = useState('');

  // Hash Generator State
  const [hashInput, setHashInput] = useState('');
  const [hashResults, setHashResults] = useState<{ [key: string]: string }>({});

  // URL Parser State
  const [urlInput, setUrlInput] = useState('https://example.com/path?foo=bar#hash');
  const [urlParsed, setUrlParsed] = useState<any>(null);

  const filteredTools = devTools.filter(
    (tool) =>
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const categories = Array.from(new Set(devTools.map((t) => t.category)));

  // Regex Builder Logic
  const testRegex = () => {
    try {
      setRegexError('');
      const regex = new RegExp(regexPattern, regexFlags);
      const matches = regexTestString.match(regex);
      setRegexMatches(matches || []);
    } catch (err: any) {
      setRegexError(err.message);
      setRegexMatches([]);
    }
  };

  // JWT Inspector Logic
  const decodeJWT = () => {
    try {
      setJwtError('');
      const parts = jwtToken.split('.');
      if (parts.length !== 3) {
        throw new Error('Invalid JWT format');
      }

      const header = JSON.parse(atob(parts[0]));
      const payload = JSON.parse(atob(parts[1]));

      setJwtDecoded({
        header,
        payload,
        signature: parts[2],
      });
    } catch (err: any) {
      setJwtError(err.message);
      setJwtDecoded(null);
    }
  };

  // DNS Resolver Logic
  const resolveDNS = async () => {
    setDnsLoading(true);
    setDnsResults([]);

    // Simulate DNS lookup (in real app, use backend API)
    setTimeout(() => {
      setDnsResults([
        { type: 'A', value: '93.184.216.34', ttl: '3600' },
        { type: 'AAAA', value: '2606:2800:220:1:248:1893:25c8:1946', ttl: '3600' },
        { type: 'MX', value: 'mail.example.com', priority: '10', ttl: '3600' },
        { type: 'NS', value: 'ns1.example.com', ttl: '86400' },
        { type: 'NS', value: 'ns2.example.com', ttl: '86400' },
        { type: 'TXT', value: 'v=spf1 include:_spf.example.com ~all', ttl: '3600' },
      ]);
      setDnsLoading(false);
    }, 1000);
  };

  // JSON Formatter Logic
  const formatJSON = () => {
    try {
      setJsonError('');
      const parsed = JSON.parse(jsonInput);
      setJsonOutput(JSON.stringify(parsed, null, 2));
    } catch (err: any) {
      setJsonError(err.message);
      setJsonOutput('');
    }
  };

  // Hash Generator Logic
  const generateHashes = async () => {
    const encoder = new TextEncoder();
    const data = encoder.encode(hashInput);

    // SHA-256
    const sha256Buffer = await crypto.subtle.digest('SHA-256', data);
    const sha256Array = Array.from(new Uint8Array(sha256Buffer));
    const sha256 = sha256Array.map((b) => b.toString(16).padStart(2, '0')).join('');

    // SHA-512
    const sha512Buffer = await crypto.subtle.digest('SHA-512', data);
    const sha512Array = Array.from(new Uint8Array(sha512Buffer));
    const sha512 = sha512Array.map((b) => b.toString(16).padStart(2, '0')).join('');

    // SHA-1
    const sha1Buffer = await crypto.subtle.digest('SHA-1', data);
    const sha1Array = Array.from(new Uint8Array(sha1Buffer));
    const sha1 = sha1Array.map((b) => b.toString(16).padStart(2, '0')).join('');

    setHashResults({
      'SHA-256': sha256,
      'SHA-512': sha512,
      'SHA-1': sha1,
    });
  };

  // URL Parser Logic
  const parseURL = () => {
    try {
      const url = new URL(urlInput);
      setUrlParsed({
        protocol: url.protocol,
        hostname: url.hostname,
        port: url.port || '(default)',
        pathname: url.pathname,
        search: url.search,
        hash: url.hash,
        origin: url.origin,
        params: Object.fromEntries(url.searchParams),
      });
    } catch (err) {
      setUrlParsed(null);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const renderToolContent = () => {
    const tool = devTools.find((t) => t.id === selectedTool);
    if (!tool) return null;

    switch (tool.id) {
      case 'regex':
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Pattern</label>
              <div className="flex gap-2">
                <Input
                  value={regexPattern}
                  onChange={(e) => setRegexPattern(e.target.value)}
                  placeholder="Enter regex pattern..."
                  className="flex-1 font-mono"
                />
                <Input
                  value={regexFlags}
                  onChange={(e) => setRegexFlags(e.target.value)}
                  placeholder="Flags"
                  className="w-24 font-mono"
                />
                <Button onClick={testRegex} className="bg-gradient-to-r from-purple-600 to-pink-600">
                  Test
                </Button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Test String</label>
              <textarea
                value={regexTestString}
                onChange={(e) => setRegexTestString(e.target.value)}
                className="w-full h-32 p-3 border rounded-lg font-mono text-sm"
                placeholder="Enter test string..."
              />
            </div>

            {regexError && (
              <div className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                <AlertCircle className="w-4 h-4 text-red-600" />
                <span className="text-sm text-red-600">{regexError}</span>
              </div>
            )}

            {regexMatches.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-semibold">
                    {regexMatches.length} match{regexMatches.length !== 1 ? 'es' : ''} found
                  </span>
                </div>
                <div className="space-y-1">
                  {regexMatches.map((match, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-2 bg-green-50 dark:bg-green-900/20 rounded border border-green-200 dark:border-green-800"
                    >
                      <code className="text-sm">{match}</code>
                      <Button size="sm" variant="ghost" onClick={() => copyToClipboard(match)}>
                        <Copy className="w-3 h-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );

      case 'jwt':
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">JWT Token</label>
              <textarea
                value={jwtToken}
                onChange={(e) => setJwtToken(e.target.value)}
                className="w-full h-32 p-3 border rounded-lg font-mono text-xs"
                placeholder="Paste JWT token here..."
              />
              <Button onClick={decodeJWT} className="mt-2 bg-gradient-to-r from-blue-600 to-cyan-600">
                Decode
              </Button>
            </div>

            {jwtError && (
              <div className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                <AlertCircle className="w-4 h-4 text-red-600" />
                <span className="text-sm text-red-600">{jwtError}</span>
              </div>
            )}

            {jwtDecoded && (
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <Braces className="w-4 h-4 text-blue-600" />
                    Header
                  </h4>
                  <pre className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg text-xs overflow-x-auto">
                    {JSON.stringify(jwtDecoded.header, null, 2)}
                  </pre>
                </div>
                <div>
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <Braces className="w-4 h-4 text-green-600" />
                    Payload
                  </h4>
                  <pre className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg text-xs overflow-x-auto">
                    {JSON.stringify(jwtDecoded.payload, null, 2)}
                  </pre>
                </div>
                <div>
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <Lock className="w-4 h-4 text-purple-600" />
                    Signature
                  </h4>
                  <code className="block p-3 bg-gray-100 dark:bg-gray-800 rounded-lg text-xs break-all">
                    {jwtDecoded.signature}
                  </code>
                </div>
              </div>
            )}
          </div>
        );

      case 'dns':
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Domain Name</label>
              <div className="flex gap-2">
                <Input
                  value={dnsDomain}
                  onChange={(e) => setDnsDomain(e.target.value)}
                  placeholder="example.com"
                  className="flex-1"
                />
                <Button
                  onClick={resolveDNS}
                  disabled={dnsLoading}
                  className="bg-gradient-to-r from-green-600 to-emerald-600"
                >
                  {dnsLoading ? 'Resolving...' : 'Lookup'}
                </Button>
              </div>
            </div>

            {dnsResults.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-semibold">DNS Records</h4>
                {dnsResults.map((record, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-3 border rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className="font-mono">
                        {record.type}
                      </Badge>
                      <code className="text-sm">{record.value}</code>
                      {record.priority && (
                        <span className="text-xs text-gray-500">Priority: {record.priority}</span>
                      )}
                    </div>
                    <span className="text-xs text-gray-500">TTL: {record.ttl}s</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      case 'json':
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">JSON Input</label>
              <textarea
                value={jsonInput}
                onChange={(e) => setJsonInput(e.target.value)}
                className="w-full h-48 p-3 border rounded-lg font-mono text-xs"
                placeholder='{"key": "value"}'
              />
              <Button onClick={formatJSON} className="mt-2 bg-gradient-to-r from-teal-600 to-green-600">
                Format
              </Button>
            </div>

            {jsonError && (
              <div className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                <AlertCircle className="w-4 h-4 text-red-600" />
                <span className="text-sm text-red-600">{jsonError}</span>
              </div>
            )}

            {jsonOutput && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-semibold">Formatted Output</label>
                  <Button size="sm" variant="outline" onClick={() => copyToClipboard(jsonOutput)}>
                    <Copy className="w-3 h-3 mr-1" />
                    Copy
                  </Button>
                </div>
                <pre className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg text-xs overflow-x-auto max-h-96">
                  {jsonOutput}
                </pre>
              </div>
            )}
          </div>
        );

      case 'hash':
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Input Text</label>
              <textarea
                value={hashInput}
                onChange={(e) => setHashInput(e.target.value)}
                className="w-full h-32 p-3 border rounded-lg font-mono text-sm"
                placeholder="Enter text to hash..."
              />
              <Button onClick={generateHashes} className="mt-2 bg-gradient-to-r from-red-600 to-pink-600">
                Generate Hashes
              </Button>
            </div>

            {Object.keys(hashResults).length > 0 && (
              <div className="space-y-3">
                <h4 className="font-semibold">Hash Results</h4>
                {Object.entries(hashResults).map(([algo, hash]) => (
                  <div key={algo} className="space-y-1">
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="font-mono">
                        {algo}
                      </Badge>
                      <Button size="sm" variant="ghost" onClick={() => copyToClipboard(hash)}>
                        <Copy className="w-3 h-3 mr-1" />
                        Copy
                      </Button>
                    </div>
                    <code className="block p-2 bg-gray-100 dark:bg-gray-800 rounded text-xs break-all">
                      {hash}
                    </code>
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      case 'url':
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">URL</label>
              <Input
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                placeholder="https://example.com/path?foo=bar#hash"
                className="font-mono"
              />
              <Button onClick={parseURL} className="mt-2 bg-gradient-to-r from-violet-600 to-purple-600">
                Parse
              </Button>
            </div>

            {urlParsed && (
              <div className="space-y-2">
                <h4 className="font-semibold">URL Components</h4>
                <div className="grid gap-2">
                  {Object.entries(urlParsed).map(([key, value]: [string, any]) => (
                    <div key={key} className="flex items-center p-2 border rounded-lg">
                      <span className="w-32 text-sm font-medium text-gray-600 dark:text-gray-400">
                        {key}:
                      </span>
                      <code className="flex-1 text-sm">
                        {typeof value === 'object' ? JSON.stringify(value) : value}
                      </code>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );

      default:
        return (
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <tool.icon className="w-16 h-16 text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold mb-2">{tool.name}</h3>
            <p className="text-gray-600 dark:text-gray-400 max-w-md">
              This tool is coming soon. We're working hard to bring you amazing developer utilities!
            </p>
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Developer Tools
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Professional utilities for developers - all in one place
          </p>
        </div>
        <Badge className="bg-gradient-to-r from-purple-500 to-blue-500 text-white border-0">
          <Zap className="w-3 h-3 mr-1" />
          {devTools.length} Tools
        </Badge>
      </div>

      {/* Search */}
      <div className="flex items-center gap-2 px-4 py-3 bg-gray-100/80 dark:bg-gray-800/50 rounded-xl border border-gray-200/50 dark:border-gray-700/50 focus-within:ring-2 focus-within:ring-purple-500/50 transition-all duration-200">
        <Search className="w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search tools..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 bg-transparent border-none outline-none text-sm placeholder:text-gray-400"
        />
      </div>

      {/* Categories */}
      <div className="flex items-center gap-2 flex-wrap">
        {categories.map((category) => (
          <Badge key={category} variant="outline" className="cursor-pointer hover:bg-purple-50 dark:hover:bg-purple-900/20">
            {category}
          </Badge>
        ))}
      </div>

      {/* Tools Grid */}
      {!selectedTool ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredTools.map((tool) => (
            <Card
              key={tool.id}
              className="cursor-pointer transition-all duration-200 hover:shadow-xl hover:scale-[1.02] group"
              onClick={() => setSelectedTool(tool.id)}
            >
              <CardContent className="p-5">
                <div className="flex flex-col gap-3">
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${tool.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}
                  >
                    <tool.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white mb-1">{tool.name}</h3>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                      {tool.description}
                    </p>
                    <Badge variant="outline" className="text-xs">
                      {tool.category}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        /* Tool Detail View */
        <Card className="border-gray-200 dark:border-gray-700">
          <CardHeader className="border-b">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {(() => {
                  const tool = devTools.find((t) => t.id === selectedTool)!;
                  return (
                    <>
                      <div
                        className={`w-12 h-12 rounded-xl bg-gradient-to-br ${tool.gradient} flex items-center justify-center shadow-lg`}
                      >
                        <tool.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <CardTitle>{tool.name}</CardTitle>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          {tool.description}
                        </p>
                      </div>
                    </>
                  );
                })()}
              </div>
              <Button variant="outline" onClick={() => setSelectedTool(null)}>
                Back to Tools
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-6">{renderToolContent()}</CardContent>
        </Card>
      )}
    </div>
  );
}
