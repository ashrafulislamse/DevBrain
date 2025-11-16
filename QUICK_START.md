# 🚀 DevBrain Quick Start Guide

Get DevBrain up and running in 5 minutes!

---

## 📋 Prerequisites

Before you begin, ensure you have:

- ✅ **Node.js 18.17+** installed ([Download](https://nodejs.org))
- ✅ **PostgreSQL 14+** installed and running
- ✅ **Git** installed
- ✅ **npm** or **yarn** package manager
- ✅ A code editor (VS Code recommended with Cursor)

---

## 🎯 Step-by-Step Setup

### Step 1: Install Dependencies

```bash
npm install
```

This will install all required packages including Next.js, Prisma, Tailwind CSS, and more.

**Expected output:**
```
added 1247 packages in 2m
```

### Step 2: Set Up Environment Variables

```bash
# Copy the example env file
cp .env.example .env

# Open .env in your editor
code .env  # or nano .env
```

**Required configurations:**

```env
# Database (update with your PostgreSQL credentials)
DATABASE_URL="postgresql://user:password@localhost:5432/devbrain?schema=public"

# NextAuth (generate secret with: openssl rand -base64 32)
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-generated-secret-here"
```

**To generate a secure secret:**
```bash
openssl rand -base64 32
```

### Step 3: Set Up the Database

```bash
# Push the Prisma schema to your database
npm run db:push
```

**Expected output:**
```
Your database is now in sync with your Prisma schema.
✔ Generated Prisma Client
```

**Troubleshooting:**
- **Connection failed?** Check your DATABASE_URL is correct
- **Port conflict?** Ensure PostgreSQL is running on the correct port (default: 5432)

### Step 4: (Optional) Seed Sample Data

```bash
npm run db:seed
```

This will create:
- Demo user account
- 2 sample servers
- 3 sample websites
- Sample metrics data

### Step 5: Start the Development Server

```bash
npm run dev
```

**Expected output:**
```
- ready started server on 0.0.0.0:3000, url: http://localhost:3000
- event compiled client and server successfully
```

### Step 6: Open DevBrain

Navigate to: **[http://localhost:3000](http://localhost:3000)**

You should see the DevBrain welcome page!

---

## 🎨 First Steps in DevBrain

### 1. Sign Up / Sign In

- Click **"Sign In"** on the homepage
- Create your account or use demo credentials (if seeded)

### 2. Explore the Dashboard

Navigate to `/dashboard` to see:
- System overview
- Server status cards
- Recent activity
- Quick actions

### 3. Add Your First Server

1. Go to **DevOps** → **Servers**
2. Click **"+ Add Server"**
3. Fill in the details:
   ```
   Name: My Production Server
   Host: 192.168.1.100
   Port: 22
   Username: root
   Auth Method: SSH Key
   Private Key: [paste your SSH key]
   ```
4. Click **"Connect"**

### 4. Add a Website to Monitor

1. Go to **Websites** section
2. Click **"+ Add Website"**
3. Enter details:
   ```
   Name: My Portfolio
   URL: https://mysite.com
   ```
4. DevBrain will start monitoring uptime and performance

### 5. Try Developer Tools

Navigate to **Developer Tools** and try:

- **API Playground**: Test a REST API
  ```
  GET https://jsonplaceholder.typicode.com/users
  ```

- **Code Runner**: Run a quick JavaScript snippet
  ```javascript
  console.log("Hello from DevBrain!");
  ```

- **Markdown to PDF**: Convert this README to PDF!

---

## 🔧 Common Development Tasks

### View Database with Prisma Studio

```bash
npm run db:studio
```

Opens a visual database editor at `http://localhost:5555`

### Format Code

```bash
npm run format
```

Formats all TypeScript, JavaScript, and JSON files with Prettier.

### Type Check

```bash
npm run type-check
```

Runs TypeScript compiler to check for type errors.

### Lint Code

```bash
npm run lint
```

Runs ESLint to check for code quality issues.

### Create Database Migrations

```bash
npm run db:migrate
```

When you modify `prisma/schema.prisma`, run this to create migration files.

---

## 🐳 Docker Setup (Alternative)

If you prefer Docker:

```bash
# Build the image
docker build -t devbrain .

# Run with Docker Compose (includes PostgreSQL)
docker-compose up
```

---

## 📱 Mobile App Setup (Optional)

To run the companion Android app:

```bash
cd apps/mobile
npm install
npx expo start
```

Scan the QR code with Expo Go app on your phone.

---

## 🎓 Learning Resources

### Documentation
- 📘 [Master Plan](./DEVBRAIN_MASTER_PLAN.md) - Complete feature overview
- 🎨 [UI/UX Architecture](./UI_UX_ARCHITECTURE.md) - Design system
- 🤖 [Cursor Rules](./.cursorrules) - AI development guidelines

### Next.js Guides
- [Next.js Documentation](https://nextjs.org/docs)
- [App Router Tutorial](https://nextjs.org/learn)

### Component Library
- [shadcn/ui Components](https://ui.shadcn.com)

---

## 🆘 Troubleshooting

### Issue: "Module not found" errors

**Solution:**
```bash
rm -rf node_modules package-lock.json
npm install
```

### Issue: Database connection failed

**Solution:**
1. Check PostgreSQL is running: `pg_isready`
2. Verify DATABASE_URL in `.env`
3. Test connection: `psql "postgresql://user:password@localhost:5432/devbrain"`

### Issue: Port 3000 already in use

**Solution:**
```bash
# Kill the process on port 3000
npx kill-port 3000

# Or use a different port
PORT=3001 npm run dev
```

### Issue: Prisma Client not generated

**Solution:**
```bash
npm run db:generate
```

### Issue: Type errors in IDE

**Solution:**
```bash
# Restart TypeScript server in VS Code
Cmd/Ctrl + Shift + P → "TypeScript: Restart TS Server"

# Or regenerate types
npm run type-check
```

---

## 💡 Pro Tips

### 1. Use Cursor AI for Development

If you're using Cursor editor:
- Rules are configured in `.cursorrules`
- Ask AI: "Add a new server monitoring feature"
- It will follow project conventions automatically

### 2. Enable React Query DevTools

Already enabled! Look for the React Query icon in the bottom-left of your browser.

### 3. Hot Reload

Next.js has hot module replacement. Save any file and see changes instantly!

### 4. Dark Mode

Toggle dark mode with the moon/sun icon in the header.

### 5. Keyboard Shortcuts

- `Cmd/Ctrl + K`: Open command palette
- `Cmd/Ctrl + B`: Toggle sidebar
- `/`: Focus search

---

## 📊 What's Next?

Now that DevBrain is running, you can:

1. **Customize the Dashboard**
   - Drag widgets to rearrange
   - Add/remove sections
   - Set up custom metrics

2. **Connect Your Servers**
   - Add all your VPS servers
   - Set up monitoring alerts
   - Configure auto-deployments

3. **Automate Workflows**
   - Schedule backups
   - Set up deployment pipelines
   - Create task automation

4. **Explore AI Features**
   - Add OpenAI API key to `.env`
   - Try natural language commands
   - Use code generation tools

5. **Build Custom Tools**
   - Add your own developer tools
   - Create custom widgets
   - Extend functionality

---

## 🎯 Development Roadmap

Check the roadmap in [README.md](./README.md#-roadmap) to see:
- What's completed ✅
- What's in progress 🚧
- What's coming next 🔜

---

## 🤝 Need Help?

- 💬 **Questions?** Open a [GitHub Discussion](https://github.com/yourusername/devbrain/discussions)
- 🐛 **Found a bug?** [Create an issue](https://github.com/yourusername/devbrain/issues)
- 💡 **Have an idea?** Share in discussions!

---

**Congratulations! 🎉**

You're all set up and ready to use DevBrain!

Happy coding! 🚀

---

*Last updated: 2024*
