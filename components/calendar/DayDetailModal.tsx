"use client";

import { useEffect } from "react";
import type { Subscription } from "./types";
import { Icon } from "./CalendarDayCell";

interface DayDetailModalProps {
  day: number;
  month: string;
  subscriptions: Subscription[];
  onClose: () => void;
}

export default function DayDetailModal({
  day,
  month,
  subscriptions,
  onClose,
}: DayDetailModalProps) {
  const total = subscriptions.reduce((acc, s) => acc + s.amount, 0);

  // Close on Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)",
        backgroundColor: "rgba(0,0,0,0.35)",
      }}
      onClick={onClose}
    >
      {/* Card */}
      <div
        className="rounded-2xl p-5 w-[280px] sm:w-[320px] shadow-2xl animate-popIn"
        style={{ backgroundColor: "#1e1410" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Day label */}
        <p
          className="text-xs uppercase tracking-widest mb-4"
          style={{ color: "rgba(255,255,255,0.35)" }}
        >
          {month} {day}
        </p>

        {/* Subscription rows */}
        <div className="flex flex-col gap-3">
          {subscriptions.map((sub) => (
            <div key={sub.id} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {/* Icon bubble */}
                <div
                  className="flex items-center justify-center rounded-xl"
                  style={{
                    width: 38,
                    height: 38,
                    backgroundColor: "rgba(255,255,255,0.07)",
                    color: sub.color,
                  }}
                >
                  <Icon type={sub.icon} size={18} />
                </div>
                {/* Name + type */}
                <div>
                  <p className="text-white text-sm font-medium leading-tight">
                    {sub.name}
                  </p>
                  <p
                    className="text-xs capitalize"
                    style={{ color: "rgba(255,255,255,0.35)" }}
                  >
                    {sub.type}
                  </p>
                </div>
              </div>
              {/* Amount */}
              <p className="text-white text-sm font-semibold">
                ${sub.amount.toFixed(2)}
              </p>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div
          className="my-4"
          style={{ height: 1, backgroundColor: "rgba(255,255,255,0.08)" }}
        />

        {/* Total */}
        <div className="flex items-center justify-between">
          <p className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
            Total
          </p>
          <p className="text-white font-bold text-base">${total.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
}
