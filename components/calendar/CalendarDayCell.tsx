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
                width: 6,
                height: 6,
                backgroundColor: isToday ? "rgba(34,25,16,0.6)" : sub.color,
                boxShadow: isToday ? "none" : `0 0 4px ${sub.color}`,
                display: "inline-block",
                flexShrink: 0,
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
  const color = isToday ? "#221910" : subscription.color;

  if (!subscription.icon) {
    return (
      <span
        className="text-[0.5rem] font-bold leading-none"
        style={{ color }}
      >
        {subscription.name.charAt(0).toUpperCase()}
      </span>
    );
  }

  return (
    <span
      className="w-3 h-3 sm:w-3.5 sm:h-3.5 flex-shrink-0 [&>svg]:w-full [&>svg]:h-full"
      style={{ color }}
      dangerouslySetInnerHTML={{ __html: subscription.icon }}
    />
  );
}
