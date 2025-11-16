# GitHub Copilot Instructions for DevBrain

## Project Context

You are working on **DevBrain**, an all-in-one DevOps control center and developer productivity platform. This is a Next.js 14+ application with TypeScript, focused on helping developers manage servers, websites, and development workflows from a single dashboard.

## Core Principles

1. **Type Safety First**: Every function, component, and API must be fully typed
2. **Server-First**: Use Server Components by default, Client Components only when needed
3. **Performance**: Optimize for speed (memoization, code splitting, lazy loading)
4. **Security**: Validate all inputs, sanitize outputs, protect sensitive data
5. **UX**: Every action needs loading states, error handling, and user feedback

## When Generating Code

### Components

**Always include:**
- Proper TypeScript interfaces
- JSDoc comments for complex logic
- Error boundaries
- Loading states
- Accessibility attributes (ARIA labels, semantic HTML)

**Example:**
```typescript
/**
 * Displays real-time server metrics with live updates
 * @param serverId - The unique identifier of the server
 */
interface ServerMetricsProps {
  serverId: string;
}

export function ServerMetrics({ serverId }: ServerMetricsProps) {
  const { data, isLoading, error } = useServerMetrics(serverId);

  if (isLoading) return <MetricsSkeleton />;
  if (error) return <ErrorAlert message="Failed to load metrics" />;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Server Metrics</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Metrics display */}
      </CardContent>
    </Card>
  );
}
```

### API Routes & Server Actions

**Always include:**
- Authentication checks
- Input validation with Zod
- Error handling with appropriate status codes
- Rate limiting considerations
- Proper HTTP methods

**Example:**
```typescript
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getServerSession } from 'next-auth';

const createServerSchema = z.object({
  name: z.string().min(1),
  host: z.string().ip(),
  port: z.number().int().positive(),
});

export async function POST(request: NextRequest) {
  const session = await getServerSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const data = createServerSchema.parse(body);

    // Process request...

    return NextResponse.json({ success: true, data });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
```

### Database Queries

**Always:**
- Use Prisma's type-safe queries
- Include proper relations
- Add pagination for lists
- Handle not found cases
- Use transactions for multi-step operations

**Example:**
```typescript
export async function getServerWithMetrics(serverId: string) {
  const server = await db.server.findUnique({
    where: { id: serverId },
    include: {
      metrics: {
        take: 100,
        orderBy: { timestamp: 'desc' },
      },
      services: {
        where: { status: 'RUNNING' },
      },
    },
  });

  if (!server) {
    throw new Error('Server not found');
  }

  return server;
}
```

### Forms

**Always use:**
- React Hook Form + Zod
- shadcn/ui form components
- Clear validation messages
- Loading states during submission
- Success/error feedback

**Example:**
```typescript
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

const formSchema = z.object({
  serverName: z.string().min(1, 'Server name is required'),
  host: z.string().ip('Invalid IP address'),
  port: z.coerce.number().int().min(1).max(65535),
});

type FormData = z.infer<typeof formSchema>;

export function ServerForm() {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      serverName: '',
      host: '',
      port: 22,
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      await createServer(data);
      toast.success('Server created successfully');
    } catch (error) {
      toast.error('Failed to create server');
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="serverName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Server Name</FormLabel>
              <Input {...field} />
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? 'Creating...' : 'Create Server'}
        </Button>
      </form>
    </Form>
  );
}
```

### Real-time Features

**For live updates, use:**
- Server-Sent Events (SSE) for server→client
- TanStack Query with refetchInterval for polling
- WebSocket for bidirectional communication

**Example:**
```typescript
'use client';

import { useEffect, useState } from 'react';

export function LiveServerMetrics({ serverId }: { serverId: string }) {
  const [metrics, setMetrics] = useState<ServerMetrics | null>(null);

  useEffect(() => {
    const eventSource = new EventSource(`/api/servers/${serverId}/stream`);

    eventSource.onmessage = (event) => {
      setMetrics(JSON.parse(event.data));
    };

    eventSource.onerror = () => {
      console.error('SSE connection error');
      eventSource.close();
    };

    return () => eventSource.close();
  }, [serverId]);

  return metrics ? <MetricsDisplay metrics={metrics} /> : <Skeleton />;
}
```

### State Management

**Use Zustand for global state:**

```typescript
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UIState {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  theme: 'light' | 'dark' | 'system';
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      sidebarOpen: true,
      setSidebarOpen: (open) => set({ sidebarOpen: open }),
      theme: 'system',
      setTheme: (theme) => set({ theme }),
    }),
    { name: 'ui-storage' }
  )
);
```

### Charts & Data Visualization

**Use Recharts with proper types:**

```typescript
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface MetricData {
  timestamp: string;
  value: number;
}

export function MetricsChart({ data }: { data: MetricData[] }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <XAxis dataKey="timestamp" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  );
}
```

## Common Patterns

### Loading States
```typescript
// Skeleton component
import { Skeleton } from '@/components/ui/skeleton';

export function ServerCardSkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-6 w-32" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-20 w-full" />
      </CardContent>
    </Card>
  );
}

// Usage
<Suspense fallback={<ServerCardSkeleton />}>
  <ServerCard serverId={id} />
</Suspense>
```

### Error Handling
```typescript
// Custom error component
export function ErrorState({
  message,
  retry
}: {
  message: string;
  retry?: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center p-8">
      <AlertCircle className="h-12 w-12 text-destructive mb-4" />
      <p className="text-muted-foreground mb-4">{message}</p>
      {retry && (
        <Button onClick={retry} variant="outline">
          Try Again
        </Button>
      )}
    </div>
  );
}
```

### Pagination
```typescript
interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
}

export async function getPaginatedServers(
  page: number = 1,
  pageSize: number = 10
): Promise<PaginatedResponse<Server>> {
  const [data, total] = await Promise.all([
    db.server.findMany({
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy: { createdAt: 'desc' },
    }),
    db.server.count(),
  ]);

  return { data, total, page, pageSize };
}
```

## Utility Functions

### Always create reusable utilities:

```typescript
// lib/utils/format.ts
export function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${(bytes / Math.pow(k, i)).toFixed(2)} ${sizes[i]}`;
}

export function formatUptime(seconds: number): string {
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  return `${days}d ${hours}h ${minutes}m`;
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(date);
}
```

## Testing

### Generate tests with components:

```typescript
// ServerCard.test.tsx
import { render, screen } from '@testing-library/react';
import { ServerCard } from './ServerCard';

describe('ServerCard', () => {
  const mockServer = {
    id: '1',
    name: 'Test Server',
    status: 'ONLINE' as const,
  };

  it('renders server name', () => {
    render(<ServerCard server={mockServer} />);
    expect(screen.getByText('Test Server')).toBeInTheDocument();
  });

  it('shows online status', () => {
    render(<ServerCard server={mockServer} />);
    expect(screen.getByText('Online')).toBeInTheDocument();
  });
});
```

## Performance Tips

1. **Use dynamic imports for heavy components:**
```typescript
const MonacoEditor = dynamic(() => import('@monaco-editor/react'), { ssr: false });
```

2. **Memoize expensive calculations:**
```typescript
const processedData = useMemo(() => expensiveFunction(data), [data]);
```

3. **Use React.memo for pure components:**
```typescript
export const MemoizedCard = memo(ServerCard);
```

4. **Implement virtual scrolling for long lists:**
```typescript
import { useVirtualizer } from '@tanstack/react-virtual';
```

## Security Checklist

When generating features, ensure:
- ✅ User authentication checked
- ✅ Input validation with Zod
- ✅ SQL injection prevention (use Prisma)
- ✅ XSS prevention (sanitize HTML)
- ✅ CSRF protection (use Next.js built-in)
- ✅ Rate limiting on sensitive endpoints
- ✅ Secrets in environment variables
- ✅ Encrypted sensitive data in DB

## Common Commands

Generate these when asked:

**Create a new page:**
```bash
# app/(dashboard)/servers/page.tsx
```

**Add a new API route:**
```bash
# app/api/servers/route.ts
```

**Create a component:**
```bash
# components/dashboard/ServerCard.tsx
```

**Add a Prisma model:**
```prisma
model Server {
  id        String   @id @default(cuid())
  name      String
  host      String
  createdAt DateTime @default(now())
}
```

## Remember

- Every component should handle loading, error, and success states
- Every form needs validation
- Every API route needs auth
- Every database query needs error handling
- Every user action needs feedback

**Make DevBrain production-ready from day one!**
