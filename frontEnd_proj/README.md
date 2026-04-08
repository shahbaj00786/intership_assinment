# Mountain Calendar 2026

A wall calendar component built with React. You can browse months, pick date ranges, and jot down notes — all without any backend.


## What I Built

The idea was to make something that feels like an actual wall calendar, not just a grid of numbers. Each month has a full mountain photo at the top, a notes area, and a date grid below. You swipe or click arrows to move between months, and the cards stack in 3D like a physical deck.

---

## Features

- **Carousel navigation** — swipe left/right on desktop and mobile, or use the arrow buttons, or click any month pill directly
- **Day range selector** — click a start date, then click an end date. Days in between highlight in blue. A live status bar at the top shows your selected range. Click "clear" to reset
- **Holiday markers** — small red dots appear under dates like Christmas, Halloween, Valentine's Day etc.
- **Today highlight** — today's date always gets a subtle border so you can spot it instantly
- **Notes per month** — each month has its own notes textarea. It autosaves as you type (debounced), shows a ✓ SAVED badge, a character counter near the limit, and a progress bar. Switching months saves your note and loads the right one back
- **Lazy image loading** — mountain photos load only when needed with a dark placeholder so there's no layout jump
- **Fully responsive** — works on mobile touch and desktop mouse with the same drag gesture

---

## Tech Choices

**React (Vite)** — Fast dev server, no config overhead. The whole project is plain JSX with no extra UI libraries.

**No Framer Motion for the carousel** — I removed it from the card animation. Instead the carousel uses raw pointer/touch events tracked with `useRef`, and pure CSS `transform + transition` for the 3D card movement. This means zero JavaScript runs per animation frame during a swipe — the browser handles it entirely on the compositor thread. The result is noticeably smoother especially on lower-end phones.

**`memo()` on every card part** — `CalendarCard`, `CalendarGrid`, `NotesSection`, `CardImage`, and `MonthHeader` are all wrapped in `React.memo`. Off-screen cards don't re-render when you drag the active one.

**State lives in CalendarCarousel** — All shared state (active month, range selection, notes) is in the top-level carousel and passed down. This keeps the child components simple and easy to reason about.

**localStorage for notes** — Notes persist across page refreshes. Each month's note is stored under its own key (`calendar-note-0` through `calendar-note-11`).

**No backend, no database** — Everything is client-side as required.

---

## File Structure

```
src/
├── App.jsx
└── components/
    ├── CalendarCarousel.jsx      # main layout, all shared state
    ├── CalendarCard.jsx          # single month card with 3D positioning
    └── cardParts/
        ├── MonthHeader.jsx       # year + month name
        ├── CardImage.jsx         # lazy hero photo with placeholder
        ├── CalendarGrid.jsx      # day grid, range highlights, holiday dots
        └── NotesSection.jsx      # textarea with autosave + progress bar
```

---

## How to Run Locally

You need Node.js 18 or above installed.

**1. Clone the repo**
```bash
git clone https://github.com/your-username/mountain-calendar.git
cd mountain-calendar
```

**2. Install dependencies**
```bash
npm install
```

**3. Start the dev server**
```bash
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173) in your browser.

**To build for production:**
```bash
npm run build
```

---

## Dependencies

| Package | Why |
|---|---|
| react + react-dom | UI framework |
| vite | Dev server and bundler |
| tailwindcss | Utility classes for layout and spacing |

That's it. No animation libraries, no date libraries, no component kits.

---

## Decisions I'd Change With More Time

- Add a month "flip" page-turn animation when navigating
- Let users pin notes to specific days, not just the whole month
- Add a subtle theme shift (warm vs cool palette) based on the month's photo colors
- Export selected date range to clipboard or calendar app

---

## Notes on the Images

Photos are from [Unsplash](https://unsplash.com) (free to use). They're loaded with `?w=800&q=70` query params to keep file sizes reasonable without sacrificing quality.