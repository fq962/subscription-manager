"use client";

import { useAuth } from "@/hooks/useAuth";
import LoginScreen from "./LoginScreen";

interface AuthGuardProps {
  children: React.ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const { user, loading } = useAuth();

  // Splash mientras resuelve la sesión — evita flash del login
  if (loading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: "#221910" }}
      >
        <div className="flex flex-col items-center gap-4">
          <div
            className="rounded-xl flex items-center justify-center"
            style={{ width: 48, height: 48, backgroundColor: "#f5a623", opacity: 0.9 }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="4" width="18" height="16" rx="3" stroke="#1a0f08" strokeWidth="2"/>
              <path d="M3 9h18" stroke="#1a0f08" strokeWidth="2"/>
              <path d="M8 2v4M16 2v4" stroke="#1a0f08" strokeWidth="2" strokeLinecap="round"/>
              <circle cx="8" cy="14" r="1.2" fill="#1a0f08"/>
              <circle cx="12" cy="14" r="1.2" fill="#1a0f08"/>
              <circle cx="16" cy="14" r="1.2" fill="#1a0f08"/>
            </svg>
          </div>
          <p
            className="text-xs uppercase tracking-widest"
            style={{ color: "rgba(255,255,255,0.2)" }}
          >
            Cargando...
          </p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <LoginScreen />;
  }

  return <>{children}</>;
}
