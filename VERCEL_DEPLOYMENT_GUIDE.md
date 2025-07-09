# Vercel Deployment Guide - Catholic Saints & Novenas App

## Step 1: Download Your Project Files

1. **Download project as ZIP:**
   - In Replit, click the three dots menu (⋯) next to your project name
   - Select "Download as zip"
   - Save the zip file to your computer

## Step 2: Create Vercel Account (Free)

1. **Go to:** https://vercel.com
2. **Sign up with GitHub** (recommended) or email
3. **Verify your email** if needed
4. **Choose "Hobby" plan** (free tier)

## Step 3: Prepare Database (Choose Option A or B)

### Option A: Vercel Postgres ($0.25/month)
1. In Vercel dashboard, go to "Storage"
2. Click "Create Database" → "Postgres"
3. Choose "Hobby" plan
4. Name it "catholic-saints-db"
5. Copy the connection string when created

### Option B: Free Database Alternative
1. Go to https://supabase.com (completely free)
2. Create account and new project
3. Go to Settings → Database
4. Copy the connection URI

## Step 4: Upload Your Project to Vercel

1. **In Vercel dashboard:**
   - Click "New Project"
   - Click "Browse" and upload your downloaded ZIP file
   - Or connect your GitHub if you uploaded there

2. **Configure deployment:**
   - Project name: `catholic-saints-novenas`
   - Root directory: Leave default
   - Framework: Select "Other"

## Step 5: Add Environment Variables

1. **In project settings, go to "Environment Variables"**
2. **Add these variables:**
   ```
   DATABASE_URL = [your database connection string from Step 3]
   NODE_ENV = production
   ```

## Step 6: Configure Build Settings

1. **Build Command:** `npm run build`
2. **Output Directory:** `dist`
3. **Install Command:** `npm install`

## Step 7: Deploy

1. Click "Deploy"
2. Wait 2-3 minutes for build to complete
3. Your app will be live at: `https://your-project-name.vercel.app`

## Step 8: Migrate Database Data

1. **Export from Replit:**
   - In Replit console, run: `pg_dump $DATABASE_URL > backup.sql`
   - Download the backup.sql file

2. **Import to new database:**
   - Use database provider's import tool
   - Or run: `psql [new_database_url] < backup.sql`

## Step 9: Test Your Deployment

1. Visit your new Vercel URL
2. Test all features:
   - Browse saints
   - Start novenas
   - Check dark mode
   - Verify search works
   - Test mobile view

## Your New Standalone URL

Once complete, you'll have a permanent URL like:
`https://catholic-saints-novenas.vercel.app`

This URL:
- Works 24/7 without you being logged in
- Is completely free (except optional $0.25/month for database)
- Never expires
- Can be used for Panda Suite mobile conversion
- Supports custom domains if desired

## Troubleshooting

If you encounter issues:
1. Check build logs in Vercel dashboard
2. Verify environment variables are correct
3. Ensure database connection is working
4. Check that all dependencies are in package.json

## Next Steps After Deployment

1. Test thoroughly
2. Update any hardcoded URLs in your code
3. Share your new public URL
4. Use URL for mobile app conversion