# HistoryExtra Academy

## Project overview

A structured, AI-augmented learning platform built on HistoryExtra's podcast archive, magazine corpus, and expert historian network. Native mobile app (React Native / Expo) with a Node/TypeScript API backend.

## Architecture

**Monorepo structure:**

- `/apps/mobile` — Expo / React Native app (iOS + Android)
- `/apps/api` — Node/TypeScript API (Express or Fastify)
- `/packages/shared` — Shared types, validation schemas, constants

**Tech stack:**

- **Mobile:** React Native / Expo
- **Backend:** Node/TypeScript, hosted on Railway
- **Database:** PostgreSQL + pgvector (single instance on Railway)
- **CMS:** Contentful (headless) — Course → Module → Lesson hierarchy
- **Auth:** Clerk (placeholder, will swap to Immediate ID when available)
- **Payments:** Stripe via web checkout (deep-linked from app). No in-app purchases.
- **Video/Audio:** Mux (both video and audio, single provider)
- **AI Tutor LLM:** Anthropic Claude (primary), provider-agnostic abstraction layer
- **AI Retrieval:** Hybrid search (BM25 + dense vectors) via pgvector
- **Analytics:** Segment (free tier)

## Key decisions

- **Single pricing tier:** £5.99/mo or £49.99/yr
- **Trial flow:** Browse free without login. Paywall on lesson 2 → 7-day free trial with card capture.
- **No in-app purchases:** Web checkout via Stripe to avoid App Store 30% cut
- **AI tutor corpus:** Ingestion pipeline shell with pluggable connectors. Using extensive dummy content for development until real corpus access is available.
- **System prompt:** Engineering drafts, editorial reviews before launch. Version-controlled as editorial artefact.
- **Certificates:** Simple completion PDF (name, course, instructor, date, HE branding)
- **Design:** Design system file to be provided by Matt

## Deferred (not in MVP)

- Cohort courses (Zoom, discussion threads, facilitated groups) → v1.1
- Gift purchase flow → pre-gifting-season
- Immediate ID integration → when API available
- Bundling with HE app/magazine subscriptions
- CPD accreditation
- Native web app (mobile-responsive web) → v1.5

## AI tutor guardrails (non-negotiable)

1. Every response must cite at least one CorpusDocument
2. No unattributed historical claims — post-response verification required
3. Surface disagreements between sources explicitly
4. Refuse gracefully when retrieval confidence is low — no generic LLM fallback
5. System prompt is an editorial artefact, not an engineering one
6. Evaluation harness: 100+ gold-set questions, >95% factual accuracy, >90% citation correctness
7. Thumbs up/down on every response, negative responses reviewed weekly

## Open questions (do not guess — ask Matt)

1. Pricing benchmarking — £5.99/mo confirmed but subject to change based on market testing
2. AI provider model selection — Claude confirmed as primary, specific model (Sonnet vs Haiku) TBD based on cost/quality tradeoff
3. Editorial production capacity — how many courses per quarter can HE produce?
4. Historian contracts — talent agreements must cover AI tutor use
5. Corpus licensing — rights for AI retrieval use of podcast transcripts being negotiated

## Commands

- TBD — will be populated as the project is set up
