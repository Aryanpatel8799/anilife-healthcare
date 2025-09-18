# Vercel Deployment Checklist

## ✅ Steps to Fix React Router on Vercel

### 1. Updated Configuration Files
- ✅ `vercel.json` - Updated with proper rewrites for all routes
- ✅ Environment variables setup

### 2. Vercel Dashboard Settings
Go to your Vercel dashboard and add these environment variables:

**Environment Variables to Add:**
```
VITE_API_URL = https://your-backend-url.com/api
```

### 3. Build Settings (if needed)
In Vercel dashboard → Settings → Build & Output:
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

### 4. Deploy Steps
1. Push these changes to your Git repository
2. Vercel will auto-deploy
3. Test all routes:
   - https://yourapp.vercel.app/
   - https://yourapp.vercel.app/about
   - https://yourapp.vercel.app/contact
   - https://yourapp.vercel.app/products
   - https://yourapp.vercel.app/admin/login

### 5. Common Issues & Solutions

**Issue**: Admin routes still 404
**Solution**: Make sure your backend is deployed and VITE_API_URL is correct

**Issue**: API calls failing
**Solution**: 
1. Check VITE_API_URL environment variable
2. Ensure backend accepts CORS from your Vercel domain
3. Check browser network tab for actual error

**Issue**: Routes work but refresh still shows 404
**Solution**: Clear Vercel cache by going to Deployments → ... → Redeploy

### 6. Backend Configuration (if needed)
If your backend is also on Vercel, make sure it allows CORS:

```javascript
// In your backend
app.use(cors({
  origin: ['https://yourapp.vercel.app', 'http://localhost:5173'],
  credentials: true
}));
```

### 7. Test Commands
After deployment:
```bash
# Test routes
curl -I https://yourapp.vercel.app/about
curl -I https://yourapp.vercel.app/admin/login

# Should return 200, not 404
```
