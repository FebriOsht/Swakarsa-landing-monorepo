'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, PenTool, FileText, Settings, LogOut, Layers } from 'lucide-react';

export default function Sidebar() {
  const pathname = usePathname();
  
  const menuItems = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Tulis Artikel', href: '/admin/blog/create', icon: PenTool },
    { name: 'Daftar Artikel', href: '/admin/blog', icon: FileText },
    { name: 'Pengaturan', href: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="flex flex-col h-full bg-slate-900 text-white w-64 fixed left-0 top-0 bottom-0 z-50 shadow-2xl">
      {/* Logo Area */}
      <div className="h-20 flex items-center px-8 border-b border-slate-800 bg-slate-950">
        <div className="flex items-center gap-2 text-cyan-400">
          <Layers className="w-8 h-8" />
          <span className="text-xl font-bold tracking-tight text-white">
            Swakarsa<span className="text-cyan-400">Admin</span>
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-8 space-y-2 overflow-y-auto">
        <p className="px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
          Menu Utama
        </p>
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center px-4 py-3.5 text-sm font-medium rounded-xl transition-all duration-200 group ${
                isActive
                  ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-900/50'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <item.icon className={`w-5 h-5 mr-3 transition-colors ${isActive ? 'text-white' : 'text-slate-500 group-hover:text-cyan-400'}`} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Footer / Logout */}
      <div className="p-4 border-t border-slate-800 bg-slate-950">
        <div className="flex items-center gap-3 mb-4 px-2">
           <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold text-sm">
             A
           </div>
           <div>
             <p className="text-sm font-medium text-white">Admin</p>
             <p className="text-xs text-slate-500">Super Administrator</p>
           </div>
        </div>
        <form action={async () => {
            window.location.href = "/api/auth/signout";
        }}>
          <button type="submit" className="flex items-center justify-center w-full px-4 py-2.5 text-sm font-medium text-red-400 bg-red-500/10 rounded-lg hover:bg-red-500 hover:text-white transition-all duration-300">
            <LogOut className="w-4 h-4 mr-2" />
            Keluar
          </button>
        </form>
      </div>
    </div>
  );
}