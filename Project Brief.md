# Project Brief — HistoryExtra Academy

**Status:** MVP build (decisions resolved 2026-04-24)
**Owner:** Matt (Data Product & AI Innovation)
**Intended consumer:** Coding agent (Claude Code / equivalent) + human reviewer

---

## How to use this brief

This brief is written to be fed to a coding agent as the root context for implementation. It defines:

- What we are building and why (sections 1–3)
- What is and isn't in MVP (sections 4–5)
- Resolved architectural decisions (sections 6–9)
- Acceptance criteria the agent must hit (section 10)
- Open questions requiring human decision — **these must not be guessed** (section 12)

If you are a coding agent: when in doubt, stop and ask rather than assume on anything in section 12. The AI tutor component in particular has hard editorial and factual guardrails — see section 11.

---

## 1. Product overview

**One-liner:** A structured, AI-augmented learning platform built on HistoryExtra's podcast archive, magazine corpus, and expert historian network — MasterClass for British history, with subject authority instead of celebrity.

**Elevator pitch:** Lifelong learning is a proven paid category — MasterClass reached a $2.75bn valuation and 2M+ subscribers on celebrity-fronted content. HistoryExtra has the rarer asset: genuine editorial authority, a 2,000+ episode podcast archive, and the historian relationships nobody else can quickly replicate. Academy productises that into structured courses with an AI tutor grounded in HE's own corpus.

**Year-one target:** 20,000 paying subscribers at £5.99/month or £49.99/year.

---

## 2. Problem

Current options for engaged adult history learners in the UK are:

- University continuing education (Oxford, OU) — expensive, formal, slow cadence
- MasterClass / Great Courses — broad and US-centric, with variable subject authority
- YouTube / podcasts / books — free but unstructured, no progression, no validation
- Museum/heritage memberships — access to sites but no structured learning

There is no product that combines HE-level subject authority with a structured, assessable, modern learning experience at an accessible price.

---

## 3. Target users

**Primary persona — "Richard, 61":** Retired, HistoryExtra podcast listener for years, National Trust member, reads popular history books. Has paid for Great Courses DVDs in the past. Willing to pay meaningfully for learning that feels rigorous but not intimidating.

**Secondary persona — "Priya, 38":** Listens to HE and _The Rest is History_ on her commute, follows historians on social media, sometimes enrols in FutureLearn courses but rarely finishes them. Wants structure without bureaucracy.

**Tertiary — gift buyer.** History enthusiasts' partners and children buying gifts. This is a genuine conversion surface at Christmas / Father's Day. (Gift flow deferred to post-MVP, pre-gifting-season.)

---

## 4. MVP scope (v1.0)

Ship in this order. Courses are the critical path.

### 4.1 Course platform (core)

- Course catalogue with 6 courses at launch (dummy content for development — 6 flagship British history topics spanning different eras), ~30–40 by end of year one
- Each course: 8–12 lessons, mix of video + audio (podcast-derived) + text
- Progress tracking per user
- Quizzes at module boundaries (multiple choice + short answer)
- Certificate of completion (simple downloadable PDF with user's name, course title, instructor, date, HE branding)

### 4.2 Reading lists (affiliate revenue layer)

- Each course has an expert-curated reading list
- Book links through Bookshop.org / Amazon affiliate tags
- Click-tracking for attribution

### 4.3 AI tutor (subscription gated)

- Chat interface scoped to the course the user is currently in
- Answers grounded **exclusively** in HE corpus via retrieval (podcast transcripts, magazine articles, course lesson content)
- Clear citations back to source material for every answer
- Explicit refusal behaviour when retrieved context is insufficient — no generic LLM fallback
- Usage limits per subscriber (e.g. 50 messages/month)
- Corpus: build ingestion pipeline shell with pluggable connectors + extensive dummy transcripts/articles for development (real corpus access not yet available)

### 4.4 Account & subscription (foundational)

- Clerk for auth (placeholder — will swap to Immediate ID SSO when API is available)
- Stripe for subscription billing via web checkout (deep-linked from app — no in-app purchases to avoid App Store 30% cut)
- Single tier: £5.99/mo or £49.99/yr (~30% annual discount)
- 7-day free trial with card capture, triggered on second lesson

---

## 5. Out of scope (explicitly deferred)

- **Cohort courses** (scheduled facilitated groups, Zoom, discussion threads) — deferred to v1.1
- **Gift purchase flow** — deferred to post-MVP, build before first gifting season
- **Immediate ID integration** — using Clerk placeholder until Immediate ID API available
- **Bundling with HE app / magazine sub** — standalone product at MVP
- **CPD accreditation** — certificates of completion only
- **Accredited qualifications** — requires Ofqual / awarding body engagement. v2 at earliest.
- **Web app** — native mobile app first (React Native / Expo). Mobile-responsive web is v1.5 informed by usage.
- **User-generated content or public forums** — moderation and legal cost is disproportionate for MVP.
- **Peer review of essays** — headline feature but expensive to operate; defer until core product is proven.
- **Multi-language** — English only.
- **Corporate / B2B sales** — likely a later revenue stream but not MVP.

---

## 6. Core user journeys

**New user discovery:**

1. Arrives via HE podcast episode mention, newsletter, or magazine ad
2. Downloads app from App Store / Google Play
3. Browses course catalogue without login — previews course: sample lesson, reading list, instructor bio
4. Hits paywall on second lesson → 7-day free trial flow
5. Clerk signup → deep-links to web checkout → card captured via Stripe → enrolled

**Learner weekly rhythm:**

1. Push notification — "you left off at lesson 4"
2. Open lesson on phone during commute (audio-led) or tablet in the evening (video-led)
3. Quick module quiz on completion
4. AI tutor query when confused ("explain the difference between the Peasants' Revolt and the Jacquerie")
5. Progress bar moves; streak tracked

**Gift purchase (post-MVP):**

1. Gifter selects course or 1-year subscription gift
2. Recipient email + delivery date
3. Recipient receives code on date; redeems via signup

---

## 7. Data model (high-level)

Core entities:

- `Course` — title, summary, instructor_id, level, duration_hours, hero_media, status (draft/published)
- `Module` — course, order, title, summary
- `Lesson` — module, order, title, content_type (video/audio/text/mixed), primary_media_url, transcript, supporting_materials
- `Quiz` — module, questions[]
- `User` — auth_id (Clerk, later Immediate ID), subscription_status, enrolled_courses, progress_by_lesson
- `Enrolment` — user, course, started_at, completed_at, cert_issued_at
- `ReadingListItem` — course, title, author, affiliate_url_amazon, affiliate_url_bookshop
- `TutorConversation` — user, course, messages[]
- `CorpusDocument` — source_type (podcast/magazine/lesson), title, content, embedding, metadata

The `CorpusDocument` table is the grounding source for the AI tutor. Design this carefully — see section 11.

---

## 8. Technical architecture (resolved)

**Platform:** React Native / Expo — native mobile app for iOS + Android from a single codebase.

**Repo structure:** Monorepo

- `/apps/mobile` — Expo / React Native app
- `/apps/api` — Node/TypeScript API (Express or Fastify)
- `/packages/shared` — Shared types, validation schemas, constants

**Backend:** Node/TypeScript API hosted on Railway.

**Database:** PostgreSQL + pgvector (single instance on Railway). Handles both relational data and vector search for the AI tutor.

**Video & audio hosting:** Mux for both video and audio. Single provider, single player component, consistent DRM and analytics. React Native SDK available.

**CMS:** Contentful (headless). Models the Course → Module → Lesson hierarchy. Editorial publishes without engineering involvement.

**Auth:** Clerk (placeholder with good Expo support). Will swap to Immediate ID when API is available.

**Payments:** Stripe via web checkout page (deep-linked from app). No in-app purchases — avoids App Store 30% cut. Netflix/Spotify model.

**Analytics:** Segment (free tier — 1,000 MTUs, 2 destinations). Instrument events from the start.

**AI tutor infrastructure:**

- Embedding store: pgvector (same Postgres instance)
- LLM: Anthropic Claude as primary, with provider-agnostic abstraction layer (must not hardcode a single provider)
- Retrieval: hybrid (BM25 + dense vectors) — pure vector search underperforms on proper-noun-heavy historical content
- Safety: output guardrails including factual-grounding check (does every claim cite a source?) and refusal-when-unsure behaviour
- Corpus: pluggable ingestion pipeline shell + extensive dummy content for development
- System prompt: engineering drafts v1, editorial reviews before launch

---

## 9. Third-party integrations

- **Clerk** (auth placeholder) → **Immediate ID** (auth, when available)
- **Stripe** (subscriptions via web checkout)
- **Mux** (video and audio hosting)
- **Contentful** (headless CMS)
- **pgvector** (vector retrieval, same Postgres instance)
- **Anthropic Claude** (LLM, primary — with abstraction layer for provider swapping)
- **Bookshop.org + Amazon Associates** (affiliate revenue)
- **Segment** (analytics, free tier)

---

## 10. Acceptance criteria for MVP

MVP is complete when:

- [ ] 6 courses are published end-to-end (video + audio + text + quizzes + reading lists + certificate template)
- [ ] A new user can discover, preview, trial, subscribe, and complete a course within the app
- [ ] The AI tutor answers questions citing corpus content, and refuses gracefully when retrieval confidence is low
- [ ] Progress is tracked and visible across devices for the same user
- [ ] Certificate PDF generation works reliably and looks good
- [ ] All course content is authored in Contentful, not hardcoded
- [ ] AI tutor has logged, auditable conversations with full source attribution on every response
- [ ] Test coverage: subscription state, trial → paid transitions, tutor retrieval quality (see section 11)
- [ ] Accessibility audit — older audience makes this a commercial issue, not just a compliance one
- [ ] Web checkout flow via Stripe works end-to-end when deep-linked from app

---

## 11. AI tutor — specific requirements and guardrails

**This is the highest-risk component. Editorial trust is the brand moat; a hallucinating tutor that misattributes a historical claim to a HE historian is a brand-damage event.**

Hard requirements:

1. **Grounded only.** Every tutor response must cite at least one `CorpusDocument`. If retrieval returns nothing with sufficient confidence, the tutor says so explicitly and suggests related topics from the corpus.
2. **No unattributed facts.** Responses must not include historical claims that aren't traceable to retrieved context. Post-response verification pass is required — check each claim against retrieved documents before display.
3. **Explicit uncertainty.** When retrieved sources disagree (common in history), the tutor surfaces this ("Historians differ on this — HE's coverage in [episode] argues X, while [article] suggests Y"). Never hides disagreement.
4. **Editorial sign-off on system prompt.** The system prompt defining tutor behaviour is an editorial artefact, not an engineering one. Version-controlled, reviewed by HE editor before deployment. Engineering drafts v1, editorial reviews.
5. **Evaluation harness.** Before launch, a gold-set of 100+ representative history questions must be evaluated with human-graded accuracy, citation correctness, and refusal appropriateness. Target: >95% factual accuracy, >90% citation correctness on gold set.
6. **Feedback loop.** Every tutor response has thumbs up/down. Negative responses are reviewed weekly by editorial. Patterns feed back into retrieval tuning or prompt updates.

Soft requirements:

- Conversation memory within a session only. Do not persist cross-session memory in MVP — too much risk of accumulated misremembering.
- Cost budget per user per month must be enforced. Cache common queries aggressively.
- Logs retained for minimum 6 months for audit.

---

## 12. Open questions — DO NOT GUESS

**These require human decision before implementation. The coding agent must pause and request clarification when it hits any of these.**

1. ~~**Pricing**~~ **RESOLVED:** £5.99/mo and £49.99/yr, single tier.
2. ~~**Cohort scope**~~ **RESOLVED:** Deferred to v1.1.
3. ~~**AI provider and model**~~ **RESOLVED:** Anthropic Claude as primary, with abstraction layer. Specific model (Sonnet vs Haiku) TBD based on cost/quality tradeoff during development.
4. **Editorial production capacity** — how many courses per quarter can HE actually produce? Affects content pipeline, not tech, but gates viable launch timing.
5. **Historians' contracts** — talent agreements for course instructors need to cover long-term content use, AI tutor training use, and ancillary revenue shares. Being handled in parallel — block launch if unresolved.
6. **Corpus licensing for AI tutor** — podcast transcripts exist but rights to use them for AI retrieval may need renegotiating with contributors. Being handled in parallel — block the tutor feature if unresolved.
7. ~~**Certificates**~~ **RESOLVED:** Simple certificates of completion only. No CPD accreditation.
8. ~~**Bundling with HE app / magazine sub**~~ **RESOLVED:** Standalone product, no bundling at MVP.

---

## 13. Ticket structure (epic → ticket)

**Epic 1: Platform foundation**

- Expo / React Native app skeleton
- Monorepo setup (apps/mobile, apps/api, packages/shared)
- Clerk auth integration
- CI/CD, staging, analytics wiring (Segment)

**Epic 2: Content platform**

- Contentful schema for Course / Module / Lesson / Quiz / ReadingList
- Content API (Node/TypeScript on Railway)
- Dummy course content (6 flagship British history courses)
- Editorial workflow UAT

**Epic 3: Learning experience**

- Course catalogue + browse + detail screens
- Lesson player (Mux video/audio + text)
- Quiz UX
- Progress tracking
- Certificate PDF generation

**Epic 4: Commerce**

- Stripe subscriptions (web checkout, deep-linked from app)
- Trial flow (paywall on lesson 2, 7-day trial, card capture)
- Payment webhooks → entitlement sync
- Subscription management

**Epic 5: AI tutor**

- Corpus ingestion pipeline shell (pluggable connectors)
- Extensive dummy corpus (synthetic transcripts + articles)
- Embedding + hybrid retrieval (BM25 + dense via pgvector)
- LLM integration layer (Anthropic Claude, provider-agnostic)
- Tutor chat UX with citations
- Safety guardrails (grounding check, refusal behaviour)
- Evaluation harness + gold set
- Feedback UI (thumbs up/down)
- Tutor conversation logging + audit

**Epic 6: Reading lists + affiliate**

- Contentful model for reading list items
- Affiliate link click tracking
- Attribution reporting

**Epic 7: Pre-launch hardening**

- Performance audit
- Accessibility audit (especially important for older primary audience)
- Security review (especially tutor + Stripe)
- Soft launch to existing HE subscribers

---

## 14. Risks

- **AI tutor factual errors.** The single largest brand risk. Mitigation is in section 11 — guardrails are non-negotiable.
- **Content production pace.** Courses take real editorial time. Launching with 6 and roadmap to 30+ assumes production throughput that should be validated before committing to marketing spend.
- **Licensing on corpus.** Podcast and magazine content was created for linear listening/reading, not necessarily for AI retrieval. Legal review required. Being handled in parallel.
- **Completion rates.** Industry-standard MOOC completion is ~5–15%. Our pricing model relies on users valuing partial completion — needs to be designed for dipping-in as well as finishing.
- **Category competition from bundled services.** Apple, Spotify, and Amazon could all launch similar products. Our moat is subject authority + corpus, not tech.
- **App Store review.** Native app must comply with Apple/Google review guidelines. Web checkout for subscriptions is permitted but the UX must be carefully handled to avoid rejection.
