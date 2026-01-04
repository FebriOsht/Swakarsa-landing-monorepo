import Link from "next/link";
import { 
  LayoutDashboard, 
  ScrollText, 
  Settings, 
  LogOut, 
  Shield, 
  Sword 
} from "lucide-react";
import { signOut } from "@/auth";

export default function Sidebar({ user }: { user: any }) {
  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 hidden md:flex flex-col">
      {/* Logo Area */}
      <div className="p-6 border-b border-slate-800">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-white">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <span className="text-white text-xs">SD</span>
          </div>
          Swakarsa
        </Link>
        <div className="mt-4 px-3 py-1 bg-slate-800 rounded text-xs text-slate-400 font-mono">
           Role: <span className="text-indigo-400 font-bold">{user?.role || "GUEST"}</span>
        </div>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 p-4 space-y-2">
        <div className="px-3 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
          Platform
        </div>
        
        <Link href="/lab" className="flex items-center gap-3 px-3 py-2 text-slate-300 hover:bg-white/5 hover:text-white rounded-lg transition-colors">
          <LayoutDashboard size={18} className="text-cyan-400" />
          The Lab (Client)
        </Link>
        
        <Link href="/guild" className="flex items-center gap-3 px-3 py-2 text-slate-300 hover:bg-white/5 hover:text-white rounded-lg transition-colors">
          <Sword size={18} className="text-purple-400" />
          The Guild (Work)
        </Link>

        <div className="px-3 py-2 mt-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">
          Account
        </div>
        
        <Link href="/settings" className="flex items-center gap-3 px-3 py-2 text-slate-300 hover:bg-white/5 hover:text-white rounded-lg transition-colors">
          <Settings size={18} />
          Settings
        </Link>
      </nav>

      {/* Logout Button */}
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