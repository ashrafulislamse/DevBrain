'use client';

import { useState, useRef } from 'react';
import dynamic from 'next/dynamic';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Play,
  Download,
  Share2,
  Plus,
  X,
  Settings,
  FileCode,
  Eye,
  EyeOff,
  Terminal,
  Code,
  Layers,
  Maximize2,
} from 'lucide-react';

// Dynamically import Monaco to avoid SSR issues
const MonacoEditor = dynamic(() => import('@monaco-editor/react'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full bg-gray-900">
      <div className="animate-pulse text-gray-400">Loading editor...</div>
    </div>
  ),
});

interface FileTab {
  id: string;
  name: string;
  language: string;
  content: string;
}

type PlaygroundMode = 'html-css-js' | 'react' | 'python' | 'nodejs' | 'sql';

const playgroundTemplates: Record<PlaygroundMode, FileTab[]> = {
  'html-css-js': [
    {
      id: '1',
      name: 'index.html',
      language: 'html',
      content: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>DevBrain Playground</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="container">
        <h1>DevBrain Code Playground</h1>
        <p>Edit HTML, CSS, and JavaScript with live preview!</p>
        <button onclick="handleClick()">Click Me</button>
        <div id="output"></div>
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

button {
    background: white;
    color: #667eea;
    border: none;
    padding: 1rem 2rem;
    font-size: 1rem;
    border-radius: 10px;
    cursor: pointer;
    font-weight: bold;
    transition: transform 0.2s;
}

button:hover {
    transform: scale(1.05);
}

#output {
    margin-top: 2rem;
    font-size: 1.5rem;
    font-weight: bold;
}`,
    },
    {
      id: '3',
      name: 'script.js',
      language: 'javascript',
      content: `function handleClick() {
    console.log('Button clicked!');
    const output = document.getElementById('output');
    output.textContent = '🎉 Button Clicked!';
    setTimeout(() => {
        output.textContent = '';
    }, 2000);
}

console.log('DevBrain Playground loaded successfully!');`,
    },
  ],
  react: [
    {
      id: '1',
      name: 'App.jsx',
      language: 'javascript',
      content: `import React, { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>React Playground</h1>
      <p style={styles.text}>Count: {count}</p>
      <button
        onClick={() => setCount(count + 1)}
        style={styles.button}
      >
        Increment
      </button>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
  },
  title: {
    fontSize: '3rem',
    marginBottom: '2rem',
  },
  text: {
    fontSize: '1.5rem',
    marginBottom: '2rem',
  },
  button: {
    background: 'white',
    color: '#667eea',
    border: 'none',
    padding: '1rem 2rem',
    fontSize: '1rem',
    borderRadius: '10px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
};

export default App;`,
    },
  ],
  python: [
    {
      id: '1',
      name: 'main.py',
      language: 'python',
      content: `# Python Playground
# Click "Run" to execute your code

def fibonacci(n):
    """Generate Fibonacci sequence up to n terms"""
    fib_sequence = []
    a, b = 0, 1
    for _ in range(n):
        fib_sequence.append(a)
        a, b = b, a + b
    return fib_sequence

def main():
    print("Python Playground")
    print("=" * 40)

    # Example: Fibonacci sequence
    n = 10
    result = fibonacci(n)
    print(f"First {n} Fibonacci numbers:")
    print(result)

    # Example: List comprehension
    squares = [x**2 for x in range(1, 6)]
    print(f"\\nSquares of 1-5: {squares}")

    # Example: Dictionary
    person = {
        'name': 'Developer',
        'role': 'Full Stack',
        'experience': 5
    }
    print(f"\\nPerson: {person}")

if __name__ == "__main__":
    main()`,
    },
  ],
  nodejs: [
    {
      id: '1',
      name: 'index.js',
      language: 'javascript',
      content: `// Node.js Playground
// Click "Run" to execute your code

console.log('Node.js Playground');
console.log('='.repeat(40));

// Example: Array methods
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(n => n * 2);
console.log('Doubled:', doubled);

// Example: Async/Await
async function fetchData() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ message: 'Data loaded!' });
        }, 1000);
    });
}

async function main() {
    console.log('\\nFetching data...');
    const data = await fetchData();
    console.log('Result:', data);

    // Example: Object destructuring
    const { message } = data;
    console.log('Message:', message);
}

main();`,
    },
  ],
  sql: [
    {
      id: '1',
      name: 'query.sql',
      language: 'sql',
      content: `-- SQL Playground
-- Write your SQL queries here

-- Create a sample table
CREATE TABLE users (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE,
    role TEXT DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample data
INSERT INTO users (name, email, role) VALUES
('John Doe', 'john@example.com', 'admin'),
('Jane Smith', 'jane@example.com', 'developer'),
('Bob Johnson', 'bob@example.com', 'user');

-- Query examples
SELECT * FROM users;

SELECT name, email FROM users WHERE role = 'developer';

SELECT role, COUNT(*) as count
FROM users
GROUP BY role;

-- Update example
UPDATE users SET role = 'admin' WHERE email = 'jane@example.com';

-- Join example (self join)
SELECT u1.name as user1, u2.name as user2
FROM users u1
CROSS JOIN users u2
WHERE u1.id < u2.id;`,
    },
  ],
};

export default function PlaygroundPage() {
  const [mode, setMode] = useState<PlaygroundMode>('html-css-js');
  const [files, setFiles] = useState<FileTab[]>(playgroundTemplates['html-css-js']);
  const [activeFileId, setActiveFileId] = useState(files[0].id);
  const [showPreview, setShowPreview] = useState(true);
  const [showConsole, setShowConsole] = useState(true);
  const [consoleOutput, setConsoleOutput] = useState<string[]>(['Console ready...']);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const activeFile = files.find((f) => f.id === activeFileId) || files[0];

  const updateFileContent = (content: string) => {
    setFiles(files.map((f) => (f.id === activeFileId ? { ...f, content } : f)));
  };

  const addNewFile = () => {
    const fileNumber = files.length + 1;
    const newFile: FileTab = {
      id: Date.now().toString(),
      name: `file${fileNumber}.js`,
      language: 'javascript',
      content: '// New file\n',
    };
    setFiles([...files, newFile]);
    setActiveFileId(newFile.id);
  };

  const closeFile = (id: string) => {
    if (files.length <= 1) return;
    const newFiles = files.filter((f) => f.id !== id);
    setFiles(newFiles);
    if (activeFileId === id) {
      setActiveFileId(newFiles[0].id);
    }
  };

  const switchMode = (newMode: PlaygroundMode) => {
    setMode(newMode);
    const template = playgroundTemplates[newMode];
    setFiles(template);
    setActiveFileId(template[0].id);
    setConsoleOutput(['Console ready...']);
    setShowPreview(newMode === 'html-css-js' || newMode === 'react');
  };

  const getPreviewContent = () => {
    if (mode !== 'html-css-js') return '';

    const htmlFile = files.find((f) => f.name.endsWith('.html'));
    const cssFile = files.find((f) => f.name.endsWith('.css'));
    const jsFile = files.find((f) => f.name.endsWith('.js') || f.name.endsWith('.jsx'));

    let html = htmlFile?.content || '<p>No HTML file found</p>';

    if (cssFile) {
      html = html.replace('</head>', `<style>${cssFile.content}</style></head>`);
    }

    if (jsFile) {
      // Inject console capture
      const consoleCapture = `
        <script>
          (function() {
            const originalLog = console.log;
            const originalError = console.error;
            const originalWarn = console.warn;

            window.capturedLogs = [];

            console.log = function(...args) {
              originalLog.apply(console, args);
              window.capturedLogs.push({ type: 'log', message: args.join(' ') });
            };

            console.error = function(...args) {
              originalError.apply(console, args);
              window.capturedLogs.push({ type: 'error', message: args.join(' ') });
            };

            console.warn = function(...args) {
              originalWarn.apply(console, args);
              window.capturedLogs.push({ type: 'warn', message: args.join(' ') });
            };

            window.onerror = function(msg, url, line, col, error) {
              window.capturedLogs.push({ type: 'error', message: \`Error: \${msg} at line \${line}\` });
              return false;
            };
          })();
        </script>
      `;
      html = html.replace('</head>', `${consoleCapture}</head>`);
      html = html.replace('</body>', `<script>${jsFile.content}</script></body>`);
    }

    return html;
  };

  const runCode = () => {
    setConsoleOutput(['Running code...']);

    if (mode === 'html-css-js') {
      // Reload iframe
      if (iframeRef.current) {
        const content = getPreviewContent();
        iframeRef.current.srcdoc = content;

        // Capture console logs after iframe loads
        setTimeout(() => {
          try {
            const logs = (iframeRef.current?.contentWindow as any)?.capturedLogs || [];
            const output = logs.map((log: any) => `[${log.type}] ${log.message}`);
            setConsoleOutput(output.length > 0 ? output : ['No console output']);
          } catch (e) {
            setConsoleOutput(['Console capture not available']);
          }
        }, 500);
      }
    } else {
      // Simulate execution for other languages
      const outputs = [
        'Executing...',
        `Running ${mode.toUpperCase()} code...`,
        'Output:',
        files[0].content.substring(0, 100) + '...',
        'Execution completed successfully',
      ];
      setConsoleOutput(outputs);
    }
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <Card className="border-gray-200 dark:border-gray-700 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20">
        <CardContent className="p-5">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                Code Playground
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Write, test, and preview code in multiple languages
              </p>
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              {/* Mode Switcher */}
              <div className="flex gap-1 bg-white dark:bg-gray-800 p-1 rounded-xl border border-gray-200 dark:border-gray-700">
                <Button
                  size="sm"
                  variant={mode === 'html-css-js' ? 'default' : 'ghost'}
                  onClick={() => switchMode('html-css-js')}
                  className={mode === 'html-css-js' ? 'bg-gradient-to-r from-purple-600 to-blue-600' : ''}
                >
                  <Code className="w-3 h-3 mr-1" />
                  HTML/CSS/JS
                </Button>
                <Button
                  size="sm"
                  variant={mode === 'react' ? 'default' : 'ghost'}
                  onClick={() => switchMode('react')}
                  className={mode === 'react' ? 'bg-gradient-to-r from-purple-600 to-blue-600' : ''}
                >
                  <Layers className="w-3 h-3 mr-1" />
                  React
                </Button>
                <Button
                  size="sm"
                  variant={mode === 'python' ? 'default' : 'ghost'}
                  onClick={() => switchMode('python')}
                  className={mode === 'python' ? 'bg-gradient-to-r from-purple-600 to-blue-600' : ''}
                >
                  Python
                </Button>
                <Button
                  size="sm"
                  variant={mode === 'nodejs' ? 'default' : 'ghost'}
                  onClick={() => switchMode('nodejs')}
                  className={mode === 'nodejs' ? 'bg-gradient-to-r from-purple-600 to-blue-600' : ''}
                >
                  Node.js
                </Button>
                <Button
                  size="sm"
                  variant={mode === 'sql' ? 'default' : 'ghost'}
                  onClick={() => switchMode('sql')}
                  className={mode === 'sql' ? 'bg-gradient-to-r from-purple-600 to-blue-600' : ''}
                >
                  SQL
                </Button>
              </div>

              <Button
                onClick={runCode}
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-lg shadow-green-500/30"
              >
                <Play className="w-4 h-4 mr-2" />
                Run Code
              </Button>
              <Button variant="outline" onClick={() => setShowPreview(!showPreview)}>
                {showPreview ? <EyeOff className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
                Preview
              </Button>
              <Button variant="outline" onClick={() => setShowConsole(!showConsole)}>
                <Terminal className="w-4 h-4 mr-2" />
                Console
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Editor + Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-[calc(100vh-20rem)]">
        {/* Editor */}
        <Card className="flex flex-col border-gray-200 dark:border-gray-700 overflow-hidden">
          {/* File Tabs */}
          <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-800 px-2 py-2 border-b border-gray-200 dark:border-gray-700 overflow-x-auto">
            {files.map((file) => (
              <div
                key={file.id}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm cursor-pointer transition-all duration-200 ${
                  activeFileId === file.id
                    ? 'bg-white dark:bg-gray-900 text-purple-600 dark:text-purple-400 shadow-sm font-semibold'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
                onClick={() => setActiveFileId(file.id)}
              >
                <FileCode className="w-3 h-3" />
                <span className="whitespace-nowrap">{file.name}</span>
                {files.length > 1 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      closeFile(file.id);
                    }}
                    className="hover:text-red-500 transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>
            ))}
            {mode === 'html-css-js' && (
              <button
                onClick={addNewFile}
                className="flex items-center gap-1 px-2 py-1.5 text-sm text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
              >
                <Plus className="w-3 h-3" />
              </button>
            )}
          </div>

          {/* Monaco Editor */}
          <div className="flex-1 overflow-hidden">
            <MonacoEditor
              height="100%"
              language={activeFile.language}
              theme="vs-dark"
              value={activeFile.content}
              onChange={(value) => updateFileContent(value || '')}
              options={{
                minimap: { enabled: true },
                fontSize: 14,
                lineNumbers: 'on',
                scrollBeyondLastLine: false,
                wordWrap: 'on',
                automaticLayout: true,
                padding: { top: 16, bottom: 16 },
                smoothScrolling: true,
                cursorBlinking: 'smooth',
                cursorSmoothCaretAnimation: 'on',
                folding: true,
                bracketPairColorization: { enabled: true },
              }}
            />
          </div>
        </Card>

        {/* Preview/Console */}
        <div className="flex flex-col gap-4">
          {/* Preview */}
          {showPreview && (mode === 'html-css-js' || mode === 'react') && (
            <Card className="flex-1 border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2 bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">Live Preview</span>
                </div>
                <Button size="icon" variant="ghost" className="h-7 w-7">
                  <Maximize2 className="w-3 h-3" />
                </Button>
              </div>
              <div className="h-[calc(100%-3rem)] bg-white">
                <iframe
                  ref={iframeRef}
                  srcDoc={getPreviewContent()}
                  className="w-full h-full border-0"
                  sandbox="allow-scripts"
                />
              </div>
            </Card>
          )}

          {/* Console */}
          {showConsole && (
            <Card className={`border-gray-200 dark:border-gray-700 ${!showPreview ? 'flex-1' : 'h-64'}`}>
              <div className="flex items-center justify-between px-4 py-2 bg-gray-900 border-b border-gray-700">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-green-400" />
                  <span className="text-sm font-semibold text-white">Console Output</span>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-7 text-xs text-gray-400 hover:text-white"
                  onClick={() => setConsoleOutput(['Console cleared'])}
                >
                  Clear
                </Button>
              </div>
              <div className="bg-gray-900 text-gray-100 p-4 font-mono text-sm overflow-y-auto h-[calc(100%-3rem)]">
                {consoleOutput.map((line, i) => (
                  <div
                    key={i}
                    className={`mb-1 ${
                      line.includes('[error]')
                        ? 'text-red-400'
                        : line.includes('[warn]')
                        ? 'text-yellow-400'
                        : 'text-green-400'
                    }`}
                  >
                    <span className="text-gray-500">&gt;</span> {line}
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
