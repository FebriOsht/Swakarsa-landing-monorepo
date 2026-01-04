"use client";

import { motion } from "framer-motion";
import { ChevronRight, ChevronDown, Code, Cpu, Globe } from "lucide-react";
import { memo, ReactNode } from "react";

// 1. Definisi Tipe Data Props (Supaya tidak merah)
interface FloatingElementProps {
  children: ReactNode;
  delay?: number;
  xRange?: number[];
  yRange?: number[];
  duration?: number;
  className?: string;
}

interface AnimatedGridProps {
  isDark?: boolean;
}

// 2. Komponen dengan Tipe Data yang Jelas
const FloatingElement = memo(({ 
  children, 
  delay = 0, 
  xRange = [0, 20, 0], 
  yRange = [0, -20, 0], 
  duration = 5, 
  className = "" 
}: FloatingElementProps) => (
  <motion.div
    animate={{ x: xRange, y: yRange, rotate: [0, 5, -5, 0] }}
    transition={{ duration: duration, repeat: Infinity, ease: "easeInOut", delay: delay }}
    className={`absolute z-0 ${className}`}
  >
    {children}
  </motion.div>
));

// Menambahkan displayName untuk debugging React yang lebih baik
FloatingElement.displayName = 'FloatingElement';

const AnimatedGrid = memo(({ isDark = true }: AnimatedGridProps) => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
    <div 
      className={`absolute inset-0 opacity-[0.03] ${isDark ? 'bg-white' : 'bg-black'}`}
      style={{
        maskImage: 'linear-gradient(to bottom, transparent, black, transparent)',
        backgroundImage: `linear-gradient(${isDark ? '#fff' : '#000'} 1px, transparent 1px), linear-gradient(to right, ${isDark ? '#fff' : '#000'} 1px, transparent 1px)`,
        backgroundSize: '40px 40px',
      }}
    />
    <motion.div
      animate={{ x: [-100, 100, -100], y: [-50, 50, -50], opacity: [0.3, 0.5, 0.3], scale: [1, 1.2, 1] }}
      transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/30 rounded-full blur-[100px]"
    />
    <motion.div
      animate={{ x: [100, -100, 100], y: [50, -50, 50], opacity: [0.2, 0.4, 0.2], scale: [1.2, 1, 1.2] }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-[120px]"
    />
  </div>
));

AnimatedGrid.displayName = 'AnimatedGrid';

// --- Main Hero Component ---
export default function HeroSection() {
  const isDark = true; // Default dark for simplicity

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-32 pb-32 overflow-hidden z-10 bg-black">
        <AnimatedGrid isDark={isDark} />
        
        {/* Floating Icons */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
             <FloatingElement delay={0} xRange={[-50, 50, -50]} yRange={[-20, 20, -20]} duration={12} className="top-[15%] left-[10%] opacity-20">
                 <Code size={64} className="text-indigo-400" />
             </FloatingElement>
             <FloatingElement delay={2} xRange={[50, -50, 50]} yRange={[30, -30, 30]} duration={15} className="bottom-[20%] right-[10%] opacity-20">
                 <Cpu size={80} className="text-cyan-400" />
             </FloatingElement>
             <FloatingElement delay={1} xRange={[-30, 30, -30]} yRange={[50, -50, 50]} duration={18} className="top-[40%] right-[20%] opacity-10">
                 <Globe size={120} className="text-purple-400" />
             </FloatingElement>
        </div>

        <div className="container relative z-10 px-4 sm:px-6 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-block mb-6"
          >
             <div className="px-4 py-1.5 rounded-full text-sm font-semibold border backdrop-blur-sm flex items-center gap-2 bg-indigo-500/10 border-indigo-500/30 text-indigo-300">
                 <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                 </span>
                 Digital Agency & Freelancer Collective
             </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-5xl sm:text-7xl md:text-8xl font-extrabold tracking-tight mb-8 text-white"
          >
            Swakarsa <br className="hidden sm:block" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 animate-gradient-x">
              Digital
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl md:text-2xl max-w-3xl mx-auto mb-10 leading-relaxed text-slate-400"
          >
            We help businesses build websites, systems, and digital strategies designed to enhance
            <span className="font-semibold mx-1 text-white">credibility</span>, 
            <span className="font-semibold mx-1 text-white">generate leads</span>, and 
            <span className="font-semibold mx-1 text-white">increase sales</span>.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-20"
          >
            <a href="#portfolio" className="w-full sm:w-auto">
              <button className="relative overflow-hidden group px-8 py-4 rounded-xl font-semibold transition-all duration-300 bg-white text-black hover:bg-indigo-50 hover:shadow-[0_0_20px_rgba(99,102,241,0.5)] w-full sm:w-auto text-lg">
                <span className="relative z-10 flex items-center justify-center gap-2">View Our Work <ChevronRight size={20} /></span>
              </button>
            </a>
            <a href="#team" className="w-full sm:w-auto">
              <button className="relative overflow-hidden group px-8 py-4 rounded-xl font-semibold transition-all duration-300 border border-slate-600 text-white hover:border-indigo-500 hover:text-indigo-400 w-full sm:w-auto text-lg">
                <span className="relative z-10 flex items-center justify-center gap-2">Meet the Team</span>
              </button>
            </a>
          </motion.div>
        </div>
        
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: [0, 10, 0] }}
            transition={{ delay: 1, duration: 2, repeat: Infinity }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
        >
            <ChevronDown size={32} className="text-slate-500" />
        </motion.div>
    </section>
  );
}