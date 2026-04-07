export default function NotesSection() {
  return (
    <div className="mb-4">
      <p className="text-xs text-white/50 mb-2">Notes</p>
      {[...Array(3)].map((_, i) => (
        <div key={i} className="h-[1px] bg-white/20 mb-1" />
      ))}
    </div>
  );
}