'use client';

import { useState, useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Play,
  Square,
  Download,
  Upload,
  Settings,
  Maximize2,
  Minimize2,
  FolderTree,
  Terminal as TerminalIcon,
  GitBranch,
  Search,
  Save,
  FileCode,
  Plus,
  X,
  ChevronRight,
  Folder,
  File,
  Moon,
  Sun,
  Sparkles,
  Copy,
  Check,
  RotateCcw,
  Zap,
  Layers,
  Code2,
} from 'lucide-react';

// Dynamically import Monaco Editor (client-side only)
const MonacoEditor = dynamic(() => import('@monaco-editor/react'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full bg-[#1e1e1e]">
      <div className="flex flex-col items-center gap-3">
        <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-gray-400 text-sm">Loading Monaco Editor...</p>
      </div>
    </div>
  ),
});

interface FileNode {
  id: string;
  name: string;
  type: 'file' | 'folder';
  language?: string;
  content?: string;
  children?: FileNode[];
  isOpen?: boolean;
}

interface Tab {
  id: string;
  name: string;
  language: string;
  content: string;
  isDirty: boolean;
}

const INITIAL_FILE_TREE: FileNode[] = [
  {
    id: '1',
    name: 'src',
    type: 'folder',
    isOpen: true,
    children: [
      {
        id: '2',
        name: 'index.html',
        type: 'file',
        language: 'html',
        content: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>DevBrain IDE</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="container">
        <h1>Welcome to DevBrain IDE</h1>
        <p>Professional development environment in your browser</p>
        <button onclick="handleClick()">Click Me</button>
        <div id="output"></div>
    </div>
    <script src="script.js"></script>
</body>
</html>`,
      },
      {
        id: '3',
        name: 'styles.css',
        type: 'file',
        language: 'css',
        content: `* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Segoe UI', system-ui, sans-serif;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
}

.container {
    background: white;
    padding: 3rem;
    border-radius: 20px;
    box-shadow: 0 20px 60px rgba(0,0,0,0.3);
    text-align: center;
    max-width: 600px;
}

h1 {
    color: #667eea;
    margin-bottom: 1rem;
    font-size: 2.5rem;
}

p {
    color: #666;
    margin-bottom: 2rem;
}

button {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    padding: 1rem 2rem;
    border-radius: 10px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: transform 0.2s, box-shadow 0.2s;
}

button:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);
}

button:active {
    transform: translateY(0);
}

#output {
    margin-top: 1.5rem;
    padding: 1rem;
    background: #f7f7f7;
    border-radius: 10px;
    min-height: 50px;
    color: #333;
    font-weight: 500;
}`,
      },
      {
        id: '4',
        name: 'script.js',
        type: 'file',
        language: 'javascript',
        content: `function handleClick() {
    console.log('Button clicked!');

    const output = document.getElementById('output');
    output.textContent = 'Success! You clicked the button!';
    output.style.background = '#d4edda';
    output.style.color = '#155724';

    setTimeout(() => {
        output.textContent = '';
        output.style.background = '#f7f7f7';
    }, 3000);
}

// Welcome message
console.log('%c Welcome to DevBrain IDE! ', 'background: #667eea; color: white; font-size: 16px; padding: 10px; border-radius: 5px;');

// Auto-run initialization
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded and ready!');
});`,
      },
    ],
  },
  {
    id: '5',
    name: 'components',
    type: 'folder',
    isOpen: false,
    children: [
      {
        id: '6',
        name: 'App.tsx',
        type: 'file',
        language: 'typescript',
        content: `import React from 'react';

interface AppProps {
  title: string;
}

const App: React.FC<AppProps> = ({ title }) => {
  const [count, setCount] = React.useState(0);

  return (
    <div className="app">
      <h1>{title}</h1>
      <button onClick={() => setCount(count + 1)}>
        Count: {count}
      </button>
    </div>
  );
};

export default App;`,
      },
    ],
  },
  {
    id: '7',
    name: 'README.md',
    type: 'file',
    language: 'markdown',
    content: `# DevBrain IDE

Professional development environment built with Monaco Editor.

## Features

- ✨ Full VS Code editor engine
- 📁 File tree explorer
- 🚀 Live preview
- 💻 Multi-tab editing
- 🎨 Theme switcher
- 📦 Auto-save
- 🔍 Search & replace
- 🌐 Multi-language support

## Supported Languages

- HTML, CSS, JavaScript
- TypeScript, React, Vue, Angular
- Python, PHP, Ruby, Go
- Java, C++, C#, Rust
- SQL, JSON, YAML, XML
- And 50+ more...

Built with ❤️ by DevBrain`,
  },
];

export default function PlaygroundPage() {
  const [fileTree, setFileTree] = useState<FileNode[]>(INITIAL_FILE_TREE);
  const [tabs, setTabs] = useState<Tab[]>([
    {
      id: '2',
      name: 'index.html',
      language: 'html',
      content: INITIAL_FILE_TREE[0].children![0].content!,
      isDirty: false,
    },
  ]);
  const [activeTabId, setActiveTabId] = useState('2');
  const [editorTheme, setEditorTheme] = useState<'vs-dark' | 'light'>('vs-dark');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showFileTree, setShowFileTree] = useState(true);
  const [showTerminal, setShowTerminal] = useState(false);
  const [showPreview, setShowPreview] = useState(true);
  const [previewContent, setPreviewContent] = useState('');
  const [terminalOutput, setTerminalOutput] = useState<string[]>([
    '> DevBrain IDE Terminal',
    '> Type "help" for available commands',
    '',
  ]);
  const [terminalInput, setTerminalInput] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [layout, setLayout] = useState<'horizontal' | 'vertical'>('horizontal');
  const editorRef = useRef<any>(null);

  const activeTab = tabs.find((t) => t.id === activeTabId);

  // Auto-save functionality
  useEffect(() => {
    const interval = setInterval(() => {
      const dirtyTabs = tabs.filter((t) => t.isDirty);
      if (dirtyTabs.length > 0) {
        handleSaveAll();
      }
    }, 30000); // Auto-save every 30 seconds

    return () => clearInterval(interval);
  }, [tabs]);

  // Update preview when HTML/CSS/JS changes
  useEffect(() => {
    if (activeTab && showPreview) {
      updatePreview();
    }
  }, [activeTab?.content, showPreview]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl/Cmd + S = Save
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        handleSaveAll();
      }
      // Ctrl/Cmd + B = Toggle file tree
      if ((e.ctrlKey || e.metaKey) && e.key === 'b') {
        e.preventDefault();
        setShowFileTree(!showFileTree);
      }
      // Ctrl/Cmd + ` = Toggle terminal
      if ((e.ctrlKey || e.metaKey) && e.key === '`') {
        e.preventDefault();
        setShowTerminal(!showTerminal);
      }
      // Ctrl/Cmd + P = Run code
      if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
        e.preventDefault();
        handleRunCode();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showFileTree, showTerminal]);

  const findFileInTree = (tree: FileNode[], id: string): FileNode | null => {
    for (const node of tree) {
      if (node.id === id) return node;
      if (node.children) {
        const found = findFileInTree(node.children, id);
        if (found) return found;
      }
    }
    return null;
  };

  const updateFileContent = (tree: FileNode[], id: string, content: string): FileNode[] => {
    return tree.map((node) => {
      if (node.id === id) {
        return { ...node, content };
      }
      if (node.children) {
        return { ...node, children: updateFileContent(node.children, id, content) };
      }
      return node;
    });
  };

  const toggleFolder = (id: string) => {
    const updateTree = (tree: FileNode[]): FileNode[] => {
      return tree.map((node) => {
        if (node.id === id && node.type === 'folder') {
          return { ...node, isOpen: !node.isOpen };
        }
        if (node.children) {
          return { ...node, children: updateTree(node.children) };
        }
        return node;
      });
    };
    setFileTree(updateTree(fileTree));
  };

  const handleFileClick = (file: FileNode) => {
    if (file.type === 'folder') {
      toggleFolder(file.id);
      return;
    }

    // Check if tab already exists
    const existingTab = tabs.find((t) => t.id === file.id);
    if (existingTab) {
      setActiveTabId(file.id);
      return;
    }

    // Create new tab
    const newTab: Tab = {
      id: file.id,
      name: file.name,
      language: file.language || 'plaintext',
      content: file.content || '',
      isDirty: false,
    };
    setTabs([...tabs, newTab]);
    setActiveTabId(file.id);
  };

  const handleCloseTab = (tabId: string) => {
    const tabIndex = tabs.findIndex((t) => t.id === tabId);
    const newTabs = tabs.filter((t) => t.id !== tabId);
    setTabs(newTabs);

    if (activeTabId === tabId && newTabs.length > 0) {
      const newActiveIndex = Math.max(0, tabIndex - 1);
      setActiveTabId(newTabs[newActiveIndex].id);
    }
  };

  const handleEditorChange = (value: string | undefined) => {
    if (!activeTab || value === undefined) return;

    setTabs(
      tabs.map((tab) =>
        tab.id === activeTab.id ? { ...tab, content: value, isDirty: true } : tab
      )
    );

    // Update file tree
    setFileTree(updateFileContent(fileTree, activeTab.id, value));
  };

  const handleSaveAll = () => {
    setIsSaving(true);
    setTabs(tabs.map((tab) => ({ ...tab, isDirty: false })));
    setLastSaved(new Date());
    setTimeout(() => setIsSaving(false), 500);
  };

  const handleRunCode = () => {
    addTerminalOutput('> Running code...');
    updatePreview();
    setTimeout(() => {
      addTerminalOutput('✓ Code executed successfully');
    }, 500);
  };

  const updatePreview = () => {
    const htmlFile = tabs.find((t) => t.language === 'html') ||
                     findFileInTree(fileTree, '2');
    const cssFile = tabs.find((t) => t.language === 'css') ||
                    findFileInTree(fileTree, '3');
    const jsFile = tabs.find((t) => t.language === 'javascript') ||
                   findFileInTree(fileTree, '4');

    const html = htmlFile?.content || (htmlFile as any)?.content || '';
    const css = cssFile?.content || (cssFile as any)?.content || '';
    const js = jsFile?.content || (jsFile as any)?.content || '';

    // Inject console capture
    const consoleScript = `
      <script>
        (function() {
          const logs = [];
          const originalLog = console.log;
          const originalError = console.error;
          const originalWarn = console.warn;

          console.log = function(...args) {
            originalLog.apply(console, args);
            logs.push({ type: 'log', message: args.join(' ') });
            window.parent.postMessage({ type: 'console', logs }, '*');
          };

          console.error = function(...args) {
            originalError.apply(console, args);
            logs.push({ type: 'error', message: args.join(' ') });
            window.parent.postMessage({ type: 'console', logs }, '*');
          };

          console.warn = function(...args) {
            originalWarn.apply(console, args);
            logs.push({ type: 'warn', message: args.join(' ') });
            window.parent.postMessage({ type: 'console', logs }, '*');
          };

          window.addEventListener('error', function(e) {
            logs.push({ type: 'error', message: e.message });
            window.parent.postMessage({ type: 'console', logs }, '*');
          });
        })();
      </script>
    `;

    let fullHtml = html;
    if (css && !html.includes('<style>')) {
      fullHtml = fullHtml.replace('</head>', `<style>${css}</style></head>`);
    }
    if (js && !html.includes('<script>')) {
      fullHtml = fullHtml.replace('</body>', `<script>${js}</script></body>`);
    }
    fullHtml = fullHtml.replace('</head>', `${consoleScript}</head>`);

    setPreviewContent(fullHtml);
  };

  const addTerminalOutput = (output: string) => {
    setTerminalOutput((prev) => [...prev, output]);
  };

  const handleTerminalCommand = (command: string) => {
    addTerminalOutput(`> ${command}`);

    const cmd = command.trim().toLowerCase();
    if (cmd === 'help') {
      addTerminalOutput('Available commands:');
      addTerminalOutput('  help     - Show this help message');
      addTerminalOutput('  clear    - Clear terminal');
      addTerminalOutput('  run      - Run current code');
      addTerminalOutput('  save     - Save all files');
      addTerminalOutput('  tree     - Show file tree');
      addTerminalOutput('  theme    - Toggle editor theme');
    } else if (cmd === 'clear') {
      setTerminalOutput([]);
    } else if (cmd === 'run') {
      handleRunCode();
    } else if (cmd === 'save') {
      handleSaveAll();
      addTerminalOutput('✓ All files saved');
    } else if (cmd === 'tree') {
      addTerminalOutput('File structure:');
      addTerminalOutput('  src/');
      addTerminalOutput('    index.html');
      addTerminalOutput('    styles.css');
      addTerminalOutput('    script.js');
      addTerminalOutput('  components/');
      addTerminalOutput('    App.tsx');
      addTerminalOutput('  README.md');
    } else if (cmd === 'theme') {
      setEditorTheme(editorTheme === 'vs-dark' ? 'light' : 'vs-dark');
      addTerminalOutput(`✓ Theme switched to ${editorTheme === 'vs-dark' ? 'light' : 'dark'}`);
    } else {
      addTerminalOutput(`Command not found: ${command}`);
    }

    setTerminalInput('');
  };

  const handleDownloadProject = () => {
    const files: { [key: string]: string } = {};
    tabs.forEach((tab) => {
      files[tab.name] = tab.content;
    });
    const blob = new Blob([JSON.stringify(files, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `devbrain-project-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const renderFileTree = (nodes: FileNode[], depth: number = 0) => {
    return nodes.map((node) => (
      <div key={node.id}>
        <div
          className={`flex items-center gap-2 px-2 py-1.5 hover:bg-gray-700/50 cursor-pointer rounded transition-colors ${
            activeTabId === node.id ? 'bg-purple-600/30' : ''
          }`}
          style={{ paddingLeft: `${depth * 12 + 8}px` }}
          onClick={() => handleFileClick(node)}
        >
          {node.type === 'folder' ? (
            <>
              <ChevronRight
                className={`w-3 h-3 transition-transform ${node.isOpen ? 'rotate-90' : ''}`}
              />
              <Folder className="w-4 h-4 text-yellow-500" />
            </>
          ) : (
            <>
              <div className="w-3" />
              <File className="w-4 h-4 text-blue-400" />
            </>
          )}
          <span className="text-sm text-gray-300">{node.name}</span>
        </div>
        {node.type === 'folder' && node.isOpen && node.children && (
          <div>{renderFileTree(node.children, depth + 1)}</div>
        )}
      </div>
    ));
  };

  // Listen for console messages from preview iframe
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === 'console') {
        const logs = event.data.logs;
        logs.forEach((log: { type: string; message: string }) => {
          const prefix = log.type === 'error' ? '❌' : log.type === 'warn' ? '⚠️' : '>';
          addTerminalOutput(`${prefix} ${log.message}`);
        });
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const mainContent = (
    <div className="flex h-full">
      {/* File Tree */}
      {showFileTree && (
        <div className="w-64 bg-[#252526] border-r border-gray-700 flex flex-col overflow-hidden flex-shrink-0">
          <div className="h-10 border-b border-gray-700 flex items-center px-3">
            <FolderTree className="w-4 h-4 mr-2 text-purple-400" />
            <span className="text-xs font-semibold text-gray-300 uppercase tracking-wide">
              Explorer
            </span>
          </div>
          <div className="flex-1 overflow-y-auto p-2">{renderFileTree(fileTree)}</div>
        </div>
      )}

      {/* Editor Area */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        {/* Tabs */}
        <div className="h-10 bg-[#2d2d2d] border-b border-gray-700 flex items-center overflow-x-auto flex-shrink-0">
          {tabs.map((tab) => (
            <div
              key={tab.id}
              className={`flex items-center gap-2 px-4 h-full border-r border-gray-700 cursor-pointer transition-colors flex-shrink-0 ${
                activeTabId === tab.id ? 'bg-[#1e1e1e]' : 'hover:bg-[#252526]'
              }`}
              onClick={() => setActiveTabId(tab.id)}
            >
              <FileCode className="w-3 h-3 text-blue-400" />
              <span className="text-xs text-gray-300">{tab.name}</span>
              {tab.isDirty && <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleCloseTab(tab.id);
                }}
                className="ml-1 hover:bg-gray-600 rounded p-0.5"
              >
                <X className="w-3 h-3 text-gray-400" />
              </button>
            </div>
          ))}
        </div>

        {/* Editor & Preview Layout */}
        <div className={`flex-1 flex ${layout === 'vertical' ? 'flex-col' : 'flex-row'} overflow-hidden`}>
          {/* Monaco Editor */}
          <div className="flex-1 overflow-hidden">
            {activeTab ? (
              <MonacoEditor
                height="100%"
                language={activeTab.language}
                theme={editorTheme}
                value={activeTab.content}
                onChange={handleEditorChange}
                onMount={(editor) => {
                  editorRef.current = editor;
                }}
                options={{
                  minimap: { enabled: true },
                  fontSize: 14,
                  lineNumbers: 'on',
                  roundedSelection: true,
                  scrollBeyondLastLine: false,
                  automaticLayout: true,
                  tabSize: 2,
                  wordWrap: 'on',
                  formatOnPaste: true,
                  formatOnType: true,
                  suggestOnTriggerCharacters: true,
                  quickSuggestions: true,
                  folding: true,
                  bracketPairColorization: { enabled: true },
                }}
              />
            ) : (
              <div className="flex items-center justify-center h-full bg-[#1e1e1e] text-gray-500">
                <p>No file selected</p>
              </div>
            )}
          </div>

          {/* Live Preview */}
          {showPreview && (
            <div className="flex-1 bg-white overflow-hidden border-l border-gray-700 flex flex-col">
              <div className="h-10 bg-[#2d2d2d] border-b border-gray-700 flex items-center justify-between px-3 flex-shrink-0">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-purple-400" />
                  <span className="text-xs font-semibold text-gray-300 uppercase tracking-wide">
                    Live Preview
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-6 px-2 text-xs text-gray-300 hover:bg-gray-700"
                    onClick={() => window.open('', '_blank')?.document.write(previewContent)}
                  >
                    Open in New Tab
                  </Button>
                </div>
              </div>
              <iframe
                srcDoc={previewContent}
                className="flex-1 w-full bg-white"
                title="preview"
                sandbox="allow-scripts allow-modals allow-forms allow-popups"
              />
            </div>
          )}
        </div>

        {/* Terminal */}
        {showTerminal && (
          <div className="h-48 bg-[#1e1e1e] border-t border-gray-700 flex flex-col flex-shrink-0">
            <div className="h-8 bg-[#2d2d2d] border-b border-gray-700 flex items-center px-3">
              <TerminalIcon className="w-3 h-3 mr-2 text-green-400" />
              <span className="text-xs font-semibold text-gray-300 uppercase tracking-wide">
                Terminal
              </span>
            </div>
            <div className="flex-1 overflow-y-auto p-3 font-mono text-xs text-gray-300">
              {terminalOutput.map((line, i) => (
                <div key={i} className="mb-1">
                  {line}
                </div>
              ))}
            </div>
            <div className="h-8 bg-[#252526] border-t border-gray-700 flex items-center px-3">
              <span className="text-green-400 mr-2">$</span>
              <input
                type="text"
                value={terminalInput}
                onChange={(e) => setTerminalInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleTerminalCommand(terminalInput);
                  }
                }}
                className="flex-1 bg-transparent border-none outline-none text-xs text-gray-300 font-mono"
                placeholder="Type command..."
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
            DevBrain IDE
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Professional development environment powered by Monaco Editor
          </p>
        </div>
        <div className="flex items-center gap-3">
          {lastSaved && (
            <div className="text-xs text-gray-500 flex items-center gap-1">
              {isSaving ? (
                <>
                  <Save className="w-3 h-3 animate-pulse" />
                  Saving...
                </>
              ) : (
                <>
                  <Check className="w-3 h-3 text-green-500" />
                  Saved {lastSaved.toLocaleTimeString()}
                </>
              )}
            </div>
          )}
          <Badge className="bg-gradient-to-r from-purple-500 to-blue-500 text-white border-0">
            <Zap className="w-3 h-3 mr-1" />
            Monaco Editor
          </Badge>
        </div>
      </div>

      {/* Toolbar */}
      <Card className="border-gray-200 dark:border-gray-700">
        <CardContent className="p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                onClick={handleRunCode}
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white"
              >
                <Play className="w-3 h-3 mr-1" />
                Run
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={handleSaveAll}
                disabled={!tabs.some((t) => t.isDirty)}
              >
                <Save className="w-3 h-3 mr-1" />
                Save All
              </Button>
              <Button size="sm" variant="outline" onClick={handleDownloadProject}>
                <Download className="w-3 h-3 mr-1" />
                Export
              </Button>
              <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-2" />
              <Button
                size="sm"
                variant="outline"
                onClick={() => setShowFileTree(!showFileTree)}
                className={showFileTree ? 'bg-purple-50 dark:bg-purple-900/20' : ''}
              >
                <FolderTree className="w-3 h-3 mr-1" />
                Explorer
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setShowTerminal(!showTerminal)}
                className={showTerminal ? 'bg-purple-50 dark:bg-purple-900/20' : ''}
              >
                <TerminalIcon className="w-3 h-3 mr-1" />
                Terminal
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setShowPreview(!showPreview)}
                className={showPreview ? 'bg-purple-50 dark:bg-purple-900/20' : ''}
              >
                <Sparkles className="w-3 h-3 mr-1" />
                Preview
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  setLayout(layout === 'horizontal' ? 'vertical' : 'horizontal')
                }
              >
                <Layers className="w-3 h-3 mr-1" />
                {layout === 'horizontal' ? 'Horizontal' : 'Vertical'}
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setEditorTheme(editorTheme === 'vs-dark' ? 'light' : 'vs-dark')}
              >
                {editorTheme === 'vs-dark' ? (
                  <>
                    <Sun className="w-3 h-3 mr-1" />
                    Light
                  </>
                ) : (
                  <>
                    <Moon className="w-3 h-3 mr-1" />
                    Dark
                  </>
                )}
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setIsFullscreen(!isFullscreen)}
              >
                {isFullscreen ? (
                  <>
                    <Minimize2 className="w-3 h-3 mr-1" />
                    Exit
                  </>
                ) : (
                  <>
                    <Maximize2 className="w-3 h-3 mr-1" />
                    Fullscreen
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* IDE Container */}
      {isFullscreen ? (
        <div className="fixed inset-0 z-50 bg-[#1e1e1e]">{mainContent}</div>
      ) : (
        <Card className="border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="h-[700px]">{mainContent}</div>
        </Card>
      )}

      {/* Keyboard Shortcuts Info */}
      <Card className="border-gray-200 dark:border-gray-700">
        <CardContent className="p-4">
          <h3 className="text-sm font-semibold mb-3 text-gray-900 dark:text-white flex items-center gap-2">
            <Code2 className="w-4 h-4 text-purple-600" />
            Keyboard Shortcuts
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
            <div>
              <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded border border-gray-300 dark:border-gray-600">
                Ctrl+S
              </kbd>
              <span className="ml-2 text-gray-600 dark:text-gray-400">Save All</span>
            </div>
            <div>
              <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded border border-gray-300 dark:border-gray-600">
                Ctrl+P
              </kbd>
              <span className="ml-2 text-gray-600 dark:text-gray-400">Run Code</span>
            </div>
            <div>
              <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded border border-gray-300 dark:border-gray-600">
                Ctrl+B
              </kbd>
              <span className="ml-2 text-gray-600 dark:text-gray-400">Toggle Explorer</span>
            </div>
            <div>
              <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded border border-gray-300 dark:border-gray-600">
                Ctrl+`
              </kbd>
              <span className="ml-2 text-gray-600 dark:text-gray-400">Toggle Terminal</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
