export default function CardImage({ image }) {
  return (
    <div className="relative h-36 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a5e5e] to-transparent z-10" />
      <img
        src={image}
        className="w-full h-full object-cover opacity-70"
        draggable={false}
      />
    </div>
  );
}