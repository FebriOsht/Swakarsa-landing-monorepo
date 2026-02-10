"use client";

import { useState, useRef, useEffect } from "react";
import { Menu, X, ChevronDown, PlayCircle, LayoutGrid } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [erpDropdownOpen, setErpDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const menuItems = ["Home", "Portfolio", "Services", "Team", "Contact"];

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setErpDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-slate-950/80 backdrop-blur-xl border-b border-white/5">
      <div className="container mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <a href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl overflow-hidden shadow-lg shadow-cyan-500/20 group-hover:scale-110 transition-transform duration-300">
            <img 
              src="/images/logo.jpeg" 
              alt="Swakarsa Digital Logo" 
              className="w-full h-full object-cover"
            />
          </div>
          <span className="font-bold text-lg tracking-tight text-white">
            Swakarsa Digital
          </span>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <div className="flex gap-1 px-2 py-2 rounded-full border bg-white/5 border-white/10 items-center">
              {menuItems.map((item) => (
              <a
                  key={item}
                  href={`/${item === 'Home' ? '' : item === 'Custom ERP' ? 'custom-erp' : `#${item.toLowerCase()}`}`}
                  className="text-sm font-medium transition-colors hover:text-cyan-400 relative group text-slate-300 px-4 py-1"
              >
                  {item}
                  <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-cyan-500 scale-x-0 transition-transform duration-300 group-hover:scale-x-100 origin-center"></span>
              </a>
              ))}

              {/* Custom ERP Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setErpDropdownOpen(!erpDropdownOpen)}
                  className={`flex items-center gap-1 text-sm font-medium transition-colors px-4 py-1 group ${erpDropdownOpen ? 'text-cyan-400' : 'text-slate-300 hover:text-cyan-400'}`}
                >
                  Custom ERP
                  <ChevronDown size={14} className={`transition-transform duration-300 ${erpDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {erpDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full right-0 mt-2 w-56 bg-slate-900 border border-white/10 rounded-xl shadow-xl shadow-cyan-900/10 overflow-hidden z-50"
                    >
                      <div className="p-1">
                        <a 
                          href="/custom-erp" 
                          className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/5 transition-colors group"
                          onClick={() => setErpDropdownOpen(false)}
                        >
                          <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400 group-hover:bg-cyan-500 group-hover:text-white transition-colors">
                            <LayoutGrid size={16} />
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-white">Overview</div>
                            <div className="text-xs text-slate-400">Halaman Utama</div>
                          </div>
                        </a>
                        <a 
                          href="/custom-erp/demo" 
                          className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/5 transition-colors group"
                          onClick={() => setErpDropdownOpen(false)}
                        >
                          <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center text-red-400 group-hover:bg-red-600 group-hover:text-white transition-colors">
                            <PlayCircle size={16} />
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-white">Live Demo</div>
                            <div className="text-xs text-slate-400">Tonton Video Demo</div>
                          </div>
                        </a>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
          </div>
          
          <div className="flex items-center gap-3">
               <a href="#contact" className="px-4 py-2 rounded-xl font-semibold transition-all duration-300 bg-white text-slate-950 hover:bg-cyan-50 hover:shadow-lg hover:shadow-cyan-500/20">
                  Let's Talk
               </a>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-white/10 text-slate-300"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
          {mobileMenuOpen && (
          <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden border-t bg-slate-950/95 border-white/10 backdrop-blur-xl"
          >
              <div className="px-6 py-6 flex flex-col gap-2">
              {menuItems.map((item) => (
                  <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-lg font-medium text-slate-300 py-2 border-b border-white/5 hover:text-cyan-400 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                  >
                  {item}
                  </a>
              ))}
              
              {/* Mobile Custom ERP Section */}
              <div className="py-2 border-b border-white/5">
                <div className="text-lg font-medium text-cyan-400 mb-2">Custom ERP</div>
                <div className="pl-4 flex flex-col gap-2">
                  <a 
                    href="/custom-erp"
                    className="flex items-center gap-2 text-slate-300 hover:text-white"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <LayoutGrid size={16} /> Overview
                  </a>
                  <a 
                    href="/custom-erp/demo"
                    className="flex items-center gap-2 text-slate-300 hover:text-white"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <PlayCircle size={16} /> Live Demo Video
                  </a>
                </div>
              </div>

              <a 
                href="#contact"
                className="mt-4 w-full text-center px-4 py-3 rounded-xl font-bold bg-cyan-600 text-white hover:bg-cyan-500 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Let's Talk
              </a>
              </div>
          </motion.div>
          )}
      </AnimatePresence>
    </nav>
  );
}