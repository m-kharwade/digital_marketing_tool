# Technical Implementation Plan
## AI Marketing Intelligence & Execution Platform

Source: [problem_statement.md](problem_statement.md)

---

## 1. Guiding Principles (from the spec)

- **Data → Intelligence → Recommendation → Creative → Approval → Execution → Learning** is the spine of the system. Every module maps to exactly one stage of this pipeline.
- **Check hourly, change only when evidence changes.** The system must distinguish *polling frequency* from *recommendation churn* — this is a first-class architectural constraint (see §7).
- **Explainability is a data requirement, not a UI feature.** Every recommendation/creative must carry a queryable evidence trail (competitor ad IDs, counts, deltas, confidence). This means evidence has to be modeled and stored, not generated ad-hoc at render time.
- **Industry-agnostic.** No hardcoded taxonomy. Category/topic/CTA/KPI vocabularies must be dynamic, per-brand, AI-assisted, and versioned.
- **Human approval is a gate, not a formality.** Publishing must be structurally impossible without an approval record.

---

## 2. High-Level Architecture

Modular monolith to start (see §12 for why, not microservices-first), organized as clearly separated internal services communicating over an internal event bus — so it can be split into real services later without a rewrite.

```
                                ┌─────────────────────────┐
                                │   Ingestion Layer        │
                                │  (Ad Library connectors) │
                                └────────────┬─────────────┘
                                             │ raw ads
                                             ▼
                                ┌─────────────────────────┐
                                │  Classification Engine   │
                                │  (LLM + vision models)   │
                                └────────────┬─────────────┘
                                             │ structured ad records
                                             ▼
                 ┌───────────────────────────────────────────────────┐
                 │              Intelligence Store                    │
                 │  (Postgres + vector DB + object storage for media) │
                 └───────┬───────────────────────────────┬───────────┘
                         │                                │
                         ▼                                ▼
          ┌───────────────────────────┐      ┌─────────────────────────────┐
          │  Signal & Trend Engine     │      │  Brand Performance Store     │
          │  (deltas, spikes, matrix)  │      │  (own campaign metrics)      │
          └────────────┬───────────────┘      └───────────────┬──────────────┘
                        │                                      │
                        └──────────────┬───────────────────────┘
                                       ▼
                        ┌───────────────────────────────┐
                        │   Recommendation Engine         │
                        │  (evidence scoring, KEEP/       │
                        │   MODIFY/REPLACE state machine) │
                        └────────────┬─────────────────────┘
                                     ▼
                        ┌───────────────────────────────┐
                        │   Creative Generation Engine    │
                        │  (brand-conditioned genAI)      │
                        └────────────┬─────────────────────┘
                                     ▼
                        ┌───────────────────────────────┐
                        │   Approval Centre (human gate)  │
                        └────────────┬─────────────────────┘
                                     ▼
                        ┌───────────────────────────────┐
                        │   Publishing Layer               │
                        │  (Meta/Google/LinkedIn APIs)     │
                        └────────────┬─────────────────────┘
                                     ▼
                        ┌───────────────────────────────┐
                        │   Performance Feedback Loop      │
                        │  (Expected vs Actual)            │
                        └───────────► back to Signal Engine
```

---

## 3. Tech Stack (recommendation)

| Layer | Choice | Rationale |
|---|---|---|
| Backend language | **TypeScript (Node.js/NestJS)** or **Python (FastAPI)** | Python is preferable given heavy AI/ML orchestration, LLM SDKs, and data pipeline libraries; NestJS if the team is JS-first. Plan assumes **Python/FastAPI** below. |
| Frontend | **React + TypeScript**, Next.js | Dashboard-heavy UX (§21), needs SSR for perf and good data-table/chart ecosystem. |
| Primary DB | **PostgreSQL** | Relational integrity for brands, competitors, campaigns, approvals; JSONB for flexible taxonomy fields. |
| Vector DB | **pgvector** (start), migrate to **Pinecone/Weaviate** if scale demands | Needed for creative similarity, topic clustering, "emerging theme" detection. |
| Object storage | **S3-compatible** (AWS S3 / Cloudflare R2) | Ad creative images/video storage. |
| Queue/streaming | **Redis Streams** or **Kafka** | Hourly polling jobs, classification jobs, event bus between modules. |
| Job scheduling | **Temporal.io** or **Celery + Redis** | Hourly monitoring, retries, long-running creative generation workflows need durable orchestration, not cron. |
| Cache | **Redis** | Dashboard read paths, rate-limit tracking for external APIs. |
| LLM/AI | **Claude (Anthropic API)** for classification, reasoning, explanation generation; **image/video gen model** (e.g., a diffusion API) for creative generation, conditioned on brand assets | Matches "explainable" requirement — Claude's structured output + reasoning is well suited to WHY generation. |
| Search | **OpenSearch/Elasticsearch** (optional, phase 2) | Full-text search over ad copy at scale. |
| Infra | **AWS or GCP**, containerized via **Docker**, orchestrated via **ECS/Fargate** or **Kubernetes** (only once >1 service needs independent scaling) | Fargate is enough for MVP; avoid K8s until team/ops maturity justifies it. |
| Auth | **Clerk/Auth0** or custom JWT | Multi-tenant (brand/org) auth with role-based access (Brand Manager, Agency, Admin). |
| Observability | **OpenTelemetry + Grafana/Datadog** | Freshness/confidence metrics (§23) are themselves operational metrics worth monitoring. |

---

## 4. Core Data Model (entities)

```
Organization (tenant)
 └─ Brand
     ├─ BrandProfile        (industry, category, subcategory, geography, segment,
     │                        price positioning, guidelines, logo/colors/fonts)
     ├─ Competitor           (dynamic, can be AI-discovered; status: active/candidate)
     ├─ Channel               (meta, google, linkedin, youtube, tiktok...)
     └─ CampaignHistory       (own past campaigns + performance)

Ad (competitor creative)
 ├─ source_channel, source_id, first_seen, last_seen, duration_active
 ├─ media (image/video ref → object storage)
 ├─ raw_copy, raw_metadata
 └─ Classification (1:1)
      industry, category, subcategory, product, topic, subtopic,
      objective, format, visual_style, offer, cta, funnel_stage,
      landing_page, creative_variation_group_id

TopicMatrixSnapshot (materialized per brand per period)
 └─ cell: (topic × competitor) → ad_count, ad_ids[], delta_vs_prior

Signal (detected market event)
 ├─ type: SPIKE | NEW_ENTRANT | THEME_EMERGENCE | SEASONAL
 ├─ evidence: {ad_ids[], competitor_ids[], metric deltas, confidence}
 └─ detected_at

Recommendation
 ├─ status: KEEP | MODIFY | REPLACE (versioned — full history retained)
 ├─ what, why (evidence[] → Signal/Ad refs), how (format/CTA/channel/audience),
 │   target_kpis {ctr, cpc, cpa, roas, frequency_warning...}
 ├─ confidence_score
 └─ superseded_by / supersedes (self-reference, for KEEP/MODIFY/REPLACE lineage)

Creative (generated asset)
 ├─ recommendation_id (evidence chain)
 ├─ variant_group (A/B/C/D), version_history[]
 ├─ asset_ref, copy, cta, brand_asset_refs used
 └─ ApprovalRecord (approver, action, timestamp, edits_made)

Campaign (published)
 ├─ creative_id, channel, publish_config, scheduled_at
 ├─ ExpectedTargets (copied from Recommendation at publish time — immutable snapshot)
 └─ PerformanceSnapshot[] (time series: ctr, cpc, cpm, cpa, cvr, roas, frequency...)
      → AI Decision log: CONTINUE | ADJUST | PAUSE, with reasoning
```

Key design decision: **Recommendations and Creatives are versioned, not overwritten.** The KEEP/MODIFY/REPLACE model (§9) and "retain prior versions" requirement (§14) both demand append-only history with a `supersedes` pointer, not mutable rows.

---

## 5. Ingestion Layer (Ad Intelligence Pipeline)

Maps to spec §4.

- **Connectors**, one per source, isolated behind a common `AdSourceConnector` interface (`fetch(competitor, since) -> RawAd[]`):
  - Meta Ad Library API (public, no auth needed for basic queries — rate-limited)
  - Google Ads Transparency Center (scraping or API where available)
  - LinkedIn Ad Library
  - YouTube (via Data API + Ad Library where exposed)
  - TikTok Ad Library
  - Licensed third-party providers (e.g., Pathmatics, Sensor Tower) as pluggable connectors for markets/channels where public libraries are insufficient
- **Compliance-first**: only pull from public ad libraries / licensed APIs, respect rate limits and ToS — spec explicitly rejects "blindly download every ad." Build a per-source `PolicyConfig` (allowed query patterns, backoff, retention rules).
- **Scheduling**: Temporal workflow per (brand, competitor, channel) triggered hourly; workflow is idempotent (dedupe by source_id) and cheap to no-op when nothing changed.
- **Storage**: raw payload → S3 (immutable), metadata → Postgres `Ad` table, media transcoded/thumbnailed asynchronously.

---

## 6. Classification Engine

Maps to spec §5.

- Pipeline per new `Ad`: `download media → OCR/frame-extraction (video) → multimodal LLM classification call → structured JSON output → validation against brand taxonomy → persist`.
- Use a **fixed JSON schema** for classification output (industry, category, subcategory, product, topic, subtopic, objective, format, visual_style, copy_summary, offer, cta, funnel_stage) so downstream consumers never parse free text.
- **Dynamic taxonomy**: maintain a per-industry `TopicTaxonomy` table that the classifier can *extend* (propose new topic/subtopic) rather than being constrained to a fixed enum — satisfies "industry agnostic" + "continuously improve understanding of category" (§3, §7).
- Batch classification jobs run async off the ingestion queue; failures retry with backoff; low-confidence classifications flagged for periodic human/QA spot-check (protects recommendation quality).

---

## 7. Signal & Trend Engine (the "check hourly, change on evidence" logic)

This is the most architecturally distinctive piece of the spec (§9, §24) and deserves explicit design.

- Every hour, per brand/category, compute rolling aggregates: ad counts by topic/competitor over multiple windows (4h, 24h, 7d, 30d).
- Compare current window stats to a **baseline** (e.g., trailing 7-day mean/stddev per topic) → statistical spike detection (z-score or simple % delta threshold, tunable per category).
- A **Signal** is only emitted when a delta crosses a configured significance threshold — this is what prevents hourly noise from becoming hourly recommendation changes.
- Recommendation Engine consumes Signals, not raw ad counts. It re-evaluates existing active recommendations against new Signals and decides:
  - **KEEP** — no Signal materially affects current evidence.
  - **MODIFY** — Signal affects a sub-attribute (CTA/format/headline) but the core theme evidence is intact.
  - **REPLACE** — a new Signal's evidence strength now exceeds the current recommendation's by a meaningful margin.
- This decision itself should be an explainable, auditable step: store the *reason* the engine chose KEEP/MODIFY/REPLACE, not just the outcome.

---

## 8. Recommendation Engine

Maps to spec §8, §17, §18, §22.

- Inputs: Signals, TopicMatrixSnapshot, own CampaignHistory/PerformanceSnapshot, seasonal/festival calendar (configurable per geography/industry), brand product priorities (set at onboarding, editable).
- Scoring function combines: competitor evidence strength (count + trend), own-brand gap (how little the brand currently addresses this topic), historical performance of similar topics/formats for this brand, seasonality boost.
- Output includes mandatory fields: `what`, `why[]` (structured evidence references, not prose only — prose is generated from structured evidence via LLM), `how` (creative brief: format/CTA/channel/audience), `target_kpis`, `confidence`.
- **CTA and KPI recommendation are separate sub-steps** (§18 explicitly warns against conflating them): a `CTASelector` (maps objective/funnel-stage → CTA options with rationale) and a `KPITargetEstimator` (regresses target metrics from BrandHistory + Category + Channel + Objective).
- Confidence score is a function of: evidence volume, evidence recency, historical accuracy of similar past recommendations (feedback loop, §19).

---

## 9. Creative Generation Engine

Maps to spec §11, §12.

- Given an approved-for-generation `Recommendation`, produce 3–4 creative variants.
- Brand-conditioning: a `BrandKit` (logo, color palette, fonts, tone-of-voice guide, approved claims list, legal restrictions, past approved creatives as style reference) is injected into every generation call — both for copy (LLM) and visuals (image/video gen model, using brand assets/reference images as conditioning, not pure text-to-image).
- Each generated Creative stores `recommendation_id` so the evidence chain (Market Signal → Competitor Evidence → Recommendation → Creative) is queryable end-to-end (§12).
- Legal/compliance pass: run generated copy through a `ClaimsValidator` against the brand's restricted-claims list before it reaches the Approval Centre (important for pharma/IVF/financial services verticals explicitly named in §3).

---

## 10. Approval Centre & Human Gate

Maps to spec §13.

- Structural constraint: `Campaign.publish()` requires an `ApprovalRecord` with `action = APPROVED` referencing the exact `Creative.version` being published. No code path bypasses this.
- Supports partial approval (one per topic / multiple / all / none), edit-before-approve (creates a new Creative version), regenerate (new variant, same recommendation), reject (with reason, fed back into generation-quality tracking).

---

## 11. Publishing Layer

Maps to spec §20.

- Adapter pattern per destination (`PublisherAdapter`: Meta Marketing API, Google Ads API, LinkedIn Marketing API, YouTube, generic webhook for "other systems").
- MVP: manual export/scheduling assist (generate ready-to-upload creative + copy + suggested schedule) rather than live API publishing — reduces MVP scope and OAuth/permissions overhead (matches §25: "direct publishing... can follow once core intelligence proves valuable").
- Phase 2: real API publishing per channel, with campaign-object creation, budget/schedule config, and status sync back into the platform.

---

## 12. Performance Feedback Loop

Maps to spec §19.

- Poll each `PublisherAdapter`'s reporting API on a schedule (e.g., every few hours) to populate `PerformanceSnapshot`.
- Compare `Actual` vs `ExpectedTargets` snapshot; classify `AI Decision`: CONTINUE / ADJUST / PAUSE, with reasoning text generated from the same structured-evidence-then-LLM-explanation pattern used elsewhere.
- Feed outcomes back into: (a) Recommendation Engine's confidence calibration, (b) Creative Generation's style/format preference weighting per brand.

---

## 13. Frontend / UX Modules

Maps directly to spec §21–22. Five top-level routes, each backed by dedicated read-optimized API endpoints (likely materialized views, not live joins, given dashboard-heavy usage):

1. **Home** — attention feed: spend snapshot, key performance, top recommendations, new signals, pending approvals count.
2. **Live Market** — Topic × Competitor matrix (click-through to underlying ads), filter chain Industry→Category→Subcategory→Geography→Competitor→Channel→Period.
3. **Recommendations** — WHAT/WHY/HOW/TARGET/CONFIDENCE card list, with drill-down into evidence.
4. **Creative Studio** — grid of ideas × variants, approval actions.
5. **Campaigns** — performance table with metric tooltips (info-icon → definition + your value + benchmark + target, per §16 — this is a shared `MetricInfoPopover` component driven by a `MetricDefinition` config table, not hardcoded per page).

Every recommendation/signal card renders a shared `FreshnessBadge` (updated timestamp, confidence, #ads analyzed, #brands analyzed) sourced from the same evidence object used for the WHY explanation — one data model, multiple presentational surfaces.

---

## 14. Why a Modular Monolith (not microservices) to start

- The pipeline is inherently sequential and shares a lot of data (brand context, taxonomy, evidence objects) across stages — network calls between services would add latency and consistency headaches for little benefit at MVP scale.
- Structure the codebase in clearly bounded modules (`ingestion/`, `classification/`, `signals/`, `recommendations/`, `creative/`, `approval/`, `publishing/`, `performance/`) each with its own domain models and a narrow public interface — this is what makes a later service split cheap, without paying distributed-systems tax on day one.
- Split out first when scaling pressure is real: Classification (compute/GPU-heavy) and Creative Generation (also compute-heavy, bursty) are the two most likely first candidates for separate deployable services.

---

## 15. MVP Scope (mirrors spec §25 exactly)

Phase 1 (MVP):
1. Brand onboarding (BrandProfile + BrandKit capture)
2. Competitor identification (manual entry + AI-suggested candidates)
3. Competitor ad intelligence (Meta + Google connectors only, to start — highest data availability)
4. Topic classification (LLM-based, dynamic taxonomy)
5. Competitive Topic Matrix (UI + drill-down)
6. AI recommendations (WHAT/WHY/HOW/TARGET, KEEP/MODIFY/REPLACE)
7. WHY explanation (structured evidence + generated prose)
8. 3–4 creative options per recommendation (copy + static image; video generation can follow)
9. Human approval (Approval Centre, no live publishing yet — export-ready assets)
10. Performance dashboard (manual/CSV import of campaign metrics initially, before live API integration)

Explicitly deferred to Phase 2+: direct publishing APIs, TikTok/LinkedIn/YouTube connectors, video creative generation, dynamic creative optimization (§14), full moment-marketing automation (§10).

---

## 16. Key Risks & Open Decisions

- **Ad library data access**: Meta/Google/LinkedIn ad libraries have varying API stability, rate limits, and geographic coverage gaps — validate connector feasibility per target market before committing to hourly-refresh SLAs.
- **Cost**: hourly polling × many brands × many competitors × LLM classification per ad can get expensive fast — needs a per-brand budget/throttling model early, and caching/dedup on identical creatives reused across time windows.
- **Legal/compliance review** needed for scraping vs. licensed-API tradeoffs per source and per geography (especially pharma/financial services verticals named in the spec).
- **Decision needed from stakeholders**: target cloud provider, initial launch geography (affects which ad libraries matter first), and whether Phase 1 needs live publishing or export-only is acceptable — this materially changes MVP timeline.

---

## 17. Suggested Build Order (first 90 days)

1. Repo scaffold, auth, multi-tenant data model, brand onboarding flow.
2. Meta + Google ad connectors → raw ad storage.
3. Classification pipeline (schema + LLM calls + taxonomy store).
4. Topic Matrix UI + drill-down (first tangible demo).
5. Signal engine (spike detection) + Recommendation engine v1 (rule/heuristic-scored, LLM-explained).
6. Creative generation v1 (copy + static image, brand-conditioned).
7. Approval Centre + export-ready publishing.
8. Manual performance import + basic feedback loop.
9. Iterate: confidence calibration, dynamic optimization, live publishing APIs.
