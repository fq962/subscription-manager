import Calendar from "@/components/calendar/Calendar";
import AuthGuard from "@/components/auth/AuthGuard";

export default function Home() {
  return (
    <AuthGuard>
      <main className="min-h-screen flex items-start sm:items-center justify-center p-0 pt-14 sm:p-8 sm:pt-16">
        <Calendar />
      </main>
    </AuthGuard>
  );
}
