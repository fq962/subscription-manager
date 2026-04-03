interface CalendarTotalProps {
  totals: Record<string, number>;
  label?: string;
}

function formatAmount(amount: number) {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export default function CalendarTotal({
  totals,
  label = "TOTAL GASTADO",
}: CalendarTotalProps) {
  const entries = Object.entries(totals).filter(([, v]) => v > 0);

  const display =
    entries.length === 0
      ? "$0.00"
      : entries.map(([sym, amt]) => `${sym} ${formatAmount(amt)}`).join(" / ");

  return (
    <div className="text-right">
      <p
        className="uppercase font-semibold text-[0.55rem] sm:text-[0.7rem] mb-0.5"
        style={{ color: "#f5a623", letterSpacing: "0.2em" }}
      >
        {label}
      </p>
      <p
        className="font-semibold leading-none text-base sm:text-xl"
        style={{ color: "rgba(255,255,255,0.85)" }}
      >
        {display}
      </p>
    </div>
  );
}
