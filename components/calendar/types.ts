export type SubscriptionType = "mensual" | "anual";

export interface Subscription {
  id: string;
  name: string;
  icon: "music" | "cart" | "settings" | "cloud" | "play";
  color: string;
  amount: number;
  type: SubscriptionType;
  billingDay: number; // day of the month it charges
}

export interface CalendarDay {
  date: number | null;
  subscriptions: Subscription[];
}

export type FilterType = "all" | "mensual" | "anual";

// Mock subscriptions data
export const MOCK_SUBSCRIPTIONS: Subscription[] = [
  {
    id: "1",
    name: "Spotify",
    icon: "music",
    color: "#f5a623",
    amount: 9.99,
    type: "anual",
    billingDay: 10,
  },
  {
    id: "2",
    name: "Amazon",
    icon: "cart",
    color: "#f5a623",
    amount: 14.99,
    type: "anual",
    billingDay: 15,
  },
  {
    id: "3",
    name: "iCloud",
    icon: "settings",
    color: "#e8a87c",
    amount: 2.99,
    type: "mensual",
    billingDay: 5,
  },
  {
    id: "4",
    name: "Netflix",
    icon: "play",
    color: "#e8a87c",
    amount: 15.99,
    type: "mensual",
    billingDay: 2,
  },
  {
    id: "5",
    name: "iCloud+",
    icon: "cloud",
    color: "#e8a87c",
    amount: 2.99,
    type: "mensual",
    billingDay: 26,
  },
];
