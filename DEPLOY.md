# NARAKA Travel App - Deployment Guide

Your app is built and ready for deployment! The `dist/` folder contains the production-ready files.

---

## Option 1: Vercel (Recommended)

Fastest, free, and supports SPA routing automatically.

```bash
# 1. Install Vercel CLI (if not already installed)
npm i -g vercel

# 2. Deploy from the project directory
cd narakatravel-app
vercel --prod
```

The `vercel.json` is already included in `dist/` for SPA routing.

**OR via Git:**
1. Push the `narakatravel-app` folder to a GitHub repo
2. Go to [vercel.com](https://vercel.com), import the repo
3. Set build command: `npm run build`
4. Set output directory: `dist`
5. Deploy!

---

## Option 2: Netlify

Also free and supports SPA routing.

**Via Drag & Drop:**
1. Go to [netlify.com](https://netlify.com)
2. Drag and drop the `dist/` folder onto the deploy page

**Via CLI:**
```bash
npm i -g netlify-cli
netlify deploy --prod --dir=dist
```

The `netlify.toml` and `_redirects` files are already included in `dist/`.

**Via Git:**
1. Push to GitHub
2. Connect repo to Netlify
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Deploy!

---

## Option 3: Surge.sh (Simplest)

Free static hosting, great for quick demos.

```bash
npm i -g surge
cd narakatravel-app/dist
surge
# Follow prompts, pick a domain like narakatravels.surge.sh
```

---

## Option 4: GitHub Pages

Free hosting tied to your GitHub repo.

**Note:** GitHub Pages doesn't support SPA routing natively. Use a 404.html redirect trick.

1. Add `homepage` to `package.json`:
   ```json
   "homepage": "https://yourusername.github.io/narakatravel-app"
   ```
2. Change `vite.config.js` base to:
   ```js
   base: '/narakatravel-app/',
   ```
3. Rebuild: `npm run build`
4. Use `gh-pages` npm package or GitHub Actions to deploy the `dist/` folder.

---

## Option 5: Local Preview

Preview the production build locally before deploying:

```bash
cd narakatravel-app
npm install   # install express for the preview server
npm run serve # runs on http://localhost:3000

# OR use Vite's built-in preview (no express needed)
npm run preview
```

---

## Important Notes

- **SPA Routing:** The app uses React Router (client-side routing). You MUST configure your host to serve `index.html` for all routes. The config files (`vercel.json`, `netlify.toml`, `_redirects`) handle this automatically.
- **Images:** The app uses Unsplash image URLs that load over the internet. No local image assets needed.
- **No Backend Required:** This is a static frontend demo. For production with real bookings/payments, you'll need a backend API.

---

## Demo Credentials (After Deploying)

- **Admin Access:** Login with any email containing `admin` (e.g., `admin@narakatravels.com`) + any password
- **Regular User:** Any other email creates a standard user account
- All data is stored in the browser's localStorage (per-device)

---

## Next Steps After Deployment

1. **Custom Domain:** Point your domain (e.g., `app.narakatravels.com`) to the deployed app
2. **SSL/HTTPS:** All platforms above provide free SSL automatically
3. **PWA:** Add a service worker and manifest to make it installable on phones
4. **Native App:** Use Capacitor or Cordova to wrap the web app for App Store / Play Store
5. **Backend:** Connect to Firebase, Supabase, or a custom Node.js API for real data
