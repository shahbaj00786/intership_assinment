import { useMemo, memo } from "react";

const YEAR = 2026;
const DAY_LABELS = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

const HOLIDAYS = {
  0: { 1: "New Year's Day" },
  1: { 14: "Valentine's Day" },
  3: { 1: "April Fools' Day" },
  4: { 11: "Mother's Day" },
  5: { 21: "Father's Day" },
  9: { 31: "Halloween" },
  10: { 11: "Veterans Day", 27: "Thanksgiving" },
  11: { 25: "Christmas Day", 31: "New Year's Eve" },
};

function buildGrid(monthIdx) {
  let firstDow = new Date(YEAR, monthIdx, 1).getDay(); // 0=Sun
  firstDow = (firstDow + 6) % 7; // shift → Mon=0
  const totalDays = new Date(YEAR, monthIdx + 1, 0).getDate();
  const cells = [];
  for (let i = 0; i < firstDow; i++) cells.push(null);
  for (let d = 1; d <= totalDays; d++) cells.push(d);
  return cells;
}

function toKey(monthIdx, day) {
  return `${YEAR}-${String(monthIdx + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function toMs(key) {
  return new Date(key).getTime();
}

function isInRange(key, start, end) {
  if (!start || !end) return false;
  const t = toMs(key);
  const s = toMs(start);
  const e = toMs(end);
  return t >= Math.min(s, e) && t <= Math.max(s, e);
}

function CalendarGrid({
  monthIndex,
  rangeStart,
  rangeEnd,
  selecting,
  onDayClick,
  onDayHover,
}) {
  const grid = useMemo(() => buildGrid(monthIndex), [monthIndex]);
  const holidays = HOLIDAYS[monthIndex] || {};

  const today = new Date();
  const todayDay =
    today.getFullYear() === YEAR && today.getMonth() === monthIndex
      ? today.getDate()
      : null;

  return (
    <div style={{ marginBottom: 10 }}>
      {/* ── weekday header ── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          textAlign: "center",
          marginBottom: 4,
        }}
      >
        {DAY_LABELS.map((d) => (
          <span
            key={d}
            style={{
              fontSize: 9,
              color: "rgba(255,255,255,0.28)",
              fontWeight: 700,
              letterSpacing: "0.06em",
            }}
          >
            {d}
          </span>
        ))}
      </div>

      {/* ── day cells ── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          gap: "2px 0",
        }}
      >
        {grid.map((day, i) => {
          if (!day) return <span key={`empty-${i}`} />;

          const key = toKey(monthIndex, day);
          const isStart = key === rangeStart;
          const isEnd = key === rangeEnd;
          const inRng =
            !isStart && !isEnd && isInRange(key, rangeStart, rangeEnd);
          const isHol = !!holidays[day];
          const isToday = day === todayDay;

          // ── style logic ──
          let bg = "transparent";
          let color = "rgba(255,255,255,0.7)";
          let fw = 400;
          let border = "none";
          let radius = 6;

          if (isStart || isEnd) {
            bg = "#2b8fe8";
            color = "#fff";
            fw = 700;
            radius = 7;
          } else if (inRng) {
            bg = "rgba(43,143,232,0.18)";
            color = "#93c5fd";
          } else if (isToday) {
            border = "1px solid rgba(255,255,255,0.35)";
            color = "#fff";
            fw = 700;
          }

          return (
            <button
              key={key}
              onClick={() => onDayClick(key)}
              onMouseEnter={() => selecting && onDayHover(key)}
              title={isHol ? holidays[day] : undefined}
              style={{
                background: bg,
                color,
                fontWeight: fw,
                border,
                borderRadius: radius,
                fontSize: 11,
                padding: "4px 0",
                cursor: "pointer",
                position: "relative",
                textAlign: "center",
                outline: "none",
                transition: "background 0.1s, color 0.1s",
                // don't accidentally trigger the card drag
                touchAction: "none",
              }}
              onMouseDown={(e) => e.stopPropagation()}
            >
              {day}
              {isHol && (
                <span
                  style={{
                    position: "absolute",
                    bottom: 1,
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: 3,
                    height: 3,
                    borderRadius: "50%",
                    background: isStart || isEnd ? "#fff" : "#f87171",
                    display: "block",
                  }}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default memo(CalendarGrid);
