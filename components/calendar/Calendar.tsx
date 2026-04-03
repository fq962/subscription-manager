"use client";

import { useState, useMemo } from "react";
import CalendarNav from "./CalendarNav";
import CalendarTotal from "./CalendarTotal";
import CalendarFilter from "./CalendarFilter";
import CalendarDayCell from "./CalendarDayCell";
import DayDetailModal from "./DayDetailModal";
import AddSubscriptionButton from "./AddSubscriptionButton";
import { useSubscriptions } from "@/hooks/useSubscriptions";
import type { Subscription } from "./types";
import { TYPE_COLOR } from "./types";

const MONTHS_ES = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
];

const DAYS_ES = ["DOM", "LUN", "MAR", "MIÉ", "JUE", "VIE", "SÁB"];

export default function Calendar() {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1),
  );
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();

  const { subscriptions: rawSubscriptions, loading, refetch, deleteSubscription } = useSubscriptions();

  // Map DB rows to the Subscription shape used by calendar components
  const subscriptions: Subscription[] = useMemo(() =>
    rawSubscriptions.map((s) => {
      const type = (s.type === "anual" ? "anual" : "mensual") as "mensual" | "anual";
      return {
        id: s.id,
        name: s.providers?.name ?? "Sin nombre",
        icon: s.providers?.icon ?? null,
        color: TYPE_COLOR[type],
        amount: s.price,
        currencySymbol: s.currency_types?.symbol ?? "$",
        type,
        billingDay: s.billing_day,
      };
    }),
    [rawSubscriptions],
  );

  // Build the grid of days (with leading nulls for offset)
  const calendarDays = useMemo(() => {
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const cells: (number | null)[] = [
      ...Array(firstDayOfMonth).fill(null),
      ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
    ];
    while (cells.length < 42) cells.push(null);
    return cells;
  }, [month, year]);

  // Total grouped by currency symbol
  const totals = useMemo(
    () =>
      subscriptions.reduce<Record<string, number>>((acc, s) => {
        const sym = s.currencySymbol ?? "$";
        acc[sym] = (acc[sym] ?? 0) + s.amount;
        return acc;
      }, {}),
    [subscriptions],
  );

  const getSubsForDay = (day: number | null) => {
    if (!day) return [];
    return subscriptions.filter((s) => s.billingDay === day);
  };

  const isToday = (day: number | null) =>
    day !== null &&
    day === today.getDate() &&
    month === today.getMonth() &&
    year === today.getFullYear();

  const handlePrev = () => setCurrentDate(new Date(year, month - 1, 1));
  const handleNext = () => setCurrentDate(new Date(year, month + 1, 1));

  return (
    <div
      className="rounded-2xl p-3 sm:p-6 w-full"
      style={{ backgroundColor: "#1a0f08", maxWidth: 720 }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3 sm:mb-4">
        <div className="flex flex-col gap-2 sm:gap-3">
          <CalendarNav
            month={MONTHS_ES[month].toUpperCase()}
            year={year}
            onPrev={handlePrev}
            onNext={handleNext}
          />
          <CalendarFilter />
        </div>
        <CalendarTotal totals={totals} />
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 mb-1 sm:mb-2">
        {DAYS_ES.map((d) => (
          <div
            key={d}
            className="text-center font-semibold uppercase tracking-wider py-1 sm:py-2 text-[0.55rem] sm:text-xs"
            style={{ color: "rgba(255,255,255,0.35)" }}
          >
            {d}
          </div>
        ))}
      </div>

      {/* Loading state */}
      {loading ? (
        <div
          className="flex items-center justify-center py-16 text-xs uppercase tracking-widest"
          style={{ color: "rgba(255,255,255,0.25)" }}
        >
          Cargando suscripciones...
        </div>
      ) : (
        /* Calendar grid */
        <div className="grid grid-cols-7 gap-1 sm:gap-2">
          {calendarDays.map((day, i) => (
            <CalendarDayCell
              key={i}
              day={day}
              subscriptions={getSubsForDay(day)}
              isToday={isToday(day)}
              onClick={day ? () => setSelectedDay(day) : undefined}
            />
          ))}
        </div>
      )}

      {/* Add Subscription Button */}
      <AddSubscriptionButton onSuccess={refetch} />

      {/* Footer */}
      <div
        className="text-center mt-3 sm:mt-4 uppercase tracking-widest text-[0.55rem] sm:text-xs"
        style={{ color: "rgba(255,255,255,0.25)" }}
      >
        Suscripciones del mes actual
      </div>

      {/* Day detail modal */}
      {selectedDay !== null && getSubsForDay(selectedDay).length > 0 && (
        <DayDetailModal
          day={selectedDay}
          month={MONTHS_ES[month]}
          subscriptions={getSubsForDay(selectedDay)}
          onClose={() => setSelectedDay(null)}
          onDelete={async (id) => {
            await deleteSubscription(id);
          }}
        />
      )}
    </div>
  );
}
