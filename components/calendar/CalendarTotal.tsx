"use client";

import { useState } from "react";

interface CalendarTotalProps {
  totals: Record<string, number>;
  label?: string;
  exchangeRate?: number; // 1 USD = X HNL
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
  exchangeRate = 25,
}: CalendarTotalProps) {
  const [showInLps, setShowInLps] = useState(false);

  // Convertir todo a USD primero
  const totalUSD = Object.entries(totals).reduce((sum, [sym, amt]) => {
    if (sym === "L") {
      return sum + amt / exchangeRate;
    }
    return sum + amt; // "$" u otro se asume USD
  }, 0);

  const displayAmount = showInLps ? totalUSD * exchangeRate : totalUSD;
  const displaySymbol = showInLps ? "L" : "$";
  const display = totalUSD === 0 ? "$0.00" : `${displaySymbol} ${formatAmount(displayAmount)}`;

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

      {/* Toggle sutil USD / HNL */}
      <div className="flex items-center justify-end gap-0.5 mt-1.5">
        <button
          onClick={() => setShowInLps(false)}
          className="text-[0.6rem] sm:text-[0.72rem] font-semibold px-2 py-1 rounded transition-all duration-200"
          style={{
            color: !showInLps ? "#f5a623" : "rgba(255,255,255,0.3)",
            backgroundColor: !showInLps ? "rgba(245,166,35,0.12)" : "transparent",
          }}
        >
          USD
        </button>
        <span style={{ color: "rgba(255,255,255,0.2)", fontSize: "0.6rem" }}>|</span>
        <button
          onClick={() => setShowInLps(true)}
          className="text-[0.6rem] sm:text-[0.72rem] font-semibold px-2 py-1 rounded transition-all duration-200"
          style={{
            color: showInLps ? "#f5a623" : "rgba(255,255,255,0.3)",
            backgroundColor: showInLps ? "rgba(245,166,35,0.12)" : "transparent",
          }}
        >
          HNL
        </button>
      </div>
    </div>
  );
}
