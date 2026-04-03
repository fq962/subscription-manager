"use client";

import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/lib/supabase";

export interface SubscriptionRow {
  id: number;
  price: number;
  type: string;
  billing_day: number;
  is_active: boolean | null;
  providers: {
    id: number;
    name: string;
    icon: string | null;
  } | null;
  currency_types: {
    id: number;
    currency: string;
    symbol: string;
  } | null;
}

export function useSubscriptions() {
  const [subscriptions, setSubscriptions] = useState<SubscriptionRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSubscriptions = useCallback(async () => {
    setLoading(true);
    const { data: { session } } = await supabase.auth.getSession();

    if (!session?.user) {
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from("subscriptions")
      .select(`
        id,
        price,
        type,
        billing_day,
        is_active,
        providers ( id, name, icon ),
        currency_types ( id, currency, symbol )
      `)
      .eq("user_id", session.user.id)
      .eq("is_active", true);

    if (error) setError(error.message);
    else setSubscriptions((data as SubscriptionRow[]) ?? []);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchSubscriptions();
  }, [fetchSubscriptions]);

  const deleteSubscription = useCallback(async (id: number) => {
    const { error } = await supabase
      .from("subscriptions")
      .update({ is_active: false })
      .eq("id", id);

    if (!error) await fetchSubscriptions();
    return { error };
  }, [fetchSubscriptions]);

  return { subscriptions, loading, error, refetch: fetchSubscriptions, deleteSubscription };
}
