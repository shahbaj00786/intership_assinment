import { motion } from "framer-motion";
import MonthHeader from "./cardParts/MonthHeader";
import NotesSection from "./cardParts/NotesSection";
import CalendarGrid from "./cardParts/CalendarGrid";
import CardImage from "./cardParts/CardImage";

const images = [
  "https://images.unsplash.com/photo-1522163182402-834f871fd851",
  "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b",
  "https://images.unsplash.com/photo-1533387558148-129c152f9f97",
  "https://images.unsplash.com/photo-1519904981063-b0cf448d479e",
  "https://images.unsplash.com/photo-1454496522488-7a8e488e8606",
  "https://images.unsplash.com/photo-1520208422220-d12a3c588e6c",
  "https://images.unsplash.com/photo-1516733958632-afb5f3f27bf4",
  "https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5",
  "https://images.unsplash.com/photo-1501554766227-6c926fb346c4",
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
  "https://images.unsplash.com/photo-1491555103944-7c647fd857e6",
  "https://images.unsplash.com/photo-1517594422361-5e88ae9b173b",
];
export default function CalendarCard({
  month,
  index,
  position,
  dragX,
  onDragEnd,
}) {
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
        filter: isCenter ? "blur(0px)" : "blur(3px)",
      }}
      initial={false}
      transition={{
        type: "spring",
        stiffness: 280,
        damping: 28,
      }}
      className="absolute top-0 left-1/2 -translate-x-1/2 w-[320px] sm:w-[340px] will-change-transform"
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
