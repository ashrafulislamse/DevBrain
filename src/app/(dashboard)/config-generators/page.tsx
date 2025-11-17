'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  FileCode,
  Server,
  Download,
  Copy,
  CheckCircle2,
  Settings,
  Globe,
  Lock,
  Zap,
  Code,
} from 'lucide-react';

const CONFIG_TOOLS = [
  { id: 'htaccess', name: '.htaccess Generator', icon: FileCode },
  { id: 'nginx', name: 'Nginx Config', icon: Server },
];

export default function ConfigGeneratorsPage() {
  const [selectedTool, setSelectedTool] = useState('htaccess');
  const [copied, setCopied] = useState(false);

  // .htaccess options
  const [domain, setDomain] = useState('');
  const [forceHttps, setForceHttps] = useState(true);
  const [forceWww, setForceWww] = useState(false);
  const [removeWww, setRemoveWww] = useState(true);
  const [enableGzip, setEnableGzip] = useState(true);
  const [enableCache, setEnableCache] = useState(true);
  const [blockDirectoryListing, setBlockDirectoryListing] = useState(true);
  const [customErrorPages, setCustomErrorPages] = useState(true);

  // Nginx options
  const [serverName, setServerName] = useState('');
  const [port, setPort] = useState('80');
  const [sslPort, setSslPort] = useState('443');
  const [rootPath, setRootPath] = useState('/var/www/html');
  const [phpVersion, setPhpVersion] = useState('8.2');
  const [enableSsl, setEnableSsl] = useState(true);
  const [enableHttp2, setEnableHttp2] = useState(true);
  const [enableGzipNginx, setEnableGzipNginx] = useState(true);
  const [proxyPass, setProxyPass] = useState('');

  const generateHtaccess = () => {
    let config = `# Generated .htaccess Configuration\n# ${new Date().toLocaleDateString()}\n\n`;

    if (forceHttps) {
      config += `# Force HTTPS\nRewriteEngine On\nRewriteCond %{HTTPS} off\nRewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]\n\n`;
    }

    if (forceWww) {
      config += `# Force WWW\nRewriteCond %{HTTP_HOST} !^www\\. [NC]\nRewriteRule ^(.*)$ https://www.%{HTTP_HOST}%{REQUEST_URI} [L,R=301]\n\n`;
    }

    if (removeWww) {
      config += `# Remove WWW\nRewriteCond %{HTTP_HOST} ^www\\.(.*)$ [NC]\nRewriteRule ^(.*)$ https://%1/$1 [R=301,L]\n\n`;
    }

    if (blockDirectoryListing) {
      config += `# Disable Directory Listing\nOptions -Indexes\n\n`;
    }

    if (enableGzip) {
      config += `# Enable GZIP Compression\n<IfModule mod_deflate.c>\n  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript application/json\n</IfModule>\n\n`;
    }

    if (enableCache) {
      config += `# Browser Caching\n<IfModule mod_expires.c>\n  ExpiresActive On\n  ExpiresByType image/jpg "access plus 1 year"\n  ExpiresByType image/jpeg "access plus 1 year"\n  ExpiresByType image/gif "access plus 1 year"\n  ExpiresByType image/png "access plus 1 year"\n  ExpiresByType image/svg+xml "access plus 1 year"\n  ExpiresByType text/css "access plus 1 month"\n  ExpiresByType application/javascript "access plus 1 month"\n  ExpiresByType application/pdf "access plus 1 month"\n  ExpiresByType text/x-javascript "access plus 1 month"\n  ExpiresByType image/x-icon "access plus 1 year"\n  ExpiresDefault "access plus 2 days"\n</IfModule>\n\n`;
    }

    if (customErrorPages) {
      config += `# Custom Error Pages\nErrorDocument 404 /404.html\nErrorDocument 500 /500.html\n\n`;
    }

    config += `# Security Headers\n<IfModule mod_headers.c>\n  Header set X-Content-Type-Options "nosniff"\n  Header set X-Frame-Options "SAMEORIGIN"\n  Header set X-XSS-Protection "1; mode=block"\n  Header set Referrer-Policy "strict-origin-when-cross-origin"\n</IfModule>\n\n`;

    config += `# Protect wp-config.php (if WordPress)\n<files wp-config.php>\n  order allow,deny\n  deny from all\n</files>\n\n`;

    config += `# Protect .htaccess and .htpasswd\n<FilesMatch "^\\.(htaccess|htpasswd)$">\n  Require all denied\n</FilesMatch>\n`;

    return config;
  };

  const generateNginxConfig = () => {
    let config = `# Generated Nginx Configuration\n# ${new Date().toLocaleDateString()}\n\n`;

    if (enableSsl) {
      // HTTP to HTTPS redirect
      config += `server {\n  listen ${port};\n  server_name ${serverName || 'example.com'};\n  return 301 https://$server_name$request_uri;\n}\n\n`;

      // HTTPS server block
      config += `server {\n  listen ${sslPort} ssl${enableHttp2 ? ' http2' : ''};\n  server_name ${serverName || 'example.com'};\n\n`;
      config += `  # SSL Configuration\n  ssl_certificate /etc/ssl/certs/${serverName || 'example.com'}.crt;\n  ssl_certificate_key /etc/ssl/private/${serverName || 'example.com'}.key;\n  ssl_protocols TLSv1.2 TLSv1.3;\n  ssl_ciphers HIGH:!aNULL:!MD5;\n  ssl_prefer_server_ciphers on;\n\n`;
    } else {
      config += `server {\n  listen ${port};\n  server_name ${serverName || 'example.com'};\n\n`;
    }

    config += `  # Document Root\n  root ${rootPath};\n  index index.php index.html index.htm;\n\n`;

    config += `  # Logging\n  access_log /var/log/nginx/${serverName || 'example.com'}_access.log;\n  error_log /var/log/nginx/${serverName || 'example.com'}_error.log;\n\n`;

    if (enableGzipNginx) {
      config += `  # GZIP Compression\n  gzip on;\n  gzip_vary on;\n  gzip_min_length 1024;\n  gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/json;\n\n`;
    }

    config += `  # Security Headers\n  add_header X-Frame-Options "SAMEORIGIN" always;\n  add_header X-Content-Type-Options "nosniff" always;\n  add_header X-XSS-Protection "1; mode=block" always;\n  add_header Referrer-Policy "strict-origin-when-cross-origin" always;\n\n`;

    if (proxyPass) {
      config += `  # Proxy Configuration\n  location / {\n    proxy_pass ${proxyPass};\n    proxy_http_version 1.1;\n    proxy_set_header Upgrade $http_upgrade;\n    proxy_set_header Connection 'upgrade';\n    proxy_set_header Host $host;\n    proxy_set_header X-Real-IP $remote_addr;\n    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;\n    proxy_set_header X-Forwarded-Proto $scheme;\n    proxy_cache_bypass $http_upgrade;\n  }\n\n`;
    } else {
      config += `  # Default Location Block\n  location / {\n    try_files $uri $uri/ /index.php?$args;\n  }\n\n`;

      config += `  # PHP-FPM Configuration\n  location ~ \\.php$ {\n    fastcgi_pass unix:/var/run/php/php${phpVersion}-fpm.sock;\n    fastcgi_index index.php;\n    fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;\n    include fastcgi_params;\n  }\n\n`;
    }

    config += `  # Static Files Caching\n  location ~* \\.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2|ttf|eot)$ {\n    expires 1y;\n    add_header Cache-Control "public, immutable";\n  }\n\n`;

    config += `  # Deny access to hidden files\n  location ~ /\\. {\n    deny all;\n  }\n`;

    config += `}\n`;

    return config;
  };

  const downloadConfig = (content: string, filename: string) => {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const copyToClipboard = (content: string) => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const renderToolContent = () => {
    switch (selectedTool) {
      case 'htaccess':
        const htaccessConfig = generateHtaccess();
        return (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Configuration Options</h3>

                <div>
                  <label className="block text-sm font-medium mb-2">Domain (optional)</label>
                  <Input
                    placeholder="example.com"
                    value={domain}
                    onChange={(e) => setDomain(e.target.value)}
                  />
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">URL & HTTPS</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={forceHttps}
                        onChange={(e) => setForceHttps(e.target.checked)}
                        className="w-4 h-4"
                      />
                      <span className="text-sm">Force HTTPS redirect</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={forceWww}
                        onChange={(e) => {
                          setForceWww(e.target.checked);
                          if (e.target.checked) setRemoveWww(false);
                        }}
                        className="w-4 h-4"
                      />
                      <span className="text-sm">Force WWW prefix</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={removeWww}
                        onChange={(e) => {
                          setRemoveWww(e.target.checked);
                          if (e.target.checked) setForceWww(false);
                        }}
                        className="w-4 h-4"
                      />
                      <span className="text-sm">Remove WWW prefix</span>
                    </label>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Performance</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={enableGzip}
                        onChange={(e) => setEnableGzip(e.target.checked)}
                        className="w-4 h-4"
                      />
                      <span className="text-sm">Enable GZIP compression</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={enableCache}
                        onChange={(e) => setEnableCache(e.target.checked)}
                        className="w-4 h-4"
                      />
                      <span className="text-sm">Enable browser caching</span>
                    </label>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Security</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={blockDirectoryListing}
                        onChange={(e) => setBlockDirectoryListing(e.target.checked)}
                        className="w-4 h-4"
                      />
                      <span className="text-sm">Block directory listing</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={customErrorPages}
                        onChange={(e) => setCustomErrorPages(e.target.checked)}
                        className="w-4 h-4"
                      />
                      <span className="text-sm">Custom error pages</span>
                    </label>
                  </CardContent>
                </Card>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-lg">Generated Configuration</h3>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => copyToClipboard(htaccessConfig)}
                    >
                      {copied ? (
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                      ) : (
                        <Copy className="w-3 h-3 mr-1" />
                      )}
                      {copied ? 'Copied!' : 'Copy'}
                    </Button>
                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-orange-600 to-red-600"
                      onClick={() => downloadConfig(htaccessConfig, '.htaccess')}
                    >
                      <Download className="w-3 h-3 mr-1" />
                      Download
                    </Button>
                  </div>
                </div>
                <div className="bg-gray-900 rounded-lg p-4 overflow-auto max-h-[600px]">
                  <pre className="text-xs text-green-400 font-mono">{htaccessConfig}</pre>
                </div>
              </div>
            </div>
          </div>
        );

      case 'nginx':
        const nginxConfig = generateNginxConfig();
        return (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Configuration Options</h3>

                <div>
                  <label className="block text-sm font-medium mb-2">Server Name</label>
                  <Input
                    placeholder="example.com"
                    value={serverName}
                    onChange={(e) => setServerName(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">HTTP Port</label>
                    <Input
                      placeholder="80"
                      value={port}
                      onChange={(e) => setPort(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">HTTPS Port</label>
                    <Input
                      placeholder="443"
                      value={sslPort}
                      onChange={(e) => setSslPort(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Document Root</label>
                  <Input
                    placeholder="/var/www/html"
                    value={rootPath}
                    onChange={(e) => setRootPath(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">PHP Version</label>
                  <select
                    className="w-full p-2 border rounded-lg"
                    value={phpVersion}
                    onChange={(e) => setPhpVersion(e.target.value)}
                  >
                    <option value="7.4">PHP 7.4</option>
                    <option value="8.0">PHP 8.0</option>
                    <option value="8.1">PHP 8.1</option>
                    <option value="8.2">PHP 8.2</option>
                    <option value="8.3">PHP 8.3</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Proxy Pass (optional)
                  </label>
                  <Input
                    placeholder="http://localhost:3000"
                    value={proxyPass}
                    onChange={(e) => setProxyPass(e.target.value)}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Leave empty for standard PHP configuration
                  </p>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Features</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={enableSsl}
                        onChange={(e) => setEnableSsl(e.target.checked)}
                        className="w-4 h-4"
                      />
                      <span className="text-sm">Enable SSL/TLS</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={enableHttp2}
                        onChange={(e) => setEnableHttp2(e.target.checked)}
                        className="w-4 h-4"
                        disabled={!enableSsl}
                      />
                      <span className="text-sm">Enable HTTP/2</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={enableGzipNginx}
                        onChange={(e) => setEnableGzipNginx(e.target.checked)}
                        className="w-4 h-4"
                      />
                      <span className="text-sm">Enable GZIP compression</span>
                    </label>
                  </CardContent>
                </Card>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-lg">Generated Configuration</h3>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => copyToClipboard(nginxConfig)}
                    >
                      {copied ? (
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                      ) : (
                        <Copy className="w-3 h-3 mr-1" />
                      )}
                      {copied ? 'Copied!' : 'Copy'}
                    </Button>
                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-green-600 to-emerald-600"
                      onClick={() =>
                        downloadConfig(
                          nginxConfig,
                          `${serverName || 'example.com'}.conf`
                        )
                      }
                    >
                      <Download className="w-3 h-3 mr-1" />
                      Download
                    </Button>
                  </div>
                </div>
                <div className="bg-gray-900 rounded-lg p-4 overflow-auto max-h-[600px]">
                  <pre className="text-xs text-cyan-400 font-mono">{nginxConfig}</pre>
                </div>

                <Card className="mt-4">
                  <CardHeader>
                    <CardTitle className="text-sm">Installation Instructions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-xs">
                    <p>1. Save the configuration to:</p>
                    <code className="block bg-gray-100 dark:bg-gray-800 p-2 rounded">
                      /etc/nginx/sites-available/{serverName || 'example.com'}
                    </code>
                    <p>2. Create symbolic link:</p>
                    <code className="block bg-gray-100 dark:bg-gray-800 p-2 rounded">
                      sudo ln -s /etc/nginx/sites-available/{serverName || 'example.com'}{' '}
                      /etc/nginx/sites-enabled/
                    </code>
                    <p>3. Test configuration:</p>
                    <code className="block bg-gray-100 dark:bg-gray-800 p-2 rounded">
                      sudo nginx -t
                    </code>
                    <p>4. Reload Nginx:</p>
                    <code className="block bg-gray-100 dark:bg-gray-800 p-2 rounded">
                      sudo systemctl reload nginx
                    </code>
                  </CardContent>
                </Card>
              </div>
            </div>
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
          <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 via-red-500 to-pink-600 bg-clip-text text-transparent">
            Config Generators
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Generate server configuration files with best practices
          </p>
        </div>
        <Badge className="bg-gradient-to-r from-orange-500 to-pink-500 text-white border-0">
          <Code className="w-3 h-3 mr-1" />
          {CONFIG_TOOLS.length} Generators
        </Badge>
      </div>

      {/* Tool Selection */}
      <div className="grid grid-cols-2 gap-3">
        {CONFIG_TOOLS.map((tool) => (
          <Card
            key={tool.id}
            onClick={() => setSelectedTool(tool.id)}
            className={`cursor-pointer transition-all ${
              selectedTool === tool.id
                ? 'ring-2 ring-orange-500 bg-orange-50 dark:bg-orange-900/20'
                : 'hover:shadow-lg'
            }`}
          >
            <CardContent className="p-6 text-center">
              <tool.icon className="w-12 h-12 mx-auto mb-3 text-orange-600" />
              <p className="font-medium">{tool.name}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tool Content */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {CONFIG_TOOLS.find((t) => t.id === selectedTool)?.icon && (
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-500 to-pink-500 flex items-center justify-center">
                {(() => {
                  const Icon = CONFIG_TOOLS.find((t) => t.id === selectedTool)!.icon;
                  return <Icon className="w-5 h-5 text-white" />;
                })()}
              </div>
            )}
            {CONFIG_TOOLS.find((t) => t.id === selectedTool)?.name}
          </CardTitle>
        </CardHeader>
        <CardContent>{renderToolContent()}</CardContent>
      </Card>
    </div>
  );
}
