'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Search,
  TrendingUp,
  Globe,
  FileText,
  BarChart3,
  Eye,
  Target,
  Hash,
  Image,
  Link,
  CheckCircle2,
  AlertCircle,
  Download,
  Play,
  Sparkles,
  Code,
} from 'lucide-react';

const SEO_TOOLS = [
  { id: 'audit', name: 'SEO Audit', icon: Search },
  { id: 'keywords', name: 'Keyword Tracker', icon: Target },
  { id: 'serp', name: 'SERP Monitor', icon: TrendingUp },
  { id: 'sitemap', name: 'Sitemap Generator', icon: Globe },
  { id: 'schema', name: 'Schema Validator', icon: Code },
  { id: 'meta', name: 'Meta Tags Checker', icon: Hash },
];

export default function SEOSuitePage() {
  const [selectedTool, setSelectedTool] = useState('audit');
  const [url, setUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [auditResults, setAuditResults] = useState<any>(null);
  const [keywords, setKeywords] = useState([
    { keyword: 'react development', position: 3, volume: 12000, difficulty: 65, trend: 'up' },
    { keyword: 'next.js tutorial', position: 8, volume: 8500, difficulty: 55, trend: 'up' },
    { keyword: 'web development', position: 15, volume: 45000, difficulty: 85, trend: 'down' },
  ]);

  const runAudit = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setAuditResults({
        score: 85,
        issues: [
          { type: 'warning', title: 'Missing meta description', count: 3 },
          { type: 'error', title: 'Images without alt tags', count: 12 },
          { type: 'info', title: 'Large image files', count: 5 },
        ],
        recommendations: [
          'Add meta descriptions to 3 pages',
          'Optimize 5 images (reduce file size)',
          'Add alt tags to 12 images',
          'Improve page load speed',
          'Add structured data (Schema.org)',
        ],
        metrics: {
          pageSpeed: 78,
          mobileScore: 82,
          accessibility: 90,
          bestPractices: 88,
        },
      });
      setIsAnalyzing(false);
    }, 2000);
  };

  const generateSitemap = () => {
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://example.com/</loc>
    <lastmod>2024-12-17</lastmod>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://example.com/about</loc>
    <lastmod>2024-12-15</lastmod>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://example.com/services</loc>
    <lastmod>2024-12-10</lastmod>
    <priority>0.8</priority>
  </url>
</urlset>`;

    const blob = new Blob([sitemap], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sitemap.xml';
    a.click();
    URL.revokeObjectURL(url);
  };

  const renderToolContent = () => {
    switch (selectedTool) {
      case 'audit':
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Website URL</label>
              <div className="flex gap-2">
                <Input
                  placeholder="https://example.com"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="flex-1"
                />
                <Button
                  onClick={runAudit}
                  disabled={isAnalyzing}
                  className="bg-gradient-to-r from-purple-600 to-blue-600"
                >
                  {isAnalyzing ? (
                    <>Analyzing...</>
                  ) : (
                    <>
                      <Play className="w-4 h-4 mr-2" />
                      Audit Site
                    </>
                  )}
                </Button>
              </div>
            </div>

            {auditResults && (
              <>
                <Card className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold mb-1">SEO Score</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Overall health</p>
                      </div>
                      <div className="text-6xl font-bold text-purple-600">{auditResults.score}</div>
                    </div>
                    <div className="grid grid-cols-4 gap-4">
                      <div>
                        <p className="text-xs text-gray-600 dark:text-gray-400">Page Speed</p>
                        <p className="text-2xl font-bold">{auditResults.metrics.pageSpeed}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 dark:text-gray-400">Mobile</p>
                        <p className="text-2xl font-bold">{auditResults.metrics.mobileScore}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 dark:text-gray-400">Accessibility</p>
                        <p className="text-2xl font-bold">{auditResults.metrics.accessibility}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 dark:text-gray-400">Best Practices</p>
                        <p className="text-2xl font-bold">{auditResults.metrics.bestPractices}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Issues Found</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {auditResults.issues.map((issue: any, i: number) => (
                        <div
                          key={i}
                          className="flex items-center justify-between p-3 border rounded-lg"
                        >
                          <div className="flex items-center gap-3">
                            {issue.type === 'error' ? (
                              <AlertCircle className="w-5 h-5 text-red-600" />
                            ) : issue.type === 'warning' ? (
                              <AlertCircle className="w-5 h-5 text-yellow-600" />
                            ) : (
                              <AlertCircle className="w-5 h-5 text-blue-600" />
                            )}
                            <div>
                              <p className="font-medium">{issue.title}</p>
                            </div>
                          </div>
                          <Badge>{issue.count} found</Badge>
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
                      {auditResults.recommendations.map((rec: string, i: number) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
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

      case 'keywords':
        return (
          <div className="space-y-6">
            <div className="flex gap-2">
              <Input placeholder="Add keyword to track..." className="flex-1" />
              <Button className="bg-gradient-to-r from-purple-600 to-blue-600">
                <Target className="w-4 h-4 mr-2" />
                Track
              </Button>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Tracked Keywords</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {keywords.map((kw, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all"
                    >
                      <div className="flex-1">
                        <h4 className="font-medium mb-1">{kw.keyword}</h4>
                        <div className="flex items-center gap-3 text-xs text-gray-600 dark:text-gray-400">
                          <span>Volume: {kw.volume.toLocaleString()}/mo</span>
                          <span>Difficulty: {kw.difficulty}%</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-2xl font-bold text-purple-600">#{kw.position}</p>
                          <p className="text-xs text-gray-500">Position</p>
                        </div>
                        <div className={`w-6 h-6 ${kw.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                          <TrendingUp className={kw.trend === 'down' ? 'rotate-180' : ''} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'sitemap':
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Website URL</label>
              <Input placeholder="https://example.com" />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Pages to Include</label>
              <textarea
                className="w-full h-32 p-3 border rounded-lg text-sm"
                placeholder="Enter URLs (one per line)&#10;https://example.com/&#10;https://example.com/about&#10;https://example.com/services"
              />
            </div>

            <div className="flex gap-2">
              <Button
                onClick={generateSitemap}
                className="bg-gradient-to-r from-purple-600 to-blue-600"
              >
                <Download className="w-4 h-4 mr-2" />
                Generate Sitemap
              </Button>
              <Button variant="outline">
                <Eye className="w-4 h-4 mr-2" />
                Preview
              </Button>
            </div>
          </div>
        );

      case 'schema':
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Schema Type</label>
              <select className="w-full p-3 border rounded-lg">
                <option>Article</option>
                <option>Product</option>
                <option>Organization</option>
                <option>Person</option>
                <option>LocalBusiness</option>
                <option>Event</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">JSON-LD Schema</label>
              <textarea
                className="w-full h-64 p-3 border rounded-lg font-mono text-xs"
                placeholder='{"@context": "https://schema.org", "@type": "Article", ...}'
              />
            </div>

            <div className="flex gap-2">
              <Button className="bg-gradient-to-r from-purple-600 to-blue-600">
                <CheckCircle2 className="w-4 h-4 mr-2" />
                Validate
              </Button>
              <Button variant="outline">
                <Sparkles className="w-4 h-4 mr-2" />
                Auto-Generate
              </Button>
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
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
            SEO Suite
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Complete SEO toolkit for optimization and monitoring
          </p>
        </div>
        <Badge className="bg-gradient-to-r from-purple-500 to-blue-500 text-white border-0">
          <Sparkles className="w-3 h-3 mr-1" />
          {SEO_TOOLS.length} Tools
        </Badge>
      </div>

      {/* Tool Selection */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {SEO_TOOLS.map((tool) => (
          <Card
            key={tool.id}
            onClick={() => setSelectedTool(tool.id)}
            className={`cursor-pointer transition-all ${
              selectedTool === tool.id
                ? 'ring-2 ring-purple-500 bg-purple-50 dark:bg-purple-900/20'
                : 'hover:shadow-lg'
            }`}
          >
            <CardContent className="p-4 text-center">
              <tool.icon className="w-8 h-8 mx-auto mb-2 text-purple-600" />
              <p className="text-xs font-medium">{tool.name}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tool Content */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {SEO_TOOLS.find(t => t.id === selectedTool)?.icon && (
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                {(() => {
                  const Icon = SEO_TOOLS.find(t => t.id === selectedTool)!.icon;
                  return <Icon className="w-5 h-5 text-white" />;
                })()}
              </div>
            )}
            {SEO_TOOLS.find(t => t.id === selectedTool)?.name}
          </CardTitle>
        </CardHeader>
        <CardContent>{renderToolContent()}</CardContent>
      </Card>
    </div>
  );
}
