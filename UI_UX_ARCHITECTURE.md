# 🎨 DevBrain UI/UX Architecture

## Design System Overview

### Color System

```typescript
// colors.ts
export const colors = {
  // Brand
  primary: {
    50: '#eff6ff',
    100: '#dbeafe',
    500: '#3b82f6',  // Main brand color
    600: '#2563eb',
    900: '#1e3a8a',
  },
  // Status colors
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
  info: '#3b82f6',
  // Neutrals
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    500: '#6b7280',
    900: '#111827',
  },
  // Server status
  serverOnline: '#10b981',
  serverOffline: '#ef4444',
  serverDegraded: '#f59e0b',
}
```

### Typography Scale

```
Headings:
- h1: 2.25rem (36px) - Page titles
- h2: 1.875rem (30px) - Section headings
- h3: 1.5rem (24px) - Card titles
- h4: 1.25rem (20px) - Subsections

Body:
- Large: 1.125rem (18px)
- Base: 1rem (16px)
- Small: 0.875rem (14px)
- XSmall: 0.75rem (12px)

Font Family:
- Sans: Inter, system-ui, sans-serif
- Mono: 'Fira Code', 'JetBrains Mono', monospace
```

### Spacing Scale

```
2xs: 0.125rem (2px)
xs:  0.25rem (4px)
sm:  0.5rem (8px)
md:  1rem (16px)
lg:  1.5rem (24px)
xl:  2rem (32px)
2xl: 3rem (48px)
3xl: 4rem (64px)
```

### Border Radius

```
sm: 0.25rem (4px)
md: 0.375rem (6px)
lg: 0.5rem (8px)
xl: 0.75rem (12px)
2xl: 1rem (16px)
full: 9999px
```

---

## Layout System

### 1. App Shell Component

```
┌─────────────────────────────────────────────────────────┐
│  HEADER (h-16, sticky top-0)                           │
│  [Logo] [Global Search]  [Notifications] [User Menu]   │
├──────┬──────────────────────────────────────────────────┤
│      │                                                  │
│ SIDE │          MAIN CONTENT AREA                       │
│ BAR  │          (p-6, overflow-auto)                    │
│      │                                                  │
│ 256px│                                                  │
│      │                                                  │
│      │                                                  │
├──────┴──────────────────────────────────────────────────┤
│  FOOTER (optional)                                      │
└─────────────────────────────────────────────────────────┘

Responsive:
- Desktop (>1024px): Full sidebar visible
- Tablet (768-1023px): Collapsed sidebar (icons only)
- Mobile (<768px): Overlay sidebar (toggle)
```

**Component Structure:**
```typescript
<AppShell>
  <Header />
  <Sidebar />
  <MainContent>
    {children}
  </MainContent>
  <Footer />
</AppShell>
```

---

## Component Library

### Core Components

#### 1. **Cards**

```typescript
// Base Card
<Card variant="default | outlined | elevated">
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Optional description</CardDescription>
  </CardHeader>
  <CardContent>
    Main content
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>

// Stat Card
<StatCard
  title="CPU Usage"
  value="45%"
  trend={+12}
  icon={<CpuIcon />}
  color="primary"
/>

// Server Card
<ServerCard
  server={serverData}
  onManage={handleManage}
  showMetrics
/>
```

#### 2. **Buttons**

```typescript
<Button
  variant="default | outline | ghost | destructive | link"
  size="sm | md | lg | icon"
  disabled={false}
  loading={false}
>
  {loading ? <Spinner /> : 'Click me'}
</Button>

// Icon Button
<IconButton icon={<PlusIcon />} aria-label="Add server" />

// Button Group
<ButtonGroup>
  <Button>Option 1</Button>
  <Button>Option 2</Button>
  <Button>Option 3</Button>
</ButtonGroup>
```

#### 3. **Data Tables**

```typescript
<DataTable
  columns={[
    { key: 'name', label: 'Name', sortable: true },
    { key: 'status', label: 'Status', render: (row) => <StatusBadge /> },
    { key: 'actions', label: '', render: (row) => <Actions /> },
  ]}
  data={servers}
  pagination
  pageSize={10}
  onRowClick={handleRowClick}
  selectable
  onSelectionChange={handleSelection}
/>
```

#### 4. **Forms**

```typescript
<Form>
  <FormField name="serverName" label="Server Name" required>
    <Input placeholder="Enter server name" />
  </FormField>

  <FormField name="host" label="Host">
    <Input type="text" placeholder="192.168.1.1" />
  </FormField>

  <FormField name="port" label="Port">
    <Input type="number" defaultValue={22} />
  </FormField>

  <FormField name="authMethod" label="Authentication">
    <Select>
      <SelectOption value="ssh_key">SSH Key</SelectOption>
      <SelectOption value="password">Password</SelectOption>
    </Select>
  </FormField>

  <FormActions>
    <Button variant="outline">Cancel</Button>
    <Button type="submit">Save Server</Button>
  </FormActions>
</Form>
```

#### 5. **Modals & Dialogs**

```typescript
<Dialog open={isOpen} onOpenChange={setIsOpen}>
  <DialogTrigger asChild>
    <Button>Open Dialog</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Confirm Action</DialogTitle>
      <DialogDescription>
        Are you sure you want to delete this server?
      </DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <Button variant="outline">Cancel</Button>
      <Button variant="destructive">Delete</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>

// Sheet (Slide-over)
<Sheet side="right | left | top | bottom">
  <SheetTrigger>Open</SheetTrigger>
  <SheetContent>
    <SheetHeader>
      <SheetTitle>Server Details</SheetTitle>
    </SheetHeader>
    {/* Content */}
  </SheetContent>
</Sheet>
```

#### 6. **Notifications**

```typescript
// Toast
toast.success('Server created successfully');
toast.error('Failed to connect to server');
toast.warning('High CPU usage detected');
toast.info('Backup completed');

// Alert Banner
<Alert variant="info | warning | error | success">
  <AlertIcon />
  <AlertTitle>Attention</AlertTitle>
  <AlertDescription>Your SSL certificate expires in 7 days</AlertDescription>
</Alert>
```

#### 7. **Charts & Visualizations**

```typescript
// Line Chart (for metrics over time)
<LineChart
  data={metricsData}
  xKey="timestamp"
  yKey="value"
  height={300}
  showGrid
  showTooltip
  color="primary"
/>

// Bar Chart (for comparisons)
<BarChart
  data={serverComparison}
  xKey="serverName"
  yKey="cpuUsage"
  height={300}
/>

// Donut Chart (for percentages)
<DonutChart
  data={[
    { name: 'Used', value: 65 },
    { name: 'Free', value: 35 },
  ]}
  centerText="65% Used"
/>

// Real-time Spark Line
<SparkLine data={realtimeData} height={50} />
```

#### 8. **Status Indicators**

```typescript
<Badge variant="success | warning | error | info | default">
  Online
</Badge>

<StatusDot status="online | offline | degraded" />

<ProgressBar value={75} max={100} color="primary" />

<ProgressCircle value={45} size="sm | md | lg" />
```

#### 9. **Navigation**

```typescript
// Tabs
<Tabs defaultValue="overview">
  <TabsList>
    <TabsTrigger value="overview">Overview</TabsTrigger>
    <TabsTrigger value="metrics">Metrics</TabsTrigger>
    <TabsTrigger value="logs">Logs</TabsTrigger>
  </TabsList>
  <TabsContent value="overview">...</TabsContent>
  <TabsContent value="metrics">...</TabsContent>
</Tabs>

// Breadcrumb
<Breadcrumb>
  <BreadcrumbItem href="/dashboard">Dashboard</BreadcrumbItem>
  <BreadcrumbItem href="/servers">Servers</BreadcrumbItem>
  <BreadcrumbItem>Server-1</BreadcrumbItem>
</Breadcrumb>
```

---

## Page Layouts

### 1. Dashboard Overview Page

```
┌─────────────────────────────────────────────────────┐
│  Dashboard                                          │
│  ─────────────────────────────────────────────────  │
│                                                     │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐          │
│  │  Stat 1  │ │  Stat 2  │ │  Stat 3  │          │
│  │  5 Svrs  │ │  12 Sites│ │  99.9%   │          │
│  └──────────┘ └──────────┘ └──────────┘          │
│                                                     │
│  ┌──────────────────────┐ ┌────────────────────┐  │
│  │  Recent Activity     │ │  Resource Usage    │  │
│  │  - Server-1 online   │ │  [Line Chart]      │  │
│  │  - Deploy to prod    │ │                    │  │
│  │  - Backup completed  │ │                    │  │
│  └──────────────────────┘ └────────────────────┘  │
│                                                     │
│  ┌──────────────────────────────────────────────┐  │
│  │  Servers Overview                            │  │
│  │  [Server Card] [Server Card] [Server Card]   │  │
│  └──────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────┘
```

**Component Tree:**
```typescript
<DashboardLayout>
  <PageHeader title="Dashboard" />

  <StatsGrid>
    <StatCard title="Servers" value={5} />
    <StatCard title="Websites" value={12} />
    <StatCard title="Uptime" value="99.9%" />
  </StatsGrid>

  <Grid cols={2}>
    <RecentActivityWidget />
    <ResourceUsageWidget />
  </Grid>

  <ServerOverviewSection />
</DashboardLayout>
```

### 2. Servers List Page

```
┌─────────────────────────────────────────────────────┐
│  Servers                          [+ Add Server]    │
│  ─────────────────────────────────────────────────  │
│                                                     │
│  [Search]  [Filter: All ▼]  [Sort: Name ▼]        │
│                                                     │
│  ┌──────────────────────────────────────────────┐  │
│  │ Name      Status    CPU   RAM    Actions    │  │
│  │ Server-1  ● Online  45%   60%    [...Menu]  │  │
│  │ Server-2  ● Online  12%   34%    [...Menu]  │  │
│  │ Server-3  ○ Offline  -     -     [...Menu]  │  │
│  └──────────────────────────────────────────────┘  │
│                                                     │
│  [< Previous]  Page 1 of 3  [Next >]              │
└─────────────────────────────────────────────────────┘
```

### 3. Server Detail Page

```
┌─────────────────────────────────────────────────────┐
│  ← Back to Servers                                  │
│  Server-1                                  [...Menu]│
│  192.168.1.100 • Online • 99.9% uptime             │
│  ─────────────────────────────────────────────────  │
│                                                     │
│  [Overview] [Metrics] [Services] [Logs] [Files]   │
│                                                     │
│  ┌──────────────────────┐ ┌────────────────────┐  │
│  │  System Info         │ │  Quick Actions     │  │
│  │  OS: Ubuntu 22.04    │ │  [Restart]         │  │
│  │  CPU: 4 cores        │ │  [Connect SSH]     │  │
│  │  RAM: 16 GB          │ │  [View Logs]       │  │
│  └──────────────────────┘ └────────────────────┘  │
│                                                     │
│  ┌──────────────────────────────────────────────┐  │
│  │  Resource Usage (Last 24h)                   │  │
│  │  [Multi-line Chart: CPU, RAM, Disk, Network] │  │
│  └──────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────┘
```

### 4. Developer Tools Page

```
┌─────────────────────────────────────────────────────┐
│  Developer Tools                                    │
│  ─────────────────────────────────────────────────  │
│                                                     │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐          │
│  │ API      │ │ Code     │ │ Database │          │
│  │ Tester   │ │ Runner   │ │ Client   │          │
│  └──────────┘ └──────────┘ └──────────┘          │
│                                                     │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐          │
│  │ MD → PDF │ │ JSON     │ │ Regex    │          │
│  │ Converter│ │ Formatter│ │ Tester   │          │
│  └──────────┘ └──────────┘ └──────────┘          │
└─────────────────────────────────────────────────────┘
```

### 5. API Playground

```
┌─────────────────────────────────────────────────────┐
│  API Playground                                     │
│  ─────────────────────────────────────────────────  │
│                                                     │
│  [GET ▼] https://api.example.com/users      [Send] │
│                                                     │
│  [Params] [Headers] [Auth] [Body]                  │
│                                                     │
│  ┌──────────────────────────────────────────────┐  │
│  │ Request Headers                              │  │
│  │ Content-Type: application/json               │  │
│  │ Authorization: Bearer xxx                    │  │
│  └──────────────────────────────────────────────┘  │
│                                                     │
│  ┌──────────────────────────────────────────────┐  │
│  │ Response  Status: 200 OK  Time: 245ms        │  │
│  │ {                                            │  │
│  │   "users": [...]                             │  │
│  │ }                                            │  │
│  └──────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────┘
```

---

## Interaction Patterns

### Loading States

```typescript
// Skeleton Loading
<ServerCardSkeleton />

// Spinner
<Spinner size="sm | md | lg" />

// Progress
<ProgressBar indeterminate />

// Shimmer effect
<div className="animate-pulse bg-gray-200 h-20 rounded-lg" />
```

### Empty States

```typescript
<EmptyState
  icon={<ServerIcon />}
  title="No servers yet"
  description="Get started by adding your first server"
  action={<Button>Add Server</Button>}
/>
```

### Error States

```typescript
<ErrorState
  title="Failed to load servers"
  message="Please check your connection and try again"
  onRetry={refetch}
/>
```

### Confirmation Dialogs

```typescript
<ConfirmDialog
  title="Delete Server"
  message="Are you sure? This action cannot be undone."
  confirmText="Delete"
  confirmVariant="destructive"
  onConfirm={handleDelete}
/>
```

---

## Animations

### Transitions

```css
/* Smooth transitions for all interactive elements */
.transition-all {
  transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1);
}

/* Hover scale */
.hover-scale:hover {
  transform: scale(1.02);
}

/* Fade in */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* Slide in */
@keyframes slideIn {
  from { transform: translateY(10px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}
```

### Micro-interactions

- **Button**: Scale down on press
- **Card**: Lift shadow on hover
- **Input**: Border color change on focus
- **Toast**: Slide in from bottom
- **Modal**: Fade in backdrop + scale content
- **Loading**: Spin animation for spinners

---

## Responsive Breakpoints

```typescript
const breakpoints = {
  sm: '640px',   // Mobile landscape
  md: '768px',   // Tablet
  lg: '1024px',  // Desktop
  xl: '1280px',  // Large desktop
  '2xl': '1536px', // Extra large
};

// Usage
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
```

---

## Accessibility

### Keyboard Navigation
- **Tab**: Focus next element
- **Shift + Tab**: Focus previous
- **Enter**: Activate button/link
- **Space**: Toggle checkbox
- **Esc**: Close modal/dropdown
- **Arrow keys**: Navigate lists/menus

### ARIA Labels
```typescript
<Button aria-label="Delete server" aria-describedby="delete-hint">
  <TrashIcon />
</Button>
<span id="delete-hint" className="sr-only">
  This will permanently delete the server
</span>
```

### Focus Management
```typescript
// Auto-focus on modal open
useEffect(() => {
  if (isOpen) {
    inputRef.current?.focus();
  }
}, [isOpen]);

// Focus trap in modal
<FocusTrap>
  <Modal>...</Modal>
</FocusTrap>
```

---

## Dark Mode

### Theme Toggle
```typescript
'use client';

import { useTheme } from 'next-themes';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      <SunIcon className="dark:hidden" />
      <MoonIcon className="hidden dark:block" />
    </Button>
  );
}
```

### CSS Variables
```css
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 47.4% 11.2%;
  --primary: 221.2 83.2% 53.3%;
}

.dark {
  --background: 224 71% 4%;
  --foreground: 213 31% 91%;
  --primary: 217.2 91.2% 59.8%;
}
```

---

## Performance Optimizations

### Code Splitting
```typescript
const CodeEditor = dynamic(() => import('@/components/CodeEditor'), {
  ssr: false,
  loading: () => <Skeleton className="h-96" />,
});
```

### Image Optimization
```typescript
import Image from 'next/image';

<Image
  src="/server-icon.svg"
  alt="Server"
  width={48}
  height={48}
  priority // for above-the-fold images
/>
```

### Virtualized Lists
```typescript
import { useVirtualizer } from '@tanstack/react-virtual';

// For rendering 1000+ items efficiently
```

---

**This architecture ensures DevBrain is beautiful, accessible, performant, and maintainable!** 🚀
