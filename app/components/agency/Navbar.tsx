"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isDark, setIsDark] = useState(true); // Sementara local state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuItems = ["Home", "Portfolio", "Services", "Team", "Contact"];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300
      ${isDark 
        ? "bg-black/80 backdrop-blur-xl border-b border-white/5" 
        : "bg-white/90 backdrop-blur-xl border-b border-gray-200/50"
      }`}>
      <div className="container mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <a href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl overflow-hidden shadow-lg shadow-indigo-500/20 group-hover:scale-110 transition-transform duration-300">
            <img 
              src="/images/logo.jpeg" 
              alt="Swakarsa Digital Logo" 
              className="w-full h-full object-cover"
            />
          </div>
          <span className={`font-bold text-lg tracking-tight ${isDark ? "text-white" : "text-gray-900"}`}>
            Swakarsa Digital
          </span>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <div className={`flex gap-6 px-6 py-2 rounded-full border ${isDark ? "bg-white/5 border-white/10" : "bg-gray-100 border-gray-200"}`}>
              {menuItems.map((item) => (
              <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className={`text-sm font-medium transition-colors hover:text-indigo-500 relative group
                  ${isDark ? "text-slate-300" : "text-gray-600"}`}
              >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-500 transition-all duration-300 group-hover:w-full"></span>
              </a>
              ))}
          </div>
          
          <div className="flex items-center gap-3">
               <a href="#contact" className={`px-4 py-2 rounded-xl font-semibold transition-all duration-300 ${isDark ? "bg-white text-black hover:bg-indigo-50" : "bg-black text-white hover:bg-gray-800"}`}>
                  Let's Talk
               </a>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className={`md:hidden p-2 rounded-lg ${isDark ? "hover:bg-white/10" : "hover:bg-gray-100"}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} className="text-white"/> : <Menu size={24} className={isDark ? "text-white" : "text-black"} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
          {mobileMenuOpen && (
          <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className={`md:hidden overflow-hidden border-t
              ${isDark 
                  ? "bg-black/95 border-white/10" 
                  : "bg-white/95 border-gray-200"
              }`}
          >
              <div className="px-6 py-6 flex flex-col gap-4">
              {menuItems.map((item) => (
                  <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className={`text-lg font-medium ${isDark ? "text-slate-300" : "text-gray-700"}`}
                  onClick={() => setMobileMenuOpen(false)}
                  >
                  {item}
                  </a>
              ))}
              </div>
          </motion.div>
          )}
      </AnimatePresence>
    </nav>
  );
}