# Neon Database Integration Guide

This guide will help you set up Neon (serverless Postgres) for your Swakarsa Digital project.

## Step 1: Create a Neon Account and Database

1. **Go to Neon Website**
   - Visit: https://neon.tech
   - Click "Sign Up" (you can use GitHub, Google, or email)

2. **Create a New Project**
   - After signing up, click "Create Project"
   - Choose a project name (e.g., "swakarsa-digital")
   - Select a region closest to you
   - Choose PostgreSQL version (14 or 15 recommended)
   - Click "Create Project"

3. **Get Your Connection String**
   - Once your project is created, you'll see a connection string
   - It looks like: `postgresql://username:password@ep-xxx-xxx.region.aws.neon.tech/dbname?sslmode=require`
   - **IMPORTANT**: Copy the connection string that includes `?sslmode=require` or `?sslmode=prefer`

## Step 2: Update Your Environment Variables

1. **Create `.env` file** in the root of your project (if it doesn't exist)

2. **Add the DATABASE_URL**:
   ```env
   DATABASE_URL="postgresql://username:password@ep-xxx-xxx.region.aws.neon.tech/dbname?sslmode=require"
   ```

   Replace the connection string with your actual Neon connection string.

3. **Add other required environment variables** (if not already present):
   ```env
   # Database
   DATABASE_URL="your-neon-connection-string-here"

   # NextAuth
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-secret-key-here" # Generate with: openssl rand -base64 32

   # Resend (for emails - optional)
   RESEND_API_KEY="your-resend-api-key"

   # Other environment variables you might need
   ```

## Step 3: Update Prisma Schema (if needed)

Your Prisma schema is already configured correctly for PostgreSQL. No changes needed!

## Step 4: Push Schema to Neon Database

1. **Generate Prisma Client**:
   ```bash
   npx prisma generate
   ```

2. **Push your schema to Neon**:
   ```bash
   npx prisma db push
   ```
   
   This will create all your tables in the Neon database.

   ⚠️ **Note**: `db push` is for development. For production, use migrations:
   ```bash
   npx prisma migrate dev --name init
   ```

## Step 5: Seed the Database

Run the seed script to populate initial data:
```bash
npx prisma db seed
```

Or directly:
```bash
npx tsx prisma/seed.ts
```

## Step 6: Verify Connection

1. **Start your development server**:
   ```bash
   npm run dev
   ```

2. **Check if the database connection works** by visiting your app and testing features that use the database.

## Step 7: (Optional) Use Neon Dashboard

- You can view and manage your database through the Neon dashboard
- Go to your project on https://console.neon.tech
- Use the SQL Editor to run queries directly
- View tables, data, and monitor usage

## Troubleshooting

### Connection Issues

If you get connection errors:

1. **Check SSL Mode**: Make sure your connection string includes `?sslmode=require`
2. **Check Firewall**: Neon databases are accessible from anywhere, but verify your connection string is correct
3. **Check Credentials**: Make sure username and password are correct

### Migration Issues

If you have existing data and want to migrate:

1. **Export from old database** (if applicable):
   ```bash
   pg_dump old_database > backup.sql
   ```

2. **Import to Neon** (using Neon's SQL Editor or psql):
   ```bash
   psql your-neon-connection-string < backup.sql
   ```

### Pooling Connection (Recommended for Production)

For better performance, use Neon's connection pooling:

1. In Neon dashboard, go to your project
2. Find the "Connection pooling" section
3. Use the pooled connection string (starts with `postgresql://` but uses a different endpoint)
4. Update your `DATABASE_URL` with the pooled connection string

## Production Deployment

When deploying to Vercel or other platforms:

1. Add `DATABASE_URL` to your platform's environment variables
2. Use the pooled connection string for better performance
3. Run migrations in production:
   ```bash
   npx prisma migrate deploy
   ```

## Additional Resources

- Neon Documentation: https://neon.tech/docs
- Prisma with Neon: https://neon.tech/docs/guides/prisma
- Neon Free Tier: Includes 0.5 GB storage and 1 project (perfect for development!)

---

**Need Help?**
- Neon Discord: https://discord.gg/neondatabase
- Neon Support: support@neon.tech

