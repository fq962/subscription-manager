"use client";

import { useEffect, useRef, useState } from "react";
import { useProviders, type Provider, type Currency } from "@/hooks/useProviders";
import { supabase } from "@/lib/supabase";

function ProviderIcon({ icon, name }: { icon: string | null; name: string }) {
  const isSvg = icon && icon.trim().startsWith("<svg");
  if (isSvg) {
    return (
      <span
        className="w-5 h-5 flex-shrink-0 [&>svg]:w-full [&>svg]:h-full"
        dangerouslySetInnerHTML={{ __html: icon! }}
      />
    );
  }
  if (icon) {
    return (
      <img
        src={icon}
        alt={name}
        className="w-5 h-5 rounded object-contain flex-shrink-0"
        onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
      />
    );
  }
  return (
    <div
      className="w-5 h-5 rounded flex-shrink-0 flex items-center justify-center text-[0.6rem] font-bold"
      style={{ backgroundColor: "rgba(245,166,35,0.2)", color: "#f5a623" }}
    >
      {name.charAt(0).toUpperCase()}
    </div>
  );
}

interface AddSubscriptionModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

const today = new Date();
const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

export default function AddSubscriptionModal({ onClose, onSuccess }: AddSubscriptionModalProps) {
  const { providers, currencies, loading } = useProviders();

  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedCurrency, setSelectedCurrency] = useState<Currency | null>(null);
  const [monto, setMonto] = useState("");
  const [fecha, setFecha] = useState(todayStr);
  const [frecuencia, setFrecuencia] = useState<"mensual" | "anual">("mensual");
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const filteredProviders = providers.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  // Seleccionar la primera moneda por defecto cuando carguen
  useEffect(() => {
    if (currencies.length > 0 && !selectedCurrency) {
      setSelectedCurrency(currencies[0]);
    }
  }, [currencies, selectedCurrency]);

  // Cerrar con Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (dropdownOpen) setDropdownOpen(false);
        else onClose();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, dropdownOpen]);

  // Cerrar dropdown al hacer click afuera
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!selectedProvider) return setFormError("Seleccioná un proveedor.");
    if (!selectedCurrency) return setFormError("Seleccioná una moneda.");
    if (!monto || parseFloat(monto) <= 0) return setFormError("Ingresá un monto válido.");
    if (!fecha) return setFormError("Ingresá una fecha de pago.");

    const billingDay = new Date(fecha + "T00:00:00").getDate();

    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.user) return setFormError("No hay sesión activa.");

    setSubmitting(true);

    const { error } = await supabase.from("subscriptions").insert({
      user_id: session.user.id,
      provider_id: selectedProvider.id,
      currency_type_id: selectedCurrency.id,
      price: parseFloat(monto),
      type: frecuencia,
      billing_day: billingDay,
    });

    setSubmitting(false);

    if (error) {
      setFormError(error.message);
    } else {
      onSuccess();
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)",
        backgroundColor: "rgba(0,0,0,0.45)",
      }}
      onClick={onClose}
    >
      <div
        className="rounded-2xl p-5 w-[300px] sm:w-[360px] shadow-2xl"
        style={{ backgroundColor: "#1e1410" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <p
            className="text-xs uppercase tracking-widest"
            style={{ color: "rgba(255,255,255,0.35)" }}
          >
            Nueva Suscripción
          </p>
          <button
            onClick={onClose}
            className="transition-opacity hover:opacity-60 cursor-pointer"
            style={{ color: "rgba(255,255,255,0.4)" }}
            aria-label="Cerrar"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M1 1L13 13M13 1L1 13"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          {/* Proveedor dropdown */}
          <div className="flex flex-col gap-1" ref={dropdownRef}>
            <label
              className="text-[0.65rem] uppercase tracking-widest"
              style={{ color: "rgba(255,255,255,0.35)" }}
            >
              Proveedor
            </label>

            {/* Trigger */}
            <button
              type="button"
              onClick={() => setDropdownOpen((v) => !v)}
              className="flex items-center justify-between rounded-xl px-3 py-2 text-sm text-left cursor-pointer transition-colors"
              style={{
                backgroundColor: "rgba(255,255,255,0.07)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: selectedProvider ? "white" : "rgba(255,255,255,0.3)",
              }}
            >
              {selectedProvider ? (
                <span className="flex items-center gap-2">
                  <ProviderIcon icon={selectedProvider.icon} name={selectedProvider.name} />
                  {selectedProvider.name}
                </span>
              ) : (
                <span>Seleccionar proveedor...</span>
              )}
              <svg
                width="10"
                height="6"
                viewBox="0 0 10 6"
                fill="none"
                style={{
                  transform: dropdownOpen ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform 0.15s",
                  color: "rgba(255,255,255,0.35)",
                }}
              >
                <path
                  d="M1 1L5 5L9 1"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {/* Dropdown panel */}
            {dropdownOpen && (
              <div
                className="rounded-xl overflow-hidden shadow-2xl"
                style={{
                  backgroundColor: "#2a1a10",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                {/* Search */}
                <div
                  className="px-3 py-2"
                  style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}
                >
                  <input
                    type="text"
                    placeholder="Buscar..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    autoFocus
                    className="w-full bg-transparent text-sm text-white outline-none placeholder:opacity-30"
                  />
                </div>

                {/* Options */}
                <div className="max-h-40 overflow-y-auto">
                  {loading ? (
                    <p
                      className="text-xs px-3 py-3"
                      style={{ color: "rgba(255,255,255,0.3)" }}
                    >
                      Cargando...
                    </p>
                  ) : filteredProviders.length === 0 ? (
                    <p
                      className="text-xs px-3 py-3"
                      style={{ color: "rgba(255,255,255,0.3)" }}
                    >
                      Sin resultados
                    </p>
                  ) : (
                    filteredProviders.map((p) => (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => {
                          setSelectedProvider(p);
                          setDropdownOpen(false);
                          setSearch("");
                        }}
                        className="flex items-center gap-3 w-full px-3 py-2 text-sm text-left cursor-pointer transition-colors"
                        style={{
                          color: "white",
                          backgroundColor:
                            selectedProvider?.id === p.id
                              ? "rgba(245,166,35,0.15)"
                              : "transparent",
                        }}
                        onMouseEnter={(e) => {
                          if (selectedProvider?.id !== p.id)
                            (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                              "rgba(255,255,255,0.05)";
                        }}
                        onMouseLeave={(e) => {
                          if (selectedProvider?.id !== p.id)
                            (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                              "transparent";
                        }}
                      >
                        <ProviderIcon icon={p.icon} name={p.name} />
                        {p.name}
                      </button>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Moneda + Monto */}
          <div className="flex gap-3">
            <div className="flex flex-col gap-1 w-24">
              <label
                className="text-[0.65rem] uppercase tracking-widest"
                style={{ color: "rgba(255,255,255,0.35)" }}
              >
                Moneda
              </label>
              <div
                className="flex rounded-xl overflow-hidden"
                style={{ border: "1px solid rgba(255,255,255,0.1)" }}
              >
                {loading ? (
                  <div
                    className="flex-1 py-2 text-xs text-center"
                    style={{ color: "rgba(255,255,255,0.3)", backgroundColor: "rgba(255,255,255,0.07)" }}
                  >
                    ...
                  </div>
                ) : (
                  currencies.map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setSelectedCurrency(c)}
                      className="flex-1 py-2 text-sm font-semibold transition-colors cursor-pointer"
                      style={{
                        backgroundColor: selectedCurrency?.id === c.id ? "#f5a623" : "rgba(255,255,255,0.07)",
                        color: selectedCurrency?.id === c.id ? "#1a0f08" : "rgba(255,255,255,0.5)",
                      }}
                    >
                      {c.symbol}
                    </button>
                  ))
                )}
              </div>
            </div>

            <div className="flex flex-col gap-1 flex-1">
              <label
                className="text-[0.65rem] uppercase tracking-widest"
                style={{ color: "rgba(255,255,255,0.35)" }}
              >
                Monto
              </label>
              <div
                className="flex items-center rounded-xl px-3 py-2 gap-1"
                style={{
                  backgroundColor: "rgba(255,255,255,0.07)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                <span className="text-sm" style={{ color: "rgba(255,255,255,0.35)" }}>
                  {selectedCurrency?.symbol ?? ""}
                </span>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  value={monto}
                  onChange={(e) => setMonto(e.target.value)}
                  className="flex-1 bg-transparent text-sm text-white outline-none placeholder:opacity-30 w-0"
                />
              </div>
            </div>
          </div>

          {/* Fecha de pago */}
          <div className="flex flex-col gap-1">
            <label
              className="text-[0.65rem] uppercase tracking-widest"
              style={{ color: "rgba(255,255,255,0.35)" }}
            >
              Fecha de pago
            </label>
            <input
              type="date"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
              className="rounded-xl px-3 py-2 text-sm text-white outline-none cursor-pointer"
              style={{
                backgroundColor: "rgba(255,255,255,0.07)",
                border: "1px solid rgba(255,255,255,0.1)",
                colorScheme: "dark",
              }}
            />
          </div>

          {/* Frecuencia */}
          <div className="flex flex-col gap-1">
            <label
              className="text-[0.65rem] uppercase tracking-widest"
              style={{ color: "rgba(255,255,255,0.35)" }}
            >
              Frecuencia
            </label>
            <div
              className="flex rounded-xl overflow-hidden"
              style={{ border: "1px solid rgba(255,255,255,0.1)" }}
            >
              {(["mensual", "anual"] as const).map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFrecuencia(f)}
                  className="flex-1 py-2 text-xs uppercase tracking-widest font-semibold transition-colors cursor-pointer"
                  style={{
                    backgroundColor: frecuencia === f ? "#f5a623" : "rgba(255,255,255,0.07)",
                    color: frecuencia === f ? "#1a0f08" : "rgba(255,255,255,0.5)",
                  }}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div style={{ height: 1, backgroundColor: "rgba(255,255,255,0.08)" }} />

          {/* Error */}
          {formError && (
            <p className="text-xs text-center" style={{ color: "#f87171" }}>
              {formError}
            </p>
          )}

          {/* Botones */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={submitting}
              className="flex-1 py-2 rounded-xl text-xs uppercase tracking-widest font-semibold transition-opacity hover:opacity-70 cursor-pointer disabled:opacity-40"
              style={{
                backgroundColor: "rgba(255,255,255,0.07)",
                color: "rgba(255,255,255,0.5)",
              }}
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 py-2 rounded-xl text-xs uppercase tracking-widest font-semibold transition-opacity hover:opacity-80 cursor-pointer disabled:opacity-60"
              style={{ backgroundColor: "#f5a623", color: "#1a0f08" }}
            >
              {submitting ? "Guardando..." : "Agregar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
