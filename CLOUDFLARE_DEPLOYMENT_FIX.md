# Cloudflare Pages Deployment Fix

## Issue
The deployment was failing because:
1. Cloudflare Pages doesn't need `wrangler.toml` for static sites
2. The build command should just be `npm run build`
3. The output directory is `dist`

## Solution

### Update Cloudflare Pages Settings

Go to your Cloudflare Pages dashboard and set:

**Build Configuration:**
- **Framework preset:** `Vite`
- **Build command:** `npm run build`
- **Build output directory:** `dist`
- **Root directory:** `/` (leave empty)

**Environment Variables:**
- `VITE_API_URL` = `https://fundametrics-backend.onrender.com`
- `NODE_VERSION` = `22` (optional, for consistency)

### Deploy Command (Leave Empty)
**Important:** Remove any custom deploy command like `npx wrangler deploy`

Cloudflare Pages will automatically:
1. Clone your repo
2. Run `npm install`
3. Run `npm run build`
4. Deploy the `dist` folder

## Files Removed
- ❌ `wrangler.toml` (not needed for static sites)
- ❌ `deploy` script in `package.json` (Cloudflare handles this)

## What to Do Now
1. Go to Cloudflare Pages dashboard
2. Find your `fundametrics-frontend` project
3. Go to **Settings** → **Builds & deployments**
4. Update the settings as shown above
5. Click **Save**
6. Trigger a new deployment (or wait for next git push)

The deployment should now succeed! ✅
