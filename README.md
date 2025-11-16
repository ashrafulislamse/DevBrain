# 🧠 DevBrain

> **Your All-in-One DevOps Control Center & Developer Productivity Dashboard**

DevBrain is a powerful, unified platform that combines server management, website monitoring, developer tools, and AI assistance into a single, intuitive dashboard. Built for developers and DevOps engineers who manage multiple VPS servers, websites, and need quick access to essential development tools.

---

## ✨ Features

### 🖥️ DevOps Control Center
- **Multi-VPS Management**: Monitor and manage all your servers from one place
- **Real-time Metrics**: CPU, RAM, disk, and network usage with live graphs
- **SSH Terminal**: Web-based SSH access to all your servers
- **Service Management**: Start, stop, restart services (Nginx, MySQL, Docker, etc.)
- **Automated Deployments**: One-click Git deployments with rollback support
- **Backup Automation**: Scheduled backups to S3/Google Drive

### 🌐 Website Monitoring
- **Uptime Monitoring**: Track all your websites 24/7
- **SSL Management**: Auto-renewal and expiry notifications
- **Performance Tracking**: Page speed, Core Web Vitals
- **Broken Link Detection**: Automated issue detection
- **SEO Monitoring**: Track SEO scores and issues

### 🛠️ Developer Tools Suite
- **API Playground**: REST, GraphQL, WebSocket testing
- **Code Runner**: Execute code in 10+ languages
- **Format Converters**: Markdown ↔ PDF, JSON ↔ YAML, and more
- **Database Client**: Visual database management
- **Git Manager**: Repository and PR management
- **Image Tools**: Optimize, resize, convert images

### 🤖 AI-Powered Features
- **Natural Language Commands**: Control servers with plain English
- **Intelligent Insights**: Anomaly detection and recommendations
- **Code Generation**: Auto-generate APIs, tests, documentation
- **Smart Alerts**: Predictive alerts for potential issues

### 📊 Productivity
- **Task Management**: AI-prioritized task lists
- **Time Tracking**: Automatic time tracking by project
- **Knowledge Base**: Personal wiki for code snippets and notes
- **Analytics**: Comprehensive dashboards and reports

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18.17+
- PostgreSQL 14+
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd devbrain
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` and add your database URL and other required variables.

4. **Set up the database**
   ```bash
   npm run db:push
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

---

## 📁 Project Structure

```
devbrain/
├── prisma/              # Database schema and migrations
├── public/              # Static assets
├── src/
│   ├── app/            # Next.js app router pages
│   ├── components/     # React components
│   │   ├── ui/        # shadcn/ui components
│   │   ├── dashboard/ # Dashboard components
│   │   └── shared/    # Shared components
│   ├── lib/            # Utilities and configurations
│   ├── hooks/          # Custom React hooks
│   ├── store/          # Zustand state management
│   └── types/          # TypeScript types
├── .cursorrules        # Cursor AI rules
└── docs/               # Documentation
```

---

## 🛠️ Tech Stack

### Frontend
- **Next.js 14+**: React framework with App Router
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **shadcn/ui**: Beautiful, accessible component library
- **Recharts**: Data visualization
- **Framer Motion**: Animations

### Backend
- **Next.js API Routes**: Serverless API endpoints
- **tRPC**: End-to-end type-safe APIs
- **Prisma**: Type-safe database ORM
- **NextAuth.js**: Authentication
- **Socket.io**: Real-time communication

### Database
- **PostgreSQL**: Primary database
- **Redis**: Caching and real-time data
- **TimescaleDB**: Time-series metrics (optional)

### Infrastructure
- **Vercel**: Frontend hosting
- **Docker**: Containerization
- **GitHub Actions**: CI/CD

---

## 📖 Documentation

For detailed documentation, see:
- [Master Plan](./DEVBRAIN_MASTER_PLAN.md) - Complete feature list and roadmap
- [UI/UX Architecture](./UI_UX_ARCHITECTURE.md) - Design system and components
- [Cursor Rules](./.cursorrules) - AI-assisted development guidelines

---

## 🎯 Development Workflow

### Available Scripts

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm run start            # Start production server

# Database
npm run db:push          # Push schema to database
npm run db:migrate       # Create migrations
npm run db:studio        # Open Prisma Studio

# Code Quality
npm run lint             # Lint code
npm run type-check       # Check TypeScript types
npm run format           # Format code with Prettier
```

### Development with AI Assistants

This project is optimized for AI-assisted development with **Cursor** and **GitHub Copilot**:

1. **Cursor**: Uses `.cursorrules` for project-specific AI guidance
2. **GitHub Copilot**: Uses `.github/copilot-instructions.md` for code generation

Both tools understand the project structure, coding conventions, and best practices.

---

## 🔐 Environment Variables

Required variables in `.env`:

```env
# Database
DATABASE_URL="postgresql://..."

# Authentication
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-here"

# Optional: AI Features
OPENAI_API_KEY="sk-..."
```

See `.env.example` for all available options.

---

## 🧪 Testing

```bash
npm run test              # Run tests
npm run test:watch        # Run tests in watch mode
npm run test:coverage     # Generate coverage report
```

---

## 🚢 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Add environment variables
4. Deploy!

### Deploy with Docker

```bash
docker build -t devbrain .
docker run -p 3000:3000 devbrain
```

---

## 🗺️ Roadmap

### Phase 1: Foundation ✅
- [x] Project setup
- [x] Database schema
- [x] Authentication
- [x] Base UI components

### Phase 2: DevOps Core (In Progress)
- [ ] Server management CRUD
- [ ] Real-time metrics
- [ ] SSH terminal integration
- [ ] Service monitoring

### Phase 3: Website Management
- [ ] Uptime monitoring
- [ ] SSL checker
- [ ] Deployment system

### Phase 4: Developer Tools
- [ ] API Playground
- [ ] Code Runner
- [ ] Format Converters

### Phase 5: AI Features
- [ ] AI assistant
- [ ] Natural language commands
- [ ] Code generation

### Phase 6: Mobile App
- [ ] React Native app
- [ ] Push notifications

See [DEVBRAIN_MASTER_PLAN.md](./DEVBRAIN_MASTER_PLAN.md) for detailed roadmap.

---

## 🤝 Contributing

Contributions are welcome! Please read our contributing guidelines before submitting PRs.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 💡 Tips for Getting Started

### 1. Start with the Dashboard
Explore the main dashboard at `/dashboard` to see all features at a glance.

### 2. Add Your First Server
Navigate to "DevOps" → "Servers" → "Add Server" to connect your first VPS.

### 3. Set Up Monitoring
Add your websites in the "Websites" section to start uptime monitoring.

### 4. Explore Developer Tools
Try the API Playground, Code Runner, and other tools in the "Developer Tools" section.

### 5. Customize Your Workspace
Use the drag-and-drop dashboard to arrange widgets according to your needs.

---

## 🆘 Support

- **Documentation**: See `/docs` folder
- **Issues**: [GitHub Issues](https://github.com/yourusername/devbrain/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/devbrain/discussions)

---

## 🌟 Acknowledgments

Built with amazing open-source tools:
- [Next.js](https://nextjs.org)
- [Prisma](https://prisma.io)
- [shadcn/ui](https://ui.shadcn.com)
- [Tailwind CSS](https://tailwindcss.com)
- [Recharts](https://recharts.org)

---

**Made with ❤️ for developers by developers**

*DevBrain - Because your brain should focus on code, not infrastructure.*
