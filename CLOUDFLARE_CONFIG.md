# Cloudflare Configuration Guide

This document provides recommendations for Cloudflare settings to ensure the PixelHub Host website loads correctly for all users.

## Recommended Cloudflare Settings

### 1. Speed Optimization Settings

**Auto Minify** - It's recommended to DISABLE Auto Minify for HTML, CSS, and JavaScript:
- Navigate to: Speed > Optimization > Content Optimization
- **Uncheck**: Auto Minify HTML
- **Uncheck**: Auto Minify CSS  
- **Uncheck**: Auto Minify JavaScript

**Reason**: Vite already minifies and optimizes all assets during the build process. Cloudflare's additional minification can sometimes break JavaScript modules or cause parsing errors.

### 2. Rocket Loader

**Rocket Loader** - Should be DISABLED:
- Navigate to: Speed > Optimization > Content Optimization
- Set Rocket Loader to: **Off**

**Reason**: Rocket Loader delays JavaScript execution and can interfere with React's hydration process and module loading. Since the site is already optimized with code splitting and lazy loading, Rocket Loader is not needed.

### 3. SSL/TLS Settings

Ensure proper SSL/TLS configuration:
- Navigate to: SSL/TLS > Overview
- Set SSL/TLS encryption mode to: **Full (strict)**

This ensures secure communication between Cloudflare and your Vercel origin server.

### 4. Caching Settings

Configure Browser Cache TTL:
- Navigate to: Caching > Configuration
- Set Browser Cache TTL to: **4 hours** or **Respect Existing Headers**

**Note**: Vite generates hashed filenames for assets (e.g., `index-H1pcBf-z.js`), so aggressive caching is safe for `/assets/*` paths.

### 5. Page Rules (Optional but Recommended)

Create a Page Rule for better asset caching:

1. Navigate to: Rules > Page Rules
2. Create a new rule with URL pattern: `*pixelhubhost.com/assets/*`
3. Settings:
   - Cache Level: **Cache Everything**
   - Edge Cache TTL: **1 month**
   - Browser Cache TTL: **1 month**

This ensures optimal performance for static assets that have hashed filenames.

### 6. Security Settings

Verify that security settings don't block legitimate requests:
- Navigate to: Security > Settings
- Security Level: **Medium** (recommended)
- Challenge Passage: **30 minutes**

### 7. DNS Settings

Ensure DNS is properly configured:
- A/AAAA records should point to Vercel's IP addresses (or use CNAME)
- Orange cloud (Proxy) should be **enabled** for CDN benefits
- Ensure no conflicting DNS records exist

## Testing After Configuration

After making these changes:

1. Clear Cloudflare cache:
   - Navigate to: Caching > Configuration
   - Click "Purge Everything"

2. Test the website in:
   - Incognito/private browsing mode
   - Different browsers (Chrome, Firefox, Safari)
   - Different devices (mobile, tablet, desktop)
   - Different networks (mobile data, different WiFi networks)

3. Check browser console (F12) for:
   - JavaScript errors
   - Failed network requests
   - CORS errors
   - Mixed content warnings

## Troubleshooting

If the site still doesn't load for some users:

### Check Browser Console

Press F12 and look for errors in the Console tab. Common issues:

1. **404 errors for JS/CSS files**: Asset paths are incorrect
2. **CORS errors**: Check that all external resources (fonts, APIs) allow cross-origin requests
3. **Mixed content warnings**: Ensure all resources are loaded over HTTPS
4. **Module loading errors**: Check if Rocket Loader or minification is interfering

### Check Network Tab

In the Network tab (F12), verify:

1. All requests return **200 OK** or **304 Not Modified**
2. JavaScript and CSS files are loaded correctly
3. API calls to `/api/backendApi` succeed (or fail gracefully)
4. No requests are blocked by Cloudflare

### Verify Vercel Deployment

1. Check Vercel deployment logs for build errors
2. Ensure the `dist` folder is being deployed
3. Verify environment variables are set correctly
4. Test the Vercel preview URL directly (without Cloudflare) to isolate issues

## Additional Recommendations

### Performance Monitoring

Enable Cloudflare Analytics:
- Navigate to: Analytics & Logs > Web Analytics
- This helps track page load times and identify issues

### Error Tracking

Consider adding error tracking to the website:
- Sentry
- LogRocket
- Rollbar

This helps identify JavaScript errors that users encounter in production.

## Summary of Critical Changes Made

The following code changes were implemented to fix the blank page issue:

1. **vite.config.ts**: Added explicit `base: '/'` setting
2. **src/App.tsx**: Made API calls non-blocking during initialization
3. **vercel.json**: Created proper routing and caching configuration

These changes ensure:
- Assets load correctly regardless of deployment configuration
- The app renders even if API calls fail
- Proper routing for both static assets and API endpoints
- Optimal caching headers for performance
