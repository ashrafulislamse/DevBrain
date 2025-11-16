# 🚀 DevBrain Deployment Guide - Vercel

## Quick Deployment Checklist

### Step 1: Set Environment Variables on Vercel

Before deploying, add these environment variables in your Vercel project settings:

**Required for Build:**
```
DATABASE_URL="postgresql://user:password@host:5432/dbname?schema=public"
```

**Required for Runtime:**
```
NEXTAUTH_URL="https://your-domain.vercel.app"
NEXTAUTH_SECRET="your-secret-here"
```

**To generate NEXTAUTH_SECRET:**
```bash
openssl rand -base64 32
```

---

## Full Deployment Steps

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. **Push your code to GitHub**
   ```bash
   git push origin claude/devops-dashboard-ai-01UU8ctHr5qM5yGJxJxiskqw
   ```

2. **Go to Vercel Dashboard**
   - Visit [vercel.com/dashboard](https://vercel.com/dashboard)
   - Click "Add New Project"
   - Import your GitHub repository

3. **Configure Project**
   - Framework Preset: **Next.js**
   - Root Directory: `./`
   - Build Command: `npm run build`
   - Output Directory: `.next`

4. **Add Environment Variables**

   Go to **Settings → Environment Variables** and add:

   **Production Environment:**
   ```
   DATABASE_URL=postgresql://user:password@your-db-host:5432/devbrain
   NEXTAUTH_URL=https://your-app.vercel.app
   NEXTAUTH_SECRET=<generated-secret>
   NODE_ENV=production
   ```

5. **Deploy**
   - Click "Deploy"
   - Wait for build to complete
   - Your app will be live at `https://your-app.vercel.app`

---

### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Set Environment Variables**
   ```bash
   vercel env add DATABASE_URL production
   # Paste your database URL when prompted

   vercel env add NEXTAUTH_URL production
   # Enter: https://your-app.vercel.app

   vercel env add NEXTAUTH_SECRET production
   # Paste your generated secret
   ```

4. **Deploy**
   ```bash
   vercel --prod
   ```

---

## Database Setup

### Option 1: Use Vercel Postgres (Easiest)

1. In Vercel Dashboard, go to **Storage**
2. Click **Create Database**
3. Select **Postgres**
4. Vercel will automatically add `DATABASE_URL` to your environment variables
5. Run migrations:
   ```bash
   npm run db:push
   ```

### Option 2: External PostgreSQL

Use any PostgreSQL provider:
- **Supabase** (free tier available)
- **Railway** (free tier available)
- **Neon** (serverless Postgres)
- **AWS RDS**
- **DigitalOcean Managed Databases**

**Connection String Format:**
```
postgresql://username:password@host:port/database?schema=public
```

---

## Post-Deployment Steps

### 1. Run Database Migrations

After first deployment, you need to set up the database schema:

**Option A: Using Prisma Studio (Local)**
```bash
# Set DATABASE_URL in your local .env
DATABASE_URL="your-production-db-url"

# Push schema to production database
npm run db:push
```

**Option B: Using Vercel CLI**
```bash
vercel env pull .env.production
npm run db:push
```

### 2. Verify Deployment

Visit your deployed URL and check:
- ✅ Home page loads
- ✅ No console errors
- ✅ Dark mode toggle works
- ✅ Navigation works

### 3. Test Authentication (Once Implemented)

- Sign up for a new account
- Verify email flow works
- Test OAuth providers (if configured)

---

## Troubleshooting

### Build Error: "Prisma Client not generated"

**Solution:**
Add `DATABASE_URL` to Vercel environment variables (even a placeholder):
```
DATABASE_URL="postgresql://placeholder:placeholder@localhost:5432/placeholder"
```

Then redeploy.

### Build Error: "Module not found"

**Solution:**
This is likely a dependency issue. Check:
1. All dependencies are in `package.json`
2. `.npmrc` file exists with `legacy-peer-deps=true`
3. Run `npm install` locally to verify

### Runtime Error: "Database connection failed"

**Solution:**
1. Verify `DATABASE_URL` is set in Vercel environment variables
2. Check database is accessible from the internet
3. Verify firewall rules allow Vercel's IP ranges
4. Test connection string locally

### Error: "NEXTAUTH_URL is not defined"

**Solution:**
Add `NEXTAUTH_URL` to environment variables:
```
NEXTAUTH_URL=https://your-app.vercel.app
```

---

## Environment Variables Reference

### Required (Must Set)

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:pass@host:5432/db` |
| `NEXTAUTH_URL` | Your app's URL | `https://devbrain.vercel.app` |
| `NEXTAUTH_SECRET` | Secret for session encryption | Generate with `openssl rand -base64 32` |

### Optional (For Features)

| Variable | Description | When Needed |
|----------|-------------|-------------|
| `GOOGLE_CLIENT_ID` | Google OAuth | If using Google sign-in |
| `GOOGLE_CLIENT_SECRET` | Google OAuth secret | If using Google sign-in |
| `GITHUB_CLIENT_ID` | GitHub OAuth | If using GitHub sign-in |
| `GITHUB_CLIENT_SECRET` | GitHub OAuth secret | If using GitHub sign-in |
| `OPENAI_API_KEY` | OpenAI API key | For AI features |
| `SMTP_HOST` | Email server host | For email notifications |
| `SMTP_USER` | Email username | For email notifications |
| `SMTP_PASSWORD` | Email password | For email notifications |

---

## Custom Domain Setup

1. **Add Domain in Vercel**
   - Go to project **Settings → Domains**
   - Add your custom domain
   - Follow DNS configuration instructions

2. **Update Environment Variables**
   ```
   NEXTAUTH_URL=https://your-domain.com
   ```

3. **Wait for DNS Propagation** (up to 48 hours)

4. **Verify SSL Certificate**
   - Vercel automatically provisions SSL
   - Your site will be available at `https://your-domain.com`

---

## Performance Optimization

### 1. Enable Edge Runtime (Optional)

For faster performance, use Edge Runtime where possible.

In `next.config.mjs`:
```javascript
export const runtime = 'edge'; // for specific routes
```

### 2. Enable Image Optimization

Already configured! Next.js Image component is optimized by default.

### 3. Enable Analytics

In Vercel Dashboard:
- Go to **Analytics** tab
- Enable **Web Analytics**
- Add Vercel Analytics snippet (optional)

---

## Monitoring & Logs

### View Build Logs

1. Go to Vercel Dashboard
2. Select your project
3. Click **Deployments**
4. Click on a deployment to see logs

### View Runtime Logs

1. Go to project in Vercel Dashboard
2. Click **Logs** tab
3. Filter by type (errors, warnings, etc.)

### Set Up Alerts

1. Go to **Settings → Notifications**
2. Configure:
   - Deployment notifications
   - Error alerts
   - Performance alerts

---

## Continuous Deployment

### Auto-Deploy on Git Push

Vercel automatically deploys when you push to your connected branch:

```bash
git add .
git commit -m "feat: add new feature"
git push origin main
```

Vercel will:
1. Detect the push
2. Start a new build
3. Run tests (if configured)
4. Deploy to production (if on main branch)
5. Send notification

### Preview Deployments

Every pull request gets a preview URL:
- Push to a branch
- Create PR on GitHub
- Vercel creates a preview deployment
- Test before merging to main

---

## Rollback

If a deployment breaks production:

1. Go to **Deployments** in Vercel Dashboard
2. Find a previous working deployment
3. Click **⋯** (three dots)
4. Select **Promote to Production**

---

## Security Checklist

Before going live:

- [ ] All secrets in environment variables (not in code)
- [ ] `NEXTAUTH_SECRET` is strong (32+ characters)
- [ ] Database has firewall rules
- [ ] HTTPS is enabled (automatic with Vercel)
- [ ] No API keys in client-side code
- [ ] Rate limiting configured (for API routes)
- [ ] CORS configured properly
- [ ] SQL injection prevention (Prisma handles this)
- [ ] XSS prevention (React handles this)

---

## Cost Optimization

### Vercel Pricing

- **Hobby (Free)**:
  - 100 GB bandwidth/month
  - Unlimited deployments
  - Perfect for development/testing

- **Pro ($20/month)**:
  - 1 TB bandwidth
  - Better performance
  - Production-ready

### Database Pricing

- **Supabase Free**: 500 MB database, 2 GB bandwidth
- **Railway Free**: $5 credit/month
- **Neon Free**: 3 GB storage

**Tip:** Start with free tiers, upgrade as you grow!

---

## Production Checklist

Before launching to users:

### Code
- [ ] All features tested
- [ ] Error handling implemented
- [ ] Loading states added
- [ ] TypeScript errors resolved
- [ ] ESLint warnings fixed

### Database
- [ ] Schema finalized
- [ ] Migrations tested
- [ ] Backups configured
- [ ] Indexes added for performance

### Security
- [ ] Authentication working
- [ ] Authorization implemented
- [ ] API routes protected
- [ ] Rate limiting enabled
- [ ] Input validation everywhere

### Performance
- [ ] Images optimized
- [ ] Code splitting implemented
- [ ] Lazy loading added
- [ ] Lighthouse score > 90

### Monitoring
- [ ] Error tracking (Sentry)
- [ ] Analytics enabled
- [ ] Uptime monitoring
- [ ] Logs configured

### Documentation
- [ ] README updated
- [ ] API docs created
- [ ] User guide written
- [ ] Deployment docs ready

---

## Support & Resources

- **Vercel Docs**: https://vercel.com/docs
- **Next.js Deployment**: https://nextjs.org/docs/deployment
- **Prisma with Vercel**: https://www.prisma.io/docs/guides/deployment/deployment-guides/deploying-to-vercel

---

**Deployment Status:**
- ✅ Code pushed to GitHub
- ✅ Dependencies updated
- ⏳ Environment variables (do this in Vercel dashboard)
- ⏳ Database setup
- ⏳ First deployment

**Next Steps:**
1. Set up environment variables in Vercel
2. Configure database
3. Deploy!

Good luck! 🚀
