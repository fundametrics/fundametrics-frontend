# 🔍 DIAGNOSTIC: Why No Data on Live Site

Since `VITE_API_URL` is already set, let's diagnose the actual issue.

## 🧪 STEP 1: Open Browser DevTools on Live Site

1. Go to: **https://fundametrics-frontend.pages.dev/**
2. Press **F12** to open DevTools
3. Go to **Console** tab
4. Go to **Network** tab (keep it open)
5. Refresh the page (Ctrl+R)

---

## 🔍 STEP 2: Run These Diagnostic Commands

Copy and paste each command into the Console:

### Test 1: Check Environment Variable
```javascript
console.log('VITE_API_URL:', import.meta.env.VITE_API_URL);
console.log('All env vars:', import.meta.env);
```

**What to look for:**
- ✅ Should show: `https://fundametrics-backend.onrender.com`
- ❌ If `undefined`: Variable not embedded in build (need to redeploy)

---

### Test 2: Check API Base URL in Code
```javascript
// Check what the frontend is actually using
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8002';
console.log('API Base URL:', API_BASE);
```

**What to look for:**
- ✅ Should show: `https://fundametrics-backend.onrender.com`
- ❌ If `http://localhost:8002`: Using fallback (variable not set)

---

### Test 3: Test Backend Directly
```javascript
fetch('https://fundametrics-backend.onrender.com/health')
  .then(r => r.json())
  .then(d => console.log('✅ Backend Health:', d))
  .catch(e => console.error('❌ Backend Error:', e));
```

**Expected output:**
```json
✅ Backend Health: { status: "ok", env: "production" }
```

---

### Test 4: Test API Endpoint
```javascript
fetch('https://fundametrics-backend.onrender.com/api/companies?limit=5')
  .then(r => r.json())
  .then(d => console.log('✅ API Response:', d))
  .catch(e => console.error('❌ API Error:', e));
```

**Expected output:**
```json
✅ API Response: {
  total: 3000,
  companies: [...]
}
```

---

### Test 5: Check Network Tab
Look at the **Network** tab in DevTools:

**What to look for:**
- ✅ Requests to `fundametrics-backend.onrender.com`
- ❌ Requests to `localhost:8002` (means env var not working)
- ❌ Red/failed requests (CORS or 404 errors)
- ❌ No requests at all (frontend not making API calls)

---

## 📊 COMMON ISSUES & SOLUTIONS

### Issue 1: Environment Variable Shows `undefined`
**Cause:** Build didn't include the variable  
**Solution:**
1. Go to Cloudflare Pages → Deployments
2. Click "Retry deployment" to rebuild with the variable
3. Wait 2-3 minutes
4. Refresh the site and test again

---

### Issue 2: Requests Going to `localhost:8002`
**Cause:** Fallback URL being used  
**Solution:**
1. Check `src/utils/api.ts` line 3:
   ```typescript
   const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8002';
   ```
2. The variable must be set BEFORE build
3. Trigger a new deployment in Cloudflare

---

### Issue 3: CORS Error in Console
**Example error:**
```
Access to fetch at 'https://fundametrics-backend.onrender.com/api/companies' 
from origin 'https://fundametrics-frontend.pages.dev' has been blocked by CORS policy
```

**Solution:**
The backend CORS is already configured, but let me verify:
1. Check backend logs on Render
2. Ensure `fundametrics-frontend.pages.dev` is in allowed origins
3. Backend should have:
   ```python
   allow_origins=["*"]  # or specific domains
   ```

---

### Issue 4: 404 Not Found
**Example error:**
```
GET https://fundametrics-backend.onrender.com/companies 404 (Not Found)
```

**Cause:** Wrong endpoint path  
**Solution:**
- Correct path: `/api/companies` (with `/api` prefix)
- Check `src/utils/api.ts` uses correct paths

---

### Issue 5: No Network Requests at All
**Cause:** Frontend not making API calls  
**Solution:**
1. Check browser console for JavaScript errors
2. Check if `useEffect` hooks are running
3. Verify `api.getStocks()` or `api.getRegistry()` is being called

---

## 🎯 WHAT TO REPORT BACK

After running the diagnostic commands above, tell me:

1. **What does `import.meta.env.VITE_API_URL` show?**
   - The exact value or "undefined"

2. **What do you see in the Network tab?**
   - Requests to backend? localhost? Nothing?
   - Any red/failed requests?
   - What's the status code? (200, 404, 500, CORS error?)

3. **What errors appear in Console?**
   - Copy the exact error message

4. **What does the API test (Test 4) return?**
   - Success with data? Error? CORS blocked?

---

## 🚀 LIKELY SOLUTION

Based on "variable already added", the most common issue is:

**The deployment needs to be rebuilt to include the variable.**

### Quick Fix:
1. Go to: Cloudflare Pages → `fundametrics-frontend` → Deployments
2. Click: "Create deployment" or "Retry deployment"
3. Wait: 2-3 minutes for build
4. Test: Refresh site and check again

---

**Run the diagnostic commands and report back what you see!** 🔍
