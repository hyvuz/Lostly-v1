# Lostly — Campus Lost & Found MVP

## Original Problem Statement
Build a simple, modern web MVP called **Lostly** for university students who lose personal items on campus. Help students quickly report a lost item and let other students help by sharing possible locations/clues. No auth, no accounts, no admin, no maps/AI. Conversational 4-step report flow -> Lost Items Board -> clue modal -> mark found/missing. Frontend-only, localStorage persistence, seeded sample data.

## Architecture
- **Frontend-only** React 19 + Vite + Tailwind v4 + shadcn/ui. NO backend / NO database.
- Data persisted in browser `localStorage` under key `lostly_items_v1` (seeded on first load).
- Visual style: "sketchy with doodles" — Caveat display font, hand-drawn SVG doodles, offset drop-shadow sketch cards, Campus Terracotta (#E05A36) accent on warm graph-paper background.

## Key Files
- `src/App.js` — state, localStorage load/save, view switch (report/board), handlers.
- `src/lib/lostly.js` — item types, category map, timeframes, seed data, storage + timeAgo helpers.
- `src/components/ReportFlow.jsx` — conversational 4-step flow with 1/4 progress.
- `src/components/ItemsBoard.jsx` — search, category filters, status tabs, grid, empty state.
- `src/components/ItemCard.jsx` — sketch card, status badge, clues, found toggle.
- `src/components/ClueModal.jsx` — "Where should they look?" clue dialog.
- `src/components/SearchFilterBar.jsx`, `Header.jsx`, `StatusBadge.jsx`, `Doodles.jsx`.

## User Personas
- Student who lost an item (reporter).
- Student who spotted an item (helper posting clues).

## Core Requirements (static)
Report lost item quickly → others browse board → someone posts a clue → item can be marked Found.

## Implemented (2026-06-27)
- 4-step conversational report flow with progress indicator, "Other" custom input, optional color/description, Yes/Not-sure location, timeframe + approx time, summary confirm.
- Lost Items Board: cards with icon, title, description, location, time, status badge, clue count.
- Search bar, category filters (All/Electronics/Personal Items/Bags/Other), status tabs.
- "I might know something" clue modal; clues appended under item.
- Toggle Still Missing / Found ✓ with distinct found styling.
- Seeded 5 realistic campus items; localStorage persistence.
- Verified by testing agent: 100% frontend pass (11/11 flows).

## Backlog / Remaining
- P1: Report count / analytics summary strip on board.
- P2: Sort options (newest/most clues), share-a-report link.
- P2: "Found by me" contact hint on found items.
