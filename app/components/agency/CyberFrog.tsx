"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export default function CyberFrog() {
  const [isRibbiting, setIsRibbiting] = useState(false);
  const [isBlinking, setIsBlinking] = useState(false);

  // Random blinking logic
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

  const handleRibbit = () => {
    if (isRibbiting) return;
    setIsRibbiting(true);
    setTimeout(() => setIsRibbiting(false), 1000);
  };

  return (
    <motion.div
      className="absolute top-24 right-10 md:top-32 md:right-20 z-30 cursor-pointer hidden sm:block"
      animate={{ 
        y: [0, -20, 0],
      }}
      transition={{ 
        duration: 4, 
        repeat: Infinity, 
        ease: "easeInOut" 
      }}
      whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
      whileTap={{ scale: 0.9 }}
      onClick={handleRibbit}
    >
      <AnimatePresence>
        {isRibbiting && (
          <motion.div
            initial={{ opacity: 0, scale: 0, y: 10, x: -20 }}
            animate={{ opacity: 1, scale: 1, y: -45, x: -45 }}
            exit={{ opacity: 0, scale: 0 }}
            className="absolute -top-6 -left-6 bg-cyan-500 text-slate-900 px-4 py-2 rounded-2xl rounded-br-none font-bold text-sm border-2 border-white shadow-[0_0_15px_rgba(6,182,212,0.6)] whitespace-nowrap z-40"
          >
            SYSTEM: ONLINE 🐸
          </motion.div>
        )}
      </AnimatePresence>

      <motion.svg
        width="120"
        height="140"
        viewBox="0 0 100 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ filter: 'drop-shadow(0 10px 15px rgba(6, 182, 212, 0.2))' }}
        animate={isRibbiting ? {
          x: [-2, 2, -2, 2, 0],
          rotate: [-5, 5, -5, 5, 0]
        } : {}}
        transition={{ duration: 0.4 }}
      >
        {/* BACK LEGS */}
        <motion.g
          animate={{ 
            y: [0, 2, 0],
            rotate: [0, 3, 0]
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <path d="M15 95C8 95 3 105 8 110" stroke="#166534" strokeWidth="6" strokeLinecap="round" fill="#166534" />
          <path d="M85 95C92 95 97 105 92 110" stroke="#166534" strokeWidth="6" strokeLinecap="round" fill="#166534" />
          <ellipse cx="12" cy="108" rx="5" ry="3" fill="#166534" />
          <ellipse cx="88" cy="108" rx="5" ry="3" fill="#166534" />
        </motion.g>

        {/* FRONT LEGS */}
        <motion.g
          animate={{ 
            y: [0, -1, 0],
          }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ellipse cx="25" cy="80" rx="8" ry="12" fill="#22c55e" />
          <ellipse cx="75" cy="80" rx="8" ry="12" fill="#22c55e" />
          <ellipse cx="25" cy="88" rx="6" ry="4" fill="#86efac" />
          <ellipse cx="75" cy="88" rx="6" ry="4" fill="#86efac" />
        </motion.g>

        {/* BODY (Breathing Animation) */}
        <motion.g
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
            <ellipse cx="50" cy="70" rx="38" ry="30" fill="#22c55e" />
            <ellipse cx="50" cy="75" rx="28" ry="22" fill="#86efac" />
            <ellipse cx="45" cy="68" rx="12" ry="8" fill="#4ade80" opacity="0.3" />
            <ellipse cx="55" cy="68" rx="12" ry="8" fill="#4ade80" opacity="0.3" />
        </motion.g>

        {/* HEAD */}
        <circle cx="32" cy="50" r="16" fill="#22c55e" />
        <circle cx="68" cy="50" r="16" fill="#22c55e" />
        <ellipse cx="50" cy="55" rx="20" ry="18" fill="#22c55e" />

        {/* EYES (Sclera) */}
        <circle cx="32" cy="50" r="11" fill="white" />
        <circle cx="68" cy="50" r="11" fill="white" />

        {/* PUPILS */}
        <motion.g animate={isRibbiting ? { x: [0, 2, -2, 0], y: [0, -2, 0] } : {}}>
             <circle cx="32" cy="50" r="5" fill="#0f172a" />
             <circle cx="68" cy="50" r="5" fill="#0f172a" />
             <circle cx="34" cy="48" r="2" fill="white" opacity="0.8" />
             <circle cx="70" cy="48" r="2" fill="white" opacity="0.8" />
        </motion.g>

        {/* EYELIDS (Blinking) */}
        <motion.path
          d="M20 50 Q32 38 44 50"
          stroke="#166534"
          strokeWidth="12"
          strokeLinecap="round"
          fill="#166534"
          initial={{ opacity: 0 }}
          animate={{ opacity: isBlinking ? 1 : 0 }}
          transition={{ duration: 0.1 }}
        />
        <motion.path
          d="M56 50 Q68 38 80 50"
          stroke="#166534"
          strokeWidth="12"
          strokeLinecap="round"
          fill="#166534"
          initial={{ opacity: 0 }}
          animate={{ opacity: isBlinking ? 1 : 0 }}
          transition={{ duration: 0.1 }}
        />

        {/* CYBER GOGGLES (Glowing) */}
        <motion.g
           animate={{ opacity: [0.7, 1, 0.7] }}
           transition={{ duration: 2, repeat: Infinity }}
        >
            <rect x="18" y="42" width="64" height="16" rx="6" fill="rgba(15, 23, 42, 0.8)" stroke="#0891b2" strokeWidth="2" />
            <ellipse cx="32" cy="50" rx="12" ry="10" fill="rgba(6, 182, 212, 0.3)" />
            <ellipse cx="68" cy="50" rx="12" ry="10" fill="rgba(6, 182, 212, 0.3)" />
            <ellipse cx="32" cy="50" rx="8" ry="6" fill="rgba(6, 182, 212, 0.6)" className="animate-pulse" />
            <ellipse cx="68" cy="50" rx="8" ry="6" fill="rgba(6, 182, 212, 0.6)" className="animate-pulse" />
            <path d="M25 45L30 50" stroke="rgba(255,255,255,0.6)" strokeWidth="2" strokeLinecap="round" />
            <path d="M61 45L66 50" stroke="rgba(255,255,255,0.6)" strokeWidth="2" strokeLinecap="round" />
            <path d="M18 50H10" stroke="#0891b2" strokeWidth="3" strokeLinecap="round" />
            <path d="M82 50H90" stroke="#0891b2" strokeWidth="3" strokeLinecap="round" />
        </motion.g>

        {/* MOUTH */}
        <path d="M38 75 Q50 80 62 75" stroke="#14532d" strokeWidth="3" strokeLinecap="round" fill="none" />
        <path d="M38 75 Q50 78 62 75" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" fill="none" />
        
        {/* CHEEKS/BLUSH */}
        <circle cx="26" cy="68" r="5" fill="#f472b6" opacity="0.5" />
        <circle cx="74" cy="68" r="5" fill="#f472b6" opacity="0.5" />

        {/* SPOTS/PATTERNS */}
        <circle cx="40" cy="65" r="3" fill="#166534" opacity="0.4" />
        <circle cx="60" cy="65" r="3" fill="#166534" opacity="0.4" />
        <circle cx="45" cy="78" r="2.5" fill="#166534" opacity="0.3" />
        <circle cx="55" cy="78" r="2.5" fill="#166534" opacity="0.3" />
      </motion.svg>
    </motion.div>
  );
}

