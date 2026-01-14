"use client";

import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent, useMotionValue, useSpring, animate, useMotionTemplate } from "framer-motion";
// Importing Lucide icons
import { 
  Mail, Phone, Globe, Menu, X, ChevronRight, ExternalLink, ArrowRight, 
  Code, Cpu, Layers, Sparkles, ChevronDown, Bug
} from "lucide-react";
import { useState, useEffect, useRef, memo } from "react";

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
    { name: "Services", href: "#services" },
    { name: "Portfolio", href: "#portfolio" },
    { name: "Team", href: "#team" },
    { name: "Contact", href: "#contact" },
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
             className="px-5 py-2 rounded-full border border-white/10 hover:border-cyan-500/50 text-slate-300 hover:text-cyan-400 text-sm font-medium transition-all hover:bg-white/5"
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
};

// ================= CYBER FROG V3 COMPONENT (FULLY ANIMATED) =================
const CyberFrog = () => {
  const [isRibbiting, setIsRibbiting] = useState(false);
  const [isBlinking, setIsBlinking] = useState(false);
  const [msgIndex, setMsgIndex] = useState(0);

  // --- BUG & EATING LOGIC ---
  const [bug, setBug] = useState<{ x: number; y: number; status: 'flying' | 'being_eaten' } | null>(null);

  useEffect(() => {
    const spawnBugSequence = () => {
      // Random bug position (SVG ViewBox 0-100 x, 0-60 y)
      const bugX = Math.random() * 80 + 10; // range 10 - 90
      const bugY = Math.random() * 50 + 5;  // range 5 - 55 (upper area)
      
      // 1. Spawn Bug
      setBug({ x: bugX, y: bugY, status: 'flying' });

      // 2. Frog eats bug after 2 seconds
      setTimeout(() => {
        setBug(prev => prev ? { ...prev, status: 'being_eaten' } : null);
        
        // Visual 'Ribbit' effect when eating
        setIsRibbiting(true);
        setTimeout(() => setIsRibbiting(false), 500);
      }, 2000);

      // 3. Hide bug (eaten)
      setTimeout(() => {
        setBug(null);
      }, 2300); // 300ms tongue duration
    };

    // Initial spawn fast, then every 20s
    const initialTimer = setTimeout(spawnBugSequence, 3000);
    const intervalTimer = setInterval(spawnBugSequence, 20000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(intervalTimer);
    };
  }, []);

  // --- MOUSE TRACKING LOGIC ---
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring physics for eyes
  const springConfig = { damping: 25, stiffness: 150 };
  const pupilX = useSpring(useTransform(mouseX, [-500, 500], [-6, 6]), springConfig);
  const pupilY = useSpring(useTransform(mouseY, [-500, 500], [-6, 6]), springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // If bug exists, eyes track bug
      if (bug) {
        // Estimate conversion to match pupil movement range
        const targetX = (bug.x - 50) * 10; 
        const targetY = (bug.y - 50) * 10;
        mouseX.set(targetX);
        mouseY.set(targetY);
      } else {
        // Track mouse
        const centerX = window.innerWidth - 100; // Approx frog X position
        const centerY = 150; // Approx frog Y position
        mouseX.set(e.clientX - centerX);
        mouseY.set(e.clientY - centerY);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY, bug]);

  // --- BLINKING LOGIC ---
  useEffect(() => {
    const blinkLoop = () => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 150);
      const nextBlink = Math.random() * 4000 + 2000;
      setTimeout(blinkLoop, nextBlink);
    };
    const timeoutId = setTimeout(blinkLoop, 2000);
    return () => clearTimeout(timeoutId);
  }, []);

  // --- INTERACTION LOGIC ---
  const messages = [
    "SYSTEM: ONLINE 🐸",
    "TARGET: LOCKED 🎯",
    "BUG: ELIMINATED 🦟",
    "YUMMY.DAT LOADED"
  ];

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
      animate={{ 
        y: [0, -15, 0],
      }}
      transition={{ 
        y: { duration: 3, repeat: Infinity, ease: "easeInOut" }
      }}
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
                <div className="absolute top-0 left-0 w-full h-[1px] bg-cyan-500 opacity-50 animate-pulse" />
                <div className="absolute bottom-0 left-0 w-full h-[1px] bg-cyan-500 opacity-50 animate-pulse" />
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
        animate={isRibbiting ? {
          rotate: [-2, 2, -2, 2, 0],
          scale: [1, 1.1, 0.95, 1]
        } : {}}
        transition={{ type: "spring", stiffness: 300, damping: 10 }}
      >
        {/* === LEGS LAYER === */}
        <motion.g
          animate={{ y: [0, 3, 0], rotate: [0, 2, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <path d="M15 95C8 95 3 105 8 110" stroke="#064e3b" strokeWidth="6" strokeLinecap="round" />
          <path d="M85 95C92 95 97 105 92 110" stroke="#064e3b" strokeWidth="6" strokeLinecap="round" />
          <ellipse cx="12" cy="108" rx="5" ry="3" fill="#064e3b" />
          <ellipse cx="88" cy="108" rx="5" ry="3" fill="#064e3b" />
        </motion.g>

        <motion.g
          animate={{ y: [0, -2, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        >
          <ellipse cx="25" cy="80" rx="8" ry="12" fill="#15803d" />
          <ellipse cx="75" cy="80" rx="8" ry="12" fill="#15803d" />
          <ellipse cx="25" cy="88" rx="6" ry="4" fill="#4ade80" />
          <ellipse cx="75" cy="88" rx="6" ry="4" fill="#4ade80" />
        </motion.g>

        {/* === BODY & BREATHING === */}
        <ellipse cx="50" cy="70" rx="38" ry="30" fill="#16a34a" />
        <motion.ellipse 
          cx="50" cy="72" rx="20" ry="15" 
          fill="#86efac"
          animate={isRibbiting ? {
            rx: [20, 35, 20],
            ry: [15, 28, 15],
            fill: ["#86efac", "#4ade80", "#86efac"]
          } : {
            rx: [20, 22, 20],
            ry: [15, 17, 15],
            fillOpacity: [0.6, 0.8, 0.6]
          }}
          transition={isRibbiting ? { duration: 0.4, repeat: 3 } : { duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        <path d="M35 70 L65 70 M40 75 L60 75 M45 80 L55 80" stroke="#14532d" strokeWidth="2" strokeOpacity="0.3" strokeLinecap="round" />

        {/* === HEAD === */}
        <circle cx="32" cy="50" r="16" fill="#16a34a" />
        <circle cx="68" cy="50" r="16" fill="#16a34a" />
        <ellipse cx="50" cy="55" rx="20" ry="18" fill="#16a34a" />

        {/* === EYES (TRACKING) === */}
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

        {/* === EYELIDS === */}
        <motion.path d="M20 50 Q32 38 44 50" stroke="#15803d" strokeWidth="12" strokeLinecap="round" fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: isBlinking ? 1 : 0, opacity: isBlinking ? 1 : 0 }} transition={{ duration: 0.1 }} />
        <motion.path d="M56 50 Q68 38 80 50" stroke="#15803d" strokeWidth="12" strokeLinecap="round" fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: isBlinking ? 1 : 0, opacity: isBlinking ? 1 : 0 }} transition={{ duration: 0.1 }} />

        {/* === GOGGLES === */}
        <motion.g
           animate={{ opacity: [0.8, 1, 0.8] }}
           transition={{ duration: 3, repeat: Infinity }}
           whileHover={{ scale: 1.05, opacity: 1 }}
        >
            <rect x="18" y="42" width="64" height="16" rx="6" fill="rgba(15, 23, 42, 0.7)" stroke="#06b6d4" strokeWidth="2" />
            <path d="M22 46H30" stroke="#06b6d4" strokeWidth="1" strokeOpacity="0.5" />
            <path d="M70 46H78" stroke="#06b6d4" strokeWidth="1" strokeOpacity="0.5" />
            <circle cx="32" cy="50" r="2" fill="#22d3ee" className="animate-pulse" />
            <path d="M18 50H14" stroke="#0891b2" strokeWidth="3" strokeLinecap="round" />
            <path d="M82 50H86" stroke="#0891b2" strokeWidth="3" strokeLinecap="round" />
        </motion.g>

        {/* === MOUTH === */}
        <motion.path 
          d="M38 75 Q50 79 62 75" 
          stroke="#14532d" 
          strokeWidth="3" 
          strokeLinecap="round" 
          fill="none" 
          animate={bug && bug.status === 'being_eaten' ? { d: "M38 75 Q50 85 62 75" } : { d: "M38 75 Q50 79 62 75" }}
        />

        {/* === TONGUE (Z-Index Top) === */}
        {/* Dipindahkan ke sini supaya di atas badan (visible) */}
        {bug && bug.status === 'being_eaten' && (
           <motion.path
             d={`M50 75 Q ${50 + (bug.x - 50)/2} ${75 + (bug.y - 75)/2 - 15} ${bug.x} ${bug.y}`}
             stroke="#ec4899" 
             strokeWidth="4"
             strokeLinecap="round"
             fill="none"
             initial={{ pathLength: 0 }}
             animate={{ pathLength: [0, 1, 0] }}
             transition={{ duration: 0.3, times: [0, 0.5, 1] }}
           />
        )}

        {/* === CYBER BUG VISUAL === */}
        <AnimatePresence>
            {bug && bug.status === 'flying' && (
                <motion.g
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ 
                        scale: 1, 
                        opacity: 1,
                        x: [bug.x - 2, bug.x + 2, bug.x - 2], // Buzzing effect
                        y: [bug.y - 2, bug.y + 2, bug.y - 2]
                    }}
                    exit={{ scale: 0, opacity: 0, fill: "red" }} // Explode/vanish
                    transition={{ 
                        opacity: { duration: 0.2 },
                        x: { duration: 0.2, repeat: Infinity },
                        y: { duration: 0.3, repeat: Infinity }
                    }}
                >
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

  // --- MOTION VALUES FOR BUG POSITION (To Sync Eyes) ---
  const bugX = useMotionValue(50);
  const bugY = useMotionValue(50);

  // --- DERIVED EYE POSITION (Eyes track the bugX/bugY directly) ---
  // Range bug: 0-100. Eye range: -6 to 6 px.
  const eyeX = useTransform(bugX, [0, 100], [-6, 6]);
  const eyeY = useTransform(bugY, [0, 100], [-6, 6]);

  // --- DERIVED TONGUE PATH (Tongue connected to bug) ---
  const tonguePath = useTransform([bugX, bugY], (values: number[]) => {
     // Mouth fixed at 50, 75
     const mx = 50;
     const my = 75;
     // Control point for curve
     const bxNum = typeof values[0] === 'number' ? values[0] : 50;
     const byNum = typeof values[1] === 'number' ? values[1] : 75;
     const cx = mx + (bxNum - mx) / 2;
     const cy = my + (byNum - my) / 2 - 10;
     return `M${mx} ${my} Q ${cx} ${cy} ${bxNum} ${byNum}`;
  });

  // Animate bug flying around smoothly
  useEffect(() => {
    if (!isOpen || isFeeding) return;

    let controlsX: any, controlsY: any;

    const fly = () => {
      const nextX = Math.random() * 80 + 10;
      const nextY = Math.random() * 70 + 15;
      
      // Randomize speed slightly for realism (1.5s - 2.5s)
      const duration = Math.random() * 1 + 1.5;

      controlsX = animate(bugX, nextX, { duration, ease: "easeInOut" });
      controlsY = animate(bugY, nextY, { duration, ease: "easeInOut", onComplete: fly });
    };

    fly();

    return () => {
      if(controlsX) controlsX.stop();
      if(controlsY) controlsY.stop();
    };
  }, [isOpen, isFeeding, bugX, bugY]);

  const handleBugClick = () => {
    if (isFeeding) return;
    
    // 1. Trigger feeding sequence
    setIsFeeding(true);
    setIsMouthOpen(true);
    
    // 2. Animate bug to mouth quickly
    // Retract tongue effect (bug moves to mouth)
    animate(bugX, 50, { duration: 0.4, ease: "backIn" });
    animate(bugY, 75, { duration: 0.4, ease: "backIn", onComplete: () => {
        // 3. Start Chewing (Loading Phase)
        setIsSwallowing(true);
        
        // 4. Simulate Network Delay (Random 2s - 5s)
        const networkDelay = Math.random() * 3000 + 2000;

        setTimeout(() => {
          // 5. Success!
          setIsSwallowing(false);
          setIsMouthOpen(false);
          setShowAccessGranted(true);
          
          // 6. Navigate
          setTimeout(() => {
            window.location.href = "#team";
            onClose();
          }, 1000);
        }, networkDelay);
    }});
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          className="relative w-full max-w-2xl h-[600px] flex items-center justify-center"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Instructions */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="absolute top-8 left-1/2 -translate-x-1/2 text-center z-10"
          >
            <p className="text-white text-lg font-semibold mb-2">
              Feed the Cyber Frog to access the team!
            </p>
            <p className="text-cyan-400 text-sm">
              Click the glowing Data Bug 🐛
            </p>
          </motion.div>

          {/* Large Cyber Frog */}
          <div className="relative">
            <motion.svg
              width="300"
              height="360"
              viewBox="0 0 100 120"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="relative z-20"
              // Removed whole body chewing animation to keep frog steady
            >
              {/* BACK LEGS */}
              <path d="M15 95C8 95 3 105 8 110" stroke="#166534" strokeWidth="6" strokeLinecap="round" fill="#166534" />
              <path d="M85 95C92 95 97 105 92 110" stroke="#166534" strokeWidth="6" strokeLinecap="round" fill="#166534" />
              <ellipse cx="12" cy="108" rx="5" ry="3" fill="#166534" />
              <ellipse cx="88" cy="108" rx="5" ry="3" fill="#166534" />

              {/* FRONT LEGS */}
              <ellipse cx="25" cy="80" rx="8" ry="12" fill="#22c55e" />
              <ellipse cx="75" cy="80" rx="8" ry="12" fill="#22c55e" />
              <ellipse cx="25" cy="88" rx="6" ry="4" fill="#86efac" />
              <ellipse cx="75" cy="88" rx="6" ry="4" fill="#86efac" />

              {/* BODY */}
              <ellipse cx="50" cy="70" rx="38" ry="30" fill="#22c55e" />
              
              {/* BELLY / THROAT (Animated when swallowing) */}
              <motion.ellipse 
                cx="50" cy="75" 
                rx="28" ry="22" 
                fill="#86efac" 
                animate={isSwallowing ? {
                  ry: [22, 24, 22],
                  rx: [28, 29, 28],
                } : { ry: 22, rx: 28 }}
                transition={{ duration: 0.3, repeat: Infinity, ease: "easeInOut" }}
              />
              
              <ellipse cx="45" cy="68" rx="12" ry="8" fill="#4ade80" opacity="0.3" />
              <ellipse cx="55" cy="68" rx="12" ry="8" fill="#4ade80" opacity="0.3" />

              {/* HEAD */}
              <circle cx="32" cy="50" r="16" fill="#22c55e" />
              <circle cx="68" cy="50" r="16" fill="#22c55e" />
              <ellipse cx="50" cy="55" rx="20" ry="18" fill="#22c55e" />

              {/* EYES CONTAINER */}
              <g>
                  {/* Sclera */}
                  <circle cx="32" cy="50" r="11" fill="white" />
                  <circle cx="68" cy="50" r="11" fill="white" />
                  
                  {/* PUPILS (PERFECTLY SYNCED TRACKING) */}
                  <motion.g style={{ x: eyeX, y: eyeY }}>
                      <circle cx="32" cy="50" r="5" fill="#0f172a" />
                      <circle cx="68" cy="50" r="5" fill="#0f172a" />
                      <circle cx="34" cy="48" r="2" fill="white" opacity="0.8" />
                      <circle cx="70" cy="48" r="2" fill="white" opacity="0.8" />
                  </motion.g>
              </g>

              {/* CYBER GOGGLES */}
              <rect x="18" y="42" width="64" height="16" rx="6" fill="rgba(15, 23, 42, 0.8)" stroke="#0891b2" strokeWidth="2" />
              <ellipse cx="32" cy="50" rx="12" ry="10" fill="rgba(6, 182, 212, 0.3)" />
              <ellipse cx="68" cy="50" rx="12" ry="10" fill="rgba(6, 182, 212, 0.3)" />
              <ellipse cx="32" cy="50" rx="8" ry="6" fill="rgba(6, 182, 212, 0.6)" />
              <ellipse cx="68" cy="50" rx="8" ry="6" fill="rgba(6, 182, 212, 0.6)" />
              <path d="M18 50H10" stroke="#0891b2" strokeWidth="3" strokeLinecap="round" />
              <path d="M82 50H90" stroke="#0891b2" strokeWidth="3" strokeLinecap="round" />

              {/* MOUTH - Opens when feeding & Chews when swallowing */}
              <motion.path
                // Base mouth shape
                d="M38 75 Q50 80 62 75"
                stroke="#14532d"
                strokeLinecap="round"
                fill="none"
                animate={
                  isMouthOpen 
                    ? { d: "M38 75 Q50 85 62 75", strokeWidth: 4 } // Mouth Open (Feeding)
                    : isSwallowing 
                      ? { 
                          d: ["M38 75 Q50 80 62 75", "M38 75 Q50 83 62 75", "M38 75 Q50 80 62 75"], // Chewing loop
                          strokeWidth: 3,
                          transition: { duration: 0.3, repeat: Infinity, ease: "easeInOut" }
                        }
                      : { d: "M38 75 Q50 80 62 75", strokeWidth: 3 } // Idle
                }
              />

              {/* TONGUE - Triggered when feeding (DYNAMIC PATH) */}
              {isFeeding && !showAccessGranted && (
                 <motion.path
                   d={tonguePath} // Path is linked to bug position!
                   stroke="#ec4899"
                   strokeWidth="4"
                   strokeLinecap="round"
                   fill="none"
                   // Initial shoot out effect
                   initial={{ pathLength: 0 }}
                   animate={{ pathLength: 1 }}
                   transition={{ duration: 0.1 }}
                 />
              )}

              {/* CHEEKS */}
              <circle cx="26" cy="68" r="5" fill="#f472b6" opacity="0.5" />
              <circle cx="74" cy="68" r="5" fill="#f472b6" opacity="0.5" />

              {/* CYBER BUG INSIDE SVG - Driven by Motion Values */}
              {!showAccessGranted && (
                 <motion.g
                   onClick={handleBugClick}
                   style={{ x: bugX, y: bugY, cursor: 'pointer' }}
                   animate={{ 
                      opacity: isSwallowing ? 0 : 1, // Hide bug when swallowing
                      scale: isSwallowing ? 0 : 1
                   }}
                 >
                    <circle cx="0" cy="0" r="3" fill="#1e293b" />
                    <ellipse cx="-3" cy="-2" rx="3" ry="1.5" fill="#ef4444" opacity="0.8" className="animate-pulse" />
                    <ellipse cx="3" cy="-2" rx="3" ry="1.5" fill="#ef4444" opacity="0.8" className="animate-pulse" />
                    <rect x="-4" y="-4" width="8" height="8" stroke="#ef4444" strokeWidth="0.5" fill="none" strokeDasharray="1 1" opacity="0.5">
                          <animate attributeName="opacity" values="0;1;0" dur="1s" repeatCount="indefinite" />
                    </rect>
                 </motion.g>
              )}
            </motion.svg>

            {/* ACCESS GRANTED Text */}
            {showAccessGranted && (
              <motion.div
                initial={{ opacity: 0, scale: 0, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: -80 }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40"
              >
                <div className="bg-gradient-to-r from-cyan-500 to-teal-500 text-white px-8 py-4 rounded-2xl font-bold text-2xl shadow-[0_0_30px_rgba(6,182,212,0.8)] border-2 border-white">
                  ACCESS GRANTED! 🎉
                </div>
              </motion.div>
            )}
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-50"
          >
            <X size={24} />
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
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

// ================= EXISTING COMPONENTS =================

// Optimized Team Member Component
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

// Optimized Stats Component with scroll animation
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

// Skill Modal Content
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

// Portfolio Modal Content
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

// Skill Card with scroll animation
const SkillCard = ({ skill, index, onClick }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    whileHover={{ y: -8, scale: 1.02 }}
    className="rounded-2xl overflow-hidden cursor-pointer group relative flex flex-col h-full bg-slate-900/60 border border-slate-800 hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(34,211,238,0.15)] transition-all duration-300"
    onClick={() => onClick(skill)}
  >
    <div className="relative h-48 overflow-hidden">
      <img 
        src={skill.image} 
        alt={skill.title}
        loading="lazy"
        decoding="async"
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
      
      <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold tracking-wide backdrop-blur-md shadow-lg bg-slate-900/80 text-white border border-slate-700">
        {skill.category}
      </div>
    </div>

    <div className="p-6 flex flex-col flex-grow">
      <h3 className="font-bold text-xl mb-2 line-clamp-1 group-hover:text-cyan-400 transition-colors text-white">
        {skill.title}
      </h3>
      <p className="text-sm leading-relaxed line-clamp-2 mb-6 flex-grow text-slate-400">
        {skill.shortDescription}
      </p>
      
      <div className="flex flex-wrap gap-2 mb-6">
        {skill.tags.slice(0, 3).map((tag: string, idx: number) => (
          <span key={idx} className="px-2.5 py-1 rounded-md text-xs font-medium bg-slate-800 text-slate-300">
            {tag}
          </span>
        ))}
      </div>
      
      <div className="flex items-center justify-between pt-4 border-t border-slate-800 mt-auto">
        <span className="text-sm font-semibold flex items-center gap-1 text-cyan-400">
          Learn More <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </span>
      </div>
    </div>
  </motion.div>
);

// Portfolio Card
const PortfolioCard = ({ project, index, onClick }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    whileHover={{ y: -8 }}
    className="rounded-2xl overflow-hidden cursor-pointer group bg-slate-900/60 border border-slate-800 hover:border-cyan-500/50 transition-all duration-300"
    onClick={() => onClick(project)}
  >
    <div className="relative h-56 overflow-hidden">
      <img 
        src={project.image} 
        alt={project.title}
        loading="lazy"
        decoding="async"
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
      
      <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold bg-black/60 backdrop-blur-md text-white border border-white/10">
        {project.category}
      </div>

      <div className="absolute bottom-4 left-4 right-4 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
          <h3 className="font-bold text-xl text-white mb-1 truncate">
            {project.title}
          </h3>
          <p className="text-sm text-gray-300 line-clamp-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75">
             {project.client}
          </p>
      </div>
    </div>

    <div className="p-5">
      <p className="text-sm line-clamp-2 mb-4 text-slate-400">
        {project.shortDescription}
      </p>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {project.tags.slice(0, 3).map((tag: string, idx: number) => (
          <span key={idx} className="px-2 py-1 rounded text-xs font-medium bg-slate-800 text-slate-300">
            {tag}
          </span>
        ))}
      </div>
      
      <div className="flex items-center justify-between pt-3 border-t border-slate-800">
        <span className="text-sm font-medium flex items-center gap-2 group-hover:gap-3 transition-all text-white">
          View Case Study <ArrowRight size={14} className="text-cyan-500" />
        </span>
      </div>
    </div>
  </motion.div>
);

// Client Logos Section
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
                      <img
                        src={logo.src}
                        alt={logo.name}
                        loading="lazy"
                        decoding="async"
                        className="h-12 sm:h-16 md:h-20 w-auto object-contain transition-all duration-300 opacity-70 hover:opacity-100 hover:scale-110"
                        onError={(e: any) => { 
                            e.target.onerror = null; 
                            e.target.src="https://placehold.co/120x60/A0A0A0/FFFFFF?text=Client";
                        }}
                      />
                    </motion.div>
                ))}
            </div>
        </motion.div>
    </section>
);

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
    {
      id: 4,
      title: "Hotel Dwipa Management System",
      category: "Hotel Management System",
      client: "Hotel Dwipa - Hospitality Business",
      image: "/portfolio/Hotel Dwipa Management System.jpeg",
      shortDescription: "Comprehensive hotel management system with booking, room management, and guest services.",
      description: "Developing a complete hotel management system that handles reservations, check-in/check-out, room status management, billing, and guest services. The system integrates with payment gateways and provides real-time availability updates.",
      duration: "12 Weeks",
      challenges: [
        "Managing multiple room types and pricing tiers",
        "Real-time availability synchronization",
        "Integration with payment gateways",
        "Handling peak booking periods"
      ],
      solutions: [
        "Dynamic pricing engine with seasonal adjustments",
        "Real-time booking system with conflict prevention",
        "Multiple payment gateway integration",
        "Automated email notifications and confirmations"
      ],
      results: [
        { value: "50%", label: "Booking Efficiency" },
        { value: "30%", label: "Revenue Increase" },
        { value: "4.8/5", label: "Guest Satisfaction" }
      ],
      techStack: ["Next.js", "Node.js", "PostgreSQL", "Stripe", "SendGrid"],
      tags: ["Hospitality", "Booking", "Management", "Payment"]
    },
    {
      id: 5,
      title: "Restaurant POS System",
      category: "Point of Sale System",
      client: "Restaurant Chain - F&B Business",
      image: "/portfolio/Restaurant POS System.jpeg",
      shortDescription: "Modern restaurant POS system with table management, kitchen display, and order tracking.",
      description: "Building a comprehensive restaurant POS system that handles table management, order taking, kitchen display system (KDS), payment processing, and sales reporting. The system supports multiple payment methods and integrates with delivery platforms.",
      duration: "10 Weeks",
      challenges: [
        "Real-time order synchronization between front and kitchen",
        "Table management for busy restaurants",
        "Split billing and group orders",
        "Integration with delivery platforms"
      ],
      solutions: [
        "WebSocket-based real-time order updates",
        "Visual table map with status indicators",
        "Flexible billing system with item-level splitting",
        "API integration with major delivery platforms"
      ],
      results: [
        { value: "40%", label: "Faster Service" },
        { value: "25%", label: "Order Accuracy" },
        { value: "35%", label: "Revenue Growth" }
      ],
      techStack: ["React", "Node.js", "Socket.io", "PostgreSQL", "Stripe"],
      tags: ["POS", "Restaurant", "F&B", "Real-time"]
    },
    {
      id: 6,
      title: "Transport Management System",
      category: "Logistics System",
      client: "Transportation Company - Logistics",
      image: "/portfolio/Transport Management System.jpeg",
      shortDescription: "Fleet management and logistics system with route optimization and real-time tracking.",
      description: "Creating a comprehensive transport management system that handles fleet management, route optimization, driver assignment, real-time GPS tracking, and delivery status updates. The system helps reduce fuel costs and improve delivery efficiency.",
      duration: "14 Weeks",
      challenges: [
        "Real-time GPS tracking for multiple vehicles",
        "Route optimization for cost efficiency",
        "Driver performance monitoring",
        "Integration with customer notification systems"
      ],
      solutions: [
        "GPS tracking with Google Maps integration",
        "AI-powered route optimization algorithm",
        "Driver dashboard with performance metrics",
        "Automated SMS/email notifications for customers"
      ],
      results: [
        { value: "30%", label: "Fuel Cost Reduction" },
        { value: "45%", label: "On-time Delivery" },
        { value: "50+", label: "Vehicles Managed" }
      ],
      techStack: ["Next.js", "Node.js", "PostgreSQL", "Google Maps API", "Twilio"],
      tags: ["Logistics", "Fleet Management", "GPS", "Optimization"]
    },
    {
      id: 7,
      title: "Web Scraping Dashboard",
      category: "Data Collection System",
      client: "Market Research Company",
      image: "/portfolio/Web Scraping Dashboard.jpeg",
      shortDescription: "Automated web scraping platform with data visualization and scheduling capabilities.",
      description: "Developing a web scraping dashboard that allows users to schedule scraping tasks, monitor data collection progress, visualize collected data, and export results. The system includes proxy rotation, rate limiting, and data cleaning features.",
      duration: "8 Weeks",
      challenges: [
        "Handling anti-scraping measures",
        "Managing large-scale data collection",
        "Data cleaning and normalization",
        "Scheduling and automation"
      ],
      solutions: [
        "Proxy rotation and user-agent management",
        "Distributed scraping architecture",
        "Automated data validation and cleaning",
        "Cron-based scheduling system"
      ],
      results: [
        { value: "10K+", label: "Daily Data Points" },
        { value: "95%", label: "Success Rate" },
        { value: "80%", label: "Time Saved" }
      ],
      techStack: ["Python", "Scrapy", "React", "PostgreSQL", "Redis", "Celery"],
      tags: ["Web Scraping", "Data", "Automation", "Analytics"]
    }
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
    { icon: 'GitHub', href: "https://github.com/rmyonathan", label: "GitHub", src: "/sosmed/github.png" },
  ];

  const menuItems = ["Home", "Portfolio", "Services", "Team", "Contact"];

  return (
    <div className="min-h-screen bg-slate-900 text-white overflow-x-hidden">
      
      {/* ================= MODERN NAVBAR COMPONENT ================= */}
      <Navbar mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />

      {/* ================= NEW HERO SECTION ================= */}
      <section id="home" className="relative min-h-screen flex items-center justify-center pt-32 pb-32 overflow-hidden z-10 bg-slate-950">
        {/* Ocean Waves Canvas Background - Highly Performant */}
        <OceanWaves />

        {/* Cyber Frog - Interactive Element (Now uses Updated V3 Animation) */}
        <CyberFrog />

        {/* Hero Content z-10 */}
        <div className="container relative z-10 px-4 sm:px-6 text-center">
          
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
        
        {/* Scroll Indicator */}
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
            
            {/* View All Teams Button */}
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

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {skills.map((skill, index) => (
              <SkillCard 
                key={skill.id}
                skill={skill}
                index={index}
                onClick={handleSkillClick}
              />
            ))}
          </div>

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

      {/* ================= PORTFOLIO ================= */}
      <section id="portfolio" className="py-20 sm:py-32 bg-slate-900">
         <div className="container mx-auto px-4 sm:px-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5 }}
            >
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <div className="max-w-2xl">
                        <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-white">
                        Featured Work
                        </h2>
                        <p className="text-lg text-slate-400">
                        A selection of our recent projects that showcase our commitment to quality and innovation.
                        </p>
                    </div>
                    <a href="/portfolio">
                        <Button variant="outline" className="whitespace-nowrap">
                            View All Projects
                        </Button>
                    </a>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                {portfolioItems.map((project, index) => (
                    <PortfolioCard 
                    key={project.id}
                    project={project}
                    index={index}
                    onClick={handleProjectClick}
                    />
                ))}
                </div>

                {/* Portfolio CTA */}
                <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="mt-16 p-8 md:p-12 rounded-3xl text-center relative overflow-hidden group bg-cyan-900/20 border border-cyan-500/30"
                >
                    <div className="absolute inset-0 opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
                    <div className="relative z-10">
                        <h3 className="font-bold text-2xl md:text-3xl mb-4 text-white">
                        Have a project in mind?
                        </h3>
                        <p className="text-lg max-w-2xl mx-auto mb-8 text-slate-300">
                        Let's discuss how we can help you achieve your goals. We're always excited to take on new challenges.
                        </p>
                        <a href="#contact">
                            <Button size="lg" className="shadow-xl">
                                Start a Conversation
                            </Button>
                        </a>
                    </div>
                </motion.div>
            </motion.div>
        </div>
      </section>

      {/* ================= CLIENT LOGOS ================= */}
      <ClientLogosSection logos={clientLogos} />

      {/* ================= CTA & FOOTER ================= */}
      <footer className="relative pt-24 pb-12 overflow-hidden bg-slate-900 border-t border-slate-800">
        
        {/* CTA Content */}
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
                        <a href="/contact" className="flex items-center gap-2">
                             Book Free Consultation
                        </a>
                    </Button>
                    <Button size="lg" variant="outline">
                        <a href="mailto:swakarsadigital@gmail.com" className="flex items-center gap-2">
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
                            e.target.src = "/trust/maju mobilindo.jpeg";
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