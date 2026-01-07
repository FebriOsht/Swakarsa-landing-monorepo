import Link from "next/link";
import { 
  LayoutDashboard, 
  Settings, 
  LogOut, 
  Sword,
  ShieldAlert,
  FlaskConical,
  Plus
} from "lucide-react";
import { signOut } from "@/auth";

export default function Sidebar({ user }: { user: any }) {
  const role = user?.role || "GUEST";

  // Helper untuk styling link aktif/standar
  const linkClass = "flex items-center gap-3 px-3 py-2 text-slate-300 hover:bg-white/5 hover:text-white rounded-lg transition-colors group mb-1";
  
  // Helper untuk Badge Role
  const roleColor = 
    role === 'ADMIN' ? 'text-red-400' : 
    role === 'CONSULTANT' ? 'text-emerald-400' : 
    'text-indigo-400';

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 hidden md:flex flex-col h-screen sticky top-0">
      {/* === HEADER: LOGO & IDENTITY === */}
      <div className="p-6 border-b border-slate-800">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-white hover:opacity-80 transition-opacity">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <span className="text-white text-xs font-bold">SD</span>
          </div>
          Swakarsa
        </Link>
        <div className="mt-4 px-3 py-1.5 bg-slate-800/50 border border-slate-700 rounded-lg text-xs text-slate-400 font-mono flex justify-between items-center">
           <span>Role:</span>
           <span className={`font-bold ${roleColor}`}>
             {role}
           </span>
        </div>
      </div>

      {/* === BODY: DYNAMIC MENU === */}
      <nav className="flex-1 p-4 overflow-y-auto">
        
        {/* 1. MENU KHUSUS ADMIN */}
        {role === 'ADMIN' && (
          <>
            <div className="px-3 py-2 text-xs font-semibold text-red-500/80 uppercase tracking-wider mb-2">
              Command Center
            </div>
            <Link href="/admin" className={`${linkClass} hover:bg-red-500/10 hover:text-red-400`}>
              <ShieldAlert size={18} className="text-red-500" />
              Admin Panel
            </Link>

            <div className="px-3 py-2 mt-6 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
              Monitoring View
            </div>
            <Link href="/lab" className={linkClass}>
              <FlaskConical size={18} className="text-slate-500" />
              The Lab (Client View)
            </Link>
            <Link href="/guild" className={linkClass}>
              <Sword size={18} className="text-slate-500" />
              The Guild (Hero View)
            </Link>
          </>
        )}

        {/* 2. MENU KHUSUS KONSULTAN (HERO) */}
        {role === 'CONSULTANT' && (
          <>
            <div className="px-3 py-2 text-xs font-semibold text-emerald-500/80 uppercase tracking-wider mb-2">
              Workstation
            </div>
            <Link href="/guild" className={`${linkClass} hover:bg-emerald-500/10 hover:text-emerald-400`}>
              <Sword size={18} className="text-emerald-500" />
              The Guild Hall
            </Link>
            {/* Konsultan tidak butuh akses ke Lab/Drafting */}
          </>
        )}

        {/* 3. MENU KHUSUS CLIENT */}
        {role === 'CLIENT' && (
          <>
             <div className="px-3 py-2 text-xs font-semibold text-indigo-500/80 uppercase tracking-wider mb-2">
              Project Workspace
            </div>
            <Link href="/lab" className={linkClass}>
              <FlaskConical size={18} className="text-indigo-400" />
              Dashboard
            </Link>
            <Link href="/lab/draft" className={linkClass}>
              <Plus size={18} className="text-indigo-400" />
              New Project
            </Link>
          </>
        )}

        {/* 4. COMMON SETTINGS (Semua Role Punya) */}
        <div className="px-3 py-2 mt-6 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
          Account
        </div>
        <Link href="/settings" className={linkClass}>
          <Settings size={18} className="text-slate-400" />
          Settings
        </Link>
      </nav>

      {/* === FOOTER: LOGOUT === */}
      <div className="p-4 border-t border-slate-800">
        <form
          action={async () => {
            "use server";
            await signOut({ redirectTo: "/login" });
          }}
        >
          <button className="flex w-full items-center gap-3 px-3 py-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors text-sm font-medium">
            <LogOut size={18} />
            Sign Out
          </button>
        </form>
      </div>
    </aside>
  );
}