import { useState, useCallback } from "react";
import { motion, useMotionValue, animate } from "framer-motion";
import CalendarCard from "./CalendarCard";

const months = [
  { name: "January", short: "Jan", num: 0 },
  { name: "February", short: "Feb", num: 1 },
  { name: "March", short: "Mar", num: 2 },
  { name: "April", short: "Apr", num: 3 },
  { name: "May", short: "May", num: 4 },
  { name: "June", short: "Jun", num: 5 },
  { name: "July", short: "Jul", num: 6 },
  { name: "August", short: "Aug", num: 7 },
  { name: "September", short: "Sep", num: 8 },
  { name: "October", short: "Oct", num: 9 },
  { name: "November", short: "Nov", num: 10 },
  { name: "December", short: "Dec", num: 11 }
];

export default function CalendarCarousel() {
  const [active, setActive] = useState(new Date().getMonth());
  const dragX = useMotionValue(0);

  const handleDragEnd = useCallback((_, info) => {
    if (info.offset.x < -60 && active < 11) {
      setActive((p) => p + 1);
    } else if (info.offset.x > 60 && active > 0) {
      setActive((p) => p - 1);
    }

    animate(dragX, 0, {
      type: "spring",
      stiffness: 400,
      damping: 30,
    });
  }, [active, dragX]);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse 140% 100% at 50% 50%, #1c2d3f 0%, #0a1520 100%)",
        fontFamily: "Georgia, serif",
      }}
    >
      {/* HEADER */}
      <div className="text-center mb-10">
        <p
          style={{
            color: "#2b8fe8",
            fontSize: 11,
            letterSpacing: "0.3em",
            fontWeight: 700,
          }}
        >
          MOUNTAIN CALENDAR
        </p>

        <h1
          className="text-white font-black mt-1"
          style={{ fontSize: 32, letterSpacing: "0.04em" }}
        >
          2026
        </h1>
      </div>

      {/* CARD STAGE */}
      <div
        className="relative"
        style={{ width: 420, height: 540, perspective: 1200 }}
      >
        {months.map((m, i) => {
          if (Math.abs(i - active) > 2) return null; 

          return (
            <CalendarCard
              key={i}
              month={m}
              index={i}
              position={i - active}
              dragX={dragX}
              onDragEnd={handleDragEnd}
            />
          );
        })}
      </div>

      {/* MONTH PILLS (EXACT) */}
      <div className="flex flex-wrap justify-center gap-1.5 mt-10 max-w-md px-4">
        {months.map((m, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className="rounded-full px-3 py-1 text-xs font-bold tracking-wider transition-all duration-200"
            style={{
              background: i === active ? "#2b8fe8" : "rgba(255,255,255,0.08)",
              color: i === active ? "#fff" : "rgba(255,255,255,0.45)",
              border:
                i === active
                  ? "1.5px solid #2b8fe8"
                  : "1.5px solid rgba(255,255,255,0.1)",
              transform: i === active ? "scale(1.08)" : "scale(1)",
            }}
          >
            {m.short}
          </button>
        ))}
      </div>

      {/* ARROW NAV (ONLY ONE — CLEAN) */}
      <div className="flex items-center gap-6 mt-6">
        <button
          onClick={() => setActive((p) => Math.max(p - 1, 0))}
          disabled={active === 0}
          className="w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold transition-all"
          style={{
            border: "1.5px solid rgba(255,255,255,0.18)",
            color:
              active === 0
                ? "rgba(255,255,255,0.2)"
                : "rgba(255,255,255,0.7)",
          }}
        >
          ‹
        </button>

        <span className="text-white/40 text-sm tracking-widest">
          {String(active + 1).padStart(2, "0")} / 12
        </span>

        <button
          onClick={() => setActive((p) => Math.min(p + 1, 11))}
          disabled={active === 11}
          className="w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold transition-all"
          style={{
            border: "1.5px solid rgba(255,255,255,0.18)",
            color:
              active === 11
                ? "rgba(255,255,255,0.2)"
                : "rgba(255,255,255,0.7)",
          }}
        >
          ›
        </button>
      </div>
    </div>
  );
}