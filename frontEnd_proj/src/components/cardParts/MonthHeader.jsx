export default function MonthHeader({ month }) {
  return (
    <>
      <p className="text-[10px] text-white/40 mb-1 uppercase">2026</p>

      <h2 className="text-2xl font-black text-white mb-4">
        {month.name.toUpperCase()}
      </h2>
    </>
  );
}