# MVP Decisions to Revisit at Scale

**Purpose:** This document captures every decision made on a "good enough for MVP" basis that should be revisited if HistoryExtra Academy moves to a serious production investment. These are not mistakes — they're deliberate trade-offs for speed. But each one has a ceiling.

---

## Infrastructure & Hosting

### Railway → AWS/GCP

**MVP choice:** Railway for API + Postgres hosting.
**Why it works for now:** Zero DevOps overhead, one-click deploys, managed Postgres with pgvector. Gets us to launch fast.
**When to revisit:** When you need auto-scaling, multi-region, SLAs, or compliance certifications (SOC 2, ISO 27001). Railway is a small company — evaluate vendor risk for a business-critical product.
**Production direction:** AWS (ECS/Fargate + RDS) or GCP (Cloud Run + Cloud SQL). Consider Immediate's existing cloud footprint for cost consolidation.

### Single Postgres instance → separated concerns

**MVP choice:** One Postgres database for relational data AND vector search (pgvector).
**Why it works for now:** Simple, cheap, no data sync issues. Corpus is small (~80 dummy documents, real corpus will be ~2,000 podcast transcripts + articles).
**When to revisit:** When retrieval latency matters at scale, or corpus grows beyond ~50k documents. Vector search can compete with transactional queries for resources.
**Production direction:** Dedicated vector store (Pinecone, Weaviate, or a separate pgvector instance) + relational Postgres. Or managed pgvector on a larger instance class.

---

## Authentication

### Clerk → Immediate ID

**MVP choice:** Clerk as placeholder auth.
**Why it works for now:** Fast integration, great Expo SDK, handles signup/signin/session management out of the box.
**When to revisit:** As soon as Immediate ID API is available. SSO across RT, Good Food, and HE is a commercial requirement for cross-sell.
**Production direction:** Full Immediate ID integration. Keep the auth abstraction layer we built so the swap is clean.

---

## Payments & Pricing

### Web checkout only → hybrid web + IAP

**MVP choice:** Stripe web checkout only, deep-linked from app. No in-app purchases.
**Why it works for now:** Keeps 97% of revenue (vs 70% with App Store IAP). Apple now permits this for "reader" apps.
**When to revisit:** If App Store rejects the app or conversion suffers because users expect to buy in-app. Monitor signup drop-off at the web checkout step.
**Production direction:** Potentially offer both paths (web checkout for organic/email traffic, IAP for App Store discovery traffic) and accept the 30% cut on IAP-sourced subscribers as a customer acquisition cost.

### Single pricing tier → tiered plans

**MVP choice:** One tier at £5.99/mo or £49.99/yr.
**Why it works for now:** Simple to build, simple to communicate. Tests whether the product has market fit at all.
**When to revisit:** Once you have subscriber data — if AI tutor usage is low among most users but high among a minority, a basic (no tutor) vs premium (with tutor) split could unlock more revenue. Also revisit when cohort courses launch.
**Production direction:** Likely 2-3 tiers. Basic (courses only), Premium (courses + AI tutor), and Cohort (facilitated group courses as one-off purchases).

---

## Content & CMS

### Dummy content → real editorial content

**MVP choice:** 6 synthetic courses with AI-generated lesson text and dummy corpus.
**Why it works for now:** Unblocks all development without waiting for editorial production.
**When to revisit:** Before any real user sees the product. Dummy content is for development and stakeholder demos only.
**Production direction:** Real courses authored by HE editorial in Contentful, real podcast transcripts and magazine articles in the corpus.

### Contentful → evaluate at scale

**MVP choice:** Contentful as headless CMS.
**Why it works for now:** Fast setup, strong content modelling, good API.
**When to revisit:** When content volume grows significantly (30+ courses, hundreds of lessons) and if Contentful pricing becomes a concern. Also evaluate if Immediate has a centralised CMS strategy.
**Production direction:** May stay on Contentful, or migrate to Immediate's shared CMS if one emerges. Evaluate Sanity as a cheaper alternative at scale.

---

## AI Tutor

### Single LLM provider → multi-provider evaluation

**MVP choice:** Anthropic Claude as the sole LLM provider (with abstraction layer in place).
**Why it works for now:** Claude is strong at instruction-following and citation. One provider simplifies testing and cost tracking.
**When to revisit:** Before launch. Run the evaluation harness against Claude Sonnet, Claude Haiku, GPT-4o, and GPT-4o-mini. Compare quality, latency, and cost per conversation.
**Production direction:** Provider-agnostic with data-driven selection. May use different models for different tasks (e.g., Haiku for simple questions, Sonnet for complex ones).

### No caching → semantic cache

**MVP choice:** Every tutor query hits the full RAG pipeline (retrieval + LLM call).
**Why it works for now:** Simpler architecture. At low user volumes, cost is manageable.
**When to revisit:** When tutor costs exceed budget (track cost per conversation from day one). Common questions (especially for popular courses) will be asked repeatedly.
**Production direction:** Semantic cache layer — if a new question is sufficiently similar to a previously answered one, serve the cached response. Saves LLM costs significantly.

### Session-only memory → evaluated cross-session

**MVP choice:** Tutor has no memory across sessions.
**Why it works for now:** Avoids accumulated misremembering, simpler architecture.
**When to revisit:** If users consistently re-ask the same context-setting questions at the start of each session. Monitor tutor feedback for patterns.
**Production direction:** Lightweight learner profile (topics covered, difficulty preference) that persists — not full conversation memory, but enough to avoid cold-start every session.

### Dummy corpus → real corpus + ongoing ingestion

**MVP choice:** Pluggable ingestion pipeline with synthetic content.
**Why it works for now:** Full tutor development without waiting for real content access.
**When to revisit:** As soon as real transcripts and articles are accessible. The pipeline shell is ready — just needs real connectors.
**Production direction:** Automated ingestion — new podcast episodes and magazine articles are automatically processed and added to the corpus. Editorial review step before new content goes live in the tutor.

---

## Analytics

### Segment free tier → production analytics

**MVP choice:** Segment free tier (1,000 MTUs, 2 destinations).
**Why it works for now:** Sufficient for development and soft launch.
**When to revisit:** When you approach 1,000 monthly users. Free tier will be exhausted quickly after public launch.
**Production direction:** Segment Team/Business plan ($120/mo+) feeding into Immediate's data warehouse (Snowflake/BigQuery). Or switch to PostHog (1M events/mo free) if Segment costs are disproportionate.

---

## Auth Bypass for Local Development

### Clerk bypass when no key configured → must be removed before launch

**MVP choice:** Mobile app skips the Clerk auth wrapper when no `clerkPublishableKey` is configured, allowing local browsing without Clerk credentials.
**Why it works for now:** Unblocks local development and demo without needing Clerk account setup.
**When to revisit:** Before any user-facing deployment. This MUST be addressed before launch — without auth, the paywall, subscription, progress, and tutor features are non-functional.
**Production direction:** Configure Clerk publishable key in Expo config, remove the bypass, and test the full auth flow end-to-end.

---

## Features Deferred Entirely

These aren't MVP compromises — they're whole features we deliberately skipped. Listing them here as a roadmap reference:

| Feature                  | Why deferred                                                          | When to build                                          |
| ------------------------ | --------------------------------------------------------------------- | ------------------------------------------------------ |
| Gift purchase flow       | Adds significant UX complexity (scheduled delivery, redemption codes) | Before first gifting season (Christmas/Father's Day)   |
| Cohort courses           | Zoom, discussion threads, facilitator tools — large scope             | v1.1, once self-paced product proves out               |
| Web app                  | Native mobile is the priority platform                                | v1.5, informed by usage data (desktop vs mobile split) |
| Immediate ID SSO         | API not yet available                                                 | When API is ready — auth abstraction layer is in place |
| HE subscription bundling | Commercial packaging decision                                         | When Immediate decides on cross-brand strategy         |
| CPD accreditation        | Requires accreditation body partnership                               | When user research confirms demand                     |
| Push notification nudges | "You left off at lesson 4" re-engagement                              | Early post-MVP — high impact, moderate effort          |
| Offline content download | Download lessons for offline playback                                 | v1.5 — important for commuter persona                  |
| B2B/corporate sales      | Different buying flow, admin portal                                   | When organic B2C model is proven                       |

---

_Last updated: 2026-04-24_
_Review trigger: when subscriber count exceeds 1,000 or when Immediate commits production budget_
