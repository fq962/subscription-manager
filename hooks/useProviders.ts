"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export interface Provider {
  id: number;
  name: string;
  icon: string | null;
}

export interface Currency {
  id: number;
  currency: string;
  symbol: string;
}

export function useProviders() {
  const [providers, setProviders] = useState<Provider[]>([]);
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([
      supabase.from("providers").select("id, name, icon").order("name"),
      supabase.from("currency_types").select("id, currency, symbol").order("id"),
    ]).then(([providersRes, currenciesRes]) => {
      if (providersRes.error) setError(providersRes.error.message);
      else setProviders(providersRes.data ?? []);

      if (currenciesRes.error) setError(currenciesRes.error.message);
      else setCurrencies(currenciesRes.data ?? []);

      setLoading(false);
    });
  }, []);

  return { providers, currencies, loading, error };
}
