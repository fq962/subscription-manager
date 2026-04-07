const FILTERS: { label: string; color: string }[] = [
  { label: "Mensual", color: "#60a5fa" },
  { label: "Anual", color: "#fb923c" },
];

export default function CalendarFilter() {
  return (
    <div className="flex items-center gap-3 sm:gap-4">
      {FILTERS.map(({ label, color }) => (
        <LegendChip key={label} label={label} color={color} />
      ))}
    </div>
  );
}

interface LegendChipProps {
  label: string;
  color: string;
}

export function LegendChip({ label, color }: LegendChipProps) {
  return (
    <div className="flex items-center gap-1.5">
      <span
        className="rounded-full flex-shrink-0"
        style={{
          width: 8,
          height: 8,
          backgroundColor: color,
          display: "inline-block",
        }}
      />
      <span className="text-white text-xs sm:text-sm">{label}</span>
    </div>
  );
}
