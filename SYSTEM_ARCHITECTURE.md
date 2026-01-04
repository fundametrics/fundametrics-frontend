# Fundametrics System Architecture

## Overview
Fundametrics is a read‑only, SEBI‑compliant fintech dashboard that displays historical financial data and market facts for Indian equities. It consists of a React/TypeScript frontend and a FastAPI backend serving processed JSON fixtures.

---

## Backend (FastAPI)

### Stack
- **Framework**: FastAPI with Uvicorn
- **Data store**: Local JSON files under `data/processed/<symbol>/`
- **Repository pattern**: `DataRepository` abstracts file reads/writes
- **Read‑only enforcement**: Middleware blocks mutating verbs (POST/PUT/DELETE/PATCH)

### Core Endpoints
| Path | Method | Purpose | Response |
|------|--------|---------|----------|
| `/stocks` | GET | List all processed symbols | `{count, symbols[]}` |
| `/stocks/{symbol}` | GET | Company fundamentals + metadata | `CompanyResponse` |
| `/stocks/{symbol}/market` | GET | Delayed market facts | `MarketFacts` |
| `/search` | GET | Symbol search with optional query | `{query, results[], disclaimer}` |
| `/coverage` | GET | Coverage summary per symbol | `CoverageIndexResponse` |

### Data Flow
1. **Pipeline (external)**: Ingests filings, computes metrics, writes JSON files.
2. **API layer**: Reads latest JSON per symbol via `DataRepository.get_latest(symbol)`.
3. **Response shaping**: API returns normalized structures (`CompanyResponse`, `MarketFacts`, etc.) with SEBI‑safe language, no forward‑looking statements, and disclaimers.

### Compliance Features
- All responses are informational; no advisory or ranking language.
- Market data is marked “Delayed / Unavailable” when missing.
- Coverage and warnings are factual, not qualitative.

---

## Frontend (React + TypeScript + Vite)

### Stack
- **Framework**: React 18 with TypeScript
- **Routing**: React Router v6 (lazy‑loaded pages)
- **Styling**: Tailwind CSS with custom design tokens
- **State**: Local component state; async data fetching via `api.ts`
- **Build**: Vite dev server; production build via `npm run build`

### Key Pages
| Path | Component | Responsibility |
|------|------------|----------------|
| `/` | `LandingPage` | Hero and navigation into Stocks |
| `/stocks` | `StocksPage` | Catalogue of processed symbols (fetches `/stocks`, then hydrates via `/stocks/{symbol}`) |
| `/stocks/:symbol` | `CompanyPage` | Tabbed view: Overview, Financials, Ownership, Market, Documents |
| `/coverage` | `CoveragePage` | Per‑symbol data coverage summary |
| `/about` | `AboutPage` | About Fundametrics |
| `/disclaimer` | `DisclaimerPage` | Legal disclaimer |
| `/*` | `NotFoundPage` | 404 handling |

### Data Fetching Logic
- **API client**: `src/utils/api.ts` wraps `fetch` with typed responses.
- **Fallback rules**:
  - Use live data if API responds (status 2xx).
  - Show placeholders for missing fields (e.g., “Delayed / Unavailable”).
  - Fall back to mock data **only** when:
    - API unreachable (network/5xx) **or**
    - `VITE_PREVIEW_MODE=true` is set.
- **Preview mode**: Intentionally displays illustrative mock companies with a banner.

### Component Architecture
- **Layout**: `Layout` wraps pages with `Navbar` and `Footer`.
- **Search**: `GlobalSearch` integrated in `Navbar`; debounced backend calls to `/search`.
- **Company sections**:
  - `CompanyHeader`: Symbol, name, sector, coverage badge, freshness.
  - `OverviewSection`: Key metrics, confidence meter, AI summary toggle.
  - `FinancialsSection`: Revenue/profit snapshot + ratios table.
  - `OwnershipSection`: Shareholding summary and insights.
  - `MarketSection`: Delayed market facts with disclaimers.
  - `DocumentsSection`: Placeholder for future document uploads.
- **Common**: `MetricCard`, `CoverageBadge`, `WarningBanner`, `ConfidenceMeter`, `TabNav`.

### SEBI Safeguards in UI
- No forward‑looking statements; all language is historical/descriptive.
- Market data explicitly labeled “Delayed / Unavailable” when absent.
- Coverage badges and warnings are factual and neutral.
- Disclaimers on AI summaries and market data.

---

## End‑to‑End Flow

1. **User opens `/stocks`**:
   - Frontend fetches `/stocks` → list of symbols.
   - For each symbol, frontend calls `/stocks/{symbol}` to get name/sector.
   - Renders table; search filters locally.

2. **User navigates to `/stocks/RELIANCE`**:
   - Frontend calls `/stocks/RELIANCE` and `/stocks/RELIANCE/market`.
   - Renders tabs:
     - Overview: metrics from `financials.latest` and `ratios`.
     - Financials: detailed statements and ratios.
     - Ownership: shareholding block (if available).
     - Market: delayed price/market‑cap/52‑week/shares.
   - If any block is missing, shows neutral placeholders and warnings.

3. **User searches**:
   - Typing in `GlobalSearch` debounces and calls `/search?q=…`.
   - Results are neutral, ranked alphabetically, with disclaimer.

4. **Preview mode** (`VITE_PREVIEW_MODE=true`):
   - Frontend skips API calls and renders a curated set of mock companies with a preview banner.

---

## Deployment Notes

### Environment Variables
- `VITE_API_BASE_URL`: Backend base URL (default `http://localhost:8000`).
- `VITE_PREVIEW_MODE`: Set to `"true"` to enable mock preview.

### Production Build
- `npm run build` outputs to `dist/`.
- Serve static files; API can be hosted separately (e.g., Railway/Render for FastAPI, Vercel/Netlify for frontend).

### Security
- Backend is read‑only; no mutating routes.
- Frontend does not expose secrets; API base URL is configurable at build time.

---

## Extensibility

- Adding a new symbol: Drop a processed JSON under `data/processed/<symbol>/latest.json`.
- Adding new UI sections: Create component in `src/components/` and lazy‑load in `CompanyPage`.
- Adding new API endpoints: Extend `scraper/api/routes.py` and update types in `src/types.ts`.

---

## Summary

Fundametrics provides a clean, compliant way to explore historical company fundamentals and delayed market data. The backend serves read‑only, pre‑processed JSON fixtures; the frontend consumes them with strict fallback rules, always prioritizing live data over mocks, and renders everything with SEBI‑safe, non‑advisory language.
