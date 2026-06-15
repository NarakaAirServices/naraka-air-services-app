# NARAKA AIR SERVICES - Native App Store Guide

Your app has been wrapped with **Capacitor** (by Ionic), which is the modern standard for converting React web apps into native iOS/Android apps. Both the **Android** and **iOS** native projects are fully configured.

---

## What Was Done

- ✅ Installed `@capacitor/core`, `@capacitor/cli`, `@capacitor/android`, `@capacitor/ios`
- ✅ Initialized Capacitor with app name `NARAKA AIR SERVICES` and bundle ID `com.narakatravels.app`
- ✅ Added native Android project (`android/` folder)
- ✅ Added native iOS project (`ios/` folder)  
- ✅ Synced web assets from `dist/` into both native projects
- ✅ Configured app metadata and bundle identifiers

---

## What You Need to Do Next

### 📱 For Google Play Store (Android)

**Prerequisites:**
- [Android Studio](https://developer.android.com/studio) (free, Windows/Mac/Linux)
- A Google Play Developer account ($25 one-time fee)

**Steps:**

```bash
cd narakatravel-app
npm run build        # Rebuild the web app
npx cap sync         # Sync latest assets to Android
npx cap open android # Opens Android Studio
```

Then in **Android Studio**:
1. Wait for Gradle to sync
2. Click **Build → Generate Signed Bundle/APK**
3. Select **AAB (Android App Bundle)** — this is required for Play Store
4. Create a new keystore or use existing one (keep this file safe forever!)
5. Choose **release** build variant
6. Upload the generated `.aab` file to [Google Play Console](https://play.google.com/console)

---

### 🍎 For Apple App Store (iOS)

**Prerequisites:**
- A **Mac computer** running macOS (required for Xcode)
- [Xcode](https://developer.apple.com/xcode/) (free from Mac App Store)
- An Apple Developer account ($99/year)

**Steps:**

```bash
cd narakatravel-app
npm run build        # Rebuild the web app
npx cap sync         # Sync latest assets to iOS
npx cap open ios     # Opens Xcode
```

Then in **Xcode**:
1. Open `ios/App/App.xcworkspace` (not `.xcodeproj`)
2. Select your team in Signing & Capabilities (requires Apple Developer account)
3. Set a unique Bundle Identifier (e.g., `com.narakatravels.app`)
4. Select **Product → Archive** (this builds a signed release)
5. Once archived, click **Distribute App** → **App Store Connect**
6. Upload to [App Store Connect](https://appstoreconnect.apple.com) and submit for review

---

## Daily Development Workflow

Whenever you make changes to the web app:

```bash
# After editing any React source code:
cd narakatravel-app
npm run build
npx cap sync

# Then open the native IDE to build/test:
npx cap open android   # Android Studio
npx cap open ios       # Xcode (Mac only)
```

---

## Native Features You Can Add

With Capacitor, you can easily add native device features:

| Feature | Plugin |
|---------|--------|
| Push Notifications | `@capacitor/push-notifications` |
| Camera/Photos | `@capacitor/camera` |
| Geolocation | `@capacitor/geolocation` |
| Device Storage | `@capacitor/preferences` |
| Biometrics | `@capacitor/local-authentication` |
| Social Sharing | `@capacitor/share` |
| Deep Links | `@capacitor/app` + custom config |

---

## Important Notes

1. **Bundle ID:** The current bundle ID is `com.narakatravels.app`. You should change this to your unique ID before publishing (e.g., `com.yourcompany.narakatravels`).

2. **App Name:** The app name is set to `NARAKA AIR SERVICES`. This is what users will see on their home screen.

3. **Splash Screen:** You'll want to add a custom splash screen and app icon. Tools like:
   - [Capacitor Assets](https://github.com/ionic-team/capacitor-assets) (recommended)
   - [IconKitchen](https://icon.kitchen) (online tool)
   
4. **Web Images:** The app uses Unsplash URLs for images. This requires internet connection. For offline use, images should be downloaded locally.

5. **No Backend Yet:** This is a frontend demo with localStorage. For a real app store submission, you should connect a backend API for real data and secure payments.

---

## File Structure

```
narakatravel-app/
├── android/          # Native Android Studio project (ready to build)
│   ├── app/
│   │   └── src/main/assets/public/  # Web app copied here
│   └── ...
├── ios/              # Native Xcode project (ready to build on Mac)
│   └── App/
│       └── App/public/              # Web app copied here
├── capacitor.config.json  # Capacitor configuration
├── dist/             # Production web build
└── src/              # React source code
```

---

## Quick Test (Android - No Store Needed)

You can test on an Android device immediately without publishing:

```bash
cd narakatravel-app
npx cap run android
```

This will:
1. Build the APK
2. Install it on a connected Android device or emulator
3. Launch the app automatically

---

## Next Steps Checklist

- [ ] Install Android Studio (and/or Xcode on Mac)
- [ ] Test the app on a real device via `npx cap run android`
- [ ] Create a keystore for signing
- [ ] Design an app icon and splash screen
- [ ] Set up a real backend API for production
- [ ] Register for Google Play Developer account ($25)
- [ ] Register for Apple Developer account ($99/year)
- [ ] Build release AAB for Android and upload to Play Console
- [ ] Build release archive for iOS and upload to App Store Connect
- [ ] Fill out store listings (screenshots, descriptions, privacy policy)

---

## Need Help?

- [Capacitor Documentation](https://capacitorjs.com/docs)
- [Android Publishing Guide](https://developer.android.com/studio/publish)
- [iOS App Store Publishing Guide](https://developer.apple.com/documentation/xcode/distributing-your-app)
- [Ionic App Store Publishing Guide](https://ionic.io/resources/articles/app-store-publishing-guide)
