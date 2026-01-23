# Vercel Deployment Guide

This guide will help you deploy your Swakarsa Digital application to Vercel.

## Prerequisites

1. **GitHub Account** - Your code should be in a GitHub repository
2. **Vercel Account** - Sign up at https://vercel.com (free tier available)
3. **Neon Database** - Already set up (see NEON_SETUP.md)

## Step 1: Prepare Your Repository

1. Make sure your code is pushed to GitHub
2. Ensure you have a `.gitignore` file that excludes `.env` (environment variables should NOT be committed)

## Step 2: Deploy to Vercel

### Option A: Deploy via Vercel Dashboard (Recommended)

1. **Go to Vercel Dashboard**
   - Visit https://vercel.com/dashboard
   - Click "Add New..." → "Project"

2. **Import Your Repository**
   - Connect your GitHub account if not already connected
   - Select your repository: `Swakarsa-landing-monorepo`
   - Click "Import"

3. **Configure Project Settings**
   - **Framework Preset**: Next.js (should auto-detect)
   - **Root Directory**: `./` (leave as default)
   - **Build Command**: `npm run build` (default)
   - **Output Directory**: `.next` (default)
   - **Install Command**: `npm install` (default)

4. **Add Environment Variables** (See Step 3 below)

5. **Deploy**
   - Click "Deploy"
   - Wait for the build to complete

### Option B: Deploy via Vercel CLI

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy**:
   ```bash
   vercel
   ```

4. **Follow the prompts** and add environment variables when asked

## Step 3: Environment Variables (CRITICAL)

Add these environment variables in Vercel Dashboard:

### Required Environment Variables

Go to your project in Vercel → **Settings** → **Environment Variables**

#### 1. **DATABASE_URL** (Required)
```
DATABASE_URL=postgresql://username:password@ep-xxx-xxx.region.aws.neon.tech/dbname?sslmode=require
```
- Use your **Neon connection string** (the pooled connection is recommended for production)
- Get it from: https://console.neon.tech → Your Project → Connection Details
- **Important**: For production, use the **pooled connection string** (better performance)

#### 2. **NEXTAUTH_URL** (Required)
```
NEXTAUTH_URL=https://your-app-name.vercel.app
```
- Replace `your-app-name` with your actual Vercel deployment URL
- After first deployment, Vercel will give you a URL like: `https://swakarsa-digital.vercel.app`
- Update this value after you know your production URL

#### 3. **NEXTAUTH_SECRET** (Required)
```
NEXTAUTH_SECRET=your-secret-key-here
```
- Generate a secure random string:
  ```bash
  openssl rand -base64 32
  ```
- Or use an online generator: https://generate-secret.vercel.app/32
- **Keep this secret!** Never commit it to Git

### Optional Environment Variables

#### 4. **RESEND_API_KEY** (Optional - for email notifications)
```
RESEND_API_KEY=re_your_api_key_here
```
- Only needed if you want email notifications for contact forms and job applications
- Get it from: https://resend.com/api-keys
- If not provided, the app will work but emails won't be sent

## Step 4: Configure Environment Variables for All Environments

In Vercel, you can set environment variables for:
- **Production** - Your live site
- **Preview** - Preview deployments (pull requests)
- **Development** - Local development (if using Vercel CLI)

**Recommended**: Set all three to the same values, or:
- **Production**: Use production Neon database
- **Preview/Development**: Can use a separate development database

## Step 5: Run Database Migrations

After deployment, you need to run Prisma migrations:

### Option A: Via Vercel Build Command (Recommended)

Add a build script to your `package.json`:

```json
{
  "scripts": {
    "build": "prisma generate && prisma migrate deploy && next build",
    "postinstall": "prisma generate"
  }
}
```

This will automatically run migrations on each deployment.

### Option B: Manual Migration

1. **Install Vercel CLI** (if not already installed):
   ```bash
   npm i -g vercel
   ```

2. **Run migrations manually**:
   ```bash
   vercel env pull .env.local
   npx prisma migrate deploy
   ```

## Step 6: Seed Database (First Time Only)

After first deployment, seed your database with initial data:

1. **Pull environment variables locally**:
   ```bash
   vercel env pull .env.local
   ```

2. **Run seed script**:
   ```bash
   npx tsx prisma/seed.ts
   ```

   Or set up a one-time script in Vercel:
   - Go to your project → Settings → Build & Development Settings
   - Add a build command that includes seeding (only for first deployment)

## Step 7: Verify Deployment

1. **Check Build Logs**
   - Go to your project → Deployments
   - Click on the latest deployment
   - Check for any errors

2. **Test Your Application**
   - Visit your Vercel URL: `https://your-app-name.vercel.app`
   - Test login functionality
   - Test database connections
   - Check if forms are working

3. **Check Function Logs**
   - Go to your project → Functions
   - Monitor for any runtime errors

## Step 8: Custom Domain (Optional)

1. **Add Domain in Vercel**
   - Go to your project → Settings → Domains
   - Add your custom domain (e.g., `swakarsadigital.com`)

2. **Update DNS Records**
   - Follow Vercel's DNS configuration instructions
   - Add the required DNS records to your domain provider

3. **Update NEXTAUTH_URL**
   - Update `NEXTAUTH_URL` environment variable to your custom domain
   - Redeploy your application

## Troubleshooting

### Build Fails

**Error: "Prisma Client not generated"**
- Solution: Make sure `postinstall` script includes `prisma generate`
- Check your `package.json`:
  ```json
  "postinstall": "prisma generate"
  ```

**Error: "Database connection failed"**
- Solution: Check your `DATABASE_URL` environment variable
- Make sure it includes `?sslmode=require`
- Verify the connection string in Neon dashboard

**Error: "NEXTAUTH_SECRET is missing"**
- Solution: Add `NEXTAUTH_SECRET` environment variable
- Generate a new secret: `openssl rand -base64 32`

### Runtime Errors

**Error: "Cannot connect to database"**
- Check if your Neon database is active
- Verify connection string is correct
- Check Neon dashboard for any issues

**Error: "Authentication not working"**
- Verify `NEXTAUTH_URL` matches your deployment URL
- Check `NEXTAUTH_SECRET` is set correctly
- Clear browser cookies and try again

### Performance Issues

**Slow database queries**
- Use Neon's **pooled connection** instead of direct connection
- Get pooled connection string from Neon dashboard
- Update `DATABASE_URL` with pooled connection string

## Environment Variables Summary

Here's a quick checklist of all environment variables:

```
✅ DATABASE_URL          - Neon PostgreSQL connection string
✅ NEXTAUTH_URL          - Your Vercel deployment URL
✅ NEXTAUTH_SECRET       - Random secret (generate with openssl)
⚠️  RESEND_API_KEY       - Optional, for email notifications
```

## Quick Deploy Checklist

- [ ] Code pushed to GitHub
- [ ] Vercel account created
- [ ] Project imported to Vercel
- [ ] `DATABASE_URL` added (Neon connection string)
- [ ] `NEXTAUTH_URL` added (your Vercel URL)
- [ ] `NEXTAUTH_SECRET` added (generated secret)
- [ ] `RESEND_API_KEY` added (optional)
- [ ] Build successful
- [ ] Database migrations run
- [ ] Database seeded (first time)
- [ ] Application tested

## Additional Resources

- Vercel Documentation: https://vercel.com/docs
- Next.js on Vercel: https://vercel.com/docs/frameworks/nextjs
- Prisma with Vercel: https://www.prisma.io/docs/guides/deployment/deployment-guides/deploying-to-vercel
- Neon with Vercel: https://neon.tech/docs/guides/vercel

---

**Need Help?**
- Vercel Support: https://vercel.com/support
- Vercel Discord: https://vercel.com/discord

