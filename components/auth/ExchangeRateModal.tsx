"use client";

import { useState, useEffect, useRef } from "react";

export const EXCHANGE_RATE_KEY = "exchangeRate_usd_lps";

interface ExchangeRateModalProps {
  onClose: () => void;
}

export default function ExchangeRateModal({ onClose }: ExchangeRateModalProps) {
  const [rate, setRate] = useState<string>("");
  const [saved, setSaved] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stored = localStorage.getItem(EXCHANGE_RATE_KEY);
    if (stored) setRate(stored);
    setTimeout(() => inputRef.current?.focus(), 50);
  }, []);

  const handleSave = () => {
    const parsed = parseFloat(rate.replace(",", "."));
    if (!rate || isNaN(parsed) || parsed <= 0) return;
    localStorage.setItem(EXCHANGE_RATE_KEY, String(parsed));
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 900);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSave();
    if (e.key === "Escape") onClose();
  };

  return (
    <div
      ref={backdropRef}
      className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{ backgroundColor: "rgba(0,0,0,0.55)", backdropFilter: "blur(2px)" }}
      onMouseDown={(e) => {
        if (e.target === backdropRef.current) onClose();
      }}
    >
      <div
        className="rounded-2xl p-6 w-full max-w-xs shadow-2xl animate-popIn"
        style={{
          backgroundColor: "#1e1410",
          border: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        {/* Title */}
        <div className="flex items-center gap-2 mb-4">
          <GearIcon size={16} color="#f5a623" />
          <h2 className="text-sm font-semibold text-white uppercase tracking-widest">
            Tasa de cambio
          </h2>
        </div>

        {/* Description */}
        <p className="text-xs mb-4" style={{ color: "rgba(255,255,255,0.45)" }}>
          Ingresa cuántos Lempiras (L) equivale <span className="text-white font-medium">1 dólar ($)</span>.
        </p>

        {/* Input */}
        <div
          className="flex items-center gap-2 rounded-xl px-3 py-2 mb-4"
          style={{ backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
        >
          <span className="text-sm font-bold" style={{ color: "#f5a623" }}>$1 =</span>
          <input
            ref={inputRef}
            type="number"
            min="0"
            step="0.01"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="25.00"
            className="flex-1 bg-transparent text-white text-sm outline-none placeholder:opacity-30"
            style={{ minWidth: 0 }}
          />
          <span className="text-sm font-bold text-white">L</span>
        </div>

        {/* Buttons */}
        <div className="flex gap-2">
          <button
            onClick={onClose}
            className="flex-1 py-2 rounded-xl text-xs font-medium transition-all"
            style={{
              backgroundColor: "rgba(255,255,255,0.05)",
              color: "rgba(255,255,255,0.5)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.09)")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.05)")}
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="flex-1 py-2 rounded-xl text-xs font-semibold transition-all"
            style={{
              backgroundColor: saved ? "#2d6a3f" : "#f5a623",
              color: saved ? "#a8f0bc" : "#1a0f08",
            }}
            onMouseEnter={(e) => {
              if (!saved) e.currentTarget.style.backgroundColor = "#e09520";
            }}
            onMouseLeave={(e) => {
              if (!saved) e.currentTarget.style.backgroundColor = "#f5a623";
            }}
          >
            {saved ? "✓ Guardado" : "Guardar"}
          </button>
        </div>
      </div>
    </div>
  );
}

export function GearIcon({ size = 14, color = "rgba(255,255,255,0.45)" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  );
}
