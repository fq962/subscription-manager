"use client";

import { useState } from "react";
import AddSubscriptionModal from "./AddSubscriptionModal";

interface AddSubscriptionButtonProps {
  onSuccess: () => void;
}

export default function AddSubscriptionButton({ onSuccess }: AddSubscriptionButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="flex justify-center mt-3 sm:mt-4">
        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl font-semibold uppercase tracking-widest text-[0.65rem] sm:text-xs transition-opacity hover:opacity-80 cursor-pointer"
          style={{
            backgroundColor: "#f5a623",
            color: "#1a0f08",
          }}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path
              d="M6 1V11M1 6H11"
              stroke="#1a0f08"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          Nueva Suscripción
        </button>
      </div>

      {open && (
        <AddSubscriptionModal
          onClose={() => setOpen(false)}
          onSuccess={onSuccess}
        />
      )}
    </>
  );
}
