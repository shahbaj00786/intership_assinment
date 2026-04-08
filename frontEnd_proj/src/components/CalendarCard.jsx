import { memo } from "react";
import MonthHeader from "./cardParts/MonthHeader";
import NotesSection from "./cardParts/NotesSection";
import CalendarGrid from "./cardParts/CalendarGrid";
import CardImage from "./cardParts/CardImage";

const IMAGES = [
  "https://images.unsplash.com/photo-1522163182402-834f871fd851?w=800&q=70",
  "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=70",
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800&q=70",
  "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=800&q=70",
  "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=800&q=70",
  "https://images.unsplash.com/photo-1520208422220-d12a3c588e6c?w=800&q=70",
  "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&q=70",
  "https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?w=800&q=70",
  "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=800&q=70",
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=70",
  "https://images.unsplash.com/photo-1491555103944-7c647fd857e6?w=800&q=70",
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=70",
];

function CalendarCard({
  month,
  index,
  position,
  dragOffset,
  rangeStart,
  rangeEnd,
  selecting,
  notes,
  onDayClick,
  onDayHover,
  onSaveNotes,
}) {
  const isCenter = position === 0;
  const isHidden = Math.abs(position) > 1;

  const baseX = position * 105; // % offset per slot
  const extraPx = isCenter ? dragOffset : 0;
  const scale = isCenter ? 1 : 0.82;
  const opacity = isHidden ? 0 : isCenter ? 1 : 0.6;
  const rotY = position === -1 ? 12 : position === 1 ? -12 : 0;
  const blur = isCenter ? 0 : 3;
  const zIndex = isCenter ? 30 : 10;

  const isDragging = isCenter && dragOffset !== 0;

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: "50%",
        width: 320,
        transform: `translateX(calc(-50% + ${baseX}% + ${extraPx}px)) scale(${scale}) rotateY(${rotY}deg)`,
        opacity,
        zIndex,
        filter: blur ? `blur(${blur}px)` : "none",
        transition: isDragging
          ? "opacity 0.3s ease, filter 0.3s ease"
          : "transform 0.38s cubic-bezier(0.34,1.4,0.64,1), opacity 0.3s ease, filter 0.3s ease",
        willChange: "transform, opacity",
        pointerEvents: isCenter ? "auto" : "none",
        userSelect: "none",
      }}
    >
      <div
        style={{
          borderRadius: 24,
          overflow: "hidden",
          background: "linear-gradient(160deg, #12202f 0%, #0c1c2c 100%)",
          boxShadow: isCenter
            ? "0 40px 80px rgba(0,0,0,0.65), 0 0 0 1px rgba(255,255,255,0.06)"
            : "0 16px 36px rgba(0,0,0,0.4)",
        }}
      >
        <CardImage image={IMAGES[index]} />

        <div style={{ padding: "16px 20px 20px" }}>
          <MonthHeader month={month} />

          <NotesSection monthKey={index} notes={notes} onSave={onSaveNotes} />

          <CalendarGrid
            monthIndex={index}
            rangeStart={rangeStart}
            rangeEnd={rangeEnd}
            selecting={selecting}
            onDayClick={onDayClick}
            onDayHover={onDayHover}
          />

          <button
            style={{
              width: "100%",
              padding: "10px 0",
              borderRadius: 12,
              fontWeight: 700,
              fontSize: 12,
              color: "rgba(255,255,255,0.75)",
              border: "1px solid rgba(255,255,255,0.18)",
              background: "rgba(255,255,255,0.07)",
              cursor: "pointer",
              letterSpacing: "0.08em",
              marginTop: 4,
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = "rgba(255,255,255,0.13)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = "rgba(255,255,255,0.07)")
            }
          >
            VIEW MONTH
          </button>
        </div>
      </div>
    </div>
  );
}

export default memo(CalendarCard);
