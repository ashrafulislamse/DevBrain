'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {  Play, Download, Share2, Code2, Terminal } from 'lucide-react';

const languages = [
  { id: 'javascript', name: 'JavaScript', icon: '📜' },
  { id: 'python', name: 'Python', icon: '🐍' },
  { id: 'typescript', name: 'TypeScript', icon: '💎' },
  { id: 'go', name: 'Go', icon: '🔵' },
  { id: 'rust', name: 'Rust', icon: '🦀' },
  { id: 'java', name: 'Java', icon: '☕' },
  { id: 'cpp', name: 'C++', icon: '⚙️' },
  { id: 'php', name: 'PHP', icon: '🐘' },
];

const exampleCode: Record<string, string> = {
  javascript: `// JavaScript Example
console.log("Hello from DevBrain!");

function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log("Fibonacci(10):", fibonacci(10));`,
  python: `# Python Example
print("Hello from DevBrain!")

def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)

print(f"Fibonacci(10): {fibonacci(10)}")`,
  typescript: `// TypeScript Example
console.log("Hello from DevBrain!");

function fibonacci(n: number): number {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log("Fibonacci(10):", fibonacci(10));`,
};

export default function PlaygroundPage() {
  const [selectedLang, setSelectedLang] = useState('javascript');
  const [code, setCode] = useState(exampleCode.javascript);
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);

  const runCode = async () => {
    setIsRunning(true);
    setOutput('Running...\n');

    // Simulate code execution
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const mockOutput = `$ ${selectedLang} code.${selectedLang}\nHello from DevBrain!\nFibonacci(10): 55\n\n✓ Execution completed in 234ms`;
    setOutput(mockOutput);
    setIsRunning(false);
  };

  const changeLanguage = (langId: string) => {
    setSelectedLang(langId);
    setCode(exampleCode[langId] || `// ${langId} code here\nconsole.log("Hello, World!");`);
    setOutput('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Code Playground</h1>
          <p className="text-muted-foreground mt-1">Run code in 10+ languages instantly</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Download
          </Button>
          <Button variant="outline" size="sm">
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
        </div>
      </div>

      {/* Language Selector */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code2 className="w-5 h-5" />
            Select Language
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-2">
            {languages.map((lang) => (
              <Button
                key={lang.id}
                variant={selectedLang === lang.id ? 'default' : 'outline'}
                size="sm"
                className="justify-start"
                onClick={() => changeLanguage(lang.id)}
              >
                <span className="mr-2">{lang.icon}</span>
                {lang.name}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Code Editor */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Editor</CardTitle>
              <div className="flex items-center gap-2">
                <Badge variant="secondary">
                  {languages.find((l) => l.id === selectedLang)?.name}
                </Badge>
                <Button size="sm" onClick={runCode} disabled={isRunning}>
                  <Play className="w-4 h-4 mr-2" />
                  {isRunning ? 'Running...' : 'Run Code'}
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full h-96 p-4 font-mono text-sm bg-gray-50 dark:bg-gray-900 border-0 focus:outline-none resize-none"
              placeholder="Write your code here..."
            />
          </CardContent>
        </Card>

        {/* Output Console */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Terminal className="w-5 h-5" />
              Output
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="w-full h-96 p-4 font-mono text-sm bg-gray-900 dark:bg-black text-green-400 overflow-y-auto whitespace-pre-wrap">
              {output || '# Output will appear here after running code\n# Press "Run Code" to execute'}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Features Info */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">⚡ Instant Execution</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Run your code instantly with our high-performance cloud runners
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">🔒 Secure Sandbox</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Code runs in isolated containers for maximum security
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">💾 Auto-Save</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Your code is automatically saved as you type
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
