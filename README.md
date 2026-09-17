# AI Marketing Intelligence & Execution Platform

An AI-powered marketing intelligence and execution platform for mid-sized brands — competitive
ad intelligence, AI recommendations, creative generation, human approval, and performance
tracking in one flow.

- [problem_statement.md](problem_statement.md) — the original product spec
- [TECHNICAL_PLAN.md](TECHNICAL_PLAN.md) — architecture, data model, tech stack, MVP roadmap
- [web/](web/) — first-draft frontend (currently mock data only, no backend yet)

## Repo layout

```
.
├── problem_statement.md   Product spec
├── TECHNICAL_PLAN.md      Architecture & implementation plan
└── web/                   Frontend (React + Vite + TypeScript + Tailwind)
```

## Prerequisites

- **Node.js 20+** and **npm 10+** (check with `node -v` / `npm -v`)
- **Git**

## Run it locally

```bash
git clone https://github.com/m-kharwade/digital_marketing_tool.git
cd digital_marketing_tool/web
npm install
npm run dev
```

Then open the URL Vite prints (default [http://localhost:5173](http://localhost:5173)).

If you already have this repo cloned, just run the `web` steps:

```bash
cd web
npm install
npm run dev
```

### Other commands (inside `web/`)

| Command | What it does |
|---|---|
| `npm run dev` | Start the dev server with hot reload |
| `npm run build` | Type-check and build a production bundle |
| `npm run preview` | Preview the production build locally |
| `npx tsc --noEmit` | Type-check only, no build output |

## Current state

The frontend renders all five core screens from the spec (Home, Live Market,
Recommendations, Creative Studio, Campaigns) against **static mock data** in
[`web/src/data/mockData.ts`](web/src/data/mockData.ts) — there is no backend, database, or
API yet. See [TECHNICAL_PLAN.md](TECHNICAL_PLAN.md) §15–17 for the MVP scope and build order
for the next phase (ad ingestion, classification, recommendation engine, etc.).
