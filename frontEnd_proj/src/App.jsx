import { useState } from "react";
import { motion, useMotionValue, animate } from "framer-motion";

const months = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December"
];

const generateDays = (monthIndex, year = 2026) => {
  const firstDay = new Date(year, monthIndex, 1).getDay();
  const totalDays = new Date(year, monthIndex + 1, 0).getDate();

  const days = [];
  for (let i = 0; i < firstDay; i++) days.push("");
  for (let d = 1; d <= totalDays; d++) days.push(d);

  return days;
};

const images = [
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
  "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
  "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b",
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
  "https://images.unsplash.com/photo-1441974231531-c6227db76b6e",
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
  "https://images.unsplash.com/photo-1470770841072-f978cf4d019e",
  "https://images.unsplash.com/photo-1439066615861-d1af74d74000",
  "https://images.unsplash.com/photo-1469474968028-56623f02e42e",
  "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429",
  "https://images.unsplash.com/photo-1493244040629-496f6d136cc3",
  "https://images.unsplash.com/photo-1472214103451-9374bd1c798e"
];

/* ---------------- CARD ---------------- */

function CalendarCard({ month, index, position, dragX, onDragEnd }) {
  const isCenter = position === 0;
  const isLeft = position === -1;
  const isRight = position === 1;
  const isHidden = Math.abs(position) > 1;

  const x = isCenter ? 0 : isLeft ? "-55%" : isRight ? "55%" : position < -1 ? "-120%" : "120%";

  const days = generateDays(index);

  return (
    <motion.div
      drag={isCenter ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={onDragEnd}
      style={{ x: isCenter ? dragX : undefined }}
      animate={{
        translateX: x,
        scale: isCenter ? 1 : 0.85,
        opacity: isHidden ? 0 : isCenter ? 1 : 0.6,
        rotateY: isLeft ? 10 : isRight ? -10 : 0,
        zIndex: isCenter ? 30 : 10,
      }}
      transition={{ type: "spring", stiffness: 280, damping: 28 }}
      className="absolute top-0 left-1/2 -translate-x-1/2 w-[340px] sm:w-[380px]"
    >
      <div className="bg-white rounded-3xl overflow-hidden shadow-2xl">

        {/* TOP IMAGE SECTION */}
        <div className="relative h-40">
          <img
            src={`${images[index]}?w=800`}
            className="w-full h-full object-cover"
          />

          <div className="absolute bottom-0 right-0 bg-blue-500 text-white px-4 py-3 rounded-tl-2xl">
            <p className="text-xs opacity-80">2026</p>
            <h2 className="font-bold">{month.toUpperCase()}</h2>
          </div>
        </div>

        {/* NOTES */}
        <div className="px-4 pt-3">
          <p className="text-xs text-gray-500 mb-1">Notes</p>
          <div className="space-y-1 mb-3">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-[1px] bg-gray-300" />
            ))}
          </div>
        </div>

        {/* CALENDAR */}
        <div className="px-4 pb-4">
          <div className="grid grid-cols-7 text-xs text-gray-500 mb-2">
            {["MON","TUE","WED","THU","FRI","SAT","SUN"].map(d => (
              <span key={d}>{d}</span>
            ))}
          </div>

          <div className="grid grid-cols-7 text-sm gap-y-1">
            {days.map((d, i) => (
              <span key={i} className="text-center">
                {d}
              </span>
            ))}
          </div>
        </div>

      </div>
    </motion.div>
  );
}

/* ---------------- MAIN APP ---------------- */

export default function App() {
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

      {/* CARD STACK */}
      <div style={{ width: 380, height: 560, perspective: 1000 }} className="relative">
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

      {/* DOTS */}
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