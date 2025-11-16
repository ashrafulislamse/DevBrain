'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { isAuthenticated } from '@/lib/auth';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated()) {
      router.push('/dashboard');
    }
  }, [router]);

  const features = [
    { icon: '🖥️', title: 'DevOps Control', description: 'Manage servers with real-time monitoring' },
    { icon: '🌐', title: 'Website Monitoring', description: 'Track uptime and SSL certificates 24/7' },
    { icon: '⚡', title: 'Code Playground', description: 'Run code in 10+ languages instantly' },
    { icon: '🔌', title: 'API Testing', description: 'Test REST, GraphQL APIs like Postman' },
    { icon: '🔄', title: 'File Converters', description: 'Convert MD, PDF, JSON, YAML formats' },
    { icon: '🤖', title: 'AI Assistant', description: 'Control infrastructure with natural language' },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-blue-600">
              <span className="text-2xl">🧠</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              DevBrain
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => router.push('/auth/login')}>Sign In</Button>
            <Button onClick={() => router.push('/auth/login')}>Get Started Free</Button>
          </div>
        </div>
      </header>

      <section className="flex-1">
        <div className="container flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] py-12 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 bg-clip-text text-transparent">
            Your All-in-One<br />DevOps Control Center
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mb-12">
            Manage servers, monitor websites, run code, and automate workflows — all from one powerful dashboard.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mb-16">
            <Button size="lg" onClick={() => router.push('/auth/login')} className="text-lg px-8">
              Start Free Trial →
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl w-full">
            {features.map((f) => (
              <div key={f.title} className="p-6 rounded-xl border bg-card hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-4">{f.icon}</div>
                <h3 className="font-semibold mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
