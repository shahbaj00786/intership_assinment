import { useState, useCallback, useRef } from "react";
import CalendarCard from "./CalendarCard";

const MONTHS = [
  { name: "January",   short: "Jan", num: 0  },
  { name: "February",  short: "Feb", num: 1  },
  { name: "March",     short: "Mar", num: 2  },
  { name: "April",     short: "Apr", num: 3  },
  { name: "May",       short: "May", num: 4  },
  { name: "June",      short: "Jun", num: 5  },
  { name: "July",      short: "Jul", num: 6  },
  { name: "August",    short: "Aug", num: 7  },
  { name: "September", short: "Sep", num: 8  },
  { name: "October",   short: "Oct", num: 9  },
  { name: "November",  short: "Nov", num: 10 },
  { name: "December",  short: "Dec", num: 11 },
];

export default function CalendarCarousel() {
  const [active, setActive]         = useState(new Date().getMonth());
  const [rangeStart, setRangeStart] = useState(null); // "YYYY-MM-DD"
  const [rangeEnd, setRangeEnd]     = useState(null);
  const [selecting, setSelecting]   = useState(false); // waiting for end pick
  const [hoverKey, setHoverKey]     = useState(null);
  const [notes, setNotes]           = useState({});    // { monthIndex: string }

  // ── drag state (no framer-motion dependency on every render) ──────────────
  const dragStartX  = useRef(null);
  const dragCurrentX = useRef(0);
  const [dragOffset, setDragOffset] = useState(0);

  const handlePointerDown = useCallback((e) => {
    dragStartX.current = e.clientX ?? e.touches?.[0]?.clientX;
    dragCurrentX.current = 0;
  }, []);

  const handlePointerMove = useCallback((e) => {
    if (dragStartX.current === null) return;
    const x = (e.clientX ?? e.touches?.[0]?.clientX) - dragStartX.current;
    dragCurrentX.current = x;
    setDragOffset(x);
  }, []);

  const handlePointerUp = useCallback(() => {
    if (dragStartX.current === null) return;
    const offset = dragCurrentX.current;
    if (offset < -60 && active < 11) setActive((p) => p + 1);
    if (offset >  60 && active >  0) setActive((p) => p - 1);
    dragStartX.current = null;
    dragCurrentX.current = 0;
    setDragOffset(0);
  }, [active]);

  // ── day range selection ───────────────────────────────────────────────────
  const handleDayClick = useCallback((key) => {
    if (!selecting) {
      setRangeStart(key);
      setRangeEnd(null);
      setSelecting(true);
    } else {
      // ensure start <= end
      const startMs = new Date(rangeStart).getTime();
      const endMs   = new Date(key).getTime();
      if (endMs < startMs) {
        setRangeStart(key);
        setRangeEnd(rangeStart);
      } else {
        setRangeEnd(key);
      }
      setSelecting(false);
      setHoverKey(null);
    }
  }, [selecting, rangeStart]);

  const handleDayHover = useCallback((key) => {
    if (selecting) setHoverKey(key);
  }, [selecting]);

  const handleSaveNotes = useCallback((monthIdx, text) => {
    setNotes((prev) => ({ ...prev, [monthIdx]: text }));
  }, []);

  const handleClearRange = useCallback(() => {
    setRangeStart(null);
    setRangeEnd(null);
    setSelecting(false);
    setHoverKey(null);
  }, []);

  // derived live end while user is hovering
  const liveEnd = selecting ? hoverKey : rangeEnd;

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{
        background: "radial-gradient(ellipse 140% 100% at 50% 50%, #1c2d3f 0%, #0a1520 100%)",
        fontFamily: "Georgia, serif",
        touchAction: "pan-y",
      }}
    >
      {/* ── HEADER ── */}
      <div className="text-center mb-10 select-none">
        <p style={{ color: "#2b8fe8", fontSize: 11, letterSpacing: "0.3em", fontWeight: 700 }}>
          MOUNTAIN CALENDAR
        </p>
        <h1 className="text-white font-black mt-1" style={{ fontSize: 32, letterSpacing: "0.04em" }}>
          2026
        </h1>
        {(rangeStart || selecting) && (
          <div style={{ marginTop: 6, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
            <span style={{ color: "rgba(255,255,255,0.55)", fontSize: 11 }}>
              {selecting
                ? `Start: ${rangeStart} — pick end date`
                : `${rangeStart}  →  ${liveEnd}`}
            </span>
            <button
              onClick={handleClearRange}
              style={{
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.15)",
                color: "rgba(255,255,255,0.5)",
                borderRadius: 20, padding: "1px 8px", fontSize: 10,
                cursor: "pointer",
              }}
            >
              ✕ clear
            </button>
          </div>
        )}
      </div>

      {/* ── CARD STAGE ── */}
      <div
        className="relative"
        style={{ width: 340, height: 620, perspective: 1200, touchAction: "none" }}
        onMouseDown={handlePointerDown}
        onMouseMove={handlePointerMove}
        onMouseUp={handlePointerUp}
        onMouseLeave={handlePointerUp}
        onTouchStart={(e) => handlePointerDown(e.touches[0])}
        onTouchMove={(e) => handlePointerMove(e.touches[0])}
        onTouchEnd={handlePointerUp}
      >
        {MONTHS.map((m, i) => {
          const pos = i - active;
          if (Math.abs(pos) > 2) return null;
          return (
            <CalendarCard
              key={i}
              month={m}
              index={i}
              position={pos}
              dragOffset={pos === 0 ? dragOffset : 0}
              rangeStart={rangeStart}
              rangeEnd={liveEnd}
              selecting={selecting}
              notes={notes[i] || ""}
              onDayClick={handleDayClick}
              onDayHover={handleDayHover}
              onSaveNotes={(text) => handleSaveNotes(i, text)}
            />
          );
        })}
      </div>

      {/* ── MONTH PILLS ── */}
      <div className="flex flex-wrap justify-center gap-1.5 mt-10 max-w-md px-4 select-none">
        {MONTHS.map((m, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            style={{
              borderRadius: 999,
              padding: "3px 12px",
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.08em",
              cursor: "pointer",
              transition: "all 0.18s",
              background: i === active ? "#2b8fe8" : "rgba(255,255,255,0.07)",
              color:       i === active ? "#fff"    : "rgba(255,255,255,0.4)",
              border:      i === active ? "1.5px solid #2b8fe8" : "1.5px solid rgba(255,255,255,0.1)",
              transform:   i === active ? "scale(1.08)" : "scale(1)",
            }}
          >
            {m.short}
          </button>
        ))}
      </div>

      {/* ── ARROW NAV ── */}
      <div className="flex items-center gap-6 mt-6 select-none">
        <button
          onClick={() => setActive((p) => Math.max(p - 1, 0))}
          disabled={active === 0}
          style={{
            width: 40, height: 40, borderRadius: "50%",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 20, fontWeight: 700, cursor: active === 0 ? "default" : "pointer",
            border: "1.5px solid rgba(255,255,255,0.18)",
            color: active === 0 ? "rgba(255,255,255,0.18)" : "rgba(255,255,255,0.7)",
            background: "transparent",
            transition: "color 0.2s",
          }}
        >
          ‹
        </button>

        <span style={{ color: "rgba(255,255,255,0.35)", fontSize: 12, letterSpacing: "0.2em" }}>
          {String(active + 1).padStart(2, "0")} / 12
        </span>

        <button
          onClick={() => setActive((p) => Math.min(p + 1, 11))}
          disabled={active === 11}
          style={{
            width: 40, height: 40, borderRadius: "50%",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 20, fontWeight: 700, cursor: active === 11 ? "default" : "pointer",
            border: "1.5px solid rgba(255,255,255,0.18)",
            color: active === 11 ? "rgba(255,255,255,0.18)" : "rgba(255,255,255,0.7)",
            background: "transparent",
            transition: "color 0.2s",
          }}
        >
          ›
        </button>
      </div>
    </div>
  );
}