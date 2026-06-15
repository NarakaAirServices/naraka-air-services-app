# Build Your App Automatically in the Cloud (No Android Studio Needed!)

Since your laptop is struggling with the build, here's the **easiest and most reliable way** to get your AAB file — let GitHub build it for you in the cloud with powerful servers.

---

## Step 1: Create a GitHub Repository

1. Go to [github.com](https://github.com) and sign in (or create a free account)
2. Click the **+** button (top right) → **New repository**
3. Name it: `naraka-air-services-app`
4. Choose **Public** or **Private** (either is fine)
5. Click **Create repository**

---

## Step 2: Upload Your Project to GitHub

### Option A: Upload ZIP (Easiest)

1. Download the `narakatravel-app.zip` from the workspace
2. On GitHub, go to your new repo
3. Click **Add file** → **Upload files**
4. Drag and drop the `narakatravel-app.zip` file
5. Click **Commit changes**

### Option B: Git Push (If you know Git)

```bash
cd narakatravel-app
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/naraka-air-services-app.git
git push -u origin main
```

---

## Step 3: Trigger the Build

1. On your GitHub repo page, click the **Actions** tab
2. You should see the workflow `Build Android App Bundle`
3. Click **Run workflow** (if it doesn't start automatically)
4. Wait **5-10 minutes** for the build to complete

---

## Step 4: Download Your AAB File

1. When the build finishes (green checkmark ✅), click on the workflow run
2. Scroll down to the **Artifacts** section
3. Click **naraka-app-release** to download the `app-release.aab` file

---

## Step 5: Upload to Google Play Console

1. Go to [Google Play Console](https://play.google.com/console)
2. Select your app → **Production** → **Create new release**
3. Upload the downloaded `app-release.aab` file
4. Fill in the release details and click **Review release**

---

## Why This Works Better

| Feature | Your Laptop | GitHub Actions |
|---------|------------|---------------|
| **RAM** | ~4GB (struggling) | **7GB** (plenty) |
| **Build time** | 54+ min (timeout) | **5-10 min** |
| **Internet speed** | Slow (may hang) | **Fast** (1 Gbps) |
| **Gradle caching** | None | **Built-in** |
| **Android Studio** | Required | **Not needed** |

---

## What If You Don't Want to Use GitHub?

If GitHub is not an option, you can try these alternatives:

### Option 1: Use a friend's computer
- Any laptop with **8GB+ RAM** and **fast internet** should build it in 10-15 minutes
- Just send them the `narakatravel-app.zip` and these instructions

### Option 2: Find a local developer
- Any Android developer in Kano can build this for you in 30 minutes
- Cost: ~₦5,000-₦15,000 ($3-$10)

### Option 3: Use a cloud build service
- [Buildozer](https://buildozer.io) or similar services
- Upload your code, they build it for you
- Cost: ~$5-10 per build

---

## Important Notes

- The **keystore file** (`naraka-keystore.jks`) is NOT uploaded to GitHub — keep it safe on your computer!
- The GitHub build creates an **unsigned AAB** — you need to sign it with your keystore before uploading to Google Play
- Or, if Google Play App Signing is enabled, Google can sign it for you

---

## Need Help?

If you get stuck on any step, just send me a screenshot and I'll guide you through it!
