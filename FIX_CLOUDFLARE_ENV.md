# 🔧 FIX: No Live Data on Cloudflare Pages

## 🎯 ROOT CAUSE

Your site is live at **https://fundametrics-frontend.pages.dev/** but showing no data because:

**The `VITE_API_URL` environment variable is NOT set in Cloudflare Pages.**

Without this variable, your frontend doesn't know where to fetch data from.

---

## ✅ SOLUTION: Add Environment Variable

### Step 1: Go to Cloudflare Pages Settings

1. **Open:** https://dash.cloudflare.com
2. **Click:** "Workers & Pages" in the left sidebar
3. **Click:** The "Pages" tab at the top
4. **Click:** Your project `fundametrics-frontend`
5. **Click:** "Settings" tab
6. **Scroll to:** "Environment variables" section

### Step 2: Add the Variable

Click **"Add variable"** and enter:

| Field | Value |
|-------|-------|
| **Variable name** | `VITE_API_URL` |
| **Value** | `https://fundametrics-backend.onrender.com` |
| **Environment** | Production (and Preview if you want) |

### Step 3: Save and Redeploy

1. **Click:** "Save"
2. **Go to:** "Deployments" tab
3. **Click:** "Retry deployment" on the latest deployment
   - OR click "Create deployment" to trigger a fresh build

---

## 🧪 HOW TO VERIFY IT'S FIXED

### Test 1: Check the Live Site
After redeployment completes (2-3 minutes):

1. Open: https://fundametrics-frontend.pages.dev/
2. Press `F12` to open DevTools
3. Go to "Console" tab
4. Run this command:
   ```javascript
   console.log('API URL:', import.meta.env.VITE_API_URL)
   ```

**Expected output:**
```
API URL: https://fundametrics-backend.onrender.com
```

**If you see `undefined`:**
- The environment variable wasn't set correctly
- Make sure you saved it for "Production" environment
- Trigger a new deployment

### Test 2: Check API Calls
In the same Console, run:
```javascript
fetch('https://fundametrics-backend.onrender.com/api/companies')
  .then(r => r.json())
  .then(d => console.log('API Response:', d))
```

**Expected output:**
```javascript
API Response: {
  total: 3000,
  companies: [...]
}
```

### Test 3: Check the Page
- Navigate to "Stocks" page
- You should see a list of companies
- Search should work
- Company pages should load

---

## 📊 ENVIRONMENT VARIABLE SETTINGS

### Production Environment:
```
VITE_API_URL = https://fundametrics-backend.onrender.com
```

### Preview Environment (Optional):
```
VITE_API_URL = https://fundametrics-backend.onrender.com
```

### Development (Local - Already Working):
Your `.env` or `.env.local` file should have:
```
VITE_API_URL=http://localhost:8002
```

---

## 🔍 WHY THIS HAPPENS

Vite environment variables work differently than regular env vars:

1. **Build-time variables:** `VITE_*` variables are embedded during build
2. **Must be set in Cloudflare:** They're not read from `.env` files in production
3. **Requires rebuild:** Changing the variable requires a new deployment

---

## ⚡ QUICK CHECKLIST

- [ ] Go to Cloudflare Pages → Settings
- [ ] Add `VITE_API_URL` environment variable
- [ ] Set value to `https://fundametrics-backend.onrender.com`
- [ ] Save the variable
- [ ] Trigger a new deployment
- [ ] Wait 2-3 minutes for build to complete
- [ ] Refresh https://fundametrics-frontend.pages.dev/
- [ ] Check DevTools console for API URL
- [ ] Verify companies are loading

---

## 🚨 TROUBLESHOOTING

### Issue: Still showing "undefined"
**Solution:** 
- Make sure you selected "Production" environment when adding the variable
- Clear your browser cache and hard refresh (Ctrl+Shift+R)
- Check the deployment logs to ensure it rebuilt with the new variable

### Issue: CORS error
**Solution:**
- Already configured in backend ✅
- If you still see it, check that the API URL is exactly: `https://fundametrics-backend.onrender.com` (no trailing slash)

### Issue: 404 on API calls
**Solution:**
- Verify the backend is live: https://fundametrics-backend.onrender.com/health
- Check the endpoint path is `/api/companies` (with `/api` prefix)

---

## 📸 SCREENSHOT GUIDE

When adding the environment variable, it should look like this:

```
┌─────────────────────────────────────────────────┐
│ Environment variables                            │
├─────────────────────────────────────────────────┤
│ Variable name: VITE_API_URL                     │
│ Value: https://fundametrics-backend.onrender.com│
│ Environment: ☑ Production  ☐ Preview            │
│                                                  │
│ [Cancel]  [Save]                                │
└─────────────────────────────────────────────────┘
```

---

**Follow these steps and your live data will appear!** 🚀

After you add the variable and redeploy, let me know if you see companies loading on the site.
