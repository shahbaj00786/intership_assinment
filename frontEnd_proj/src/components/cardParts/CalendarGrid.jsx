const generateDays = (monthIndex, year = 2026) => {
  const firstDay = new Date(year, monthIndex, 1).getDay();
  const totalDays = new Date(year, monthIndex + 1, 0).getDate();

  const days = [];
  for (let i = 0; i < firstDay; i++) days.push("");
  for (let d = 1; d <= totalDays; d++) days.push(d);

  return days;
};

export default function CalendarGrid({ monthIndex }) {
  const days = generateDays(monthIndex);

  return (
    <div className="mb-6">
      <div className="grid grid-cols-7 text-[10px] text-white/40 mb-2">
        {["MON","TUE","WED","THU","FRI","SAT","SUN"].map(d => (
          <span key={d}>{d}</span>
        ))}
      </div>

      <div className="grid grid-cols-7 text-xs text-white gap-y-1">
        {days.map((d, i) => (
          <span key={i} className="text-center">
            {d}
          </span>
        ))}
      </div>
    </div>
  );
}