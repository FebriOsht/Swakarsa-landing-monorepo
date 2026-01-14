"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuItems = ["Home", "Portfolio", "Services", "Team", "Contact"];

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
          <div className="flex gap-6 px-6 py-2 rounded-full border bg-white/5 border-white/10">
              {menuItems.map((item) => (
              <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-sm font-medium transition-colors hover:text-cyan-400 relative group text-slate-300"
              >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-500 transition-all duration-300 group-hover:w-full"></span>
              </a>
              ))}
          </div>
          
          <div className="flex items-center gap-3">
               <a href="#contact" className="px-4 py-2 rounded-xl font-semibold transition-all duration-300 bg-white text-slate-950 hover:bg-cyan-50">
                  Let's Talk
               </a>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-white/10"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} className="text-white"/> : <Menu size={24} className="text-white" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
          {mobileMenuOpen && (
          <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden border-t bg-slate-950/95 border-white/10"
          >
              <div className="px-6 py-6 flex flex-col gap-4">
              {menuItems.map((item) => (
                  <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-lg font-medium text-slate-300"
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