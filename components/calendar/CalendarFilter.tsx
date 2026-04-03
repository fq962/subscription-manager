const FILTERS: { label: string; color: string }[] = [
  { label: "Mensual", color: "#60a5fa" },
  { label: "Anual", color: "#fb923c" },
];

export default function CalendarFilter() {
  return (
    <div className="flex items-center gap-4">
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
        className="rounded-full"
        style={{
          width: 9,
          height: 9,
          backgroundColor: color,
          display: "inline-block",
        }}
      />
      <span className="text-white text-sm">{label}</span>
    </div>
  );
}
