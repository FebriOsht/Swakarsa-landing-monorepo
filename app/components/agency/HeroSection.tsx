"use client";

import { motion } from "framer-motion";
import { ChevronRight, ChevronDown } from "lucide-react";

// CSS-only Ocean Wave Component - Highly Performant with seamless looping
const OceanWaveHero = () => (
  <div className="absolute bottom-0 left-0 w-full pointer-events-none z-[1] overflow-hidden" style={{ height: '200px' }}>
    {/* Wave Layer 1 - Main wave with seamless loop */}
    <div className="absolute bottom-0 left-0 w-[200%] h-48 ocean-wave">
      <svg
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
      >
        <path
          d="M0,192L48,197.3C96,203,192,213,288,213.3C384,213,480,203,576,186.7C672,171,768,149,864,154.7C960,160,1056,192,1152,197.3C1248,203,1344,181,1392,170.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          fill="url(#waveGradient1)"
        />
        <path
          d="M0,192L48,197.3C96,203,192,213,288,213.3C384,213,480,203,576,186.7C672,171,768,149,864,154.7C960,160,1056,192,1152,197.3C1248,203,1344,181,1392,170.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          fill="url(#waveGradient1)"
          transform="translate(1440, 0)"
        />
        <defs>
          <linearGradient id="waveGradient1" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(34, 211, 238, 0.6)" />
            <stop offset="50%" stopColor="rgba(20, 184, 166, 0.5)" />
            <stop offset="100%" stopColor="rgba(56, 189, 248, 0.4)" />
          </linearGradient>
        </defs>
      </svg>
    </div>
    
    {/* Wave Layer 2 - Secondary wave with different timing */}
    <div className="absolute bottom-0 left-0 w-[200%] h-40 ocean-wave-bob">
      <svg
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
      >
        <path
          d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,213.3C672,224,768,224,864,208C960,192,1056,160,1152,154.7C1248,149,1344,171,1392,181.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          fill="url(#waveGradient2)"
        />
        <path
          d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,213.3C672,224,768,224,864,208C960,192,1056,160,1152,154.7C1248,149,1344,171,1392,181.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          fill="url(#waveGradient2)"
          transform="translate(1440, 0)"
        />
        <defs>
          <linearGradient id="waveGradient2" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(56, 189, 248, 0.5)" />
            <stop offset="50%" stopColor="rgba(34, 211, 238, 0.4)" />
            <stop offset="100%" stopColor="rgba(20, 184, 166, 0.3)" />
          </linearGradient>
        </defs>
      </svg>
    </div>
    
    {/* Wave Layer 3 - Subtle shimmer effect */}
    <div className="absolute bottom-0 left-0 w-[200%] h-32 ocean-wave-shimmer">
      <svg
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
      >
        <path
          d="M0,256L48,245.3C96,235,192,213,288,208C384,203,480,213,576,213.3C672,213,768,203,864,197.3C960,192,1056,192,1152,186.7C1248,181,1344,171,1392,165.3L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          fill="url(#waveGradient3)"
        />
        <path
          d="M0,256L48,245.3C96,235,192,213,288,208C384,203,480,213,576,213.3C672,213,768,203,864,197.3C960,192,1056,192,1152,186.7C1248,181,1344,171,1392,165.3L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          fill="url(#waveGradient3)"
          transform="translate(1440, 0)"
        />
        <defs>
          <linearGradient id="waveGradient3" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(34, 211, 238, 0.4)" />
            <stop offset="100%" stopColor="rgba(20, 184, 166, 0.25)" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  </div>
);

// --- Main Hero Component ---
export default function HeroSection() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-32 pb-32 overflow-hidden z-10 bg-slate-950">
        {/* Subtle animated gradient background */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            background: `
              radial-gradient(circle at 20% 50%, rgba(34, 211, 238, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 80% 80%, rgba(20, 184, 166, 0.08) 0%, transparent 50%),
              radial-gradient(circle at 40% 20%, rgba(56, 189, 248, 0.06) 0%, transparent 50%)
            `,
          }}
        />
        
        {/* Ocean Wave Animation */}
        <OceanWaveHero />

        <div className="container relative z-10 px-4 sm:px-6 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-block mb-6"
          >
             <div className="px-4 py-1.5 rounded-full text-sm font-semibold border backdrop-blur-sm flex items-center gap-2 bg-cyan-500/10 border-cyan-500/30 text-cyan-300">
                 <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
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
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-teal-400 to-blue-400">
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
              <button className="relative overflow-hidden group px-8 py-4 rounded-xl font-semibold transition-all duration-300 bg-white text-slate-950 hover:bg-cyan-50 hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] w-full sm:w-auto text-lg">
                <span className="relative z-10 flex items-center justify-center gap-2">View Our Work <ChevronRight size={20} /></span>
              </button>
            </a>
            <a href="#team" className="w-full sm:w-auto">
              <button className="relative overflow-hidden group px-8 py-4 rounded-xl font-semibold transition-all duration-300 border border-slate-700 text-white hover:border-cyan-500 hover:text-cyan-400 w-full sm:w-auto text-lg">
                <span className="relative z-10 flex items-center justify-center gap-2">Meet the Team</span>
              </button>
            </a>
          </motion.div>
        </div>
        
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: [0, 10, 0] }}
            transition={{ delay: 1, duration: 2, repeat: Infinity }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 z-[5]"
        >
            <ChevronDown size={32} className="text-slate-500" />
        </motion.div>
    </section>
  );
}