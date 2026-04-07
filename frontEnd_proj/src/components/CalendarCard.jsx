import { motion } from "framer-motion";
import MonthHeader from "./parts/MonthHeader";
import NotesSection from "./parts/NotesSection";
import CalendarGrid from "./parts/CalendarGrid";
import CardImage from "./parts/CardImage";

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

export default function CalendarCard({ month, index, position, dragX, onDragEnd }) {

  const isCenter = position === 0;
  const isLeft = position === -1;
  const isRight = position === 1;
  const isHidden = Math.abs(position) > 1;

  const x = isCenter
    ? 0
    : isLeft
    ? "-52%"
    : isRight
    ? "52%"
    : position < -1
    ? "-120%"
    : "120%";

  return (
    <motion.div
      drag={isCenter ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.15}
      onDragEnd={onDragEnd}
      style={{ x: isCenter ? dragX : undefined }}
      animate={{
        translateX: x,
        scale: isCenter ? 1 : 0.82,
        opacity: isHidden ? 0 : isCenter ? 1 : 0.65,
        rotateY: isLeft ? 12 : isRight ? -12 : 0,
        zIndex: isCenter ? 30 : 10,
        filter: isCenter ? "blur(0px)" : "blur(3px)"
      }}
      transition={{
        type: "spring",
        stiffness: 280,
        damping: 28,
      }}
      className="absolute top-0 left-1/2 -translate-x-1/2 w-[320px] sm:w-[340px]"
    >
      <div className="rounded-3xl overflow-hidden bg-gradient-to-b from-[#0f1923] to-[#1a2d3d] shadow-2xl">

        <div className="px-6 pt-6 pb-4">
          <MonthHeader month={month} />
          <NotesSection />
          <CalendarGrid monthIndex={index} />

          <button className="w-full py-3 rounded-xl font-bold text-sm text-white border border-white/20 bg-white/10 backdrop-blur">
            View Month
          </button>
        </div>

        <CardImage image={images[index]} />

      </div>
    </motion.div>
  );
}