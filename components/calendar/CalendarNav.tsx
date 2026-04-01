"use client";

interface CalendarNavProps {
  month: string;
  year: number;
  onPrev: () => void;
  onNext: () => void;
}

export default function CalendarNav({
  month,
  year,
  onPrev,
  onNext,
}: CalendarNavProps) {
  return (
    <div className="flex items-center gap-2 sm:gap-4">
      <NavArrow direction="left" onClick={onPrev} />
      <h1 className="text-white font-bold tracking-widest uppercase text-lg sm:text-2xl">
        {month}, {year}
      </h1>
      <NavArrow direction="right" onClick={onNext} />
    </div>
  );
}

interface NavArrowProps {
  direction: "left" | "right";
  onClick: () => void;
}

export function NavArrow({ direction, onClick }: NavArrowProps) {
  return (
    <button
      onClick={onClick}
      className="text-white opacity-70 hover:opacity-100 transition-opacity cursor-pointer"
      aria-label={direction === "left" ? "Mes anterior" : "Mes siguiente"}
    >
      {direction === "left" ? (
        <svg width="10" height="16" viewBox="0 0 10 16" fill="none">
          <path
            d="M8.5 1.5L1.5 8L8.5 14.5"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : (
        <svg width="10" height="16" viewBox="0 0 10 16" fill="none">
          <path
            d="M1.5 1.5L8.5 8L1.5 14.5"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </button>
  );
}
