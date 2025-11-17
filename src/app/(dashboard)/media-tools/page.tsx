'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Image as ImageIcon,
  Minimize2,
  Maximize2,
  Palette,
  FileImage,
  Download,
  Upload,
  Scissors,
  Crop,
  Sliders,
  Sparkles,
  Grid3x3,
  Plus,
  Check,
  RefreshCw,
} from 'lucide-react';

const MEDIA_TOOLS = [
  { id: 'optimizer', name: 'Image Optimizer', icon: Minimize2, color: 'from-blue-500 to-cyan-500' },
  { id: 'resize', name: 'Resize & Crop', icon: Crop, color: 'from-purple-500 to-pink-500' },
  { id: 'converter', name: 'Format Converter', icon: RefreshCw, color: 'from-green-500 to-emerald-500' },
  { id: 'favicon', name: 'Favicon Generator', icon: Grid3x3, color: 'from-orange-500 to-red-500' },
  { id: 'svg', name: 'SVG Editor', icon: Palette, color: 'from-indigo-500 to-purple-500' },
  { id: 'placeholder', name: 'Placeholder Gen', icon: ImageIcon, color: 'from-pink-500 to-rose-500' },
];

export default function MediaToolsPage() {
  const [selectedTool, setSelectedTool] = useState('optimizer');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [optimizationResult, setOptimizationResult] = useState<any>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleOptimize = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setOptimizationResult({
        originalSize: '2.4 MB',
        optimizedSize: '856 KB',
        savings: '64%',
        originalDimensions: '3840 x 2160',
        format: 'JPEG',
        quality: 85,
      });
      setIsProcessing(false);
    }, 1500);
  };

  const renderToolContent = () => {
    switch (selectedTool) {
      case 'optimizer':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <Minimize2 className="w-5 h-5 text-blue-500" />
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Images Optimized</p>
                      <p className="text-2xl font-bold">1,247</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-green-500" />
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Avg Savings</p>
                      <p className="text-2xl font-bold">68%</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <FileImage className="w-5 h-5 text-purple-500" />
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Total Saved</p>
                      <p className="text-2xl font-bold">3.2 GB</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="w-5 h-5" />
                  Upload & Optimize
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-12 text-center">
                  <Upload className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                  <p className="text-lg font-medium mb-2">Drop images here or click to browse</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    Supports: JPG, PNG, WebP, GIF (Max 10MB)
                  </p>
                  <Button className="bg-gradient-to-r from-blue-600 to-cyan-600">
                    <Upload className="w-4 h-4 mr-2" />
                    Select Images
                  </Button>
                </div>

                {!optimizationResult && (
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium mb-2">Compression Quality</label>
                      <input
                        type="range"
                        min="1"
                        max="100"
                        defaultValue="85"
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mt-1">
                        <span>Lower Size</span>
                        <span>85%</span>
                        <span>Higher Quality</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <input type="checkbox" id="resize" className="rounded" />
                      <label htmlFor="resize" className="text-sm">Resize to max width/height (optional)</label>
                    </div>

                    <Button
                      onClick={handleOptimize}
                      disabled={isProcessing}
                      className="w-full bg-gradient-to-r from-green-600 to-emerald-600"
                    >
                      {isProcessing ? (
                        <>
                          <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                          Optimizing...
                        </>
                      ) : (
                        <>
                          <Minimize2 className="w-4 h-4 mr-2" />
                          Optimize Images
                        </>
                      )}
                    </Button>
                  </div>
                )}

                {optimizationResult && (
                  <div className="space-y-4">
                    <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                      <div className="flex items-center gap-2 mb-3">
                        <Check className="w-5 h-5 text-green-500" />
                        <span className="font-semibold text-green-700 dark:text-green-400">
                          Optimization Complete!
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600 dark:text-gray-400">Original Size</p>
                          <p className="font-semibold">{optimizationResult.originalSize}</p>
                        </div>
                        <div>
                          <p className="text-gray-600 dark:text-gray-400">Optimized Size</p>
                          <p className="font-semibold text-green-600">{optimizationResult.optimizedSize}</p>
                        </div>
                        <div>
                          <p className="text-gray-600 dark:text-gray-400">Savings</p>
                          <p className="font-semibold text-green-600">{optimizationResult.savings}</p>
                        </div>
                        <div>
                          <p className="text-gray-600 dark:text-gray-400">Quality</p>
                          <p className="font-semibold">{optimizationResult.quality}%</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600">
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => setOptimizationResult(null)}
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Optimize Another
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        );

      case 'resize':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Crop className="w-5 h-5" />
                  Resize & Crop Images
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-12 text-center">
                  <Upload className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                  <p className="text-lg font-medium mb-2">Upload image to resize</p>
                  <Button className="bg-gradient-to-r from-purple-600 to-pink-600">
                    <Upload className="w-4 h-4 mr-2" />
                    Select Image
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Width (px)</label>
                    <Input type="number" placeholder="1920" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Height (px)</label>
                    <Input type="number" placeholder="1080" />
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <input type="checkbox" id="maintain-aspect" className="rounded" defaultChecked />
                  <label htmlFor="maintain-aspect" className="text-sm">Maintain aspect ratio</label>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Preset Sizes</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {[
                      '1920x1080 (Full HD)',
                      '1280x720 (HD)',
                      '800x600 (Standard)',
                      '400x400 (Square)',
                    ].map((preset) => (
                      <Button key={preset} variant="outline" size="sm">
                        {preset}
                      </Button>
                    ))}
                  </div>
                </div>

                <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600">
                  <Scissors className="w-4 h-4 mr-2" />
                  Resize Image
                </Button>
              </CardContent>
            </Card>
          </div>
        );

      case 'converter':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <RefreshCw className="w-5 h-5" />
                  Format Converter
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-12 text-center">
                  <Upload className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                  <p className="text-lg font-medium mb-2">Upload image to convert</p>
                  <Button className="bg-gradient-to-r from-green-600 to-emerald-600">
                    <Upload className="w-4 h-4 mr-2" />
                    Select Image
                  </Button>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Convert To</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {['JPEG', 'PNG', 'WebP', 'GIF'].map((format) => (
                      <Card
                        key={format}
                        className="cursor-pointer hover:shadow-lg transition-all"
                      >
                        <CardContent className="p-4 text-center">
                          <FileImage className="w-8 h-8 mx-auto mb-2 text-green-500" />
                          <p className="font-medium">{format}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                  <p className="text-sm text-blue-700 dark:text-blue-400">
                    <strong>WebP</strong> offers the best compression with minimal quality loss. Recommended for web use.
                  </p>
                </div>

                <Button className="w-full bg-gradient-to-r from-green-600 to-emerald-600">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Convert Image
                </Button>
              </CardContent>
            </Card>
          </div>
        );

      case 'favicon':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Grid3x3 className="w-5 h-5" />
                  Favicon Generator
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-12 text-center">
                  <Upload className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                  <p className="text-lg font-medium mb-2">Upload logo or image</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    Recommended: Square image, at least 512x512px
                  </p>
                  <Button className="bg-gradient-to-r from-orange-600 to-red-600">
                    <Upload className="w-4 h-4 mr-2" />
                    Select Image
                  </Button>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Generate Sizes</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {['16x16', '32x32', '48x48', '64x64', '128x128', '256x256', '512x512', 'Apple Touch'].map((size) => (
                      <label key={size} className="flex items-center gap-2 p-2 border rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800">
                        <input type="checkbox" className="rounded" defaultChecked />
                        <span className="text-sm">{size}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <Button className="w-full bg-gradient-to-r from-orange-600 to-red-600">
                  <Grid3x3 className="w-4 h-4 mr-2" />
                  Generate Favicons
                </Button>

                <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                  <p className="text-sm font-medium mb-2">Will generate:</p>
                  <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    <li>• favicon.ico (multi-size)</li>
                    <li>• PNG files in all selected sizes</li>
                    <li>• Apple Touch Icon</li>
                    <li>• manifest.json for PWA</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'svg':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="w-5 h-5" />
                  SVG Editor & Optimizer
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-12 text-center">
                  <Upload className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                  <p className="text-lg font-medium mb-2">Upload SVG file</p>
                  <Button className="bg-gradient-to-r from-indigo-600 to-purple-600">
                    <Upload className="w-4 h-4 mr-2" />
                    Select SVG
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Optimize</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <label className="flex items-center gap-2">
                        <input type="checkbox" className="rounded" defaultChecked />
                        <span className="text-sm">Remove metadata</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" className="rounded" defaultChecked />
                        <span className="text-sm">Minify paths</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" className="rounded" defaultChecked />
                        <span className="text-sm">Remove comments</span>
                      </label>
                      <Button className="w-full mt-3">
                        <Minimize2 className="w-4 h-4 mr-2" />
                        Optimize SVG
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Convert</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <Button variant="outline" className="w-full">
                        <FileImage className="w-4 h-4 mr-2" />
                        SVG → PNG
                      </Button>
                      <Button variant="outline" className="w-full">
                        <FileImage className="w-4 h-4 mr-2" />
                        SVG → JPEG
                      </Button>
                      <Button variant="outline" className="w-full">
                        <FileImage className="w-4 h-4 mr-2" />
                        SVG → WebP
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'placeholder':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ImageIcon className="w-5 h-5" />
                  Placeholder Image Generator
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Width</label>
                    <Input type="number" placeholder="800" defaultValue="800" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Height</label>
                    <Input type="number" placeholder="600" defaultValue="600" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Background Color</label>
                  <div className="flex gap-2">
                    <Input type="color" defaultValue="#cccccc" className="w-20" />
                    <Input placeholder="#cccccc" defaultValue="#cccccc" className="flex-1" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Text</label>
                  <Input placeholder="800x600" defaultValue="800x600" />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Text Color</label>
                  <div className="flex gap-2">
                    <Input type="color" defaultValue="#666666" className="w-20" />
                    <Input placeholder="#666666" defaultValue="#666666" className="flex-1" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Format</label>
                  <select className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800">
                    <option>PNG</option>
                    <option>JPEG</option>
                    <option>WebP</option>
                  </select>
                </div>

                <div className="h-64 bg-[#cccccc] rounded-lg flex items-center justify-center">
                  <span className="text-[#666666] text-2xl font-bold">800x600</span>
                </div>

                <div className="flex gap-2">
                  <Button className="flex-1 bg-gradient-to-r from-pink-600 to-rose-600">
                    <Sparkles className="w-4 h-4 mr-2" />
                    Generate
                  </Button>
                  <Button variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
            Image & Media Tools
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Optimize, resize, convert and generate images with ease
          </p>
        </div>
        <Badge className="bg-gradient-to-r from-pink-500 to-purple-500 text-white border-0">
          <ImageIcon className="w-3 h-3 mr-1" />
          {MEDIA_TOOLS.length} Tools
        </Badge>
      </div>

      {/* Tool Selection */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        {MEDIA_TOOLS.map((tool) => {
          const Icon = tool.icon;
          return (
            <Card
              key={tool.id}
              className={`cursor-pointer transition-all hover:scale-105 ${
                selectedTool === tool.id
                  ? 'ring-2 ring-pink-500 shadow-lg'
                  : ''
              }`}
              onClick={() => setSelectedTool(tool.id)}
            >
              <CardContent className="p-4 text-center">
                <div className={`w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br ${tool.color} flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <p className="text-sm font-medium">{tool.name}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Tool Content */}
      {renderToolContent()}
    </div>
  );
}
