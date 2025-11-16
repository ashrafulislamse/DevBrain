'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, ArrowRight } from 'lucide-react';

const converters = [
  { name: 'Markdown → PDF', from: 'MD', to: 'PDF', icon: '📝' },
  { name: 'PDF → Markdown', from: 'PDF', to: 'MD', icon: '📄' },
  { name: 'JSON → YAML', from: 'JSON', to: 'YAML', icon: '🔄' },
  { name: 'YAML → JSON', from: 'YAML', to: 'JSON', icon: '🔄' },
  { name: 'CSV → JSON', from: 'CSV', to: 'JSON', icon: '📊' },
  { name: 'HTML → Markdown', from: 'HTML', to: 'MD', icon: '🌐' },
  { name: 'Base64 Encode/Decode', from: 'Text', to: 'Base64', icon: '🔐' },
  { name: 'Hash Generator', from: 'Text', to: 'Hash', icon: '#️⃣' },
  { name: 'Image Optimizer', from: 'IMG', to: 'IMG', icon: '🖼️' },
];

export default function ConvertersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">File Converters</h1>
        <p className="text-muted-foreground mt-1">Convert between different file formats instantly</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {converters.map((converter) => (
          <Card
            key={converter.name}
            className="hover:shadow-lg transition-shadow cursor-pointer"
          >
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="text-3xl">{converter.icon}</div>
                <div>
                  <CardTitle className="text-base">{converter.name}</CardTitle>
                  <CardDescription className="flex items-center gap-2 mt-1">
                    <span className="px-2 py-0.5 bg-purple-100 dark:bg-purple-900/30 rounded text-xs font-medium">
                      {converter.from}
                    </span>
                    <ArrowRight className="w-3 h-3" />
                    <span className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 rounded text-xs font-medium">
                      {converter.to}
                    </span>
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Quick Convert</CardTitle>
          <CardDescription>Drop files here or click to upload</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border-2 border-dashed rounded-lg p-12 text-center hover:border-primary transition-colors cursor-pointer">
            <FileText className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-sm text-muted-foreground mb-4">
              Drag & drop your files here, or click to browse
            </p>
            <Button>Select Files</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
