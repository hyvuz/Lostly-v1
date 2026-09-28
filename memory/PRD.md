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

## Screens (Phase 2 — 2026-06-28)
- `/` Splash (auto → Home, ~1.4s), `/home` landing hero + 2 CTAs, `/report` single-page sectioned form, `/board` Missing Items with grouped filters.
- Routing via react-router-dom; header hidden on splash. State + localStorage in `App.js` Shell.
- Report form: item-type cards, color/description, optional photo (resized data URL), location + "Not sure", when options incl. Choose Date/Time.
- Board: search + category/time/status filter groups; compact cards with photo/icon strip, subtle Found treatment.
- Verified by testing agent iteration_2: 100% frontend pass (12/12 areas).

## Implemented (2026-06-27)
- Lost Items Board: cards with icon, title, description, location, time, status badge, clue count.
- Search bar, category filters (All/Electronics/Personal Items/Bags/Other), status tabs.
- "I might know something" clue modal; clues appended under item.
- Toggle Still Missing / Found ✓ with distinct found styling.
- Seeded 5 realistic campus items; localStorage persistence.
- Verified by testing agent: 100% frontend pass (11/11 flows).

## Backlog / Remaining
