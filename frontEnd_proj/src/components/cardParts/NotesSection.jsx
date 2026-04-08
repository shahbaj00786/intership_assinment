import { useState, useEffect, useRef, memo } from "react";

const MAX_CHARS = 280;

function NotesSection({ monthKey, notes, onSave }) {
  const [text,    setText]    = useState(notes || "");
  const [saved,   setSaved]   = useState(false);
  const [focused, setFocused] = useState(false);
  const timerRef = useRef(null);

  // sync text when switching months
  useEffect(() => {
    setText(notes || "");
    setSaved(false);
  }, [monthKey]); // intentionally only re-sync on month change

  function handleChange(e) {
    const val = e.target.value;
    if (val.length > MAX_CHARS) return;
    setText(val);
    setSaved(false);

    // debounced autosave
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      onSave(val);
      setSaved(true);
    }, 700);
  }

  function handleClear() {
    setText("");
    setSaved(false);
    clearTimeout(timerRef.current);
    onSave("");
  }

  const remaining = MAX_CHARS - text.length;
  const lowChars  = remaining <= 40;

  return (
    <div style={{ marginBottom: 14 }}>

      {/* ── label row ── */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
        <p
          style={{
            margin:        0,
            color:         "rgba(255,255,255,0.38)",
            fontSize:      9,
            letterSpacing: "0.22em",
            fontWeight:    700,
          }}
        >
          NOTES
        </p>

        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {/* saved badge */}
          {saved && !focused && (
            <span style={{ color: "#4ade80", fontSize: 9, letterSpacing: "0.1em" }}>
              ✓ SAVED
            </span>
          )}

          {/* char counter — only show when focused or low */}
          {(focused || lowChars) && (
            <span
              style={{
                fontSize: 9,
                color:    lowChars ? "#f87171" : "rgba(255,255,255,0.28)",
                transition: "color 0.2s",
              }}
            >
              {remaining}
            </span>
          )}

          {/* clear button — only if there's text */}
          {text.length > 0 && (
            <button
              onClick={handleClear}
              style={{
                background:  "transparent",
                border:      "none",
                color:       "rgba(255,255,255,0.28)",
                cursor:      "pointer",
                fontSize:    10,
                padding:     "0 2px",
                lineHeight:  1,
              }}
              title="Clear notes"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* ── textarea ── */}
      <textarea
        value={text}
        onChange={handleChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder="Jot down plans, reminders…"
        rows={3}
        style={{
          width:       "100%",
          boxSizing:   "border-box",
          background:  focused
            ? "rgba(43,143,232,0.08)"
            : "rgba(255,255,255,0.04)",
          border:      `1px solid ${focused ? "rgba(43,143,232,0.55)" : "rgba(255,255,255,0.1)"}`,
          borderRadius: 10,
          color:       "rgba(255,255,255,0.82)",
          fontSize:    11,
          lineHeight:  1.65,
          padding:     "8px 10px",
          resize:      "none",
          outline:     "none",
          fontFamily:  "inherit",
          transition:  "border-color 0.2s, background 0.2s",
          // prevent drag propagation to card swipe
          touchAction: "auto",
        }}
        // stop pointer events from reaching the drag handler on the card stage
        onMouseDown={(e) => e.stopPropagation()}
        onTouchStart={(e) => e.stopPropagation()}
      />

      {/* ── progress bar ── */}
      {text.length > 0 && (
        <div
          style={{
            marginTop:    4,
            height:       2,
            borderRadius: 2,
            background:   "rgba(255,255,255,0.08)",
            overflow:     "hidden",
          }}
        >
          <div
            style={{
              height:     "100%",
              width:      `${(text.length / MAX_CHARS) * 100}%`,
              background: lowChars ? "#f87171" : "#2b8fe8",
              borderRadius: 2,
              transition: "width 0.15s ease, background 0.3s ease",
            }}
          />
        </div>
      )}
    </div>
  );
}

export default memo(NotesSection);