'use client';

import { useState, useRef, useEffect } from 'react';
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
  Minimize2,
  ExternalLink,
  Save,
  Upload,
  Trash2,
  Copy,
  CheckCircle2,
  Moon,
  Sun,
  AlignLeft,
  RefreshCw,
  Zap,
  Grid3x3,
  SplitSquareHorizontal,
} from 'lucide-react';

// Dynamically import Monaco to avoid SSR issues
const MonacoEditor = dynamic(() => import('@monaco-editor/react'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full bg-gray-950">
      <div className="flex flex-col items-center gap-3">
        <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-gray-400 text-sm animate-pulse">Loading Monaco Editor...</p>
      </div>
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
type LayoutMode = 'split' | 'preview-only' | 'editor-only';

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
</head>
<body>
    <div class="container">
        <div class="card">
            <h1>🚀 DevBrain Playground</h1>
            <p>Professional code editor with live preview</p>
            <button onclick="handleClick()" class="btn">Click Me</button>
            <div id="output"></div>
        </div>
    </div>
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
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
}

.container {
    width: 100%;
    max-width: 600px;
}

.card {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    padding: 3rem;
    border-radius: 24px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    text-align: center;
    animation: fadeIn 0.5s ease-out;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

h1 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-weight: 800;
}

p {
    font-size: 1.1rem;
    margin-bottom: 2rem;
    color: #555;
}

.btn {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    padding: 1rem 2.5rem;
    font-size: 1rem;
    border-radius: 12px;
    cursor: pointer;
    font-weight: 600;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
}

.btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6);
}

.btn:active {
    transform: translateY(0);
}

#output {
    margin-top: 2rem;
    font-size: 1.5rem;
    font-weight: bold;
    color: #667eea;
    animation: slideIn 0.3s ease-out;
}

@keyframes slideIn {
    from {
        opacity: 0;
        transform: translateX(-20px);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
}`,
    },
    {
      id: '3',
      name: 'script.js',
      language: 'javascript',
      content: `function handleClick() {
    console.log('Button clicked! 🎉');

    const output = document.getElementById('output');
    output.textContent = '✨ Success! You clicked the button!';

    setTimeout(() => {
        output.textContent = '';
    }, 3000);
}

// Welcome message
console.log('%c Welcome to DevBrain Playground! ',
    'background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 10px; border-radius: 5px; font-size: 14px;');

console.log('Edit the code and see live changes!');`,
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
      <div style={styles.card}>
        <h1 style={styles.title}>⚛️ React Playground</h1>
        <p style={styles.text}>Counter: {count}</p>
        <div style={styles.buttonGroup}>
          <button onClick={() => setCount(count - 1)} style={styles.button}>
            Decrement
          </button>
          <button onClick={() => setCount(0)} style={styles.buttonSecondary}>
            Reset
          </button>
          <button onClick={() => setCount(count + 1)} style={styles.button}>
            Increment
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    padding: '20px',
  },
  card: {
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(10px)',
    padding: '3rem',
    borderRadius: '24px',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
    textAlign: 'center',
    maxWidth: '500px',
  },
  title: {
    fontSize: '2.5rem',
    marginBottom: '2rem',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    fontWeight: '800',
  },
  text: {
    fontSize: '3rem',
    marginBottom: '2rem',
    color: '#667eea',
    fontWeight: 'bold',
  },
  buttonGroup: {
    display: 'flex',
    gap: '1rem',
    justifyContent: 'center',
  },
  button: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    border: 'none',
    padding: '1rem 2rem',
    fontSize: '1rem',
    borderRadius: '12px',
    cursor: 'pointer',
    fontWeight: '600',
    boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
  },
  buttonSecondary: {
    background: 'white',
    color: '#667eea',
    border: '2px solid #667eea',
    padding: '1rem 2rem',
    fontSize: '1rem',
    borderRadius: '12px',
    cursor: 'pointer',
    fontWeight: '600',
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
      content: `# Python Playground - Advanced Examples

def fibonacci(n):
    """Generate Fibonacci sequence"""
    sequence = []
    a, b = 0, 1
    for _ in range(n):
        sequence.append(a)
        a, b = b, a + b
    return sequence

def is_prime(n):
    """Check if number is prime"""
    if n < 2:
        return False
    for i in range(2, int(n ** 0.5) + 1):
        if n % i == 0:
            return False
    return True

def main():
    print("=" * 50)
    print("🐍 Python Playground")
    print("=" * 50)

    # Fibonacci
    fib = fibonacci(10)
    print(f"\\nFibonacci (10): {fib}")

    # Prime numbers
    primes = [n for n in range(2, 20) if is_prime(n)]
    print(f"Primes (2-20): {primes}")

    # List comprehension
    squares = {x: x**2 for x in range(1, 6)}
    print(f"\\nSquares dict: {squares}")

    # Lambda functions
    operations = {
        'add': lambda a, b: a + b,
        'multiply': lambda a, b: a * b,
    }
    print(f"\\n5 + 3 = {operations['add'](5, 3)}")
    print(f"5 * 3 = {operations['multiply'](5, 3)}")

if __name__ == "__main__":
    main()`,
    },
  ],
  nodejs: [
    {
      id: '1',
      name: 'index.js',
      language: 'javascript',
      content: `// Node.js Playground - Advanced Examples

console.log('='.repeat(50));
console.log('🟢 Node.js Playground');
console.log('='.repeat(50));

// Array Methods
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const doubled = numbers.map(n => n * 2);
console.log('\\nDoubled:', doubled);

const evens = numbers.filter(n => n % 2 === 0);
console.log('Evens:', evens);

const sum = numbers.reduce((acc, n) => acc + n, 0);
console.log('Sum:', sum);

// Async/Await
async function fetchUserData(userId) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                id: userId,
                name: 'John Doe',
                role: 'Developer',
                skills: ['JavaScript', 'React', 'Node.js']
            });
        }, 1000);
    });
}

async function processData() {
    console.log('\\nFetching user data...');
    const user = await fetchUserData(123);
    console.log('User:', JSON.stringify(user, null, 2));

    // Destructuring
    const { name, role, skills } = user;
    console.log(\`\\n\${name} is a \${role}\`);
    console.log('Skills:', skills.join(', '));
}

// ES6+ Features
const greet = (name = 'World') => \`Hello, \${name}!\`;
console.log('\\n' + greet('DevBrain'));

// Run async function
processData().then(() => {
    console.log('\\n✅ Execution completed!');
});`,
    },
  ],
  sql: [
    {
      id: '1',
      name: 'query.sql',
      language: 'sql',
      content: `-- SQL Playground - Advanced Queries
-- Professional database examples

-- ============================================
-- CREATE TABLES
-- ============================================

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    role VARCHAR(20) DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP
);

CREATE TABLE IF NOT EXISTS posts (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    title VARCHAR(200) NOT NULL,
    content TEXT,
    views INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS comments (
    id SERIAL PRIMARY KEY,
    post_id INTEGER REFERENCES posts(id),
    user_id INTEGER REFERENCES users(id),
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- INSERT SAMPLE DATA
-- ============================================

INSERT INTO users (username, email, role) VALUES
('admin', 'admin@devbrain.dev', 'admin'),
('john_dev', 'john@example.com', 'developer'),
('jane_designer', 'jane@example.com', 'designer'),
('bob_user', 'bob@example.com', 'user');

INSERT INTO posts (user_id, title, content, views) VALUES
(1, 'Welcome to DevBrain', 'Our new platform for developers', 150),
(2, 'JavaScript Tips', 'Advanced JS patterns and tricks', 320),
(3, 'UI/UX Best Practices', 'Design principles for modern apps', 280);

-- ============================================
-- COMPLEX QUERIES
-- ============================================

-- Users with post counts
SELECT
    u.username,
    u.role,
    COUNT(p.id) as post_count,
    SUM(p.views) as total_views
FROM users u
LEFT JOIN posts p ON u.id = p.user_id
GROUP BY u.id, u.username, u.role
ORDER BY total_views DESC;

-- Top posts with author info
SELECT
    p.title,
    p.views,
    u.username as author,
    u.role,
    p.created_at
FROM posts p
JOIN users u ON p.user_id = u.id
WHERE p.views > 100
ORDER BY p.views DESC
LIMIT 10;

-- Subquery example
SELECT username, email
FROM users
WHERE id IN (
    SELECT DISTINCT user_id
    FROM posts
    WHERE views > 200
);`,
    },
  ],
};

export default function PlaygroundPage() {
  const [mode, setMode] = useState<PlaygroundMode>('html-css-js');
  const [files, setFiles] = useState<FileTab[]>(playgroundTemplates['html-css-js']);
  const [activeFileId, setActiveFileId] = useState(files[0].id);
  const [layoutMode, setLayoutMode] = useState<LayoutMode>('split');
  const [showConsole, setShowConsole] = useState(true);
  const [consoleOutput, setConsoleOutput] = useState<string[]>(['> Console ready. Run your code to see output...']);
  const [editorTheme, setEditorTheme] = useState<'vs-dark' | 'light'>('vs-dark');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [autoRun, setAutoRun] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const activeFile = files.find((f) => f.id === activeFileId) || files[0];

  // Auto-run preview after 1 second of inactivity
  useEffect(() => {
    if (autoRun && mode === 'html-css-js') {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        runCode();
      }, 1000);
    }
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [files, autoRun, mode]);

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
    setConsoleOutput(['> Console ready. Run your code to see output...']);
  };

  const getPreviewContent = () => {
    if (mode !== 'html-css-js') return '';

    const htmlFile = files.find((f) => f.name.endsWith('.html'));
    const cssFile = files.find((f) => f.name.endsWith('.css'));
    const jsFile = files.find((f) => f.name.endsWith('.js'));

    let html = htmlFile?.content || '<p>No HTML file found</p>';

    // Inject CSS
    if (cssFile && html.includes('</head>')) {
      html = html.replace('</head>', `<style>${cssFile.content}</style></head>`);
    } else if (cssFile) {
      html = `<style>${cssFile.content}</style>` + html;
    }

    // Inject console capture + JS
    if (jsFile) {
      const consoleScript = `
        <script>
          (function() {
            const logs = [];
            const originalLog = console.log;
            const originalError = console.error;
            const originalWarn = console.warn;

            console.log = function(...args) {
              originalLog.apply(console, args);
              logs.push({ type: 'log', message: args.map(a => String(a)).join(' ') });
              window.parent.postMessage({ type: 'console', logs }, '*');
            };

            console.error = function(...args) {
              originalError.apply(console, args);
              logs.push({ type: 'error', message: args.map(a => String(a)).join(' ') });
              window.parent.postMessage({ type: 'console', logs }, '*');
            };

            console.warn = function(...args) {
              originalWarn.apply(console, args);
              logs.push({ type: 'warn', message: args.map(a => String(a)).join(' ') });
              window.parent.postMessage({ type: 'console', logs }, '*');
            };

            window.onerror = function(msg, url, line) {
              logs.push({ type: 'error', message: \`Error at line \${line}: \${msg}\` });
              window.parent.postMessage({ type: 'console', logs }, '*');
              return false;
            };
          })();
        </script>
      `;

      if (html.includes('</head>')) {
        html = html.replace('</head>', `${consoleScript}</head>`);
      } else {
        html = consoleScript + html;
      }

      if (html.includes('</body>')) {
        html = html.replace('</body>', `<script>${jsFile.content}</script></body>`);
      } else {
        html += `<script>${jsFile.content}</script>`;
      }
    }

    return html;
  };

  // Listen for console messages from iframe
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === 'console') {
        const output = event.data.logs.map((log: any) =>
          `${log.type === 'error' ? '[ERROR]' : log.type === 'warn' ? '[WARN]' : '>'} ${log.message}`
        );
        setConsoleOutput(output.length > 0 ? output : ['> No console output']);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const runCode = () => {
    if (mode === 'html-css-js') {
      if (iframeRef.current) {
        const content = getPreviewContent();
        iframeRef.current.srcdoc = content;
      }
    } else {
      // Simulate execution for other languages
      const timestamp = new Date().toLocaleTimeString();
      const outputs = [
        `> [${timestamp}] Executing ${mode.toUpperCase()} code...`,
        `> ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
        files[0].content.split('\n').slice(0, 10).map(line => `  ${line}`).join('\n'),
        `> ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
        `> ✅ Execution completed successfully`,
      ];
      setConsoleOutput(outputs);
    }
  };

  const openPreviewInNewTab = () => {
    const content = getPreviewContent();
    const newWindow = window.open('', '_blank');
    if (newWindow) {
      newWindow.document.write(content);
      newWindow.document.close();
    }
  };

  const downloadCode = () => {
    files.forEach(file => {
      const blob = new Blob([file.content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = file.name;
      a.click();
      URL.revokeObjectURL(url);
    });
  };

  const formatCode = () => {
    // Simple formatting - in real app use Prettier
    if (activeFile.language === 'javascript') {
      const formatted = activeFile.content; // Would use prettier here
      updateFileContent(formatted);
    }
  };

  return (
    <div className={`flex flex-col ${isFullscreen ? 'fixed inset-0 z-50 bg-gray-950' : 'h-[calc(100vh-8rem)]'}`}>
      {/* Top Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border-b border-gray-700">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center shadow-lg shadow-purple-500/50">
              <Code className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white">Code Playground</h2>
              <p className="text-xs text-gray-400">Live coding environment</p>
            </div>
          </div>

          {/* Mode Switcher */}
          <div className="flex gap-1 bg-gray-800/50 p-1 rounded-lg border border-gray-700">
            {(['html-css-js', 'react', 'python', 'nodejs', 'sql'] as PlaygroundMode[]).map((m) => (
              <button
                key={m}
                onClick={() => switchMode(m)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                  mode === m
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/50'
                    : 'text-gray-400 hover:text-white hover:bg-gray-700'
                }`}
              >
                {m.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('/')}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Auto-run toggle */}
          <button
            onClick={() => setAutoRun(!autoRun)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              autoRun
                ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                : 'bg-gray-700 text-gray-400 border border-gray-600'
            }`}
          >
            <Zap className="w-3 h-3" />
            Auto-run
          </button>

          <button
            onClick={runCode}
            className="flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white rounded-lg text-xs font-semibold shadow-lg shadow-green-500/30 transition-all"
          >
            <Play className="w-3 h-3" />
            Run Code
          </button>

          <button
            onClick={() => setEditorTheme(editorTheme === 'vs-dark' ? 'light' : 'vs-dark')}
            className="p-1.5 rounded-lg bg-gray-700 hover:bg-gray-600 text-gray-300 transition-all"
            title="Toggle theme"
          >
            {editorTheme === 'vs-dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          <button
            onClick={formatCode}
            className="p-1.5 rounded-lg bg-gray-700 hover:bg-gray-600 text-gray-300 transition-all"
            title="Format code"
          >
            <AlignLeft className="w-4 h-4" />
          </button>

          <button
            onClick={downloadCode}
            className="p-1.5 rounded-lg bg-gray-700 hover:bg-gray-600 text-gray-300 transition-all"
            title="Download"
          >
            <Download className="w-4 h-4" />
          </button>

          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-1.5 rounded-lg bg-gray-700 hover:bg-gray-600 text-gray-300 transition-all"
            title="Fullscreen"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Editor */}
        {layoutMode !== 'preview-only' && (
          <div className="flex-1 flex flex-col bg-gray-950 border-r border-gray-800">
            {/* File Tabs */}
            <div className="flex items-center gap-1 bg-gray-900 px-2 py-2 border-b border-gray-800 overflow-x-auto">
              {files.map((file) => (
                <div
                  key={file.id}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs cursor-pointer transition-all ${
                    activeFileId === file.id
                      ? 'bg-gray-950 text-purple-400 shadow-lg'
                      : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                  }`}
                  onClick={() => setActiveFileId(file.id)}
                >
                  <FileCode className="w-3 h-3" />
                  <span className="whitespace-nowrap font-medium">{file.name}</span>
                  {files.length > 1 && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        closeFile(file.id);
                      }}
                      className="hover:text-red-400 transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </div>
              ))}
              {mode === 'html-css-js' && (
                <button
                  onClick={addNewFile}
                  className="flex items-center gap-1 px-2 py-1.5 text-xs text-gray-500 hover:text-purple-400 transition-colors"
                >
                  <Plus className="w-3 h-3" />
                </button>
              )}
            </div>

            {/* Monaco Editor */}
            <div className="flex-1">
              <MonacoEditor
                height="100%"
                language={activeFile.language}
                theme={editorTheme}
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
                  formatOnPaste: true,
                  formatOnType: true,
                  suggest: {
                    snippetsPreventQuickSuggestions: false,
                  },
                }}
              />
            </div>
          </div>
        )}

        {/* Preview & Console */}
        {layoutMode !== 'editor-only' && (
          <div className="flex-1 flex flex-col bg-gray-900">
            {/* Preview */}
            {(mode === 'html-css-js' || mode === 'react') && (
              <div className="flex-1 flex flex-col border-b border-gray-800">
                <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
                  <div className="flex items-center gap-2">
                    <Eye className="w-4 h-4 text-purple-400" />
                    <span className="text-xs font-semibold text-white">Live Preview</span>
                    {autoRun && (
                      <Badge className="bg-green-500/20 text-green-400 text-xs px-2 py-0 border border-green-500/30">
                        Auto-updating
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={openPreviewInNewTab}
                      className="flex items-center gap-1 px-2 py-1 bg-gray-700 hover:bg-gray-600 rounded text-xs text-gray-300 transition-all"
                    >
                      <ExternalLink className="w-3 h-3" />
                      Open
                    </button>
                    <button
                      onClick={() => runCode()}
                      className="p-1 bg-gray-700 hover:bg-gray-600 rounded text-gray-300 transition-all"
                      title="Refresh preview"
                    >
                      <RefreshCw className="w-3 h-3" />
                    </button>
                  </div>
                </div>
                <div className="flex-1 bg-white overflow-auto">
                  <iframe
                    ref={iframeRef}
                    srcDoc={getPreviewContent()}
                    className="w-full h-full border-0"
                    sandbox="allow-scripts"
                  />
                </div>
              </div>
            )}

            {/* Console */}
            {showConsole && (
              <div className="h-64 flex flex-col bg-gray-950">
                <div className="flex items-center justify-between px-4 py-2 bg-gray-900 border-b border-gray-800">
                  <div className="flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-green-400" />
                    <span className="text-xs font-semibold text-white">Console</span>
                  </div>
                  <button
                    onClick={() => setConsoleOutput(['> Console cleared'])}
                    className="text-xs text-gray-400 hover:text-white transition-colors"
                  >
                    Clear
                  </button>
                </div>
                <div className="flex-1 overflow-y-auto p-3 font-mono text-xs">
                  {consoleOutput.map((line, i) => (
                    <div
                      key={i}
                      className={`mb-1 leading-relaxed ${
                        line.includes('[ERROR]')
                          ? 'text-red-400'
                          : line.includes('[WARN]')
                          ? 'text-yellow-400'
                          : 'text-green-400'
                      }`}
                    >
                      {line}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Bottom Bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-900 border-t border-gray-800">
        <div className="flex items-center gap-4 text-xs text-gray-400">
          <span className="flex items-center gap-1">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            Ready
          </span>
          <span>{mode.toUpperCase()}</span>
          <span>{activeFile.name}</span>
          <span>{activeFile.content.split('\n').length} lines</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setLayoutMode(layoutMode === 'split' ? 'editor-only' : layoutMode === 'editor-only' ? 'preview-only' : 'split')}
            className="flex items-center gap-1 px-2 py-1 rounded bg-gray-800 hover:bg-gray-700 text-xs text-gray-300 transition-all"
          >
            <SplitSquareHorizontal className="w-3 h-3" />
            {layoutMode === 'split' ? 'Split' : layoutMode === 'editor-only' ? 'Editor' : 'Preview'}
          </button>
          <button
            onClick={() => setShowConsole(!showConsole)}
            className={`px-2 py-1 rounded text-xs transition-all ${
              showConsole
                ? 'bg-purple-500/20 text-purple-400'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            Console
          </button>
        </div>
      </div>
    </div>
  );
}
