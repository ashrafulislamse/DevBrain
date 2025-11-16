'use client';

import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Send,
  Bot,
  User,
  Sparkles,
  Code,
  Bug,
  Lightbulb,
  FileText,
  Terminal,
  Zap,
  Copy,
  ThumbsUp,
  ThumbsDown,
  RotateCcw,
  Trash2,
  MessageSquare,
} from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

const suggestedPrompts = [
  { icon: Code, text: 'Help me debug this code', color: 'text-blue-600 dark:text-blue-400' },
  { icon: Lightbulb, text: 'Suggest optimization strategies', color: 'text-yellow-600 dark:text-yellow-400' },
  { icon: FileText, text: 'Generate documentation', color: 'text-green-600 dark:text-green-400' },
  { icon: Terminal, text: 'Explain this command', color: 'text-purple-600 dark:text-purple-400' },
];

const mockConversations = [
  { id: '1', title: 'React State Management', messages: 5, timestamp: 'Today' },
  { id: '2', title: 'API Integration Help', messages: 12, timestamp: 'Yesterday' },
  { id: '3', title: 'Database Design Question', messages: 8, timestamp: '2 days ago' },
];

export default function AIAssistantPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hello! I'm your AI coding assistant. I can help you with debugging, code optimization, documentation, architecture decisions, and more. How can I assist you today?",
      timestamp: new Date().toLocaleTimeString(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date().toLocaleTimeString(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `I understand you're asking about: "${input}"\n\nHere's a detailed response:\n\n1. First, let's analyze the problem\n2. I recommend following this approach\n3. Here's a code example that demonstrates the solution\n\n\`\`\`javascript\nfunction example() {\n  // Your optimized code here\n  return 'Success!';\n}\n\`\`\`\n\nWould you like me to elaborate on any specific part?`,
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handlePromptClick = (prompt: string) => {
    setInput(prompt);
  };

  const clearChat = () => {
    setMessages([
      {
        id: '1',
        role: 'assistant',
        content: "Chat cleared! I'm here to help. What would you like to work on?",
        timestamp: new Date().toLocaleTimeString(),
      },
    ]);
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex gap-6">
      {/* Sidebar - Conversations */}
      <Card className="w-80 border-gray-200 dark:border-gray-700 flex flex-col">
        <CardHeader className="border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Conversations</CardTitle>
            <Button size="icon" variant="ghost" className="h-8 w-8">
              <MessageSquare className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="flex-1 overflow-y-auto p-4 space-y-2">
          {mockConversations.map((conv) => (
            <div
              key={conv.id}
              className="p-3 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer transition-all duration-200 hover:shadow-md"
            >
              <h4 className="font-semibold text-sm text-gray-900 dark:text-white mb-1">{conv.title}</h4>
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>{conv.messages} messages</span>
                <span>{conv.timestamp}</span>
              </div>
            </div>
          ))}
          <Button variant="outline" className="w-full mt-4">
            <MessageSquare className="w-4 h-4 mr-2" />
            New Chat
          </Button>
        </CardContent>
      </Card>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col gap-6">
        {/* Header */}
        <Card className="border-gray-200 dark:border-gray-700">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-purple-500/30">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    AI Assistant
                  </h2>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">Online & Ready</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge className="bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800">
                  <Sparkles className="w-3 h-3 mr-1" />
                  GPT-4
                </Badge>
                <Button variant="outline" size="sm" onClick={clearChat}>
                  <Trash2 className="w-4 h-4 mr-2" />
                  Clear
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Suggested Prompts (shown when few messages) */}
        {messages.length <= 2 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {suggestedPrompts.map((prompt, index) => (
              <Card
                key={index}
                className="border-gray-200 dark:border-gray-700 cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-[1.02] group"
                onClick={() => handlePromptClick(prompt.text)}
              >
                <CardContent className="p-5">
                  <div className="flex flex-col items-center text-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <prompt.icon className={`w-6 h-6 ${prompt.color}`} />
                    </div>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{prompt.text}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Messages */}
        <Card className="flex-1 border-gray-200 dark:border-gray-700 flex flex-col">
          <CardContent className="flex-1 overflow-y-auto p-6 space-y-6">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-4 ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
              >
                <div
                  className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center ${
                    message.role === 'user'
                      ? 'bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg shadow-purple-500/30'
                      : 'bg-gradient-to-br from-blue-500 to-indigo-500 shadow-lg shadow-blue-500/30'
                  }`}
                >
                  {message.role === 'user' ? (
                    <User className="w-5 h-5 text-white" />
                  ) : (
                    <Bot className="w-5 h-5 text-white" />
                  )}
                </div>
                <div
                  className={`flex-1 max-w-3xl ${message.role === 'user' ? 'text-right' : 'text-left'}`}
                >
                  <div
                    className={`inline-block p-4 rounded-2xl ${
                      message.role === 'user'
                        ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap leading-relaxed">{message.content}</p>
                  </div>
                  <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                    {message.role === 'user' ? (
                      <span className="ml-auto">{message.timestamp}</span>
                    ) : (
                      <>
                        <span>{message.timestamp}</span>
                        <button className="hover:text-purple-600 transition-colors">
                          <Copy className="w-3 h-3" />
                        </button>
                        <button className="hover:text-green-600 transition-colors">
                          <ThumbsUp className="w-3 h-3" />
                        </button>
                        <button className="hover:text-red-600 transition-colors">
                          <ThumbsDown className="w-3 h-3" />
                        </button>
                        <button className="hover:text-blue-600 transition-colors">
                          <RotateCcw className="w-3 h-3" />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center shadow-lg shadow-blue-500/30">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div className="flex items-center gap-2 p-4 rounded-2xl bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </CardContent>
        </Card>

        {/* Input Area */}
        <Card className="border-gray-200 dark:border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex-1 flex items-center gap-2 px-4 py-3 bg-gray-100 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 focus-within:ring-2 focus-within:ring-purple-500/50 transition-all duration-200">
                <input
                  type="text"
                  placeholder="Ask me anything about coding, debugging, optimization..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  className="flex-1 bg-transparent border-none outline-none text-sm placeholder:text-gray-400"
                />
              </div>
              <Button
                onClick={handleSend}
                disabled={!input.trim()}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg shadow-purple-500/30 px-8 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4 mr-2" />
                Send
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-3 text-center">
              AI can make mistakes. Verify important information and test generated code.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
