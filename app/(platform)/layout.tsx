import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Sidebar from "../components/platform/Sidebar";

export default async function PlatformLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Cek sesi login di level layout
  const session = await auth();

  // Jika tidak login, tendang ke halaman login
  if (!session) {
    redirect("/login");
  }

  return (
    <div className="flex min-h-screen bg-slate-950 text-white">
      {/* Sidebar Kiri (Fixed position diurus di dalam komponen Sidebar) */}
      <Sidebar user={session.user as any} />

      {/* Konten Utama Kanan */}
      {/* lg:ml-64 penting agar konten geser ke kanan saat sidebar muncul di desktop */}
      <main className="flex-1 lg:ml-64 transition-all duration-300 relative w-full">
        <div className="p-4 md:p-8 pb-20 max-w-7xl mx-auto">
            {children}
        </div>
      </main>
    </div>
  );
}