# Fundametrics Frontend

## Quick Start
```bash
npm install
npm run dev
```
Open http://localhost:5173.

## Environment
- `VITE_API_BASE_URL`: Backend API base (default `http://localhost:8000`)
- `VITE_PREVIEW_MODE`: Set to `"true"` to show mock preview banner.

## Build
```bash
npm run build
```
Outputs to `dist/`.

## Tech Stack
- React 18 + TypeScript
- React Router v6 (lazy pages)
- Tailwind CSS
- Vite

## Key Files
- `src/pages/`: Route components
- `src/components/`: Reusable UI
- `src/utils/api.ts`: Typed API client
- `src/types.ts`: Domain models
- `src/mocks/company.ts`: Fallback mock data (used only in preview or API failure)

## Notes
- Frontend always prefers live backend data.
- Mock fallback only on API unreachable or explicit preview mode.
- All language is SEBI‑compliant, non‑advisory.
