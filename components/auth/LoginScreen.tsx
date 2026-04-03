"use client";

import { useAuth } from "@/hooks/useAuth";

export default function LoginScreen() {
  const { signInWithGoogle } = useAuth();

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6"
      style={{ backgroundColor: "#221910" }}
    >
      {/* Logo / icon */}
      <div className="flex flex-col items-center gap-6 animate-popIn">
        <div
          className="flex items-center justify-center rounded-2xl"
          style={{
            width: 72,
            height: 72,
            backgroundColor: "#f5a623",
          }}
        >
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="4" width="18" height="16" rx="3" stroke="#1a0f08" strokeWidth="2"/>
            <path d="M3 9h18" stroke="#1a0f08" strokeWidth="2"/>
            <path d="M8 2v4M16 2v4" stroke="#1a0f08" strokeWidth="2" strokeLinecap="round"/>
            <circle cx="8" cy="14" r="1.2" fill="#1a0f08"/>
            <circle cx="12" cy="14" r="1.2" fill="#1a0f08"/>
            <circle cx="16" cy="14" r="1.2" fill="#1a0f08"/>
          </svg>
        </div>

        {/* Title */}
        <div className="text-center">
          <h1
            className="font-bold tracking-widest uppercase text-2xl sm:text-3xl"
            style={{ color: "white" }}
          >
            Subscription
          </h1>
          <p
            className="uppercase tracking-widest text-xs mt-1"
            style={{ color: "#f5a623" }}
          >
            Manager
          </p>
        </div>

        {/* Description */}
        <p
          className="text-center text-sm max-w-xs leading-relaxed"
          style={{ color: "rgba(255,255,255,0.4)" }}
        >
          Visualizá y controlá todas tus suscripciones en un solo lugar.
        </p>

        {/* Divider */}
        <div
          className="w-12"
          style={{ height: 1, backgroundColor: "rgba(255,255,255,0.1)" }}
        />

        {/* Sign in button */}
        <button
          onClick={signInWithGoogle}
          className="flex items-center gap-3 px-6 py-3 rounded-2xl font-semibold text-sm transition-opacity hover:opacity-80 cursor-pointer"
          style={{
            backgroundColor: "rgba(255,255,255,0.06)",
            color: "white",
            border: "1px solid rgba(255,255,255,0.12)",
          }}
        >
          <GoogleIcon />
          Continuar con Google
        </button>

        {/* Fine print */}
        <p
          className="text-[0.65rem] text-center"
          style={{ color: "rgba(255,255,255,0.2)" }}
        >
          Solo vos tenés acceso a tus datos.
        </p>
      </div>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  );
}
