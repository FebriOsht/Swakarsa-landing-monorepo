"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useScroll, useMotionValueEvent } from "framer-motion";

interface LandingNavbarProps {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

export default function LandingNavbar({ mobileMenuOpen, setMobileMenuOpen }: LandingNavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 50);
  });

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Services", href: "#services" },
    { name: "Portfolio", href: "#portfolio" },
    { name: "Team", href: "#team" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "#contact" },
    { title: "Custom ERP", href: "/custom-erp" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b
      ${scrolled 
        ? "bg-slate-950/80 backdrop-blur-xl border-white/10 py-4 shadow-[0_4px_30px_rgba(0,0,0,0.1)]" 
        : "bg-transparent border-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo Area */}
        <a href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl overflow-hidden shadow-lg shadow-cyan-500/30 group-hover:scale-110 transition-transform duration-300">
            <img 
              src="/images/logo.jpeg" 
              alt="Swakarsa Digital Logo" 
              className="w-full h-full object-cover"
              loading="eager"
              onError={(e: any) => {
                e.target.onerror = null;
                e.target.src = "/trust/maju mobilindo.jpeg";
              }}
            />
          </div>
          <span className="font-bold text-lg text-white tracking-tight group-hover:text-cyan-400 transition-colors">
            Swakarsa Digital
          </span>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center bg-slate-900/50 rounded-full px-2 p-1 border border-white/5 backdrop-blur-md">
           {navLinks.map((link) => (
             <a
               key={link.name}
               href={link.href}
               className="px-5 py-2 text-sm font-medium text-slate-400 hover:text-white transition-all hover:bg-white/5 rounded-full relative group"
             >
               {link.name}
               <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-cyan-400 transition-all group-hover:w-1/2 opacity-0 group-hover:opacity-100" />
             </a>
           ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-4">
           <a 
             href="/login"
             className="px-5 py-2 rounded-full border border-white/10 text-slate-300 hover:border-cyan-500/50 hover:text-cyan-400 hover:bg-white/5 text-sm font-medium transition-all"
           >
             Login
           </a>
           <a 
             href="#contact"
             className="px-6 py-2.5 rounded-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white text-sm font-semibold shadow-lg shadow-cyan-900/20 hover:shadow-cyan-500/30 transition-all transform hover:-translate-y-0.5"
           >
             Let's Talk
           </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden p-2 text-slate-300 hover:text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <motion.div
         initial={false}
         animate={mobileMenuOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
         className="md:hidden overflow-hidden bg-slate-950 border-b border-white/10"
      >
         <div className="px-6 py-6 space-y-4">
            {navLinks.map((link) => (
               <a 
                 key={link.name} 
                 href={link.href} 
                 onClick={() => setMobileMenuOpen(false)}
                 className="block text-lg font-medium text-slate-400 hover:text-cyan-400"
               >
                 {link.name}
               </a>
            ))}
            <div className="h-px w-full bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent my-2"></div>
            <a 
              href="/login"
              className="block text-lg font-medium px-4 py-2 rounded-lg text-center transition-colors bg-cyan-500/10 text-white hover:bg-cyan-500/20 border border-cyan-500/30 hover:border-cyan-500/50"
              onClick={() => setMobileMenuOpen(false)}
            >
              Login
            </a>
         </div>
      </motion.div>
    </nav>
  );
}

