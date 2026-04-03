"use client";

import { useEffect, useState } from "react";
import type { Subscription } from "./types";

interface DayDetailModalProps {
  day: number;
  month: string;
  subscriptions: Subscription[];
  onClose: () => void;
  onDelete?: (id: number) => Promise<void>;
}

function ProviderIcon({ icon, name, color }: { icon: string | null; name: string; color: string }) {
  if (icon) {
    return (
      <span
        className="w-[18px] h-[18px] flex-shrink-0 [&>svg]:w-full [&>svg]:h-full"
        style={{ color }}
        dangerouslySetInnerHTML={{ __html: icon }}
      />
    );
  }
  return (
    <span className="text-xs font-bold" style={{ color }}>
      {name.charAt(0).toUpperCase()}
    </span>
  );
}

function TrashIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
      <path d="M10 11v6M14 11v6" />
      <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
    </svg>
  );
}

function SubscriptionRow({
  sub,
  onDelete,
}: {
  sub: Subscription;
  onDelete?: (id: number) => Promise<void>;
}) {
  const [hovered, setHovered] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [confirm, setConfirm] = useState(false);

  const handleDelete = async () => {
    if (!onDelete) return;
    if (!confirm) { setConfirm(true); return; }
    setDeleting(true);
    await onDelete(sub.id);
  };

  // reset confirm if mouse leaves the row
  const handleMouseLeave = () => {
    setHovered(false);
    setConfirm(false);
  };

  return (
    <div
      className="flex items-center justify-between rounded-xl px-2 -mx-2 transition-colors"
      style={{ backgroundColor: hovered ? "rgba(255,255,255,0.04)" : "transparent" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      <div className="flex items-center gap-3 py-1">
        {/* Icon bubble */}
        <div
          className="flex items-center justify-center rounded-xl"
          style={{ width: 38, height: 38, backgroundColor: "rgba(255,255,255,0.07)" }}
        >
          <ProviderIcon icon={sub.icon} name={sub.name} color={sub.color} />
        </div>
        {/* Name + type */}
        <div>
          <p className="text-white text-sm font-medium leading-tight">{sub.name}</p>
          <p className="text-xs capitalize" style={{ color: "rgba(255,255,255,0.35)" }}>
            {sub.type}
          </p>
        </div>
      </div>

      {/* Right side: amount + trash */}
      <div className="flex items-center gap-2">
        <p className="text-white text-sm font-semibold">
          {sub.currencySymbol}{sub.amount.toFixed(2)}
        </p>

        {/* Trash button — visible on hover */}
        {onDelete && (
          <button
            onClick={handleDelete}
            disabled={deleting}
            title={confirm ? "¿Confirmar?" : "Eliminar"}
            className="flex items-center justify-center rounded-lg transition-all"
            style={{
              width: 28,
              height: 28,
              opacity: hovered ? 1 : 0,
              pointerEvents: hovered ? "auto" : "none",
              backgroundColor: confirm ? "rgba(239,68,68,0.2)" : "rgba(255,255,255,0.06)",
              color: confirm ? "#f87171" : "rgba(255,255,255,0.4)",
              transition: "opacity 0.15s, background-color 0.15s, color 0.15s",
            }}
            onMouseEnter={(e) => {
              if (!confirm) {
                e.currentTarget.style.backgroundColor = "rgba(239,68,68,0.15)";
                e.currentTarget.style.color = "#f87171";
              }
            }}
            onMouseLeave={(e) => {
              if (!confirm) {
                e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.06)";
                e.currentTarget.style.color = "rgba(255,255,255,0.4)";
              }
            }}
          >
            {deleting ? (
              <span style={{ fontSize: 10, color: "#f87171" }}>...</span>
            ) : confirm ? (
              <span style={{ fontSize: 10, fontWeight: 700 }}>¿OK?</span>
            ) : (
              <TrashIcon />
            )}
          </button>
        )}
      </div>
    </div>
  );
}

export default function DayDetailModal({
  day,
  month,
  subscriptions,
  onClose,
  onDelete,
}: DayDetailModalProps) {
  // Group totals by currency symbol
  const totals = subscriptions.reduce<Record<string, number>>((acc, s) => {
    const sym = s.currencySymbol ?? "$";
    acc[sym] = (acc[sym] ?? 0) + s.amount;
    return acc;
  }, {});
  const totalDisplay = Object.entries(totals)
    .filter(([, v]) => v > 0)
    .map(([sym, amt]) => `${sym}${amt.toFixed(2)}`)
    .join(" / ");

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)",
        backgroundColor: "rgba(0,0,0,0.35)",
      }}
      onClick={onClose}
    >
      <div
        className="rounded-2xl p-5 w-[280px] sm:w-[320px] shadow-2xl animate-popIn"
        style={{ backgroundColor: "#1e1410" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Day label */}
        <p className="text-xs uppercase tracking-widest mb-4" style={{ color: "rgba(255,255,255,0.35)" }}>
          {month} {day}
        </p>

        {/* Subscription rows */}
        <div className="flex flex-col gap-1">
          {subscriptions.map((sub) => (
            <SubscriptionRow key={sub.id} sub={sub} onDelete={onDelete} />
          ))}
        </div>

        {/* Divider */}
        <div className="my-4" style={{ height: 1, backgroundColor: "rgba(255,255,255,0.08)" }} />

        {/* Total */}
        <div className="flex items-center justify-between">
          <p className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>Total</p>
          <p className="text-white font-bold text-base">{totalDisplay || "—"}</p>
        </div>
      </div>
    </div>
  );
}
