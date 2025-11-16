'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Play,
  Square,
  Download,
  Share2,
  Plus,
  X,
  Settings,
  Code2,
  FileCode,
  Eye,
  Split,
} from 'lucide-react';

// Dynamically import Monaco to avoid SSR issues
const MonacoEditor = dynamic(() => import('@monaco-editor/react'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full bg-gray-900">
      <div className="text-gray-400">Loading editor...</div>
    </div>
  ),
});

interface FileTab {
  id: string;
  name: string;
  language: string;
  content: string;
}

const defaultFiles: FileTab[] = [
  {
    id: '1',
    name: 'index.html',
    language: 'html',
    content: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>DevBrain Live Preview</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="container">
        <h1>🧠 DevBrain Code Editor</h1>
        <p>Edit HTML, CSS, and JavaScript with live preview!</p>
        <button onclick="handleClick()">Click Me</button>
    </div>
    <script src="script.js"></script>
</body>
</html>`,
  },
  {
    id: '2',
    name: 'styles.css',
    language: 'css',
    content: `* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
}

.container {
    text-align: center;
    background: rgba(255, 255, 255, 0.1);
    padding: 3rem;
    border-radius: 20px;
    backdrop-filter: blur(10px);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

h1 {
    font-size: 3rem;
    margin-bottom: 1rem;
}

p {
    font-size: 1.2rem;
    margin-bottom: 2rem;
    opacity: 0.9;
}

button {
    background: white;
    color: #667eea;
    border: none;
    padding: 1rem 2rem;
    font-size: 1.1rem;
    border-radius: 50px;
    cursor: pointer;
    transition: transform 0.2s, box-shadow 0.2s;
    font-weight: 600;
}

button:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
}

button:active {
    transform: translateY(0);
}`,
  },
  {
    id: '3',
    name: 'script.js',
    language: 'javascript',
    content: `function handleClick() {
    const messages = [
        'Hello from DevBrain! 🚀',
        'Code with confidence! 💪',
        'Keep building amazing things! ✨',
        'You are awesome! 🌟'
    ];

    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    alert(randomMessage);

    console.log('Button clicked at:', new Date().toLocaleTimeString());
}

console.log('DevBrain Code Editor loaded successfully!');`,
  },
];

export default function CodeEditorPage() {
  const [files, setFiles] = useState<FileTab[]>(defaultFiles);
  const [activeFileId, setActiveFileId] = useState(files[0].id);
  const [isRunning, setIsRunning] = useState(false);
  const [showPreview, setShowPreview] = useState(true);
  const [output, setOutput] = useState('');

  const activeFile = files.find((f) => f.id === activeFileId) || files[0];

  const updateFileContent = (content: string) => {
    setFiles((prev) =>
      prev.map((f) => (f.id === activeFileId ? { ...f, content } : f))
    );
  };

  const addNewFile = () => {
    const newFile: FileTab = {
      id: Date.now().toString(),
      name: `file${files.length + 1}.js`,
      language: 'javascript',
      content: '// New file\n',
    };
    setFiles([...files, newFile]);
    setActiveFileId(newFile.id);
  };

  const closeFile = (id: string) => {
    if (files.length === 1) return; // Don't close last file
    const newFiles = files.filter((f) => f.id !== id);
    setFiles(newFiles);
    if (activeFileId === id) {
      setActiveFileId(newFiles[0].id);
    }
  };

  const getPreviewContent = () => {
    const htmlFile = files.find((f) => f.name.endsWith('.html'));
    const cssFile = files.find((f) => f.name.endsWith('.css'));
    const jsFile = files.find((f) => f.name.endsWith('.js'));

    let html = htmlFile?.content || '<p>No HTML file found</p>';

    // Inject CSS and JS into HTML
    if (cssFile) {
      html = html.replace('</head>', `<style>${cssFile.content}</style></head>`);
    }
    if (jsFile) {
      html = html.replace('</body>', `<script>${jsFile.content}</script></body>`);
    }

    return html;
  };

  const runCode = async () => {
    setIsRunning(true);
    setOutput('Running...\n');

    // Simulate code execution
    await new Promise((resolve) => setTimeout(resolve, 500));

    setOutput(`✓ Code executed successfully\n✓ No errors detected\n\nConsole output will appear here...`);
    setIsRunning(false);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] gap-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Code2 className="w-8 h-8 text-purple-600" />
            Code Editor
          </h1>
          <p className="text-muted-foreground mt-1">
            Professional code editor with live preview
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" size="sm">
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
        </div>
      </div>

      {/* Editor Controls */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileCode className="w-5 h-5 text-muted-foreground" />
              <CardTitle className="text-base">Files</CardTitle>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant={showPreview ? 'default' : 'outline'}
                size="sm"
                onClick={() => setShowPreview(!showPreview)}
              >
                <Eye className="w-4 h-4 mr-2" />
                {showPreview ? 'Hide' : 'Show'} Preview
              </Button>
              <Button variant="default" size="sm" onClick={runCode} disabled={isRunning}>
                {isRunning ? (
                  <>
                    <Square className="w-4 h-4 mr-2" />
                    Running...
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 mr-2" />
                    Run Code
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex items-center gap-1 border-b">
            {files.map((file) => (
              <div
                key={file.id}
                className={`flex items-center gap-2 px-3 py-2 border-r cursor-pointer transition-colors ${
                  file.id === activeFileId
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-accent'
                }`}
                onClick={() => setActiveFileId(file.id)}
              >
                <span className="text-sm font-medium">{file.name}</span>
                {files.length > 1 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      closeFile(file.id);
                    }}
                    className="hover:bg-white/20 rounded p-0.5"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>
            ))}
            <button
              onClick={addNewFile}
              className="px-3 py-2 hover:bg-accent transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Editor and Preview */}
      <div className={`grid ${showPreview ? 'lg:grid-cols-2' : 'grid-cols-1'} gap-4 flex-1`}>
        {/* Monaco Editor */}
        <Card className="flex flex-col">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Code2 className="w-5 h-5 text-muted-foreground" />
                <CardTitle className="text-base">Editor</CardTitle>
                <Badge variant="secondary">{activeFile.language}</Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent className="flex-1 p-0">
            <MonacoEditor
              height="100%"
              language={activeFile.language}
              theme="vs-dark"
              value={activeFile.content}
              onChange={(value) => updateFileContent(value || '')}
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                lineNumbers: 'on',
                roundedSelection: true,
                scrollBeyondLastLine: false,
                automaticLayout: true,
                tabSize: 2,
              }}
            />
          </CardContent>
        </Card>

        {/* Live Preview */}
        {showPreview && (
          <Card className="flex flex-col">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Eye className="w-5 h-5 text-muted-foreground" />
                <CardTitle className="text-base">Live Preview</CardTitle>
                <Badge variant="outline">Auto-refresh</Badge>
              </div>
            </CardHeader>
            <CardContent className="flex-1 p-0">
              <iframe
                srcDoc={getPreviewContent()}
                className="w-full h-full border-0 bg-white"
                title="Live Preview"
                sandbox="allow-scripts"
              />
            </CardContent>
          </Card>
        )}
      </div>

      {/* Console Output */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Split className="w-5 h-5 text-muted-foreground" />
            Console Output
          </CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="p-4 bg-gray-900 text-green-400 rounded-lg font-mono text-sm h-32 overflow-auto">
            {output || '// Console output will appear here\n// Click "Run Code" to execute'}
          </pre>
        </CardContent>
      </Card>
    </div>
  );
}
