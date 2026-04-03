export type SubscriptionType = "mensual" | "anual";

export interface Subscription {
  id: number;
  name: string;
  icon: string | null;      // raw SVG string from providers table
  color: string;             // derived from type: mensual=#e8a87c, anual=#f5a623
  amount: number;
  currencySymbol: string;
  type: SubscriptionType;
  billingDay: number;
}

export const TYPE_COLOR: Record<SubscriptionType, string> = {
  mensual: "#60a5fa",  // azul claro — alto contraste sobre fondo oscuro
  anual: "#fb923c",    // naranja vivo — distinto del azul y del fondo
};

export interface CalendarDay {
  date: number | null;
  subscriptions: Subscription[];
}

export type FilterType = "all" | "mensual" | "anual";

// Mock subscriptions data
export const MOCK_SUBSCRIPTIONS: Subscription[] = [
  { id: 1, name: "Spotify",  icon: "music",    color: "#fb923c", currencySymbol: "$", amount: 9.99,  type: "anual",   billingDay: 10 },
  { id: 2, name: "Amazon",   icon: "cart",     color: "#fb923c", currencySymbol: "$", amount: 14.99, type: "anual",   billingDay: 15 },
  { id: 3, name: "iCloud",   icon: "settings", color: "#60a5fa", currencySymbol: "$", amount: 2.99,  type: "mensual", billingDay: 5  },
  { id: 4, name: "Netflix",  icon: "play",     color: "#60a5fa", currencySymbol: "$", amount: 15.99, type: "mensual", billingDay: 2  },
  { id: 5, name: "iCloud+",  icon: "cloud",    color: "#60a5fa", currencySymbol: "$", amount: 2.99,  type: "mensual", billingDay: 26 },
];
