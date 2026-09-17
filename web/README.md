# Web — First Draft UI

React + TypeScript + Vite + Tailwind v4 + React Router. All data is mocked in
[`src/data/mockData.ts`](src/data/mockData.ts) — shapes mirror the entities described in
[`../TECHNICAL_PLAN.md`](../TECHNICAL_PLAN.md) so wiring up a real API later means swapping the
data source, not rewriting components.

## Run

```bash
npm install
npm run dev
```

## Screens (spec §21–22)

- `/` — Home: "Good morning, here's what changed" attention feed
- `/live-market` — Topic × Competitor matrix with ad drill-down
- `/recommendations` — WHAT / WHY / HOW / TARGET / CONFIDENCE cards
- `/creative-studio` — Ideas × variants grid with approve/edit/regenerate/reject
- `/campaigns` — Performance table with metric definitions on click (CTR, CPC, CPM, CPA, CVR, ROAS, Frequency)

## Not yet wired up

- No backend — everything is static mock data, approvals reset on refresh
- No auth / multi-tenant switching
- No real ad thumbnails (colored placeholders stand in for creative media)
