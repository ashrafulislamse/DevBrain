'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  FileJson,
  FileCode,
  Hash,
  Lock,
  ArrowLeftRight,
  Copy,
  Download,
  Upload,
  CheckCircle2,
  AlertCircle,
  Code2,
  FileText,
  Settings,
  Zap,
} from 'lucide-react';

type ConverterType = 'json-yaml' | 'base64' | 'hash' | 'url-encode' | 'markdown-html' | 'csv-json';

interface Converter {
  id: ConverterType;
  name: string;
  description: string;
  icon: any;
  gradient: string;
  category: string;
}

const converters: Converter[] = [
  {
    id: 'json-yaml',
    name: 'JSON ↔ YAML',
    description: 'Convert between JSON and YAML formats',
    icon: FileJson,
    gradient: 'from-blue-500 to-cyan-600',
    category: 'Data',
  },
  {
    id: 'base64',
    name: 'Base64 Encode/Decode',
    description: 'Encode or decode Base64 strings',
    icon: Lock,
    gradient: 'from-purple-500 to-pink-600',
    category: 'Encoding',
  },
  {
    id: 'hash',
    name: 'Hash Generator',
    description: 'Generate MD5, SHA-1, SHA-256 hashes',
    icon: Hash,
    gradient: 'from-green-500 to-emerald-600',
    category: 'Security',
  },
  {
    id: 'url-encode',
    name: 'URL Encoder',
    description: 'URL encode/decode strings',
    icon: Code2,
    gradient: 'from-orange-500 to-red-600',
    category: 'Encoding',
  },
  {
    id: 'markdown-html',
    name: 'Markdown ↔ HTML',
    description: 'Convert Markdown to HTML and back',
    icon: FileText,
    gradient: 'from-indigo-500 to-purple-600',
    category: 'Markup',
  },
  {
    id: 'csv-json',
    name: 'CSV ↔ JSON',
    description: 'Convert CSV to JSON and vice versa',
    icon: FileCode,
    gradient: 'from-pink-500 to-rose-600',
    category: 'Data',
  },
];

export default function ConvertersPage() {
  const [selectedConverter, setSelectedConverter] = useState<ConverterType>('json-yaml');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');

  const activeConverter = converters.find((c) => c.id === selectedConverter)!;

  const convertJsonToYaml = (json: string): string => {
    const obj = JSON.parse(json);
    const yamlLines: string[] = [];

    const convertValue = (value: any, indent: number = 0): string => {
      const spaces = '  '.repeat(indent);

      if (value === null) return 'null';
      if (typeof value === 'string') return value.includes('\n') ? `|\n${value.split('\n').map(l => spaces + '  ' + l).join('\n')}` : value;
      if (typeof value === 'number' || typeof value === 'boolean') return String(value);

      if (Array.isArray(value)) {
        return value.map(v => `\n${spaces}- ${convertValue(v, indent + 1)}`).join('');
      }

      if (typeof value === 'object') {
        return Object.entries(value)
          .map(([k, v]) => {
            if (typeof v === 'object' && v !== null && !Array.isArray(v)) {
              return `\n${spaces}${k}:${convertValue(v, indent + 1)}`;
            }
            return `\n${spaces}${k}: ${convertValue(v, indent + 1)}`;
          })
          .join('');
      }

      return String(value);
    };

    Object.entries(obj).forEach(([key, value]) => {
      yamlLines.push(`${key}:${convertValue(value, 1)}`);
    });

    return yamlLines.join('\n');
  };

  const convertYamlToJson = (yaml: string): string => {
    const lines = yaml.split('\n').filter(l => l.trim() && !l.trim().startsWith('#'));
    const obj: any = {};
    let currentKey = '';
    let currentIndent = 0;

    lines.forEach(line => {
      const indent = line.search(/\S/);
      const trimmed = line.trim();

      if (trimmed.includes(':')) {
        const [key, ...valueParts] = trimmed.split(':');
        const value = valueParts.join(':').trim();

        if (value) {
          if (value === 'true' || value === 'false') {
            obj[key.trim()] = value === 'true';
          } else if (!isNaN(Number(value))) {
            obj[key.trim()] = Number(value);
          } else {
            obj[key.trim()] = value;
          }
        } else {
          currentKey = key.trim();
          obj[currentKey] = {};
        }
      }
    });

    return JSON.stringify(obj, null, 2);
  };

  const handleConvert = () => {
    setError('');
    setOutput('');

    try {
      switch (selectedConverter) {
        case 'json-yaml': {
          // Try JSON to YAML first
          try {
            const result = convertJsonToYaml(input);
            setOutput(result);
          } catch {
            // If that fails, try YAML to JSON
            const result = convertYamlToJson(input);
            setOutput(result);
          }
          break;
        }

        case 'base64': {
          // Try decode first
          try {
            const decoded = atob(input);
            setOutput(decoded);
          } catch {
            // If that fails, encode
            const encoded = btoa(input);
            setOutput(encoded);
          }
          break;
        }

        case 'hash': {
          // Generate multiple hashes
          const encoder = new TextEncoder();
          const data = encoder.encode(input);

          crypto.subtle.digest('SHA-256', data).then(hashBuffer => {
            const hashArray = Array.from(new Uint8Array(hashBuffer));
            const sha256 = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

            setOutput(`SHA-256:\n${sha256}\n\nMD5: (Use crypto library for MD5)\n\nNote: This is a SHA-256 hash`);
          });
          break;
        }

        case 'url-encode': {
          // Try decode first
          try {
            const decoded = decodeURIComponent(input);
            if (decoded !== input) {
              setOutput(decoded);
            } else {
              const encoded = encodeURIComponent(input);
              setOutput(encoded);
            }
          } catch {
            const encoded = encodeURIComponent(input);
            setOutput(encoded);
          }
          break;
        }

        case 'markdown-html': {
          // Simple Markdown to HTML converter
          if (input.includes('<') && input.includes('>')) {
            // Assume it's HTML, convert to markdown
            let md = input
              .replace(/<h1>(.*?)<\/h1>/g, '# $1\n')
              .replace(/<h2>(.*?)<\/h2>/g, '## $1\n')
              .replace(/<h3>(.*?)<\/h3>/g, '### $1\n')
              .replace(/<p>(.*?)<\/p>/g, '$1\n\n')
              .replace(/<strong>(.*?)<\/strong>/g, '**$1**')
              .replace(/<em>(.*?)<\/em>/g, '*$1*')
              .replace(/<code>(.*?)<\/code>/g, '`$1`')
              .replace(/<a href="(.*?)">(.*?)<\/a>/g, '[$2]($1)')
              .replace(/<br\s*\/?>/g, '\n');
            setOutput(md);
          } else {
            // Convert markdown to HTML
            let html = input
              .replace(/^### (.*$)/gim, '<h3>$1</h3>')
              .replace(/^## (.*$)/gim, '<h2>$1</h2>')
              .replace(/^# (.*$)/gim, '<h1>$1</h1>')
              .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
              .replace(/\*(.*?)\*/g, '<em>$1</em>')
              .replace(/`(.*?)`/g, '<code>$1</code>')
              .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>')
              .replace(/\n\n/g, '</p><p>')
              .replace(/\n/g, '<br>');
            html = '<p>' + html + '</p>';
            setOutput(html);
          }
          break;
        }

        case 'csv-json': {
          if (input.trim().startsWith('[') || input.trim().startsWith('{')) {
            // JSON to CSV
            const data = JSON.parse(input);
            const array = Array.isArray(data) ? data : [data];

            if (array.length === 0) {
              setOutput('');
              return;
            }

            const headers = Object.keys(array[0]);
            const csv = [
              headers.join(','),
              ...array.map(row => headers.map(h => JSON.stringify(row[h] || '')).join(','))
            ].join('\n');

            setOutput(csv);
          } else {
            // CSV to JSON
            const lines = input.trim().split('\n');
            const headers = lines[0].split(',').map(h => h.trim());

            const json = lines.slice(1).map(line => {
              const values = line.split(',').map(v => v.trim().replace(/^"|"$/g, ''));
              const obj: any = {};
              headers.forEach((h, i) => {
                obj[h] = values[i] || '';
              });
              return obj;
            });

            setOutput(JSON.stringify(json, null, 2));
          }
          break;
        }
      }
    } catch (err: any) {
      setError(err.message || 'Conversion failed');
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([output], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `converted-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
            File Converters
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Convert between different formats instantly with real-time processing
          </p>
        </div>
        <Badge className="bg-gradient-to-r from-purple-500 to-blue-500 text-white border-0">
          <Zap className="w-3 h-3 mr-1" />
          {converters.length} Tools
        </Badge>
      </div>

      {/* Converter Selection */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {converters.map((converter) => (
          <Card
            key={converter.id}
            className={`cursor-pointer transition-all duration-200 hover:shadow-xl hover:scale-[1.02] ${
              selectedConverter === converter.id
                ? 'ring-2 ring-purple-500 shadow-lg'
                : 'hover:shadow-lg'
            }`}
            onClick={() => {
              setSelectedConverter(converter.id);
              setInput('');
              setOutput('');
              setError('');
            }}
          >
            <CardContent className="p-5">
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${converter.gradient} flex items-center justify-center shadow-lg transition-transform group-hover:scale-110`}>
                  <converter.icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-gray-900 dark:text-white">{converter.name}</h3>
                    {selectedConverter === converter.id && (
                      <CheckCircle2 className="w-4 h-4 text-purple-600" />
                    )}
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                    {converter.description}
                  </p>
                  <Badge variant="outline" className="text-xs">
                    {converter.category}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Conversion Interface */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Input */}
        <Card className="border-gray-200 dark:border-gray-700">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Upload className="w-5 h-5 text-purple-600" />
                <CardTitle>Input</CardTitle>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setInput('');
                  setOutput('');
                  setError('');
                }}
              >
                Clear
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={`Enter your ${activeConverter.name.toLowerCase()} data here...`}
              className="w-full h-80 p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 font-mono text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
            />
            <div className="flex items-center justify-between mt-4">
              <span className="text-xs text-gray-500">
                {input.length} characters
              </span>
              <Button
                onClick={handleConvert}
                disabled={!input}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg shadow-purple-500/30"
              >
                <ArrowLeftRight className="w-4 h-4 mr-2" />
                Convert
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Output */}
        <Card className="border-gray-200 dark:border-gray-700">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Download className="w-5 h-5 text-blue-600" />
                <CardTitle>Output</CardTitle>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCopy}
                  disabled={!output}
                >
                  {copied ? (
                    <>
                      <CheckCircle2 className="w-3 h-3 mr-1" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3 mr-1" />
                      Copy
                    </>
                  )}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleDownload}
                  disabled={!output}
                >
                  <Download className="w-3 h-3 mr-1" />
                  Download
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <textarea
              value={output}
              readOnly
              placeholder="Converted output will appear here..."
              className="w-full h-80 p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 font-mono text-sm resize-none"
            />
            {error && (
              <div className="flex items-center gap-2 mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400" />
                <span className="text-sm text-red-600 dark:text-red-400">{error}</span>
              </div>
            )}
            {output && !error && (
              <div className="flex items-center gap-2 mt-4 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400" />
                <span className="text-sm text-green-600 dark:text-green-400">
                  Conversion successful! ({output.length} characters)
                </span>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
