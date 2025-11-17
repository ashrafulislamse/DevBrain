'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Send, Copy, Download, Zap, Lock, Save } from 'lucide-react';

const methods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'];

export default function APITesterPage() {
  const [method, setMethod] = useState('GET');
  const [url, setUrl] = useState('https://jsonplaceholder.typicode.com/users');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const sendRequest = async () => {
    setLoading(true);
    setResponse('Sending request...\n');

    await new Promise((resolve) => setTimeout(resolve, 800));

    const mockResponse = {
      status: 200,
      statusText: 'OK',
      headers: {
        'content-type': 'application/json',
        'cache-control': 'max-age=43200',
      },
      data: [
        { id: 1, name: 'Leanne Graham', email: 'leanne@example.com' },
        { id: 2, name: 'Ervin Howell', email: 'ervin@example.com' },
      ],
    };

    setResponse(JSON.stringify(mockResponse, null, 2));
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">API Tester</h1>
        <p className="text-muted-foreground mt-1">Test REST, GraphQL, and WebSocket APIs</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Request Builder</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <select
              value={method}
              onChange={(e) => setMethod(e.target.value)}
              className="px-3 py-2 border rounded-md bg-background"
            >
              {methods.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
            <Input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://api.example.com/endpoint"
              className="flex-1"
            />
            <Button onClick={sendRequest} disabled={loading}>
              <Send className="w-4 h-4 mr-2" />
              {loading ? 'Sending...' : 'Send'}
            </Button>
          </div>

          <div className="flex gap-4 text-sm text-muted-foreground">
            <div>
              <Badge variant="outline">Headers: 0</Badge>
            </div>
            <div>
              <Badge variant="outline">Auth: None</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Response</CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Copy className="w-4 h-4 mr-2" />
                Copy
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <pre className="p-4 bg-gray-900 dark:bg-black text-green-400 rounded-lg overflow-x-auto h-96 text-sm font-mono">
            {response || '// Response will appear here after sending request\n// Click "Send" to test the API'}
          </pre>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-600 flex items-center justify-center mb-3 shadow-lg">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold mt-2">Fast Testing</h3>
            <p className="text-sm text-muted-foreground">Test APIs in milliseconds</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center mb-3 shadow-lg">
              <Lock className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold mt-2">Auth Support</h3>
            <p className="text-sm text-muted-foreground">Bearer, API Key, OAuth</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mb-3 shadow-lg">
              <Save className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold mt-2">Save Collections</h3>
            <p className="text-sm text-muted-foreground">Organize and reuse requests</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
