import { useState } from "react";
import { motion, useMotionValue, animate } from "framer-motion";
import CalendarCard from "./CalendarCard";

const months = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December"
];

export default function CalendarCarousel() {
  const [active, setActive] = useState(0);
  const dragX = useMotionValue(0);

  const handleDragEnd = (_, info) => {
    const threshold = 60;

    if (info.offset.x < -threshold && active < 11) {
      setActive(p => p + 1);
    } else if (info.offset.x > threshold && active > 0) {
      setActive(p => p - 1);
    }

    animate(dragX, 0, { type: "spring", stiffness: 400, damping: 30 });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0b1d2a] overflow-hidden">

      <div
        className="relative"
        style={{ width: 320, height: 520, perspective: 1000 }}
      >
        {months.map((m, i) => (
          <CalendarCard
            key={i}
            month={m}
            index={i}
            position={i - active}
            dragX={dragX}
            onDragEnd={handleDragEnd}
          />
        ))}
      </div>

      {/* dots */}
      <div className="absolute bottom-10 flex gap-2">
        {months.map((_, i) => (
          <div
            key={i}
            className="h-2 rounded-full"
            style={{
              width: i === active ? 20 : 8,
              background: i === active ? "#22c55e" : "#ffffff33"
            }}
          />
        ))}
      </div>
    </div>
  );
}