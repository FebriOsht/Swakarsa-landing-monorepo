"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Users, 
  Settings, 
  LogOut, 
  Briefcase, 
  ScrollText, 
  Sword, 
  FlaskConical,
  Menu,
  X,
  ShieldAlert,
  Plus,
  User // Tambahkan icon User
} from "lucide-react";
import { useState } from "react";
import { logout } from "@/app/lib/actions"; // Server Action untuk logout

export default function Sidebar({ user }: { user: any }) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const role = user?.role || "GUEST";

  // Helper untuk styling link aktif/standar
  const linkClass = (isActive: boolean) => 
    `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors group mb-1 text-sm ${
      isActive 
        ? "bg-white/10 text-white shadow-sm" 
        : "text-slate-400 hover:bg-white/5 hover:text-white"
    }`;
  
  // Helper untuk Badge Role
  const roleColor = 
    role === 'ADMIN' ? 'text-red-400' : 
    role === 'CONSULTANT' ? 'text-emerald-400' : 
    'text-indigo-400';

  return (
    <>
      {/* Mobile Toggle */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-slate-800 text-white rounded-md shadow-lg border border-slate-700"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar Container */}
      <aside 
        className={`
          fixed top-0 left-0 h-screen w-64 bg-slate-900 border-r border-slate-800 z-40 transition-transform duration-300 flex flex-col
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* === HEADER: LOGO & IDENTITY === */}
        <div className="p-6 border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-10">
          <Link href="/" className="flex items-center gap-3 font-bold text-lg text-white hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/20 shrink-0">
              <span className="text-white text-xs font-bold">SD</span>
            </div>
            <span className="truncate">Swakarsa</span>
          </Link>
          <div className="mt-4 px-3 py-2 bg-slate-800/50 border border-slate-700/50 rounded-lg text-xs text-slate-400 font-mono flex justify-between items-center">
              <span>Role:</span>
              <span className={`font-bold uppercase tracking-wider ${roleColor}`}>
                {role}
              </span>
          </div>
        </div>

        {/* === BODY: DYNAMIC MENU === */}
        <nav className="flex-1 p-4 overflow-y-auto custom-scrollbar">
          
          {/* 1. MENU KHUSUS ADMIN */}
          {role === 'ADMIN' && (
            <>
              <div className="px-3 py-2 mt-2 text-[10px] font-bold text-red-500/60 uppercase tracking-widest">
                Command Center
              </div>
              <Link href="/admin" className={linkClass(pathname === '/admin')}>
                <ShieldAlert size={18} className="text-red-500/80 group-hover:text-red-400 shrink-0" />
                <span className="font-medium">Admin Panel</span>
              </Link>
              <Link href="/admin/users" className={linkClass(pathname.startsWith('/admin/users'))}>
                <Users size={18} className="text-red-400/80 group-hover:text-red-400 shrink-0" />
                <span className="font-medium">Users & Guild</span>
              </Link>
              <Link href="/admin/projects" className={linkClass(pathname.startsWith('/admin/projects'))}>
                <Briefcase size={18} className="text-red-400/80 group-hover:text-red-400 shrink-0" />
                <span className="font-medium">Projects</span>
              </Link>

              <div className="px-3 py-2 mt-6 text-[10px] font-bold text-slate-600 uppercase tracking-widest">
                Monitoring View
              </div>
              <Link href="/lab" className={linkClass(pathname.startsWith('/lab'))}>
                <FlaskConical size={18} className="text-slate-500 group-hover:text-slate-300 shrink-0" />
                <span className="font-medium">The Lab (Client)</span>
              </Link>
              <Link href="/guild" className={linkClass(pathname.startsWith('/guild'))}>
                <Sword size={18} className="text-slate-500 group-hover:text-slate-300 shrink-0" />
                <span className="font-medium">The Guild (Hero)</span>
              </Link>
            </>
          )}

          {/* 2. MENU KHUSUS KONSULTAN (HERO) */}
          {role === 'CONSULTANT' && (
            <>
              <div className="px-3 py-2 mt-2 text-[10px] font-bold text-emerald-500/60 uppercase tracking-widest">
                Workstation
              </div>
              <Link href="/guild" className={linkClass(pathname === '/guild')}>
                <Sword size={18} className="text-emerald-500/80 group-hover:text-emerald-400 shrink-0" />
                <span className="font-medium">The Guild Hall</span>
              </Link>
              {/* FIX: Changed from /guild/quests to /guild/quest based on folder structure */}
              <Link href="/guild/quest" className={linkClass(pathname.startsWith('/guild/quest'))}>
                <ScrollText size={18} className="text-emerald-400/80 group-hover:text-emerald-300 shrink-0" />
                <span className="font-medium">Quest Board</span>
              </Link>
              <Link href="/guild/squad" className={linkClass(pathname.startsWith('/guild/squad'))}>
                <Users size={18} className="text-emerald-400/80 group-hover:text-emerald-300 shrink-0" />
                <span className="font-medium">My Squad</span>
              </Link>
              <Link href="/guild/profile" className={linkClass(pathname.startsWith('/guild/profile'))}>
                <User size={18} className="text-emerald-400/80 group-hover:text-emerald-300 shrink-0" />
                <span className="font-medium">Hero Profile</span>
              </Link>
            </>
          )}

          {/* 3. MENU KHUSUS CLIENT */}
          {role === 'CLIENT' && (
            <>
               <div className="px-3 py-2 mt-2 text-[10px] font-bold text-indigo-500/60 uppercase tracking-widest">
                Project Workspace
              </div>
              <Link href="/lab" className={linkClass(pathname === '/lab')}>
                <FlaskConical size={18} className="text-indigo-400/80 group-hover:text-indigo-300 shrink-0" />
                <span className="font-medium">Dashboard</span>
              </Link>
              <Link href="/lab/projects" className={linkClass(pathname.startsWith('/lab/projects'))}>
                <Briefcase size={18} className="text-indigo-400/80 group-hover:text-indigo-300 shrink-0" />
                <span className="font-medium">My Projects</span>
              </Link>
              <Link href="/lab/draft" className={linkClass(pathname.startsWith('/lab/draft'))}>
                <Plus size={18} className="text-indigo-400/80 group-hover:text-indigo-300 shrink-0" />
                <span className="font-medium">New Project</span>
              </Link>
            </>
          )}

          {/* 4. COMMON SETTINGS (Semua Role Punya) */}
          <div className="px-3 py-2 mt-6 text-[10px] font-bold text-slate-600 uppercase tracking-widest">
            Account
          </div>
          <Link href="/settings" className={linkClass(pathname.startsWith('/settings'))}>
            <Settings size={18} className="text-slate-500 group-hover:text-slate-300 shrink-0" />
            <span className="font-medium">Settings</span>
          </Link>
        </nav>

        {/* === FOOTER: LOGOUT === */}
        <div className="p-4 border-t border-slate-800 bg-slate-900 sticky bottom-0 z-10">
          <form action={logout}>
              <button 
                type="submit"
                className="w-full flex items-center gap-3 px-3 py-2 text-red-400/80 hover:bg-red-500/10 hover:text-red-300 rounded-lg transition-colors text-sm font-medium group"
              >
                <LogOut size={18} className="group-hover:-translate-x-1 transition-transform shrink-0" />
                <span className="font-medium">Sign Out</span>
              </button>
          </form>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/60 z-30 lg:hidden backdrop-blur-sm transition-opacity"
        />
      )}
    </>
  );
}