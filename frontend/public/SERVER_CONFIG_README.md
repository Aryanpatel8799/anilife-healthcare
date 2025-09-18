# React Router Server Configuration

This directory contains multiple server configuration files to handle React Router properly and fix the "Page Not Found" error when refreshing pages.

## The Problem
When you refresh a page like `/about` or `/contact`, the server looks for a physical file at that path instead of serving your React app, resulting in a 404 error.

## Solutions (Try in order)

### 1. Apache Server (.htaccess) - RECOMMENDED
The main `.htaccess` file should handle most Apache servers.

**If it doesn't work, try:**
```bash
# Replace .htaccess with .htaccess.alternative
cp .htaccess.alternative .htaccess
```

### 2. Netlify/Vercel
The `_redirects` and `vercel.json` files handle these platforms automatically.

### 3. IIS Server (Windows hosting)
Use `web.config` for IIS servers.

### 4. Nginx Server
Add this to your nginx configuration:
```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```

### 5. PHP Hosting (Last resort)
If nothing else works, use `router.php`:
1. Rename your `index.html` to `index.php`
2. Add this line at the top of index.php:
   ```php
   <?php include 'router.php'; ?>
   ```

## Testing
After deployment, test with:
```bash
curl -I https://yourdomain.com/about
```
Should return `200 OK`, not `404 Not Found`.

## Hosting Provider Specific Instructions

### cPanel/Shared Hosting
- Upload `.htaccess` to public_html
- Ensure mod_rewrite is enabled (contact support if needed)

### Cloudflare Pages
- Use `_redirects` file
- Enable "Compatible Date" in settings

### GitHub Pages
GitHub Pages doesn't support server-side redirects. Use hash routing instead:
```javascript
import { HashRouter } from 'react-router-dom';
// Use HashRouter instead of BrowserRouter
```

### DigitalOcean/VPS
Add to nginx config:
```nginx
server {
    location / {
        try_files $uri /index.html;
    }
}
```

## Contact Your Hosting Provider
If none of these work, contact your hosting provider and ask them to:
1. Enable mod_rewrite (Apache)
2. Set AllowOverride to All
3. Provide the correct configuration for React Router SPAs
