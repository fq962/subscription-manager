import type { Subscription } from "./types";

interface CalendarDayCellProps {
  day: number | null;
  subscriptions: Subscription[];
  isToday: boolean;
  onClick?: () => void;
}

export default function CalendarDayCell({
  day,
  subscriptions,
  isToday,
  onClick,
}: CalendarDayCellProps) {
  if (!day) {
    return (
      <div
        className="rounded-lg sm:rounded-xl"
        style={{ aspectRatio: "1/1" }}
      />
    );
  }

  const todayBg = "#e8a87c";
  const defaultBg = "#2e1f12";

  const isClickable = subscriptions.length > 0 && !!onClick;

  return (
    <div
      className="rounded-lg sm:rounded-xl p-1 sm:p-2 flex flex-col justify-between relative transition-transform active:scale-95"
      style={{
        aspectRatio: "1/1",
        backgroundColor: isToday ? todayBg : defaultBg,
        cursor: isClickable ? "pointer" : "default",
      }}
      onClick={isClickable ? onClick : undefined}
    >
      {/* Day number */}
      <span
        className="text-[0.6rem] sm:text-sm font-medium leading-none"
        style={{ color: isToday ? "#221910" : "rgba(255,255,255,0.7)" }}
      >
        {day}
      </span>

      {/* Subscription icons — hidden on very small screens */}
      <div className="hidden sm:flex flex-wrap gap-1 mt-1">
        {subscriptions.map((sub) => (
          <SubscriptionIcon key={sub.id} subscription={sub} isToday={isToday} />
        ))}
      </div>

      {/* Dot indicators — always visible */}
      {subscriptions.length > 0 && (
        <div className="absolute bottom-1 right-1 sm:bottom-2 sm:right-2 flex gap-0.5 sm:gap-1">
          {subscriptions.map((sub) => (
            <span
              key={sub.id}
              className="rounded-full"
              style={{
                width: 4,
                height: 4,
                backgroundColor: sub.color,
                display: "inline-block",
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function SubscriptionIcon({
  subscription,
  isToday,
}: {
  subscription: Subscription;
  isToday: boolean;
}) {
  const iconColor = isToday ? "#221910" : subscription.color;

  return (
    <span style={{ color: iconColor }}>
      <Icon type={subscription.icon} />
    </span>
  );
}

export function Icon({
  type,
  size = 12,
}: {
  type: Subscription["icon"];
  size?: number;
}) {
  const sm = `sm:w-[14px] sm:h-[14px]`;
  switch (type) {
    case "music":
      return (
        <svg
          width={size}
          height={size}
          className={sm}
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M9 3v10.55A4 4 0 1 0 11 17V7h4V3H9z" />
        </svg>
      );
    case "cart":
      return (
        <svg
          width={size}
          height={size}
          className={sm}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="9" cy="21" r="1" />
          <circle cx="20" cy="21" r="1" />
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
        </svg>
      );
    case "settings":
      return (
        <svg
          width={size}
          height={size}
          className={sm}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
      );
    case "cloud":
      return (
        <svg
          width={size}
          height={size}
          className={sm}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
        </svg>
      );
    case "play":
      return (
        <svg
          width={size}
          height={size}
          className={sm}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <polygon
            points="10 8 16 12 10 16 10 8"
            fill="currentColor"
            stroke="none"
          />
        </svg>
      );
    default:
      return null;
  }
}
