"use client";

import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useState, useEffect } from "react";

export default function CyberFrog() {
  const [isRibbiting, setIsRibbiting] = useState(false);
  const [isBlinking, setIsBlinking] = useState(false);
  const [msgIndex, setMsgIndex] = useState(0);

  // --- BUG & EATING LOGIC ---
  const [bug, setBug] = useState<{ x: number; y: number; status: 'flying' | 'being_eaten' } | null>(null);

  useEffect(() => {
    const spawnBugSequence = () => {
      // Tentukan posisi acak untuk serangga (dalam koordinat viewBox SVG 0-100 x, 0-60 y)
      const bugX = Math.random() * 80 + 10; // range 10 - 90
      const bugY = Math.random() * 50 + 5;  // range 5 - 55 (area atas)
      
      // 1. Munculkan Serangga
      setBug({ x: bugX, y: bugY, status: 'flying' });

      // 2. Katak memakan serangga setelah 2 detik
      setTimeout(() => {
        setBug((prev) => (prev ? { ...prev, status: 'being_eaten' as const } : null));
        
        // Efek visual 'Ribbit' saat makan (opsional, tapi bagus untuk feedback)
        setIsRibbiting(true);
        setTimeout(() => setIsRibbiting(false), 500);
      }, 2000);

      // 3. Sembunyikan serangga (setelah dimakan)
      setTimeout(() => {
        setBug(null);
      }, 2300); // 300ms durasi lidah menjulur
    };

    // Jalankan sekali cepat setelah 3 detik loading, lalu setiap 20 detik
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

  // Spring physics untuk gerakan mata
  const springConfig = { damping: 25, stiffness: 150 };
  const pupilX = useSpring(useTransform(mouseX, [-500, 500], [-6, 6]), springConfig);
  const pupilY = useSpring(useTransform(mouseY, [-500, 500], [-6, 6]), springConfig);

  useEffect(() => {
    const handleMouseMove = (e: { clientX: number; clientY: number; }) => {
      // Jika sedang ada serangga, mata fokus ke serangga (override mouse)
      if (bug) {
        // Konversi koordinat SVG bug (0-100) kembali ke range pixel relatif untuk pupil
        // Ini estimasi kasar agar mata melirik ke arah bug
        const targetX = (bug.x - 50) * 10; 
        const targetY = (bug.y - 50) * 10;
        mouseX.set(targetX);
        mouseY.set(targetY);
      } else {
        // Normal mouse tracking
        const centerX = window.innerWidth - 100; 
        const centerY = 100;
        mouseX.set(e.clientX - centerX);
        mouseY.set(e.clientY - centerY);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY, bug]); // Dependency 'bug' added so eyes track it

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
      className="fixed top-24 right-10 md:top-32 md:right-20 z-50 cursor-grab active:cursor-grabbing hidden sm:block"
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
        {/* === TONGUE (Z-Index Bottom initially) === */}
        {/* Lidah ini hanya muncul saat makan bug */}
        {bug && bug.status === 'being_eaten' && bug.x !== undefined && bug.y !== undefined && (
           <motion.path
             d={`M50 75 Q ${50 + ((bug.x || 50) - 50)/2} ${75 + ((bug.y || 75) - 75)/2 - 15} ${bug.x || 50} ${bug.y || 75}`}
             stroke="#ec4899" // Pink lidah
             strokeWidth="4"
             strokeLinecap="round"
             fill="none"
             initial={{ pathLength: 0 }}
             animate={{ pathLength: [0, 1, 0] }}
             transition={{ duration: 0.3, times: [0, 0.5, 1] }}
           />
        )}

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
        {/* Mulut terbuka sedikit saat makan */}
        <motion.path 
          d="M38 75 Q50 79 62 75" 
          stroke="#14532d" 
          strokeWidth="3" 
          strokeLinecap="round" 
          fill="none" 
          animate={bug && bug.status === 'being_eaten' ? { d: "M38 75 Q50 85 62 75" } : { d: "M38 75 Q50 79 62 75" }}
        />

        {/* === CYBER BUG VISUAL === */}
        <AnimatePresence>
            {bug && bug.status === 'flying' && bug.x !== undefined && bug.y !== undefined && (
                <motion.g
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ 
                        scale: 1, 
                        opacity: 1,
                        x: [(bug.x || 50) - 2, (bug.x || 50) + 2, (bug.x || 50) - 2], // Buzzing effect
                        y: [(bug.y || 50) - 2, (bug.y || 50) + 2, (bug.y || 50) - 2]
                    }}
                    exit={{ scale: 0, opacity: 0, fill: "red" }} // Explode/vanish
                    transition={{ 
                        opacity: { duration: 0.2 },
                        x: { duration: 0.2, repeat: Infinity },
                        y: { duration: 0.3, repeat: Infinity }
                    }}
                >
                    {/* Bug Body */}
                    <circle cx="0" cy="0" r="3" fill="#1e293b" />
                    {/* Glowing wings */}
                    <ellipse cx="-3" cy="-2" rx="3" ry="1.5" fill="#ef4444" opacity="0.8" className="animate-pulse" />
                    <ellipse cx="3" cy="-2" rx="3" ry="1.5" fill="#ef4444" opacity="0.8" className="animate-pulse" />
                    {/* Bug glitch indicator */}
                    <rect x="-4" y="-4" width="8" height="8" stroke="#ef4444" strokeWidth="0.5" fill="none" strokeDasharray="1 1" opacity="0.5">
                        <animate attributeName="opacity" values="0;1;0" dur="1s" repeatCount="indefinite" />
                    </rect>
                </motion.g>
            )}
        </AnimatePresence>

      </motion.svg>
    </motion.div>
  );
}