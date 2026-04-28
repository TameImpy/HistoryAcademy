# Next Steps — History Academy MVP

**Last updated: 2026-04-28**
**Context:** Issues #2-19 are implemented with 48 passing tests. Cartographer design direction applied to mobile app. All code pushed to GitHub.

---

## 1. Fix local preview (BLOCKING)

The home WiFi router blocks device-to-device communication, making Expo Go on phone unreliable. Two options:

### Option A: Install Xcode (recommended)
- Open App Store on Mac → search "Xcode" → install (~7GB download)
- Open Xcode once after install to accept the license agreement
- Then in the Expo terminal, press `i` to open iOS Simulator — no phone/network needed
- This permanently solves the preview problem

### Option B: Fix the router
- Log into the router admin panel and disable "AP isolation" / "client isolation"
- This varies by router brand — check the manual

---

## 2. Set up Clerk authentication

- Create a Clerk account at https://clerk.com
- Create a new application, get the publishable key
- Add it to the Expo config
- Restore the Clerk imports in the mobile app (currently commented out — search for `// TODO: restore`)
- Files to update:
  - `apps/mobile/app/_layout.tsx` — restore ClerkProvider
  - `apps/mobile/app/course/[slug].tsx` — restore useAuth()
  - `apps/mobile/app/tutor/[courseSlug].tsx` — restore useAuth() and getToken()
- This is tracked in `MVP Decisions to Revisit.md` as a must-fix before launch

---

## 3. API URL for production

The API URL in `apps/mobile/lib/api.ts` is currently hardcoded to a tunnel URL. Before any real deployment:
- Set up a proper hosted API (Railway as per CLAUDE.md)
- Update the API_BASE to use `Constants.expoConfig.extra.apiUrl`
- Configure the URL in `app.json` under `expo.extra.apiUrl`

---

## 4. Design refinement

The Cartographer design direction (parchment/map aesthetic) has been applied to:
- Home/catalogue screen
- Course detail screen
- Error states
- Paywall component
- Navigation layout

Still using system serif fonts (Georgia) as placeholders. To match the mockup fully:
- Load custom fonts via `expo-font`: Fraunces (display), Spectral (serif), monospace
- The design mockup files are in `/Users/matthewrance/Downloads/direction-cartographer.jsx`

---

## 5. Remaining development

All 19 GitHub issues have API implementations with test providers. To move toward production:
- **Database:** Set up PostgreSQL on Railway, replace in-memory test providers with real DB queries
- **Contentful:** Connect real CMS instead of seed data
- **Stripe:** Wire up real Stripe API instead of test subscription provider
- **Mux:** Configure real video/audio assets
- **Claude API:** Connect real LLM provider for AI tutor instead of test responses

---

## 6. How to run the project

```bash
# Install dependencies (from project root)
cd /Users/matthewrance/Documents/History_Academy
pnpm install

# Start API (terminal 1)
pnpm dev:api
# API runs on http://localhost:3003

# Start mobile app (terminal 2)
cd apps/mobile
npx expo start --clear
# Press 'i' for iOS Simulator (requires Xcode)

# Run tests
pnpm test

# Run lint/typecheck
pnpm lint
pnpm typecheck
```

---

## 7. Key files to know

| What | Where |
|------|-------|
| API entry point | `apps/api/src/app.ts` |
| API routes | `apps/api/src/*/routes.ts` |
| Mobile screens | `apps/mobile/app/` |
| Design tokens | `apps/mobile/lib/theme.ts` |
| API client | `apps/mobile/lib/api.ts` |
| Shared types | `packages/shared/src/` |
| Seed course data | `apps/api/src/content/seed-data.ts` |
| AI tutor gold set | `apps/api/src/ai-tutor/eval/gold-set.ts` |
| MVP decisions doc | `MVP Decisions to Revisit.md` |
