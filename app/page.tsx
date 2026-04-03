import Calendar from "@/components/calendar/Calendar";
import AuthGuard from "@/components/auth/AuthGuard";

export default function Home() {
  return (
    <AuthGuard>
      <main className="min-h-screen flex items-center justify-center p-8 pt-16">
        <Calendar />
      </main>
    </AuthGuard>
  );
}
