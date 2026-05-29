# Next Steps — History Academy MVP

**Last updated: 2026-05-29**
**Context:** Expo SDK 55, Clerk auth working (sign-up, sign-in with email verification, lesson unlocking), Cartographer design with custom fonts (Fraunces/Spectral), lesson navigation functional, development build running on iOS Simulator. 48 passing API tests.

---

## Completed

- ✅ Local preview — Xcode + iOS Simulator via development build (not Expo Go)
- ✅ Clerk authentication — sign-up, sign-in with email code verification, lesson locking/unlocking
- ✅ Custom fonts — Fraunces (display), Spectral (body) via expo-google-fonts
- ✅ Lesson navigation — tappable lessons, free lesson shows content, locked lessons redirect to sign-in
- ✅ API URL — pointed at localhost:3003 for simulator
- ✅ Expo SDK upgrade — 54 → 55 (required for @clerk/clerk-expo v2 + expo-crypto AES)
- ✅ Auth bypass removed — Clerk is live, no more dev-mode skip

---

## Tier 1 — Demoable product (next priority)

These three items turn the app into something you can show stakeholders with a complete user journey.

### 1. Deploy API to Railway
- Set up Railway project, deploy the Fastify API
- Get a public URL, update `app.json` under `expo.extra.apiUrl`
- This unblocks showing the app to anyone outside your Mac

### 2. Connect Stripe (test mode)
- Create Stripe account, get test API keys
- Wire up the real Stripe subscription provider (replacing `TestSubscriptionProvider`)
- Build the web checkout flow (deep-linked from app)
- Completes: browse → paywall → payment → unlock flow

### 3. Connect Claude API for AI tutor
- Get Anthropic API key, wire up the real LLM provider (replacing `TestLLMProvider`)
- Connect the retrieval provider to the dummy corpus (pgvector or in-memory for now)
- This is the highest-value differentiator — a working AI tutor demo is the pitch

---

## Tier 2 — Real content (requires editorial input)

### 4. Set up Contentful
- Create Contentful space with Course → Module → Lesson content model
- Migrate 1-2 real courses from HE editorial
- Replace `TestContentProvider` with Contentful API queries

### 5. Connect Mux for video/audio
- Upload real podcast/video assets to Mux
- Replace placeholder VideoPlayer/AudioPlayer components (currently stubs since expo-av was removed in SDK 55 — use `expo-video` and `expo-audio`)
- Wire up Mux playback URLs in lesson data

### 6. Build the real AI tutor corpus
- Ingest real podcast transcripts and magazine articles
- The ingestion pipeline shell exists — needs real connectors
- Editorial review step before content goes live in tutor

---

## Tier 3 — Launch readiness

### 7. PostgreSQL on Railway
- Replace all in-memory test providers with real database queries
- Set up pgvector for AI tutor retrieval
- Run migrations

### 8. Stripe production mode
- Switch from test to live keys
- Web checkout flow with real payments
- Webhook handling for subscription lifecycle

### 9. App Store submission
- App icons, splash screen, screenshots
- Privacy policy, terms of service
- TestFlight beta → App Store review

### 10. Push notifications
- "You left off at lesson 4" re-engagement
- Course completion celebrations
- New course announcements

---

## How to run the project

```bash
# Install dependencies (from project root)
cd /Users/matthewrance/Documents/History_Academy
pnpm install

# Start API (terminal 1)
pnpm dev:api
# API runs on http://localhost:3003

# Start mobile app (terminal 2)
cd apps/mobile
npx expo start --dev-client
# Open HistoryExtra Academy app on simulator (NOT Expo Go)

# If app is missing from simulator after erase:
xcrun simctl install booted ~/Library/Developer/Xcode/DerivedData/HistoryExtraAcademy-*/Build/Products/Debug-iphonesimulator/HistoryExtraAcademy.app

# If native code changed (new packages with native modules):
rm -rf ios && npx expo run:ios --device "iPhone 17 Pro"

# Run tests
pnpm test

# Run lint/typecheck
pnpm lint
pnpm typecheck
```

---

## Key files to know

| What | Where |
|------|-------|
| API entry point | `apps/api/src/app.ts` |
| API routes | `apps/api/src/*/routes.ts` |
| Mobile screens | `apps/mobile/app/` |
| Design tokens / fonts | `apps/mobile/lib/theme.ts` |
| API client | `apps/mobile/lib/api.ts` |
| Auth screens | `apps/mobile/app/(auth)/` |
| Shared types | `packages/shared/src/` |
| Seed course data | `apps/api/src/content/seed-data.ts` |
| AI tutor gold set | `apps/api/src/ai-tutor/eval/gold-set.ts` |
| MVP decisions doc | `MVP Decisions to Revisit.md` |
| Clerk key | `apps/mobile/app.json` → `expo.extra.clerkPublishableKey` |
