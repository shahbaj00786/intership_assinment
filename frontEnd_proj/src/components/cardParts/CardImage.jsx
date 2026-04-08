import { useState, memo } from "react";

function CardImage({ image }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div style={{ position: "relative", height: 170, overflow: "hidden", flexShrink: 0 }}>
      {/* placeholder shown until image loads */}
      <div
        style={{
          position:   "absolute",
          inset:      0,
          background: "linear-gradient(135deg, #0d2137 0%, #1a3a55 100%)",
          opacity:    loaded ? 0 : 1,
          transition: "opacity 0.5s ease",
        }}
      />

      <img
        src={image}
        alt=""
        draggable={false}
        loading="lazy"
        decoding="async"
        onLoad={() => setLoaded(true)}
        style={{
          width:      "100%",
          height:     "100%",
          objectFit:  "cover",
          display:    "block",
          opacity:    loaded ? 0.82 : 0,
          transition: "opacity 0.5s ease",
        }}
      />

      {/* gradient overlay for text legibility */}
      <div
        style={{
          position:   "absolute",
          inset:      0,
          background: "linear-gradient(to top, rgba(10,21,32,0.88) 0%, transparent 55%)",
          pointerEvents: "none",
        }}
      />

      <p
        style={{
          position:      "absolute",
          bottom:        10,
          left:          16,
          margin:        0,
          color:         "rgba(255,255,255,0.38)",
          fontSize:      9,
          letterSpacing: "0.22em",
          fontWeight:    700,
          pointerEvents: "none",
        }}
      >
        MOUNTAIN CALENDAR 2026
      </p>
    </div>
  );
}

export default memo(CardImage);