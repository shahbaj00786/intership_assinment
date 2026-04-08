import { memo } from "react";

function MonthHeader({ month }) {
  return (
    <>
      <p
        style={{
          color: "rgba(255,255,255,0.3)",
          fontSize: 9,
          letterSpacing: "0.3em",
          fontWeight: 700,
          margin: "0 0 3px",
        }}
      >
        2026
      </p>
      <h2
        style={{
          color: "#fff",
          fontSize: 22,
          fontWeight: 900,
          margin: "0 0 14px",
          letterSpacing: "0.05em",
        }}
      >
        {month.name.toUpperCase()}
      </h2>
    </>
  );
}

export default memo(MonthHeader);
