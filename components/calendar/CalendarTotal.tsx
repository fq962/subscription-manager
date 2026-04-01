interface CalendarTotalProps {
  amount: number;
  label?: string;
}

export default function CalendarTotal({
  amount,
  label = "TOTAL GASTADO",
}: CalendarTotalProps) {
  const formatted = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(amount);

  return (
    <div className="text-right">
      <p
        className="uppercase font-semibold text-[0.55rem] sm:text-[0.7rem]"
        style={{ color: "#f5a623", letterSpacing: "0.2em" }}
      >
        {label}
      </p>
      <p className="text-white font-bold leading-none text-2xl sm:text-5xl">
        {formatted}
      </p>
    </div>
  );
}
