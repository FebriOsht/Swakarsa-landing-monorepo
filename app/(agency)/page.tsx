"use client";

import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent, useMotionValue, useSpring, animate, PanInfo } from "framer-motion";
import { 
  Mail, Phone, Globe, Menu, X, ChevronRight, ExternalLink, ArrowRight, 
  Code, Cpu, Layers, Sparkles, ChevronDown, Bug, ChevronLeft,
  MessageSquareQuote, CheckCircle2, HelpCircle, Plus, Minus, Rocket, Search
} from "lucide-react";
import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";

// ================= CYBER MECHA WHALE COMPONENT (JUMPING ANIMATION) =================
const CyberWhale = () => {
  const [isJumping, setIsJumping] = useState(false);

  useEffect(() => {
    let initialTimer: NodeJS.Timeout;
    let intervalTimer: NodeJS.Timeout;
    let resetTimer: NodeJS.Timeout;

    const startJumping = () => {
      setIsJumping(true);
      // Reset after animation completes
      resetTimer = setTimeout(() => setIsJumping(false), 4000);
    };

    // Initial jump after 3 seconds
    initialTimer = setTimeout(startJumping, 3000);
    
    // Set interval for subsequent jumps
    intervalTimer = setInterval(startJumping, 20000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(intervalTimer);
      clearTimeout(resetTimer);
    };
  }, []);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Water surface line */}
      <div className="absolute top-1/3 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent z-10"></div>

      {/* Jumping Whale Animation */}
      <motion.div
        initial={{ 
          x: "120vw", 
          y: "100vh",
          rotate: 0,
          opacity: 0 
        }}
        animate={isJumping ? {
          x: ["120vw", "40vw", "-20vw", "-50vw"],
          y: ["100vh", "40vh", "20vh", "100vh"],
          rotate: [0, -15, 0, 15],
          opacity: [0, 1, 1, 0]
        } : {
          x: "120vw",
          y: "100vh",
          opacity: 0
        }}
        transition={isJumping ? {
          duration: 4,
          times: [0, 0.3, 0.7, 1],
          ease: ["easeOut", "easeInOut", "easeIn"]
        } : {
          duration: 0
        }}
        className="absolute w-[500px] sm:w-[700px] md:w-[900px] opacity-90 z-10" // Fixed Z-index to not block content
      >
        <svg
          viewBox="0 0 800 500"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-[0_0_30px_rgba(6,182,212,0.5)]"
        >
          <defs>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            
            <linearGradient id="metalGradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#1e293b" />
              <stop offset="40%" stopColor="#334155" />
              <stop offset="50%" stopColor="#94a3b8" />
              <stop offset="60%" stopColor="#1e293b" />
              <stop offset="100%" stopColor="#0f172a" />
            </linearGradient>

            <linearGradient id="darkMetal" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0f172a" />
              <stop offset="100%" stopColor="#1e293b" />
            </linearGradient>

            <radialGradient id="energyGradient" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0%" stopColor="#cffafe" />
              <stop offset="40%" stopColor="#22d3ee" />
              <stop offset="100%" stopColor="rgba(34, 211, 238, 0)" />
            </radialGradient>
          </defs>

          {/* Main Whale Body */}
          <path
            d="M 100 250 Q 300 150 580 220 L 580 280 Q 300 350 100 250"
            fill="#0f172a"
            stroke="none"
          />

          {/* Armor Plate: Head */}
          <path
            d="M 80 260 L 150 210 L 250 200 L 220 300 L 120 290 Z"
            fill="url(#metalGradient)"
            stroke="#22d3ee"
            strokeWidth="1.5"
            filter="url(#glow)"
          />
          
          {/* Eye */}
          <circle cx="160" cy="260" r="6" fill="#000" stroke="#22d3ee" strokeWidth="2" />
          <motion.circle 
            cx="160" cy="260" r="3" fill="#ef4444" 
            animate={{ opacity: [1, 0.3, 1] }} 
            transition={{ duration: 2, repeat: Infinity }}
            filter="url(#glow)"
          />

          {/* Armor Plate: Mid Body Top */}
          <path
            d="M 260 200 L 450 190 L 580 220 L 500 250 L 260 220 Z"
            fill="url(#metalGradient)"
            stroke="#22d3ee"
            strokeWidth="1"
            className="drop-shadow-lg"
          />

          {/* Armor Plate: Mid Body Bottom */}
          <path
            d="M 230 300 L 500 250 L 580 280 L 400 310 Z"
            fill="url(#darkMetal)"
            stroke="#22d3ee"
            strokeWidth="1"
          />

          {/* Energy Core (The Reactor) */}
          <circle cx="400" cy="250" r="25" fill="#0f172a" stroke="#22d3ee" strokeWidth="2" />
          <motion.circle 
            cx="400" cy="250" r="15" 
            fill="url(#energyGradient)"
            animate={{ r: [15, 18, 15], opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 3, repeat: Infinity }}
            filter="url(#glow)"
          />
          
          {/* Core Spinner - Fixed Style Origin */}
          <motion.g
            style={{ transformOrigin: "400px 250px" }}
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          >
            <rect x="398" y="225" width="4" height="50" fill="#22d3ee" />
            <rect x="375" y="248" width="50" height="4" fill="#22d3ee" />
          </motion.g>

          {/* Tail - Fixed Style Origin */}
          <motion.g
            style={{ transformOrigin: "580px 250px" }}
            animate={{ 
              rotateZ: [-5, 10, -5],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <path
              d="M 580 220 L 680 230 L 680 270 L 580 280 Z"
              fill="url(#metalGradient)"
              stroke="#22d3ee"
              strokeWidth="1"
            />
            
            {/* Tail Fluke - Fixed Style Origin */}
            <motion.g
              style={{ transformOrigin: "680px 250px", originX: "680px", originY: "250px" }}
              animate={{ rotateZ: [-10, 15, -10] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
            >
              <path
                d="M 680 240 L 760 180 L 740 250 L 760 320 L 680 260 Z"
                fill="url(#darkMetal)"
                stroke="#22d3ee"
                strokeWidth="2"
                filter="url(#glow)"
              />
              
              {/* Thruster Flame */}
              <motion.path
                initial={{ d: "M 720 250 L 800 250 L 720 260" }}
                fill="url(#energyGradient)"
                opacity="0.8"
                filter="url(#glow)"
                animate={{ d: [
                  "M 720 250 L 800 250 L 720 260", 
                  "M 720 250 L 850 250 L 720 260",
                  "M 720 250 L 800 250 L 720 260"
                ]}}
                transition={{ duration: 0.2, repeat: Infinity }}
              />
            </motion.g>
          </motion.g>

          {/* Side Fin - Fixed Style Origin */}
          <motion.g 
            style={{ transformOrigin: "300px 260px" }}
            initial={{ rotate: 0 }}
            animate={{ rotate: [0, -20, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            <path
              d="M 300 260 L 260 380 L 400 350 L 380 280 Z"
              fill="url(#metalGradient)"
              stroke="#22d3ee"
              strokeWidth="2"
              filter="url(#glow)"
              opacity="0.95"
            />
            
            {/* Fin Mechanism Details */}
            <circle cx="300" cy="260" r="10" fill="#1e293b" stroke="#22d3ee" />
            <path d="M 300 260 L 280 360" stroke="#06b6d4" strokeWidth="1" strokeDasharray="4 2" />
          </motion.g>

          {/* Water Splash Effect (during jump) */}
          <AnimatePresence>
            {isJumping && (
              <>
                {/* Splash 1 */}
                <motion.g
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: [0, 0.8, 0], scale: [0, 1, 1.5] }}
                  transition={{ duration: 1, times: [0, 0.5, 1] }}
                  exit={{ opacity: 0 }}
                >
                  <circle cx="100" cy="280" r="40" fill="url(#energyGradient)" opacity="0.3" />
                  <circle cx="120" cy="270" r="25" fill="url(#energyGradient)" opacity="0.4" />
                </motion.g>
                
                {/* Splash 2 */}
                <motion.g
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: [0, 0.6, 0], scale: [0, 1, 1.3] }}
                  transition={{ duration: 1, delay: 0.2, times: [0, 0.5, 1] }}
                  exit={{ opacity: 0 }}
                >
                  <circle cx="60" cy="300" r="30" fill="url(#energyGradient)" opacity="0.3" />
                </motion.g>
              </>
            )}
          </AnimatePresence>
        </svg>
      </motion.div>

      {/* Water Ripple Effects */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full border border-cyan-500/20"
            style={{
              left: `${30 + i * 15}%`,
              top: "33%",
              width: `${100 + i * 50}px`,
              height: `${100 + i * 50}px`,
            }}
            animate={{
              scale: [0, 2],
              opacity: [0.5, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeOut"
            }}
          />
        ))}
      </div>
    </div>
  );
};
  
// ================= UTILITY COMPONENTS =================

// Optimize CountUp with useCallback and more efficient requestAnimationFrame
const CountUpAlt = ({ end, suffix = "", duration = 2.5, delay = 0 }: any) => {
  const [count, setCount] = useState(0);
  const frameRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);

  useEffect(() => {
    const startAnimation = () => {
      startTimeRef.current = Date.now();
      
      const animate = () => {
        const elapsed = Date.now() - startTimeRef.current;
        const progress = Math.min(elapsed / (duration * 1000), 1);
        
        setCount(Math.floor(progress * end));
        
        if (progress < 1) {
          frameRef.current = requestAnimationFrame(animate);
        } else {
          setCount(end);
        }
      };
      
      frameRef.current = requestAnimationFrame(animate);
    };

    const timeoutId = setTimeout(startAnimation, delay * 1000);

    return () => {
      clearTimeout(timeoutId);
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [end, duration, delay]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
};

// Simple Card components
const Card = ({ children, className = "" }: any) => (
  <div
    className={`rounded-2xl border border-slate-800 bg-slate-900/80 backdrop-blur-sm ${className}`}
  >
    {children}
  </div>
);

const CardContent = ({ children, className = "" }: any) => (
  <div className={`p-6 ${className}`}>{children}</div>
);

const Button = ({ children, className = "", variant, size, onClick }: any) => (
  <button
    onClick={onClick}
    className={`relative overflow-hidden group px-6 py-3 rounded-xl font-semibold transition-all duration-300
    ${
      variant === "outline"
        ? "border border-slate-600 text-white hover:border-cyan-400 hover:text-cyan-300"
        : "bg-white text-black hover:bg-cyan-50 hover:shadow-[0_0_20px_rgba(34,211,238,0.4)]"
    }
    ${size === "lg" ? "px-8 py-4 text-lg" : ""}
    ${size === "sm" ? "px-4 py-2 text-sm" : ""}
    ${className}`}
  >
    <span className="relative z-10 flex items-center justify-center gap-2">{children}</span>
    {variant !== "outline" && (
      <div className="absolute inset-0 h-full w-full scale-0 rounded-xl transition-all duration-300 group-hover:scale-100 group-hover:bg-cyan-500/10" />
    )}
  </button>
);

// ================= MODERN NAVBAR COMPONENT =================
const Navbar = ({ mobileMenuOpen, setMobileMenuOpen }: any) => {
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 50);
  });

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Process", href: "#process" },
    { name: "Team", href: "#team" },
    { name: "Services", href: "#services" },
    { name: "Portfolio", href: "#portfolio" },
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
          <div className="w-10 h-10 rounded-xl overflow-hidden shadow-lg shadow-cyan-500/30 group-hover:scale-110 transition-transform duration-300 group-hover:shadow-cyan-500/50">
            <img 
              src="/images/logo.jpeg" 
              alt="Swakarsa Digital Logo" 
              className="w-full h-full object-cover"
              loading="eager"
              onError={(e: any) => {
                e.target.onerror = null;
                // Fallback placedholder
                e.target.src = "https://placehold.co/100x100/333/FFF?text=S";
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
              href="#contact"
              className="block text-lg font-medium px-4 py-2 rounded-lg text-center transition-colors bg-cyan-500/10 text-white hover:bg-cyan-500/20 border border-cyan-500/30 hover:border-cyan-500/50"
              onClick={() => setMobileMenuOpen(false)}
            >
              Let's Talk
            </a>
         </div>
      </motion.div>
    </nav>
  );
};

// ================= CYBER FROG V3 COMPONENT =================
const CyberFrog = () => {
  const [isRibbiting, setIsRibbiting] = useState(false);
  const [isBlinking, setIsBlinking] = useState(false);
  const [msgIndex, setMsgIndex] = useState(0);
  const [bug, setBug] = useState<{ x: number; y: number; status: 'flying' | 'being_eaten' } | null>(null);

  useEffect(() => {
    let initialTimer: NodeJS.Timeout;
    let intervalTimer: NodeJS.Timeout;
    let eatenTimer: NodeJS.Timeout;
    let clearBugTimer: NodeJS.Timeout;
    let ribbitTimer: NodeJS.Timeout;

    const spawnBugSequence = () => {
      const bugX = Math.random() * 80 + 10;
      const bugY = Math.random() * 50 + 5;
      setBug({ x: bugX, y: bugY, status: 'flying' });
      
      eatenTimer = setTimeout(() => {
        setBug(prev => prev ? { ...prev, status: 'being_eaten' } : null);
        setIsRibbiting(true);
        ribbitTimer = setTimeout(() => setIsRibbiting(false), 500);
      }, 2000);
      
      clearBugTimer = setTimeout(() => {
        setBug(null);
      }, 2300);
    };

    initialTimer = setTimeout(spawnBugSequence, 3000);
    intervalTimer = setInterval(spawnBugSequence, 20000);
    
    return () => {
      clearTimeout(initialTimer);
      clearInterval(intervalTimer);
      clearTimeout(eatenTimer);
      clearTimeout(clearBugTimer);
      clearTimeout(ribbitTimer);
    };
  }, []);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 150 };
  const pupilX = useSpring(useTransform(mouseX, [-500, 500], [-6, 6]), springConfig);
  const pupilY = useSpring(useTransform(mouseY, [-500, 500], [-6, 6]), springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (bug) {
        const targetX = (bug.x - 50) * 10; 
        const targetY = (bug.y - 50) * 10;
        mouseX.set(targetX);
        mouseY.set(targetY);
      } else {
        const centerX = window.innerWidth - 100;
        const centerY = 150; 
        mouseX.set(e.clientX - centerX);
        mouseY.set(e.clientY - centerY);
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY, bug]);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    const blinkLoop = () => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 150);
      const nextBlink = Math.random() * 4000 + 2000;
      timeoutId = setTimeout(blinkLoop, nextBlink);
    };
    timeoutId = setTimeout(blinkLoop, 2000);
    return () => clearTimeout(timeoutId);
  }, []);

  const messages = ["SYSTEM: ONLINE 🐸", "TARGET: LOCKED 🎯", "BUG: ELIMINATED 🦟", "YUMMY.DAT LOADED"];
  const handleRibbit = () => {
    if (isRibbiting) return;
    setMsgIndex((prev) => (prev + 1) % messages.length);
    setIsRibbiting(true);
    setTimeout(() => setIsRibbiting(false), 1500);
  };

  return (
    <motion.div
      className="absolute top-24 right-10 md:top-32 md:right-20 z-30 cursor-grab active:cursor-grabbing hidden sm:block"
      drag
      dragConstraints={{ left: -50, right: 50, top: -50, bottom: 50 }}
      dragElastic={0.2}
      whileDrag={{ scale: 1.2, rotate: 5 }}
      animate={{ y: [0, -15, 0] }}
      transition={{ y: { duration: 3, repeat: Infinity, ease: "easeInOut" } }}
      onClick={handleRibbit}
      whileHover={{ scale: 1.05 }}
    >
      <AnimatePresence mode="wait">
        {isRibbiting && !bug && (
          <motion.div
            initial={{ opacity: 0, scale: 0, x: -50, y: 0 }}
            animate={{ opacity: 1, scale: 1, x: -140, y: -60 }}
            exit={{ opacity: 0, scale: 0, transition: { duration: 0.2 } }}
            className="absolute z-40 pointer-events-none"
          >
            <div className="bg-slate-900/90 text-cyan-400 px-4 py-2 rounded-lg border border-cyan-500 shadow-[0_0_20px_rgba(6,182,212,0.5)] whitespace-nowrap backdrop-blur-sm relative">
                <span className="font-mono font-bold text-xs tracking-widest flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-ping" />
                  {messages[msgIndex]}
                </span>
                <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-0 h-0 border-t-[6px] border-t-transparent border-l-[8px] border-l-slate-900 border-b-[6px] border-b-transparent" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.svg
        width="140"
        height="160"
        viewBox="0 0 100 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ filter: 'drop-shadow(0 15px 25px rgba(6, 182, 212, 0.25))' }}
        animate={isRibbiting ? { rotate: [-2, 2, -2, 2, 0], scale: [1, 1.1, 0.95, 1] } : {}}
        transition={{ type: "spring", stiffness: 300, damping: 10 }}
      >
        <motion.g animate={{ y: [0, 3, 0], rotate: [0, 2, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>
          <path d="M15 95C8 95 3 105 8 110" stroke="#064e3b" strokeWidth="6" strokeLinecap="round" fill="#166534" />
          <path d="M85 95C92 95 97 105 92 110" stroke="#064e3b" strokeWidth="6" strokeLinecap="round" />
          <ellipse cx="12" cy="108" rx="5" ry="3" fill="#064e3b" />
          <ellipse cx="88" cy="108" rx="5" ry="3" fill="#064e3b" />
        </motion.g>
        <motion.g animate={{ y: [0, -2, 0] }} transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}>
          <ellipse cx="25" cy="80" rx="8" ry="12" fill="#15803d" />
          <ellipse cx="75" cy="80" rx="8" ry="12" fill="#15803d" />
          <ellipse cx="25" cy="88" rx="6" ry="4" fill="#4ade80" />
          <ellipse cx="75" cy="88" rx="6" ry="4" fill="#4ade80" />
        </motion.g>
        <ellipse cx="50" cy="70" rx="38" ry="30" fill="#16a34a" />
        <motion.ellipse cx="50" cy="72" rx="20" ry="15" fill="#86efac" animate={isRibbiting ? { rx: [20, 35, 20], ry: [15, 28, 15], fill: ["#86efac", "#4ade80", "#86efac"] } : { rx: [20, 22, 20], ry: [15, 17, 15], fillOpacity: [0.6, 0.8, 0.6] }} transition={isRibbiting ? { duration: 0.4, repeat: 3 } : { duration: 2, repeat: Infinity, ease: "easeInOut" }} />
        <path d="M35 70 L65 70 M40 75 L60 75 M45 80 L55 80" stroke="#14532d" strokeWidth="2" strokeOpacity="0.3" strokeLinecap="round" />
        <circle cx="32" cy="50" r="16" fill="#16a34a" />
        <circle cx="68" cy="50" r="16" fill="#16a34a" />
        <ellipse cx="50" cy="55" rx="20" ry="18" fill="#16a34a" />
        <g>
            <circle cx="32" cy="50" r="11" fill="#e2e8f0" />
            <circle cx="68" cy="50" r="11" fill="#e2e8f0" />
            <motion.g style={{ x: pupilX, y: pupilY }}>
                <circle cx="32" cy="50" r="6" fill="#0f172a" />
                <circle cx="68" cy="50" r="6" fill="#0f172a" />
                <circle cx="34" cy="48" r="2.5" fill="white" opacity="0.9" />
                <circle cx="70" cy="48" r="2.5" fill="white" opacity="0.9" />
            </motion.g>
        </g>
        <motion.path d="M20 50 Q32 38 44 50" stroke="#15803d" strokeWidth="12" strokeLinecap="round" fill="none" initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: isBlinking ? 1 : 0, opacity: isBlinking ? 1 : 0 }} transition={{ duration: 0.1 }} />
        <motion.path d="M56 50 Q68 38 80 50" stroke="#15803d" strokeWidth="12" strokeLinecap="round" fill="none" initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: isBlinking ? 1 : 0, opacity: isBlinking ? 1 : 0 }} transition={{ duration: 0.1 }} />
        <motion.g animate={{ opacity: [0.8, 1, 0.8] }} transition={{ duration: 3, repeat: Infinity }} whileHover={{ scale: 1.05, opacity: 1 }}>
            <rect x="18" y="42" width="64" height="16" rx="6" fill="rgba(15, 23, 42, 0.7)" stroke="#06b6d4" strokeWidth="2" />
            <path d="M22 46H30" stroke="#06b6d4" strokeWidth="1" strokeOpacity="0.5" />
            <path d="M70 46H78" stroke="#06b6d4" strokeWidth="1" strokeOpacity="0.5" />
            <circle cx="32" cy="50" r="2" fill="#22d3ee" className="animate-pulse" />
            <path d="M18 50H14" stroke="#0891b2" strokeWidth="3" strokeLinecap="round" />
            <path d="M82 50H86" stroke="#0891b2" strokeWidth="3" strokeLinecap="round" />
        </motion.g>
        <motion.path d="M38 75 Q50 79 62 75" stroke="#14532d" strokeWidth="3" strokeLinecap="round" fill="none" animate={bug && bug.status === 'being_eaten' ? { d: "M38 75 Q50 85 62 75" } : { d: "M38 75 Q50 79 62 75" }} />
        {bug && bug.status === 'being_eaten' && bug.x !== undefined && bug.y !== undefined && (
           <motion.path d={`M50 75 Q ${50 + ((bug.x || 50) - 50)/2} ${75 + ((bug.y || 75) - 75)/2 - 15} ${bug.x || 50} ${bug.y || 75}`} stroke="#ec4899" strokeWidth="4" strokeLinecap="round" fill="none" initial={{ pathLength: 0 }} animate={{ pathLength: [0, 1, 0] }} transition={{ duration: 0.3, times: [0, 0.5, 1] }} />
        )}
        <AnimatePresence>
            {bug && bug.status === 'flying' && bug.x !== undefined && bug.y !== undefined && (
                <motion.g initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1, x: [(bug.x || 50) - 2, (bug.x || 50) + 2, (bug.x || 50) - 2], y: [(bug.y || 50) - 2, (bug.y || 50) + 2, (bug.y || 50) - 2] }} exit={{ scale: 0, opacity: 0, fill: "red" }} transition={{ opacity: { duration: 0.2 }, x: { duration: 0.2, repeat: Infinity }, y: { duration: 0.3, repeat: Infinity } }}>
                    <circle cx="0" cy="0" r="3" fill="#1e293b" />
                    <ellipse cx="-3" cy="-2" rx="3" ry="1.5" fill="#ef4444" opacity="0.8" className="animate-pulse" />
                    <ellipse cx="3" cy="-2" rx="3" ry="1.5" fill="#ef4444" opacity="0.8" className="animate-pulse" />
                    <rect x="-4" y="-4" width="8" height="8" stroke="#ef4444" strokeWidth="0.5" fill="none" strokeDasharray="1 1" opacity="0.5">
                        <animate attributeName="opacity" values="0;1;0" dur="1s" repeatCount="indefinite" />
                    </rect>
                </motion.g>
            )}
        </AnimatePresence>
      </motion.svg>
    </motion.div>
  );
};

// ================= FROG GATEKEEPER MODAL =================
const FrogGatekeeper = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [isFeeding, setIsFeeding] = useState(false);
  const [showAccessGranted, setShowAccessGranted] = useState(false);
  const [isMouthOpen, setIsMouthOpen] = useState(false);
  const [isSwallowing, setIsSwallowing] = useState(false);
  const router = useRouter(); // FIX: Use next/navigation router

  // --- MOTION VALUES FOR BUG POSITION (To Sync Eyes) ---
  const bugX = useMotionValue(50);
  const bugY = useMotionValue(50);
  const [tonguePath, setTonguePath] = useState("M50 75 Q50 75 50 75");

  const eyeX = useTransform(bugX, [0, 100], [-6, 6]);
  const eyeY = useTransform(bugY, [0, 100], [-6, 6]);

  // Update tongue path when bug position changes
  useEffect(() => {
    const unsubscribeX = bugX.onChange((bx: number) => {
      const by = bugY.get();
      const mx = 50;
      const my = 75;
      const cx = mx + (bx - mx) / 2;
      const cy = my + (by - my) / 2 - 10;
      setTonguePath(`M${mx} ${my} Q ${cx} ${cy} ${bx} ${by}`);
    });

    const unsubscribeY = bugY.onChange((by: number) => {
      const bx = bugX.get();
      const mx = 50;
      const my = 75;
      const cx = mx + (bx - mx) / 2;
      const cy = my + (by - my) / 2 - 10;
      setTonguePath(`M${mx} ${my} Q ${cx} ${cy} ${bx} ${by}`);
    });

    return () => {
      unsubscribeX();
      unsubscribeY();
    };
  }, [bugX, bugY]);

  useEffect(() => {
    if (!isOpen || isFeeding) return;
    let controlsX: any, controlsY: any;
    const fly = () => {
      const nextX = Math.random() * 80 + 10;
      const nextY = Math.random() * 70 + 15;
      const duration = Math.random() * 1 + 1.5;
      controlsX = animate(bugX, nextX, { duration, ease: "easeInOut" });
      controlsY = animate(bugY, nextY, { duration, ease: "easeInOut", onComplete: fly });
    };
    fly();
    return () => { if(controlsX) controlsX.stop(); if(controlsY) controlsY.stop(); };
  }, [isOpen, isFeeding, bugX, bugY]);

  const handleBugClick = () => {
    if (isFeeding) return;
    setIsFeeding(true);
    setIsMouthOpen(true);
    animate(bugX, 50, { duration: 0.4, ease: "backIn" });
    animate(bugY, 75, { duration: 0.4, ease: "backIn", onComplete: () => {
        setIsSwallowing(true);
        setTimeout(() => {
          setIsSwallowing(false);
          setIsMouthOpen(false);
          setShowAccessGranted(true);
          setTimeout(() => {
            // FIX: Use router.push for SPA navigation instead of window.location
            router.push("/team"); 
            onClose();
            // Reset state after closure
            setTimeout(() => {
              setIsFeeding(false);
              setShowAccessGranted(false);
            }, 500);
          }, 1000); 
        }, 1000); 
    }});
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md" onClick={onClose}>
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }} className="relative w-full max-w-2xl h-[600px] flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
          <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="absolute top-8 left-1/2 -translate-x-1/2 text-center z-10">
            <p className="text-white text-lg font-semibold mb-2">Feed the Cyber Frog to access the team!</p>
            <p className="text-cyan-400 text-sm">Click the glowing Data Bug 🐛</p>
          </motion.div>
          <div className="relative">
            <motion.svg width="300" height="360" viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="relative z-20">
              <path d="M15 95C8 95 3 105 8 110" stroke="#166534" strokeWidth="6" strokeLinecap="round" fill="#166534" />
              <path d="M85 95C92 95 97 105 92 110" stroke="#166534" strokeWidth="6" strokeLinecap="round" fill="#166534" />
              <ellipse cx="12" cy="108" rx="5" ry="3" fill="#166534" />
              <ellipse cx="88" cy="108" rx="5" ry="3" fill="#166534" />
              <ellipse cx="25" cy="80" rx="8" ry="12" fill="#22c55e" />
              <ellipse cx="75" cy="80" rx="8" ry="12" fill="#22c55e" />
              <ellipse cx="25" cy="88" rx="6" ry="4" fill="#86efac" />
              <ellipse cx="75" cy="88" rx="6" ry="4" fill="#86efac" />
              <ellipse cx="50" cy="70" rx="38" ry="30" fill="#22c55e" />
              <motion.ellipse cx="50" cy="75" rx="28" ry="22" fill="#86efac" animate={isSwallowing ? { ry: [22, 24, 22], rx: [28, 29, 28] } : { ry: 22, rx: 28 }} transition={{ duration: 0.3, repeat: Infinity, ease: "easeInOut" }} />
              <ellipse cx="45" cy="68" rx="12" ry="8" fill="#4ade80" opacity="0.3" />
              <ellipse cx="55" cy="68" rx="12" ry="8" fill="#4ade80" opacity="0.3" />
              <circle cx="32" cy="50" r="16" fill="#16a34a" />
              <circle cx="68" cy="50" r="16" fill="#16a34a" />
              <ellipse cx="50" cy="55" rx="20" ry="18" fill="#16a34a" />
              <g>
                  <circle cx="32" cy="50" r="11" fill="white" />
                  <circle cx="68" cy="50" r="11" fill="white" />
                  <motion.g style={{ x: eyeX, y: eyeY }}>
                      <circle cx="32" cy="50" r="5" fill="#0f172a" />
                      <circle cx="68" cy="50" r="5" fill="#0f172a" />
                      <circle cx="34" cy="48" r="2" fill="white" opacity="0.8" />
                      <circle cx="70" cy="48" r="2" fill="white" opacity="0.8" />
                  </motion.g>
              </g>
              <rect x="18" y="42" width="64" height="16" rx="6" fill="rgba(15, 23, 42, 0.8)" stroke="#0891b2" strokeWidth="2" />
              <ellipse cx="32" cy="50" rx="12" ry="10" fill="rgba(6, 182, 212, 0.3)" />
              <ellipse cx="68" cy="50" rx="12" ry="10" fill="rgba(6, 182, 212, 0.3)" />
              <ellipse cx="32" cy="50" rx="8" ry="6" fill="rgba(6, 182, 212, 0.6)" />
              <ellipse cx="68" cy="50" rx="8" ry="6" fill="rgba(6, 182, 212, 0.6)" />
              <path d="M18 50H10" stroke="#0891b2" strokeWidth="3" strokeLinecap="round" />
              <path d="M82 50H90" stroke="#0891b2" strokeWidth="3" strokeLinecap="round" />
              <motion.path d="M38 75 Q50 80 62 75" stroke="#14532d" strokeLinecap="round" fill="none" animate={isMouthOpen ? { d: "M38 75 Q50 85 62 75", strokeWidth: 4 } : isSwallowing ? { d: ["M38 75 Q50 80 62 75", "M38 75 Q50 83 62 75", "M38 75 Q50 80 62 75"], strokeWidth: 3, transition: { duration: 0.3, repeat: Infinity, ease: "easeInOut" } } : { d: "M38 75 Q50 80 62 75", strokeWidth: 3 }} />
              {isFeeding && !showAccessGranted && tonguePath && (
                 <motion.path d={tonguePath || "M50 75 Q50 75 50 75"} stroke="#ec4899" strokeWidth="4" strokeLinecap="round" fill="none" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.1 }} />
              )}
              <circle cx="26" cy="68" r="5" fill="#f472b6" opacity="0.5" />
              <circle cx="74" cy="68" r="5" fill="#f472b6" opacity="0.5" />
              {!showAccessGranted && (
                 <motion.g onClick={handleBugClick} style={{ x: bugX, y: bugY, cursor: 'pointer' }} animate={{ opacity: isSwallowing ? 0 : 1, scale: isSwallowing ? 0 : 1 }}>
                    <circle cx="0" cy="0" r="3" fill="#1e293b" />
                    <ellipse cx="-3" cy="-2" rx="3" ry="1.5" fill="#ef4444" opacity="0.8" className="animate-pulse" />
                    <ellipse cx="3" cy="-2" rx="3" ry="1.5" fill="#ef4444" opacity="0.8" className="animate-pulse" />
                    <rect x="-4" y="-4" width="8" height="8" stroke="#ef4444" strokeWidth="0.5" fill="none" strokeDasharray="1 1" opacity="0.5">
                          <animate attributeName="opacity" values="0;1;0" dur="1s" repeatCount="indefinite" />
                    </rect>
                 </motion.g>
              )}
            </motion.svg>
            {showAccessGranted && (
              <motion.div initial={{ opacity: 0, scale: 0, y: 20 }} animate={{ opacity: 1, scale: 1, y: -80 }} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40">
                <div className="bg-gradient-to-r from-cyan-500 to-teal-500 text-white px-8 py-4 rounded-2xl font-bold text-2xl shadow-[0_0_30px_rgba(6,182,212,0.8)] border-2 border-white">
                  ACCESS GRANTED! 🎉
                </div>
              </motion.div>
            )}
          </div>
          <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-50">
            <X size={24} />
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// ================= WORKFLOW SECTION (NEW) =================
const WorkflowSection = () => {
    const steps = [
        {
            icon: <Search className="w-8 h-8 text-cyan-400" />,
            title: "Discovery & Strategy",
            description: "We dive deep into your business goals, target audience, and market landscape to build a solid roadmap."
        },
        {
            icon: <Code className="w-8 h-8 text-teal-400" />,
            title: "Design & Development",
            description: "Our experts craft pixel-perfect designs and robust code, ensuring scalable and high-performance solutions."
        },
        {
            icon: <CheckCircle2 className="w-8 h-8 text-blue-400" />,
            title: "Testing & QA",
            description: "Rigorous testing across devices and browsers to ensure a bug-free, seamless user experience."
        },
        {
            icon: <Rocket className="w-8 h-8 text-purple-400" />,
            title: "Launch & Growth",
            description: "We help you launch with confidence and provide ongoing support to scale your digital presence."
        }
    ];

    return (
        <section id="process" className="py-20 sm:py-32 bg-slate-950 relative overflow-hidden">
             {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-900/20 rounded-full blur-3xl"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-900/20 rounded-full blur-3xl"></div>
            </div>

            <div className="container mx-auto px-4 sm:px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center max-w-3xl mx-auto mb-20"
                >
                    <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-white">How We Work</h2>
                    <p className="text-lg text-slate-400">Our proven process ensures transparency and results at every step.</p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="relative group"
                        >
                            <div className="p-8 rounded-3xl bg-slate-900/50 border border-slate-800 hover:border-cyan-500/30 transition-all duration-300 hover:-translate-y-1 h-full">
                                <div className="mb-6 p-4 rounded-2xl bg-slate-800/50 w-fit group-hover:bg-slate-800 transition-colors">
                                    {step.icon}
                                </div>
                                <h3 className="text-xl font-bold mb-3 text-white">{step.title}</h3>
                                <p className="text-slate-400 text-sm leading-relaxed">{step.description}</p>
                            </div>
                            {/* Connector Line (Desktop) */}
                            {index < steps.length - 1 && (
                                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-px bg-slate-800 z-0"></div>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

// ================= TESTIMONIALS SECTION (NEW) =================
const TestimonialsSection = () => {
    const testimonials = [
        {
            quote: "Swakarsa transformed our online presence. Their attention to detail and technical expertise is unmatched.",
            author: "Budi Santoso",
            role: "CEO",
            company: "CV. Alumka Cipta Prima"
        },
        {
            quote: "The inventory system they built saved us hundreds of hours. Highly recommended for custom software solutions.",
            author: "Siti Rahma",
            role: "Manager",
            company: "Maju Mobilindo"
        },
        {
            quote: "Professional, timely, and creative. They understood our brand vision perfectly from day one.",
            author: "Hendrik Wijaya",
            role: "Owner",
            company: "Hotel Dwipa"
        }
    ];

    return (
        <section className="py-20 sm:py-32 bg-slate-900">
            <div className="container mx-auto px-4 sm:px-6">
                 <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-white">What Our Clients Say</h2>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8">
                    {testimonials.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="p-8 rounded-3xl bg-slate-950 border border-slate-800 relative"
                        >
                            <MessageSquareQuote className="absolute top-8 right-8 text-slate-800 w-12 h-12" />
                            <p className="text-slate-300 mb-8 relative z-10 leading-relaxed">"{item.quote}"</p>
                            <div>
                                <h4 className="font-bold text-white">{item.author}</h4>
                                <p className="text-sm text-cyan-400">{item.role}, {item.company}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

// ================= FAQ SECTION (NEW) =================
const FAQSection = () => {
    const faqs = [
        {
            question: "What services do you offer?",
            answer: "We offer end-to-end digital solutions including Custom Web Development, Inventory Systems, POS Systems, Mobile Apps, UI/UX Design, and Digital Marketing strategies."
        },
        {
            question: "How long does a typical project take?",
            answer: "Timeline varies by complexity. A simple company profile takes 2-4 weeks, while complex systems like ERP or POS can take 8-12 weeks. We provide a detailed timeline after the initial consultation."
        },
        {
            question: "Do you provide support after launch?",
            answer: "Yes! We offer 3 months of free maintenance for bugs and minor updates. After that, we have flexible retainer packages for ongoing support and server management."
        },
        {
            question: "What technologies do you use?",
            answer: "We specialize in modern stacks: Next.js, React, Node.js, Python, PostgreSQL, and Cloud infrastructure to ensure speed, security, and scalability."
        }
    ];

    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section id="faq" className="py-20 sm:py-32 bg-slate-950">
            <div className="container mx-auto px-4 sm:px-6 max-w-3xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-white">Frequently Asked Questions</h2>
                </motion.div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="border border-slate-800 rounded-2xl bg-slate-900/50 overflow-hidden"
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-800/50 transition-colors"
                            >
                                <span className="font-semibold text-white text-lg">{faq.question}</span>
                                {openIndex === index ? <Minus className="text-cyan-400" /> : <Plus className="text-slate-400" />}
                            </button>
                            <AnimatePresence>
                                {openIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="p-6 pt-0 text-slate-400 leading-relaxed">
                                            {faq.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

// ================= SKILLS CAROUSEL COMPONENT =================
const SkillsCarousel = ({ skills, onClick }: { skills: any[], onClick: (skill: any) => void }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const isDragging = useRef(false); // FIX: Ref to track drag state vs click

  useEffect(() => {
    // FIX: Hydration safe check
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    if (typeof window !== "undefined") {
        handleResize();
        window.addEventListener('resize', handleResize);
    }
    return () => {
        if (typeof window !== "undefined") window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Auto scroll - Faster duration (2000ms)
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % skills.length);
    }, 2000); // Speed up to 2 seconds
    return () => clearInterval(interval);
  }, [skills.length, isPaused]);

  const handleDragEnd = (event: any, info: PanInfo) => {
    // FIX: reset drag state slightly after drop to prevent click firing
    setTimeout(() => {
        isDragging.current = false;
    }, 50);

    // Lower threshold for easier swiping
    if (info.offset.x > 20) {
      setCurrentIndex((prev) => (prev - 1 + skills.length) % skills.length);
    } else if (info.offset.x < -20) {
      setCurrentIndex((prev) => (prev + 1) % skills.length);
    }
  };

  const getPosition = (index: number) => {
    const diff = (index - currentIndex + skills.length) % skills.length;
    
    if (diff === 0) return 'center';
    if (diff === 1) return 'right';
    if (diff === skills.length - 1) return 'left';
    return 'hidden';
  };

  return (
    <div 
      className="relative h-[400px] w-full flex items-center justify-center overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      // Enable touch interaction for mobile pause
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      <div className="absolute w-full h-full flex items-center justify-center">
        <AnimatePresence initial={false} mode="popLayout">
          {skills.map((skill, index) => {
            const position = getPosition(index);
            if (position === 'hidden') return null;

            let x = 0;
            let scale = 0.8;
            let opacity = 0;
            let zIndex = 0;
            let blur = 0;

            // Define offsets based on screen size - Increased for wider spread
            const offset = isMobile ? 260 : 420; 

            if (position === 'center') {
              x = 0;
              scale = 1;
              opacity = 1;
              zIndex = 10;
              blur = 0;
            } else if (position === 'left') {
              x = -offset;
              scale = 0.85;
              opacity = 0.5; // Slightly less opaque
              zIndex = 5;
              blur = 3; // Slight blur
            } else if (position === 'right') {
              x = offset;
              scale = 0.85;
              opacity = 0.5;
              zIndex = 5;
              blur = 3;
            }

            return (
              <motion.div
                key={skill.id}
                layoutId={`card-${skill.id}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ 
                  x, 
                  scale, 
                  opacity, 
                  zIndex,
                  filter: `blur(${blur}px)` 
                }}
                transition={{ 
                  type: "spring", 
                  stiffness: 300, 
                  damping: 30 
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragStart={() => { isDragging.current = true; }} // FIX: Set dragging state
                onDragEnd={handleDragEnd}
                onClick={() => {
                  if (isDragging.current) return; // FIX: Prevent click if dragged
                  if (position === 'center') onClick(skill);
                  else setCurrentIndex(index);
                }}
                className="absolute w-[280px] sm:w-[320px] cursor-pointer"
                style={{ 
                    touchAction: 'pan-y'
                }}
              >
                {/* Card Content unchanged */}
                <div className="rounded-2xl overflow-hidden group relative flex flex-col h-full bg-slate-900/80 border border-slate-700 hover:border-cyan-500/50 shadow-2xl transition-colors duration-300">
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={skill.image} 
                        alt={skill.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                      <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold bg-slate-900/80 text-white border border-slate-700">
                        {skill.category}
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="font-bold text-xl mb-2 text-white truncate">{skill.title}</h3>
                      <p className="text-sm text-slate-400 line-clamp-2">{skill.shortDescription}</p>
                    </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Indicators */}
      <div className="absolute bottom-4 flex gap-2 z-20">
        {skills.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`w-2 h-2 rounded-full transition-all ${
              i === currentIndex ? "bg-cyan-500 w-4" : "bg-slate-600"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

// ================= UPGRADED OCEAN HERO (WAVES + PARTICLES) =================
const OceanWaves = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;
    let animationFrameId: number;
    let time = 0;

    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);

    // Particles Configuration
    const particleCount = 40;
    const particles: { x: number; y: number; size: number; speed: number; opacity: number }[] = [];
    
    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * w,
            y: Math.random() * h,
            size: Math.random() * 2,
            speed: Math.random() * 0.5 + 0.1,
            opacity: Math.random() * 0.5
        });
    }

    // Waves Configuration
    const waves = [
      { yOffset: 0.75, length: 0.002, amplitude: 50, speed: 0.01, color: 'rgba(6, 182, 212, 0.2)' },
      { yOffset: 0.75, length: 0.003, amplitude: 70, speed: 0.006, color: 'rgba(20, 184, 166, 0.2)' },
      { yOffset: 0.75, length: 0.0015, amplitude: 90, speed: 0.004, color: 'rgba(56, 189, 248, 0.1)' }
    ];

    const animate = () => {
      ctx.clearRect(0, 0, w, h);
      
      // Background Gradient
      const gradient = ctx.createLinearGradient(0, 0, 0, h);
      gradient.addColorStop(0, '#020617'); 
      gradient.addColorStop(1, '#0f172a');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, w, h);

      time += 1;

      // Draw Rising Particles (Bubbles/Data)
      particles.forEach(p => {
          p.y -= p.speed;
          if (p.y < 0) {
              p.y = h;
              p.x = Math.random() * w;
          }
          ctx.beginPath();
          ctx.fillStyle = `rgba(34, 211, 238, ${p.opacity})`; // Cyan glow
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
      });

      // Draw Waves
      waves.forEach(wave => {
        ctx.beginPath();
        ctx.moveTo(0, h);
        const baseline = h * wave.yOffset;
        for (let x = 0; x <= w; x += 10) {
          const dy = Math.sin(x * wave.length + time * wave.speed) * wave.amplitude;
          ctx.lineTo(x, baseline + dy);
        }
        ctx.lineTo(w, h);
        ctx.lineTo(0, h);
        ctx.fillStyle = wave.color;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
       <canvas ref={canvasRef} className="block w-full h-full" />
       {/* Gradient Overlay for seamless blending */}
       <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-950/90" />
    </div>
  );
};

// ================= ENHANCED PORTFOLIO CARD WITH SCROLL ANIMATIONS =================
const EnhancedPortfolioCard = ({ project, index, onClick }: any) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60, scale: 0.9, rotateX: 10 }}
      animate={isVisible ? { 
        opacity: 1, 
        y: 0, 
        scale: 1,
        rotateX: 0,
        transition: {
          type: "spring",
          stiffness: 100,
          damping: 15,
          mass: 0.8,
          delay: index * 0.15
        }
      } : {}}
      whileHover={{ 
        y: -12,
        scale: 1.03,
        rotateY: 2,
        transition: { 
          type: "spring", 
          stiffness: 300, 
          damping: 15,
          duration: 0.3 
        }
      }}
      viewport={{ once: true, margin: "-50px" }}
      className="relative rounded-2xl overflow-visible cursor-pointer group bg-slate-900/60 border border-slate-800 hover:border-cyan-500/50 transition-all duration-300 backdrop-blur-sm"
      onClick={() => onClick(project)}
      style={{
        transformStyle: "preserve-3d", // FIX: can conflict with overflow hidden
        perspective: "1000px"
      }}
    >
      {/* Glow effect on hover */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
        initial={false}
      />
      
      <div className="relative h-56 overflow-hidden rounded-t-2xl">
        {/* Image with parallax effect */}
        <motion.div
          className="w-full h-full"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <img 
            src={project.image} 
            alt={project.title}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover"
          />
        </motion.div>
        
        {/* Gradient overlay with animation */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"
          initial={{ opacity: 0.8 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Floating tag */}
        <motion.div 
          className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold bg-black/80 backdrop-blur-md text-white border border-white/10"
          whileHover={{ 
            scale: 1.1,
            backgroundColor: "rgba(6, 182, 212, 0.8)",
            transition: { type: "spring", stiffness: 400 }
          }}
        >
          {project.category}
        </motion.div>

        {/* Title with slide-up animation */}
        <motion.div 
          className="absolute bottom-0 left-0 right-0 p-4 transform"
          initial={{ y: 20, opacity: 0 }}
          animate={isVisible ? { y: 0, opacity: 1 } : {}}
          transition={{ delay: index * 0.15 + 0.2 }}
        >
          <h3 className="font-bold text-xl text-white mb-1 truncate">
            {project.title}
          </h3>
          <motion.p 
            className="text-sm text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100"
            initial={{ x: -10, opacity: 0 }}
            whileHover={{ x: 0, opacity: 1 }}
          >
            {project.client}
          </motion.p>
        </motion.div>
      </div>

      {/* Content with staggered children animation */}
      <AnimatePresence>
        <motion.div 
          className="p-5 rounded-b-2xl bg-slate-900/40"
          initial={false}
        >
          <motion.p 
            className="text-sm line-clamp-2 mb-4 text-slate-400"
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : {}}
            transition={{ delay: index * 0.15 + 0.3 }}
          >
            {project.shortDescription}
          </motion.p>
          
          {/* Tags with staggered animation */}
          <motion.div 
            className="flex flex-wrap gap-2 mb-4"
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.05
                }
              },
              hidden: {}
            }}
          >
            {project.tags.slice(0, 3).map((tag: string, idx: number) => (
              <motion.span 
                key={idx} 
                variants={{
                  hidden: { opacity: 0, scale: 0.8, y: 10 },
                  visible: { 
                    opacity: 1, 
                    scale: 1, 
                    y: 0,
                    transition: {
                      type: "spring",
                      stiffness: 200,
                      delay: index * 0.15 + 0.4 + idx * 0.05
                    }
                  }
                }}
                className="px-2 py-1 rounded text-xs font-medium bg-slate-800 text-slate-300 hover:bg-cyan-500/20 hover:text-cyan-300 transition-colors cursor-default"
                whileHover={{ scale: 1.05 }}
              >
                {tag}
              </motion.span>
            ))}
          </motion.div>
          
          {/* CTA Button with sliding animation */}
          <motion.div 
            className="flex items-center justify-between pt-3 border-t border-slate-800"
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : {}}
            transition={{ delay: index * 0.15 + 0.5 }}
          >
            <span className="text-sm font-medium flex items-center gap-2 group-hover:gap-3 transition-all text-white">
              View Case Study 
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 1.5,
                  repeatType: "reverse",
                  delay: index * 0.1
                }}
              >
                <ArrowRight size={14} className="text-cyan-500" />
              </motion.span>
            </span>
            
            {/* Pulse indicator */}
            <motion.div
              className="w-2 h-2 rounded-full bg-cyan-500"
              animate={{ 
                scale: [1, 1.5, 1],
                opacity: [0.7, 1, 0.7]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.div>
        </motion.div>
      </AnimatePresence>
      
      {/* Border glow on hover */}
      <motion.div 
        className="absolute inset-0 rounded-2xl border border-transparent pointer-events-none"
        initial={false}
        whileHover={{
          borderColor: "rgba(6, 182, 212, 0.3)",
          boxShadow: "0 0 30px rgba(6, 182, 212, 0.2)"
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};

// ================= OPTIMIZED TEAM MEMBER COMPONENT =================
const TeamMember = ({ member, index }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.5, delay: index * 0.2 }}
    className="rounded-2xl p-6 h-full bg-slate-900/60 border border-slate-800 hover:bg-slate-800/60 backdrop-blur-sm transition-colors duration-300"
  >
    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
      <div className="w-24 h-24 rounded-full overflow-hidden flex-shrink-0 border-2 border-cyan-500/30 shadow-lg shadow-cyan-500/10">
        <div className="w-full h-full flex items-center justify-center bg-slate-800">
          <img 
            src={member.image} 
            alt={member.name} 
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover"
            onError={(e: any) => { e.target.src="https://placehold.co/100x100/333/FFF?text=User" }}
          />
        </div>
      </div>
      <div className="min-w-0">
        <h3 className="text-xl font-bold truncate text-white">
          {member.name}
        </h3>
        <p className="mt-1 font-medium text-cyan-400">
          {member.role}
        </p>
        <p className="mt-3 text-sm leading-relaxed text-slate-400">
          {member.description}
        </p>
      </div>
    </div>
  </motion.div>
);

// ================= OPTIMIZED STATS COMPONENT WITH SCROLL ANIMATION =================
const StatsSection = ({ stats, hasAnimated }: any) => (
  <section id="stats-section" className="container mx-auto px-6 relative z-20 -mt-20 sm:-mt-24">
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 bg-slate-900/80 border border-slate-800 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] backdrop-blur-xl rounded-3xl p-8 md:p-10 transform transition-transform hover:scale-[1.01]"
    >
      {stats.map((stat: any, index: number) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="text-center group"
        >
          <div className="text-3xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-cyan-400 via-teal-400 to-blue-400 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
            {hasAnimated ? (
              <CountUpAlt 
                end={stat.value} 
                suffix={stat.suffix} 
                duration={2.5} 
                delay={index * 0.2}
              />
            ) : (
              `0${stat.suffix}`
            )}
          </div>
          <p className="text-xs md:text-sm font-medium uppercase tracking-wider text-slate-500">
            {stat.label}
          </p>
        </motion.div>
      ))}
    </motion.div>
  </section>
);

// ================= MODAL COMPONENTS =================
const Modal = ({ isOpen, onClose, children, title }: any) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[60] flex items-center justify-center p-4"
        onClick={onClose}
      >
        <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />
        
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          transition={{ type: "spring", damping: 25 }}
          className="relative z-10 w-full max-w-4xl rounded-3xl max-h-[90vh] overflow-hidden flex flex-col bg-slate-900 border border-slate-700 shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="sticky top-0 z-20 flex items-center justify-between p-6 border-b border-slate-800 bg-slate-900/80 backdrop-blur-xl">
            <h3 className="text-xl font-bold text-white">
              {title}
            </h3>
            <button
              onClick={onClose}
              className="p-2 rounded-full transition-colors hover:bg-slate-800 text-slate-400 hover:text-white"
            >
              <X size={24} />
            </button>
          </div>
          <div className="p-6 overflow-y-auto custom-scrollbar">
            {children}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// ================= SKILL MODAL CONTENT =================
const SkillModalContent = ({ skill }: any) => (
  <div className="space-y-8">
    <div className="flex flex-col md:flex-row items-start gap-8">
      <div className="w-full md:w-5/12">
        <div className="rounded-2xl overflow-hidden shadow-lg aspect-video">
          <img 
            src={skill.image} 
            alt={skill.title}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="mt-4 p-4 rounded-xl bg-slate-800/50">
          <h4 className="text-xs font-bold uppercase tracking-wider mb-2 text-cyan-400">
            Category
          </h4>
          <p className="font-medium text-white">
            {skill.category}
          </p>
        </div>
      </div>
      
      <div className="w-full md:w-7/12 space-y-4">
        <h2 className="text-3xl font-bold text-white">
          {skill.title}
        </h2>
        <p className="text-lg leading-relaxed text-slate-300">
          {skill.description}
        </p>
        
        <div className="pt-4">
          <h4 className="text-sm font-semibold mb-3 uppercase tracking-wider text-slate-400">
            Technologies Used
          </h4>
          <div className="flex flex-wrap gap-2">
            {skill.techStack.map((tech: string, idx: number) => (
              <span key={idx} className="px-3 py-1.5 rounded-lg text-sm font-medium bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>

    <div className="h-px w-full bg-slate-800" />

    <div className="grid md:grid-cols-2 gap-8">
      <div>
        <h4 className="text-xl font-bold mb-5 flex items-center gap-2 text-white">
          <Sparkles size={20} className="text-yellow-500" />
          Key Features
        </h4>
        <div className="space-y-3">
          {skill.features.map((feature: string, idx: number) => (
            <div key={idx} className="flex items-start gap-3 p-3 rounded-xl transition-colors hover:bg-slate-800/30">
              <div className="mt-0.5 p-1 rounded-full bg-green-500/20 text-green-400">
                <ChevronRight size={14} />
              </div>
              <p className="text-sm text-slate-300">{feature}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-xl font-bold mb-5 flex items-center gap-2 text-white">
          <Layers size={20} className="text-cyan-500" />
          Use Cases
        </h4>
        <div className="flex flex-wrap gap-3">
          {skill.useCases.map((useCase: string, idx: number) => (
            <span key={idx} className="px-4 py-3 rounded-xl text-sm font-medium w-full bg-slate-800 text-slate-300 border border-slate-700">
              {useCase}
            </span>
          ))}
        </div>
      </div>
    </div>
  </div>
);

// ================= PORTFOLIO MODAL CONTENT =================
const PortfolioModalContent = ({ project }: any) => (
  <div className="space-y-8">
    <div className="relative rounded-2xl overflow-hidden h-64 md:h-80 w-full group">
        <img 
          src={project.image} 
          alt={project.title}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-6 md:p-8">
             <div>
                <span className="inline-block px-3 py-1 mb-3 rounded-full text-xs font-semibold backdrop-blur-md bg-cyan-500/80 text-white">
                  {project.category}
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-white">
                  {project.title}
                </h2>
             </div>
        </div>
    </div>

    <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">
            <div>
                <h3 className="text-xl font-bold mb-3 text-white">Project Overview</h3>
                <p className="text-lg leading-relaxed text-slate-300">
                  {project.description}
                </p>
            </div>

            <div className="grid gap-6">
                <div className="p-5 rounded-2xl bg-red-500/5 border border-red-500/10">
                    <h4 className="text-lg font-bold mb-3 flex items-center gap-2 text-red-400">
                        Challenges
                    </h4>
                    <ul className="space-y-2">
                        {project.challenges.map((challenge: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-slate-300">
                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-current opacity-60"></span>
                            {challenge}
                        </li>
                        ))}
                    </ul>
                </div>
                
                <div className="p-5 rounded-2xl bg-green-500/5 border border-green-500/10">
                    <h4 className="text-lg font-bold mb-3 flex items-center gap-2 text-green-400">
                        Solutions
                    </h4>
                    <ul className="space-y-2">
                        {project.solutions.map((solution: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-slate-300">
                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-current opacity-60"></span>
                            {solution}
                        </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>

        <div className="md:col-span-1 space-y-6">
             <div className="p-5 rounded-2xl bg-slate-800/50">
                <h4 className="text-sm font-bold uppercase tracking-wider mb-4 text-slate-400">
                    Project Details
                </h4>
                <div className="space-y-4">
                    <div>
                        <p className="text-xs text-slate-500">Client</p>
                        <p className="font-medium text-white">{project.client}</p>
                    </div>
                    <div>
                        <p className="text-xs text-slate-500">Duration</p>
                        <p className="font-medium text-white">{project.duration}</p>
                    </div>
                </div>
             </div>

             <div>
                <h4 className="text-sm font-bold uppercase tracking-wider mb-3 text-slate-400">
                    Results
                </h4>
                <div className="space-y-3">
                    {project.results.map((result: any, idx: number) => (
                    <div key={idx} className="p-3 rounded-xl flex items-center justify-between bg-slate-800/30">
                        <span className="text-sm text-slate-300">{result.label}</span>
                        <span className="font-bold text-cyan-400">{result.value}</span>
                    </div>
                    ))}
                </div>
             </div>

             <div>
                 <h4 className="text-sm font-bold uppercase tracking-wider mb-3 text-slate-400">
                    Tech Stack
                </h4>
                 <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech: string, idx: number) => (
                    <span key={idx} className="px-2 py-1 rounded text-xs font-medium bg-slate-800 text-slate-300">
                        {tech}
                    </span>
                    ))}
                </div>
             </div>
        </div>
    </div>
  </div>
);

// ================= CLIENT LOGOS SECTION =================
const clientLogos = [
  { name: "CV. ALUMKA CIPTA PRIMA", src: "/trust/cv alumka cipta prima.jpeg" },
  { name: "CV. TAN JAYA STEEL", src: "/trust/cv tan jaya steel.jpeg" },
  { name: "FEIXEN XIAO GROUP", src: "/trust/feixen xiao group.jpeg" },
  { name: "HOTEL DWIPA", src: "/trust/hotel dwipa.jpeg" },
  { name: "MAJU MOBILINDO", src: "/trust/maju mobilindo.jpeg" },
  { name: "RESILIO PARTNERS", src: "/trust/resilio-logo.png" },
];

const ClientLogosSection = ({ logos }: any) => (
    <section className="container mx-auto px-4 sm:px-6 py-16 sm:py-20">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
            className="text-center"
        >
            <h2 className="text-sm font-bold uppercase tracking-widest mb-8 text-slate-500">
                Trusted by Forward-Thinking Companies
            </h2>

            <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8 md:gap-x-20 px-4">
                {logos.map((logo: any, index: number) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="group relative"
                    >
                      <div className="overflow-hidden rounded-full p-3 bg-white/5 border border-slate-200/10 shadow-sm group-hover:shadow-md transition-shadow duration-300">
                        <img
                          src={logo.src}
                          alt={logo.name}
                          loading="lazy"
                          decoding="async"
                          className="h-12 sm:h-16 md:h-20 w-auto max-w-[80px] sm:max-w-[100px] md:max-w-[120px] object-cover rounded-full transition-all duration-300 opacity-70 hover:opacity-100 hover:scale-110"
                          style={{ aspectRatio: "1/1" }}
                          onError={(e: any) => { 
                              e.target.onerror = null; 
                              e.target.src="https://placehold.co/120x120/A0A0A0/FFFFFF?text=Client";
                          }}
                        />
                      </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    </section>
);

// ================= SOCIAL MEDIA LOGO =================
const SocialMediaLogo = ({ social, size = 'w-8 h-8' }: any) => {
  return (
    <a
      href={social.href}
      target="_blank"
      rel="noopener noreferrer"
      className={`p-0 transition-all duration-300 hover:scale-110 flex-shrink-0 ${size} rounded-full overflow-hidden shadow-sm hover:shadow-md border border-slate-700 hover:border-cyan-500`}
      aria-label={social.label}
    >
      <img 
        src={social.src} 
        alt={social.label}
        loading="lazy"
        decoding="async"
        className="w-full h-full object-cover"
        onError={(e: any) => { 
            e.target.onerror = null; 
            e.target.src="https://placehold.co/32x32/FF0000/FFFFFF?text=S";
        }}
      />
    </a>
  );
};

// ================= MAIN LANDING PAGE COMPONENT =================
export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState<any>(null);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [showFrogGatekeeper, setShowFrogGatekeeper] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Handle team link clicks - show FrogGatekeeper instead
  const handleTeamClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setShowFrogGatekeeper(true);
  };

  // Stats data
  const stats = [
    { value: 50, suffix: "+", label: "Projects Completed" },
    { value: 95, suffix: "%", label: "Client Satisfaction" },
    { value: 24, suffix: "/7", label: "Support Hours" },
    { value: 3, suffix: "x", label: "Average ROI" },
  ];

  // Team members 
  const teamMembers = [
    {
      name: "M. Jonathan Tanuwijaya",
      role: "Managing Director",
      image: "/images/jonathan.jpeg",
      description: "Leading the team with over 5 years of experience in the digital industry. Committed to delivering the best solutions for every client."
    },
    {
      name: "Jethro Elijah Lim",
      role: "Marketing Director",
      image: "/images/jethro.jpeg",
      description: "Digital strategy expert with a proven track record of increasing online business sales through effective marketing campaigns."
    },
  ];

  // Skills data
  const skills = [
    {
      id: 1,
      title: "Inventory Management",
      category: "Operational System",
      image: "/images/Manajemen Inventori.jpg",
      shortDescription: "Automatic stock recording system with real-time reports for warehouse efficiency.",
      description: "We develop integrated inventory management systems to monitor stock items, in-out flow, and stock demand predictions. This system helps businesses reduce excess stock, prevent shortages, and optimize storage space.",
      features: [
        "Real-time stock recording with barcode/QR code",
        "Automatic alerts for minimum & expired stock",
        "Stock movement analysis reports & forecasting",
        "Integration with POS and e-commerce platforms",
        "Multi-user access with permission control"
      ],
      useCases: [
        "Retail stores with hundreds of SKUs",
        "B2B distributors & suppliers",
        "Manufacturing & production",
        "SMEs with simple stock needs"
      ],
      techStack: ["Next.js", "Node.js", "PostgreSQL", "Redis", "Barcode API"],
      tags: ["Real-time", "Automation", "Reporting", "Barcode"]
    },
    {
      id: 2,
      title: "Accounting & Finance",
      category: "Administrative System",
      image: "/images/Akuntansi & Keuangan.jpg",
      shortDescription: "Modern accounting software for accurate and structured financial recording.",
      description: "Digital accounting system that simplifies transaction recording, invoice management, debt tracking, and financial report generation according to accounting standards.",
      features: [
        "Automatic transaction recording from POS",
        "Invoice & digital tax invoice generation",
        "Profit loss, balance sheet, and cash flow reports",
        "Tax integration (e-Faktur, e-SPT)",
        "Real-time financial dashboard"
      ],
      useCases: [
        "Startups needing simple accounting systems",
        "SMEs with daily transactions",
        "Freelancers needing professional invoices",
        "Companies with multiple revenue streams"
      ],
      techStack: ["React", "Express.js", "MySQL", "Chart.js", "PDF Generator"],
      tags: ["Accounting", "Invoice", "Tax", "Reports"]
    },
    {
      id: 3,
      title: "Point of Sale (POS)",
      category: "Transaction System",
      image: "/images/Point of Sale (POS).jpg",
      shortDescription: "Modern cashier system with various payment methods and stock integration.",
      description: "POS system that supports various types of retail, restaurant, or service-based business transactions with digital payment integration, table management (for F&B), and stock synchronization.",
      features: [
        "Multi-payment methods (QRIS, e-wallet, card)",
        "Split bill & discount management",
        "Integration with kitchen display (for restaurants)",
        "Offline mode & data sync",
        "Customer database & loyalty program"
      ],
      useCases: [
        "Restaurants & cafes with table orders",
        "Retail stores needing fast checkout",
        "Salons & clinics with appointment systems",
        "Stores needing multi-outlet support"
      ],
      techStack: ["Next.js", "Socket.io", "IndexedDB", "Payment Gateway", "Printer API"],
      tags: ["POS", "Payment", "Retail", "F&B"]
    },
    {
      id: 4,
      title: "AI & Machine Learning Integration",
      category: "Artificial Intelligence",
      image: "/images/Integrasi AI & Machine Learning.jpg",
      shortDescription: "AI implementation for predictions, chatbots, and business process automation.",
      description: "Integrating AI and machine learning technology into your system for deeper data analysis, task automation, and improved customer experience.",
      features: [
        "24/7 customer service chatbot",
        "Sales prediction & demand forecasting",
        "Sentiment analysis for reviews & feedback",
        "Image recognition for product QC",
        "Personalized recommendation engine"
      ],
      useCases: [
        "E-commerce with product recommendations",
        "Customer service with chatbots",
        "Manufacturing with AI quality control",
        "Content platforms with personalization"
      ],
      techStack: ["Python", "TensorFlow.js", "OpenAI API", "FastAPI", "Redis"],
      tags: ["AI", "Machine Learning", "Automation", "Chatbot"]
    },
    {
      id: 5,
      title: "Web Scraping & Data Aggregation",
      category: "Data Collection",
      image: "/images/Web Scraping & Data Aggregation.jpg",
      shortDescription: "Automatic data collection from various sources for competitor analysis.",
      description: "Web scraping service that helps you collect product price data, competitor reviews, latest content, or market information automatically from various websites.",
      features: [
        "Scheduled scraping with cron jobs",
        "Proxy rotation to avoid blocking",
        "Automatic data cleaning & formatting",
        "Export to various formats (CSV, JSON, Excel)",
        "API endpoint for direct integration"
      ],
      useCases: [
        "Price monitoring & competitor analysis",
        "Market research & trend analysis",
        "Content aggregation for news portals",
        "Lead generation from directories"
      ],
      techStack: ["Python", "BeautifulSoup", "Scrapy", "Puppeteer", "MongoDB"],
      tags: ["Data", "Scraping", "Automation", "Research"]
    },
    {
      id: 6,
      title: "Business Process Automation",
      category: "Workflow Automation",
      image: "/images/Otomasi Proses Bisnis.jpg",
      shortDescription: "Streamlining business operations with intelligent workflow automation.",
      description: "Automating repetitive business processes like approval systems, notification workflows, document processing, and task management to improve team efficiency.",
      features: [
        "Workflow builder with drag & drop",
        "Multi-level approval system",
        "Automatic notification & reminder",
        "Document generation & e-signature",
        "Integration with existing tools"
      ],
      useCases: [
        "HR process automation (leave, reimbursement)",
        "Sales pipeline & CRM automation",
        "Project management & task assignment",
        "Document approval workflows"
      ],
      techStack: ["Node-RED", "Next.js", "PostgreSQL", "Webhook", "Email API"],
      tags: ["Automation", "Workflow", "Efficiency", "Process"]
    },
    {
      id: 7,
      title: "IoT (Internet of Things)",
      category: "Connectivity & Sensors",
      image: "/images/IoT (Internet of Things).jpg",
      shortDescription: "IoT systems for real-time monitoring, automation, and connected device analytics.",
      description: "Developing Internet of Things solutions that connect physical devices with digital systems for monitoring, automatic control, and real-time data analysis. Our solutions range from simple sensors to integrated enterprise IoT platforms.",
      features: [
        "Real-time device monitoring & remote control",
        "Sensor data collection & analytics dashboard",
        "Predictive maintenance with machine learning",
        "Energy consumption optimization",
        "Multi-protocol support (MQTT, CoAP, HTTP)"
      ],
      useCases: [
        "Smart building & energy management",
        "Industrial IoT for manufacturing",
        "Agriculture monitoring (smart farming)",
        "Asset tracking & logistics",
        "Environmental monitoring (air quality, temperature)"
      ],
      techStack: ["Node.js", "Python", "MQTT", "Grafana", "Raspberry Pi", "Arduino", "AWS IoT"],
      tags: ["IoT", "Sensor", "Real-time", "Monitoring", "Automation"]
    }
  ];

  // Portfolio data
  const portfolioItems = [
    {
      id: 1,
      title: "Maju Mobilindo",
      category: "E-commerce Website",
      client: "Maju Mobilindo - Used Car Dealer",
      image: "/portfolio/Maju Mobilindo.jpeg",
      shortDescription: "E-commerce website for used car dealer with advanced search and filtering system.",
      description: "Developing a comprehensive e-commerce website for used car dealers, focusing on user experience and advanced search systems. This website allows customers to search for cars based on various criteria and schedule test drive appointments online.",
      duration: "8 Weeks",
      challenges: [
        "Managing 500+ car catalog with different specifications",
        "Creating responsive and accurate search systems",
        "Integration with CRM systems for lead management",
        "Performance optimization for many images"
      ],
      solutions: [
        "Implementing search engine with advanced filters",
        "CDN for image loading optimization",
        "Chatbot for 24/7 customer service",
        "Admin dashboard for inventory management"
      ],
      results: [
        { value: "300%", label: "Traffic Increase" },
        { value: "45%", label: "Conversion Rate" },
        { value: "2.5x", label: "Lead Generation" }
      ],
      techStack: ["Next.js", "Tailwind CSS", "PostgreSQL", "Cloudinary", "Stripe"],
      tags: ["E-commerce", "Automotive", "Search", "Booking"]
    },
    {
      id: 2,
      title: "Alumka Lampung",
      category: "Company Profile",
      client: "PT Alumka Lampung - Building Materials Supplier",
      image: "/portfolio/Alumka.jpeg",
      shortDescription: "Company profile website with product catalog and integrated inquiry system.",
      description: "Creating a professional company profile website for building materials suppliers, displaying project portfolios, complete product catalogs, and inquiry systems integrated with WhatsApp Business API for quick customer response.",
      duration: "6 Weeks",
      challenges: [
        "Displaying product catalog with 1000+ items",
        "Integration with WhatsApp Business API",
        "Optimization for mobile users (70% traffic)",
        "Multi-language support for international markets"
      ],
      solutions: [
        "Dynamic catalog with categories and filters",
        "WhatsApp integration for instant inquiry",
        "Mobile-first responsive design",
        "i18n for English and Indonesian language support"
      ],
      results: [
        { value: "200+", label: "Monthly Inquiries" },
        { value: "60%", label: "Mobile Traffic" },
        { value: "40%", label: "Increase in Sales" }
      ],
      techStack: ["React", "TypeScript", "Node.js", "MongoDB", "WhatsApp API"],
      tags: ["Company Profile", "Catalog", "WhatsApp", "B2B"]
    },
    {
      id: 3,
      title: "AI FAQ System",
      category: "AI Solution",
      client: "Tech Startup Company",
      image: "/portfolio/AI FAQ System.jpeg",
      shortDescription: "AI-based FAQ system with natural language processing for customer support.",
      description: "Developing intelligent FAQ systems using machine learning to understand customer questions and provide relevant answers. This system reduces customer service workload by 70% with accurate response automation.",
      duration: "10 Weeks",
      challenges: [
        "Training models to understand various question types",
        "Integration with existing helpdesk systems",
        "Handling ambiguous questions",
        "Multi-language understanding"
      ],
      solutions: [
        "Fine-tuning GPT models for specific domains",
        "API integration with Zendesk & Freshdesk",
        "Confidence scoring for ambiguous questions",
        "Fallback to human agents when needed"
      ],
      results: [
        { value: "70%", label: "Reduction in Support Tickets" },
        { value: "4.5/5", label: "Customer Satisfaction" },
        { value: "24/7", label: "Availability" }
      ],
      techStack: ["Python", "FastAPI", "OpenAI", "React", "Redis"],
      tags: ["AI", "Chatbot", "NLP", "Automation"]
    },
  ];

  useEffect(() => {
    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting) {
        setHasAnimated(true);
        if (observerRef.current) {
          observerRef.current.disconnect();
        }
      }
    };

    observerRef.current = new IntersectionObserver(handleIntersect, {
      threshold: 0.1,
      rootMargin: "50px"
    });

    const statsSection = document.getElementById('stats-section');
    if (statsSection && observerRef.current) {
      observerRef.current.observe(statsSection);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const handleSkillClick = (skill: any) => {
    setSelectedSkill(skill);
  };

  const handleProjectClick = (project: any) => {
    setSelectedProject(project);
  };

  const closeModal = () => {
    setSelectedSkill(null);
    setSelectedProject(null);
  };
    
  const socialMediaLinks = [
    { icon: 'Instagram', href: "https://www.instagram.com/swakarsa_digital", label: "Instagram", src: "/sosmed/instagram.jpeg" },
    { icon: 'Facebook', href: "https://www.facebook.com/share/1B4CzChc4e", label: "Facebook", src: "/sosmed/facebook.png" },
    { icon: 'X', href: "https://x.com/swakarsadigital", label: "X (Twitter)", src: "/sosmed/x.png" },
    { icon: 'Linkedin', href: "https://www.linkedin.com/in/swakarsa-digital-65a651379", label: "LinkedIn", src: "/sosmed/linkedIn.png" },
    { icon: 'GitHub', href: "https://github.com/SwakarsaDigital", label: "GitHub", src: "/sosmed/github.png" },
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-white overflow-x-hidden">
      
      {/* ================= MODERN NAVBAR COMPONENT ================= */}
      <Navbar mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />

      {/* ================= NEW HERO SECTION ================= */}
      <section id="home" className="relative min-h-screen flex items-center justify-center pt-32 pb-32 overflow-hidden z-10 bg-slate-950">
        <OceanWaves />
        <CyberWhale />
        <CyberFrog />
        <div className="container relative z-20 px-4 sm:px-6 text-center">
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
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-teal-400 to-blue-400 animate-gradient-x">
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
            <span className="font-semibold mx-1 text-white">
              credibility
            </span>, 
            <span className="font-semibold mx-1 text-white">
              generate leads
            </span>, and 
            <span className="font-semibold mx-1 text-white">
              increase sales
            </span>.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-20"
          >
            <a href="/portfolio" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto shadow-lg shadow-cyan-500/25">
                View Our Work <ChevronRight size={20} />
              </Button>
            </a>
            <a href="/team" onClick={handleTeamClick} className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                Meet the Team
              </Button>
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

      {/* ================= STATS COUNTER ================= */}
      <StatsSection stats={stats} hasAnimated={hasAnimated} />

      {/* ================= ABOUT ================= */}
      <section id="about" className="container mx-auto px-4 sm:px-6 py-20 sm:py-32">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-white">
              More Than Just a <br />
              <span className="text-cyan-500">Digital Agency</span>
            </h2>
            <div className="space-y-6 text-base sm:text-lg leading-relaxed text-slate-400">
                <p>
                Swakarsa Digital is a collective of freelancers consisting of
                web developers, digital marketers, and creative strategists.
                We work as one team to help brands and SMEs
                build modern, scalable digital presence ready to compete.
                </p>
                <p>
                Our mission is to empower businesses with effective digital solutions
                that drive growth, enhance credibility, and maximize ROI. We believe
                in transparency, collaboration, and delivering measurable results.
                </p>
            </div>
            
            <div className="mt-8 grid grid-cols-2 gap-6">
                <div className="p-4 rounded-xl border border-slate-800 bg-slate-900">
                    <h3 className="font-bold text-2xl text-cyan-500 mb-1">5+</h3>
                    <p className="text-sm text-slate-400">Years Experience</p>
                </div>
                <div className="p-4 rounded-xl border border-slate-800 bg-slate-900">
                    <h3 className="font-bold text-2xl text-teal-500 mb-1">100%</h3>
                    <p className="text-sm text-slate-400">Commitment</p>
                </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
             <div className="absolute -inset-4 rounded-3xl blur-2xl opacity-30 bg-cyan-500"></div>
             <Card className="relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-cyan-500/20 to-teal-500/20 rounded-bl-full"></div>
                <CardContent className="space-y-6 relative z-10">
                    <div className="flex items-start gap-4">
                        <div className="p-3 rounded-lg bg-cyan-500/20 text-cyan-400">
                            <Globe size={24} />
                        </div>
                        <div>
                            <h4 className="font-bold text-lg mb-1 text-white">Websites & Systems</h4>
                            <p className="text-sm text-slate-400">Custom web apps, landing pages, and complex management systems.</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <div className="p-3 rounded-lg bg-teal-500/20 text-teal-400">
                            <Sparkles size={24} />
                        </div>
                        <div>
                            <h4 className="font-bold text-lg mb-1 text-white">Digital Marketing</h4>
                            <p className="text-sm text-slate-400">SEO, Ads, and social media strategies to boost your online presence.</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <div className="p-3 rounded-lg bg-blue-500/20 text-blue-400">
                            <Cpu size={24} />
                        </div>
                        <div>
                            <h4 className="font-bold text-lg mb-1 text-white">Tech Consultation</h4>
                            <p className="text-sm text-slate-400">Expert advice on the right technology stack for your business growth.</p>
                        </div>
                    </div>
                </CardContent>
             </Card>
          </motion.div>
        </div>
      </section>

      {/* ================= WORKFLOW SECTION (NEW) ================= */}
      <WorkflowSection />

            {/* ================= TEAM SECTION ================= */}
      <section id="team" className="py-20 sm:py-32 bg-slate-900/30">
        <div className="container mx-auto px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5 }}
              className="text-center max-w-3xl mx-auto mb-16"
            >
                <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-white">
                Meet Our Leadership
                </h2>
                <p className="text-lg text-slate-400">
                The creative minds and technical experts behind Swakarsa Digital.
                </p>
            </motion.div>
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-8">
            {teamMembers.map((member, index) => (
                <TeamMember 
                key={`${member.name}-${index}`} 
                member={member} 
                index={index} 
                />
            ))}
            </div>
            <div className="text-center mt-12">
                <a href="/team" onClick={handleTeamClick}>
                    <Button variant="outline" size="lg">
                        View All Teams & CVs
                    </Button>
                </a>
            </div>
        </div>
      </section>

      {/* ================= SKILLS ================= */}
      <section id="services" className="container mx-auto px-4 sm:px-6 py-20 sm:py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-white">
                Core Capabilities
            </h2>
            <p className="text-lg text-slate-400">
                End-to-end digital services for modern business needs. We combine technical expertise with creative strategy.
            </p>
          </div>

          {/* New 3D Carousel Component for Skills */}
          <SkillsCarousel skills={skills} onClick={handleSkillClick} />

          {/* Skills Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-16 p-8 rounded-3xl relative overflow-hidden bg-gradient-to-r from-slate-900 to-slate-800 border border-slate-700"
          >
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
              <div className="flex-shrink-0">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-cyan-500 to-teal-500 flex items-center justify-center shadow-lg shadow-cyan-500/30">
                  <span className="text-white text-2xl font-bold">All-in</span>
                </div>
              </div>
              <div>
                <h3 className="font-bold text-2xl mb-2 text-white">
                  Complete Solutions in One Platform
                </h3>
                <p className="text-lg leading-relaxed text-slate-400">
                  We don't just build websites; we build ecosystems. From initial concept to deployment and marketing, 
                  we ensure every part of your digital presence works together seamlessly.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ================= PORTFOLIO WITH ENHANCED ANIMATIONS ================= */}
      <section id="portfolio" className="py-20 sm:py-32 bg-slate-900">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
              <div className="max-w-2xl">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                  className="h-1 w-full bg-gradient-to-r from-cyan-500 to-blue-500 mb-6 rounded-full"
                />
                
                <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-white">
                  <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="block"
                  >
                    Featured Work
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-cyan-400 block text-lg font-normal mt-2"
                  >
                    Scroll to explore our latest projects
                  </motion.span>
                </h2>
                
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="text-lg text-slate-400"
                >
                  A selection of our recent projects that showcase our commitment to quality and innovation.
                </motion.p>
              </div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <a href="/portfolio">
                  <Button variant="outline" className="whitespace-nowrap group">
                    <span className="flex items-center gap-2">
                      View All Projects
                      <motion.span
                        animate={{ x: [0, 5, 0] }}
                        transition={{ 
                          duration: 1.5, 
                          repeat: Infinity,
                          repeatType: "reverse"
                        }}
                      >
                        <ChevronRight size={16} />
                      </motion.span>
                    </span>
                  </Button>
                </a>
              </motion.div>
            </div>

            {/* Grid yang sudah dioptimalkan - 2 kolom untuk desktop */}
            <motion.div 
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.1,
                    delayChildren: 0.1
                  }
                },
                hidden: {}
              }}
            >
              {portfolioItems.map((project, index) => (
                <motion.div
                  key={project.id}
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: { 
                      opacity: 1, 
                      y: 0,
                      transition: {
                        type: "spring",
                        stiffness: 100,
                        damping: 15
                      }
                    }
                  }}
                >
                  <EnhancedPortfolioCard 
                    project={project}
                    index={index}
                    onClick={handleProjectClick}
                  />
                </motion.div>
              ))}
            </motion.div>

            {/* Portfolio CTA dengan entrance animation */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ 
                duration: 0.6, 
                delay: 0.3,
                type: "spring",
                stiffness: 100
              }}
              className="mt-16 p-8 md:p-12 rounded-3xl text-center relative overflow-hidden group bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700"
            >
              {/* Animated background */}
              <motion.div 
                className="absolute inset-0 opacity-10"
                animate={{
                  background: [
                    'radial-gradient(circle at 30% 50%, rgba(6, 182, 212, 0.1) 0%, transparent 50%)',
                    'radial-gradient(circle at 70% 50%, rgba(6, 182, 212, 0.1) 0%, transparent 50%)',
                    'radial-gradient(circle at 30% 50%, rgba(6, 182, 212, 0.1) 0%, transparent 50%)'
                  ]
                }}
                transition={{ duration: 8, repeat: Infinity }}
              />
              
              <div className="relative z-10">
                <motion.h3 
                  className="font-bold text-2xl md:text-3xl mb-4 text-white"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  Have a project in mind?
                </motion.h3>
                
                <motion.p 
                  className="text-lg max-w-2xl mx-auto mb-8 text-slate-300"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                >
                  Let's discuss how we can help you achieve your goals. We're always excited to take on new challenges.
                </motion.p>
                
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <a href="#contact">
                    <Button size="lg" className="shadow-xl relative overflow-hidden">
                      <motion.span
                        className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20"
                        animate={{
                          x: ['-100%', '100%']
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          ease: "linear"
                        }}
                      />
                      <span className="relative z-10">Start a Conversation</span>
                    </Button>
                  </a>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ================= TESTIMONIALS SECTION (NEW) ================= */}
      <TestimonialsSection />

      {/* ================= FAQ SECTION (NEW) ================= */}
      <FAQSection />

      {/* ================= CLIENT LOGOS ================= */}
      <ClientLogosSection logos={clientLogos} />

      {/* ================= CTA & FOOTER ================= */}
      <footer className="relative pt-24 pb-12 overflow-hidden bg-slate-900 border-t border-slate-800">
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
            <div className="text-center max-w-4xl mx-auto mb-20" id="contact">
                <h2 className="text-4xl sm:text-5xl font-extrabold mb-6 tracking-tight text-white">
                Ready to Level Up?
                </h2>
                <p className="text-xl mb-10 text-slate-400">
                Consult your website & marketing needs with the Swakarsa Digital team.
                Get a free consultation to discuss your project requirements.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                    <Button size="lg" className="shadow-2xl shadow-cyan-500/40">
                        <a href="https://mail.google.com/mail/u/0/?view=cm&fs=1&to=swakarsadigital@gmail.com&su=Free%20Consultation%20Request&body=Hello%20Swakarsa%20Digital%2C%0A%0AI%20would%20like%20to%20book%20a%20free%20consultation%20to%20discuss%20my%20website%20and%20marketing%20needs.%0A%0APlease%20let%20me%20know%20your%20availability.%0A%0AThank%20you%21" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                             Book Free Consultation
                        </a>
                    </Button>
                    <Button size="lg" variant="outline">
                        <a href="https://mail.google.com/mail/u/0/?view=cm&fs=1&to=swakarsadigital@gmail.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                             Send Email
                        </a>
                    </Button>
                </div>
                 {/* Social Media */}
                <div className="mt-12">
                    <p className="text-sm font-semibold uppercase tracking-widest mb-6 text-slate-500">
                        Follow Our Journey
                    </p>
                    <div className="flex justify-center gap-6">
                        {socialMediaLinks.map((social, idx) => (
                        <SocialMediaLogo 
                            key={idx} 
                            social={social} 
                            size="w-10 h-10 md:w-12 md:h-12"
                        />
                        ))}
                    </div>
                </div>
            </div>
            <div className="h-px w-full my-12 bg-slate-800"></div>
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                <a href="/" className="flex items-center gap-3">
                    <img 
                        src="/images/logo.jpeg" 
                        alt="Logo" 
                        className="w-8 h-8 rounded-lg"
                        onError={(e: any) => {
                            e.target.onerror = null;
                            e.target.src = "https://placehold.co/32x32/333/FFF?text=S";
                        }}
                    />
                    <span className="font-bold text-lg text-white">
                        Swakarsa Digital
                    </span>
                </a>
                <p className="text-sm text-slate-500">
                    © {new Date().getFullYear()} Swakarsa Digital. All Rights Reserved.
                </p>
                <div className="flex gap-6 text-sm font-medium">
                    <a href="#" className="hover:text-cyan-500 transition-colors text-slate-400">Privacy Policy</a>
                    <a href="#" className="hover:text-cyan-500 transition-colors text-slate-400">Terms of Service</a>
                </div>
            </div>
        </div>
      </footer>

      {/* ================= MODALS ================= */}
      <Modal
        isOpen={!!selectedSkill}
        onClose={closeModal}
        title={selectedSkill?.title}
      >
        {selectedSkill && <SkillModalContent skill={selectedSkill} />}
      </Modal>

      <Modal
        isOpen={!!selectedProject}
        onClose={closeModal}
        title={selectedProject?.title}
      >
        {selectedProject && <PortfolioModalContent project={selectedProject} />}
      </Modal>

      {/* Frog Gatekeeper Modal */}
      <FrogGatekeeper 
        isOpen={showFrogGatekeeper} 
        onClose={() => setShowFrogGatekeeper(false)} 
      />
    </div>
  );
}