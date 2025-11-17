'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Shield,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Search,
  Lock,
  Unlock,
  Bug,
  Globe,
  Server,
  FileSearch,
  Scan,
  Download,
  Play,
  Eye,
  Activity,
  Zap,
} from 'lucide-react';

const SECURITY_TOOLS = [
  { id: 'vulnerability', name: 'Vulnerability Scanner', icon: Bug },
  { id: 'malware', name: 'Malware Detection', icon: Shield },
  { id: 'ssl', name: 'SSL Inspector', icon: Lock },
  { id: 'headers', name: 'Security Headers', icon: FileSearch },
  { id: 'ports', name: 'Port Scanner', icon: Server },
];

interface ScanResult {
  level: 'critical' | 'high' | 'medium' | 'low' | 'info';
  title: string;
  description: string;
  fix?: string;
}

export default function SecurityPage() {
  const [selectedTool, setSelectedTool] = useState('vulnerability');
  const [targetUrl, setTargetUrl] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [vulnerabilities, setVulnerabilities] = useState<ScanResult[]>([]);
  const [malwareResults, setMalwareResults] = useState<any>(null);
  const [sslResults, setSSLResults] = useState<any>(null);
  const [headerResults, setHeaderResults] = useState<any>(null);
  const [portResults, setPortResults] = useState<any>(null);

  const runVulnerabilityScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setVulnerabilities([
        {
          level: 'critical',
          title: 'SQL Injection Vulnerability',
          description: 'Detected potential SQL injection in login form',
          fix: 'Use parameterized queries and prepared statements',
        },
        {
          level: 'high',
          title: 'Cross-Site Scripting (XSS)',
          description: 'User input not properly sanitized in comments section',
          fix: 'Implement input validation and output encoding',
        },
        {
          level: 'high',
          title: 'Outdated Dependencies',
          description: '12 packages with known security vulnerabilities',
          fix: 'Run npm audit fix or yarn upgrade',
        },
        {
          level: 'medium',
          title: 'Missing CSRF Protection',
          description: 'Forms lack CSRF tokens',
          fix: 'Implement CSRF token validation',
        },
        {
          level: 'medium',
          title: 'Weak Password Policy',
          description: 'Password requirements are too lenient',
          fix: 'Enforce minimum 12 characters with complexity requirements',
        },
        {
          level: 'low',
          title: 'Directory Listing Enabled',
          description: 'Server allows directory browsing',
          fix: 'Disable directory indexing in server config',
        },
        {
          level: 'info',
          title: 'Missing Security Headers',
          description: 'Some security headers are not set',
          fix: 'Add Content-Security-Policy, X-Frame-Options headers',
        },
      ]);
      setIsScanning(false);
    }, 2500);
  };

  const runMalwareScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setMalwareResults({
        status: 'clean',
        filesScanned: 1247,
        threats: 2,
        suspicious: 5,
        detections: [
          {
            file: '/uploads/suspicious-file.php',
            type: 'Backdoor',
            severity: 'critical',
            description: 'PHP backdoor detected - eval() with base64_decode',
          },
          {
            file: '/js/tracker.js',
            type: 'Cryptominer',
            severity: 'high',
            description: 'Cryptocurrency mining script detected',
          },
        ],
        suspiciousFiles: [
          '/uploads/shell.txt (renamed PHP file)',
          '/cache/.htaccess (unusual location)',
          '/tmp/data.dat (encoded content)',
        ],
      });
      setIsScanning(false);
    }, 3000);
  };

  const runSSLCheck = () => {
    setIsScanning(true);
    setTimeout(() => {
      setSSLResults({
        grade: 'A',
        status: 'valid',
        issuer: "Let's Encrypt",
        validFrom: '2024-01-15',
        validUntil: '2024-04-15',
        daysRemaining: 45,
        protocol: 'TLS 1.3',
        cipher: 'TLS_AES_256_GCM_SHA384',
        keyExchange: 'X25519',
        issues: [
          { level: 'warning', text: 'Certificate expires in 45 days' },
        ],
        strengths: [
          'Strong cipher suites',
          'TLS 1.3 supported',
          'Perfect Forward Secrecy enabled',
          'HTTP Strict Transport Security (HSTS) enabled',
        ],
      });
      setIsScanning(false);
    }, 2000);
  };

  const runHeaderCheck = () => {
    setIsScanning(true);
    setTimeout(() => {
      setHeaderResults({
        score: 75,
        headers: [
          { name: 'Content-Security-Policy', status: 'present', value: "default-src 'self'" },
          { name: 'X-Frame-Options', status: 'present', value: 'DENY' },
          { name: 'X-Content-Type-Options', status: 'present', value: 'nosniff' },
          { name: 'Strict-Transport-Security', status: 'present', value: 'max-age=31536000' },
          { name: 'Referrer-Policy', status: 'missing', value: null },
          { name: 'Permissions-Policy', status: 'missing', value: null },
        ],
        recommendations: [
          'Add Referrer-Policy header (no-referrer or strict-origin)',
          'Implement Permissions-Policy to control browser features',
          'Consider adding Content-Security-Policy-Report-Only for testing',
        ],
      });
      setIsScanning(false);
    }, 1500);
  };

  const runPortScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setPortResults({
        host: targetUrl || 'example.com',
        openPorts: [
          { port: 22, service: 'SSH', status: 'open', risk: 'low' },
          { port: 80, service: 'HTTP', status: 'open', risk: 'low' },
          { port: 443, service: 'HTTPS', status: 'open', risk: 'low' },
          { port: 3306, service: 'MySQL', status: 'open', risk: 'high' },
          { port: 8080, service: 'HTTP-Proxy', status: 'filtered', risk: 'medium' },
        ],
        closedPorts: 65530,
        warnings: [
          'MySQL port (3306) is publicly accessible - should be firewalled',
          'Consider disabling unused services',
        ],
      });
      setIsScanning(false);
    }, 4000);
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'critical':
        return 'text-red-600 bg-red-50 border-red-200';
      case 'high':
        return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'medium':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low':
        return 'text-blue-600 bg-blue-50 border-blue-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getLevelIcon = (level: string) => {
    switch (level) {
      case 'critical':
      case 'high':
        return <XCircle className="w-5 h-5" />;
      case 'medium':
        return <AlertTriangle className="w-5 h-5" />;
      default:
        return <AlertTriangle className="w-5 h-5" />;
    }
  };

  const renderToolContent = () => {
    switch (selectedTool) {
      case 'vulnerability':
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Target URL or IP</label>
              <div className="flex gap-2">
                <Input
                  placeholder="https://example.com or 192.168.1.1"
                  value={targetUrl}
                  onChange={(e) => setTargetUrl(e.target.value)}
                  className="flex-1"
                />
                <Button
                  onClick={runVulnerabilityScan}
                  disabled={isScanning}
                  className="bg-gradient-to-r from-red-600 to-orange-600"
                >
                  {isScanning ? (
                    <>Scanning...</>
                  ) : (
                    <>
                      <Scan className="w-4 h-4 mr-2" />
                      Scan
                    </>
                  )}
                </Button>
              </div>
            </div>

            {vulnerabilities.length > 0 && (
              <>
                <Card className="bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20">
                  <CardContent className="p-6">
                    <div className="grid grid-cols-4 gap-4">
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Critical</p>
                        <p className="text-3xl font-bold text-red-600">
                          {vulnerabilities.filter((v) => v.level === 'critical').length}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">High</p>
                        <p className="text-3xl font-bold text-orange-600">
                          {vulnerabilities.filter((v) => v.level === 'high').length}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Medium</p>
                        <p className="text-3xl font-bold text-yellow-600">
                          {vulnerabilities.filter((v) => v.level === 'medium').length}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Low</p>
                        <p className="text-3xl font-bold text-blue-600">
                          {vulnerabilities.filter((v) => v.level === 'low').length}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Vulnerabilities Found</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {vulnerabilities.map((vuln, i) => (
                        <div
                          key={i}
                          className={`p-4 border-l-4 rounded-lg ${getLevelColor(vuln.level)}`}
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center gap-2">
                              {getLevelIcon(vuln.level)}
                              <h4 className="font-bold">{vuln.title}</h4>
                            </div>
                            <Badge className={`${getLevelColor(vuln.level)} border`}>
                              {vuln.level.toUpperCase()}
                            </Badge>
                          </div>
                          <p className="text-sm mb-2">{vuln.description}</p>
                          {vuln.fix && (
                            <div className="mt-3 pt-3 border-t">
                              <p className="text-xs font-semibold mb-1">Recommended Fix:</p>
                              <p className="text-xs">{vuln.fix}</p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <div className="flex gap-2">
                  <Button variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Export Report
                  </Button>
                  <Button variant="outline">
                    <Eye className="w-4 h-4 mr-2" />
                    Detailed Analysis
                  </Button>
                </div>
              </>
            )}
          </div>
        );

      case 'malware':
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Scan Target</label>
              <div className="flex gap-2">
                <Input placeholder="Website URL or server path" className="flex-1" />
                <Button
                  onClick={runMalwareScan}
                  disabled={isScanning}
                  className="bg-gradient-to-r from-purple-600 to-pink-600"
                >
                  {isScanning ? (
                    <>Scanning...</>
                  ) : (
                    <>
                      <Shield className="w-4 h-4 mr-2" />
                      Deep Scan
                    </>
                  )}
                </Button>
              </div>
            </div>

            {malwareResults && (
              <>
                <Card className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
                  <CardContent className="p-6">
                    <div className="grid grid-cols-4 gap-4">
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Files Scanned</p>
                        <p className="text-3xl font-bold text-purple-600">
                          {malwareResults.filesScanned.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Threats</p>
                        <p className="text-3xl font-bold text-red-600">{malwareResults.threats}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Suspicious</p>
                        <p className="text-3xl font-bold text-yellow-600">
                          {malwareResults.suspicious}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Status</p>
                        <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0">
                          {malwareResults.status}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {malwareResults.detections.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-red-600">Malware Detected</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {malwareResults.detections.map((detection: any, i: number) => (
                          <div
                            key={i}
                            className="p-4 border-l-4 border-red-600 bg-red-50 dark:bg-red-900/20 rounded-lg"
                          >
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <h4 className="font-bold text-red-600">{detection.type}</h4>
                                <p className="text-xs text-gray-600 dark:text-gray-400 font-mono mt-1">
                                  {detection.file}
                                </p>
                              </div>
                              <Badge className="bg-red-600 text-white border-0">
                                {detection.severity}
                              </Badge>
                            </div>
                            <p className="text-sm">{detection.description}</p>
                            <div className="mt-3 flex gap-2">
                              <Button size="sm" variant="destructive">
                                Quarantine
                              </Button>
                              <Button size="sm" variant="outline">
                                View Details
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {malwareResults.suspiciousFiles.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Suspicious Files</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {malwareResults.suspiciousFiles.map((file: string, i: number) => (
                          <li
                            key={i}
                            className="flex items-center gap-2 p-2 border rounded hover:bg-gray-50 dark:hover:bg-gray-800/50"
                          >
                            <AlertTriangle className="w-4 h-4 text-yellow-600" />
                            <span className="text-sm font-mono flex-1">{file}</span>
                            <Button size="sm" variant="outline">
                              Inspect
                            </Button>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                )}
              </>
            )}
          </div>
        );

      case 'ssl':
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Domain</label>
              <div className="flex gap-2">
                <Input placeholder="example.com" className="flex-1" />
                <Button
                  onClick={runSSLCheck}
                  disabled={isScanning}
                  className="bg-gradient-to-r from-green-600 to-emerald-600"
                >
                  {isScanning ? (
                    <>Checking...</>
                  ) : (
                    <>
                      <Lock className="w-4 h-4 mr-2" />
                      Check SSL
                    </>
                  )}
                </Button>
              </div>
            </div>

            {sslResults && (
              <>
                <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold mb-1">SSL/TLS Grade</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {sslResults.issuer}
                        </p>
                      </div>
                      <div className="text-6xl font-bold text-green-600">{sslResults.grade}</div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <p className="text-xs text-gray-600 dark:text-gray-400">Protocol</p>
                        <p className="font-bold">{sslResults.protocol}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 dark:text-gray-400">Expires In</p>
                        <p className="font-bold">{sslResults.daysRemaining} days</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 dark:text-gray-400">Status</p>
                        <Badge className="bg-green-600 text-white border-0">
                          {sslResults.status}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="grid md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-green-600">Strengths</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {sslResults.strengths.map((strength: string, i: number) => (
                          <li key={i} className="flex items-center gap-2 text-sm">
                            <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
                            {strength}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-yellow-600">Issues</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {sslResults.issues.length > 0 ? (
                        <ul className="space-y-2">
                          {sslResults.issues.map((issue: any, i: number) => (
                            <li key={i} className="flex items-center gap-2 text-sm">
                              <AlertTriangle className="w-4 h-4 text-yellow-600 flex-shrink-0" />
                              {issue.text}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-sm text-gray-500">No issues found</p>
                      )}
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Certificate Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600 dark:text-gray-400">Valid From:</span>
                        <span className="ml-2 font-medium">{sslResults.validFrom}</span>
                      </div>
                      <div>
                        <span className="text-gray-600 dark:text-gray-400">Valid Until:</span>
                        <span className="ml-2 font-medium">{sslResults.validUntil}</span>
                      </div>
                      <div>
                        <span className="text-gray-600 dark:text-gray-400">Cipher:</span>
                        <span className="ml-2 font-mono text-xs">{sslResults.cipher}</span>
                      </div>
                      <div>
                        <span className="text-gray-600 dark:text-gray-400">Key Exchange:</span>
                        <span className="ml-2 font-medium">{sslResults.keyExchange}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
          </div>
        );

      case 'headers':
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Website URL</label>
              <div className="flex gap-2">
                <Input placeholder="https://example.com" className="flex-1" />
                <Button
                  onClick={runHeaderCheck}
                  disabled={isScanning}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600"
                >
                  {isScanning ? (
                    <>Checking...</>
                  ) : (
                    <>
                      <FileSearch className="w-4 h-4 mr-2" />
                      Analyze
                    </>
                  )}
                </Button>
              </div>
            </div>

            {headerResults && (
              <>
                <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold mb-1">Security Score</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          HTTP Security Headers
                        </p>
                      </div>
                      <div className="text-6xl font-bold text-blue-600">{headerResults.score}</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Security Headers</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {headerResults.headers.map((header: any, i: number) => (
                        <div
                          key={i}
                          className="flex items-center justify-between p-3 border rounded-lg"
                        >
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              {header.status === 'present' ? (
                                <CheckCircle2 className="w-4 h-4 text-green-600" />
                              ) : (
                                <XCircle className="w-4 h-4 text-red-600" />
                              )}
                              <span className="font-medium">{header.name}</span>
                            </div>
                            {header.value && (
                              <p className="text-xs font-mono text-gray-600 dark:text-gray-400 ml-6">
                                {header.value}
                              </p>
                            )}
                          </div>
                          <Badge
                            className={
                              header.status === 'present'
                                ? 'bg-green-100 text-green-800 border-green-200'
                                : 'bg-red-100 text-red-800 border-red-200'
                            }
                          >
                            {header.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Recommendations</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {headerResults.recommendations.map((rec: string, i: number) => (
                        <li key={i} className="flex items-start gap-2">
                          <Zap className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </>
            )}
          </div>
        );

      case 'ports':
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Target Host</label>
              <div className="flex gap-2">
                <Input
                  placeholder="192.168.1.1 or example.com"
                  value={targetUrl}
                  onChange={(e) => setTargetUrl(e.target.value)}
                  className="flex-1"
                />
                <Button
                  onClick={runPortScan}
                  disabled={isScanning}
                  className="bg-gradient-to-r from-indigo-600 to-purple-600"
                >
                  {isScanning ? (
                    <>Scanning...</>
                  ) : (
                    <>
                      <Server className="w-4 h-4 mr-2" />
                      Scan Ports
                    </>\n                  )}
                </Button>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Note: Port scanning may take several minutes
              </p>
            </div>

            {portResults && (
              <>
                <Card className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20">
                  <CardContent className="p-6">
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Open Ports</p>
                        <p className="text-3xl font-bold text-indigo-600">
                          {portResults.openPorts.length}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Closed</p>
                        <p className="text-3xl font-bold text-gray-600">
                          {portResults.closedPorts.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Host</p>
                        <p className="text-sm font-mono font-bold">{portResults.host}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Open Ports</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {portResults.openPorts.map((port: any, i: number) => (
                        <div
                          key={i}
                          className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50"
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold">
                              {port.port}
                            </div>
                            <div>
                              <h4 className="font-medium">{port.service}</h4>
                              <p className="text-xs text-gray-600 dark:text-gray-400">
                                Port {port.port} • {port.status}
                              </p>
                            </div>
                          </div>
                          <Badge
                            className={
                              port.risk === 'high'
                                ? 'bg-red-100 text-red-800 border-red-200'
                                : port.risk === 'medium'
                                  ? 'bg-yellow-100 text-yellow-800 border-yellow-200'
                                  : 'bg-green-100 text-green-800 border-green-200'
                            }
                          >
                            {port.risk} risk
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {portResults.warnings.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-yellow-600">Security Warnings</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {portResults.warnings.map((warning: string, i: number) => (
                          <li key={i} className="flex items-start gap-2">
                            <AlertTriangle className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{warning}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                )}
              </>
            )}
          </div>
        );

      default:
        return <p>Select a tool to get started</p>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-red-600 via-orange-500 to-yellow-600 bg-clip-text text-transparent">
            Security Suite
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Comprehensive security scanning and vulnerability detection
          </p>
        </div>
        <Badge className="bg-gradient-to-r from-red-500 to-orange-500 text-white border-0">
          <Shield className="w-3 h-3 mr-1" />
          {SECURITY_TOOLS.length} Tools
        </Badge>
      </div>

      {/* Tool Selection */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {SECURITY_TOOLS.map((tool) => (
          <Card
            key={tool.id}
            onClick={() => setSelectedTool(tool.id)}
            className={`cursor-pointer transition-all ${
              selectedTool === tool.id
                ? 'ring-2 ring-red-500 bg-red-50 dark:bg-red-900/20'
                : 'hover:shadow-lg'
            }`}
          >
            <CardContent className="p-4 text-center">
              <tool.icon className="w-8 h-8 mx-auto mb-2 text-red-600" />
              <p className="text-xs font-medium">{tool.name}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tool Content */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {SECURITY_TOOLS.find((t) => t.id === selectedTool)?.icon && (
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center">
                {(() => {
                  const Icon = SECURITY_TOOLS.find((t) => t.id === selectedTool)!.icon;
                  return <Icon className="w-5 h-5 text-white" />;
                })()}
              </div>
            )}
            {SECURITY_TOOLS.find((t) => t.id === selectedTool)?.name}
          </CardTitle>
        </CardHeader>
        <CardContent>{renderToolContent()}</CardContent>
      </Card>
    </div>
  );
}
