import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const CyberWhale = () => {
  // --- 3D Mouse Interaction Setup ---
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth out the mouse movement
  const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 15 });

  // Map mouse position to rotation values (tilt effect)
  const rotateX = useTransform(mouseY, [-0.5, 0.5], [15, -15]); // Up/Down tilt
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-15, 15]); // Left/Right tilt
  const brightness = useTransform(mouseY, [-0.5, 0.5], [1, 1.3]); // Highlight effect

  // PERBAIKAN: Menambahkan ': MouseEvent' secara eksplisit
  const handleMouseMove = (e: MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    // Calculate normalized position (-0.5 to 0.5)
    const normalizedX = (clientX / innerWidth) - 0.5;
    const normalizedY = (clientY / innerHeight) - 0.5;
    x.set(normalizedX);
    y.set(normalizedY);
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="relative w-full h-screen bg-slate-950 overflow-hidden flex items-center justify-center perspective-[1200px]">
      
      {/* --- Background Environment --- */}
      <BackgroundGrid />
      <Particles />

      {/* --- 3D Container --- */}
      <motion.div
        style={{
          rotateX,
          rotateY,
          filter: `brightness(${brightness})`,
          transformStyle: "preserve-3d", // Crucial for CSS 3D
        }}
        className="relative w-[600px] h-[400px] md:w-[800px] md:h-[500px]"
      >
        {/* Animate the whole rig floating */}
        <motion.div
          animate={{
            y: [-20, 20, -20],
            rotateZ: [-2, 2, -2]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="w-full h-full relative"
          style={{ transformStyle: "preserve-3d" }}
        >
          <MechaWhaleSVG />
        </motion.div>
      </motion.div>

      {/* UI Overlay */}
      <div className="absolute bottom-10 left-10 text-cyan-500 font-mono text-xs md:text-sm pointer-events-none opacity-60">
        <div>SYS.STATUS: ONLINE</div>
        <div>TARGET: LEVIATHAN-01</div>
        <div>DEPTH: 4000M</div>
      </div>
    </div>
  );
};

// --- The Main SVG Model ---
const MechaWhaleSVG = () => {
  return (
    <svg
      viewBox="0 0 800 500"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full visible overflow-visible"
      style={{ transformStyle: "preserve-3d" }}
    >
      <Definitions />

      {/* LAYER 1: Far Fin (Behind body) 
          Z-Index: -40px
      */}
      <motion.g 
        style={{ transform: "translateZ(-40px)", transformOrigin: "400px 250px" }}
        initial={{ rotate: 0 }}
        animate={{ rotate: [0, 15, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <path
          d="M 420 280 L 380 360 L 480 340 L 500 290 Z"
          fill="rgba(15, 23, 42, 0.8)"
          stroke="#0891b2"
          strokeWidth="1"
          className="opacity-60"
        />
        {/* Fin Detail */}
        <path d="M 420 280 L 410 330 M 440 290 L 430 340" stroke="#06b6d4" strokeWidth="0.5" />
      </motion.g>

      {/* LAYER 2: Tail (Moving Section)
          This connects to the body but wiggles independently
      */}
      <motion.g
        style={{ transform: "translateZ(-10px)", transformOrigin: "580px 250px" }}
        animate={{ 
          rotateZ: [-5, 10, -5],
          y: [0, 5, 0]
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
         {/* Tail Segment 1 */}
        <path
          d="M 580 220 L 680 230 L 680 270 L 580 280 Z"
          fill="url(#metalGradient)"
          stroke="#22d3ee"
          strokeWidth="1"
        />
        {/* Tail Segment 2 (The Fluke) */}
        <motion.g
           style={{ transformOrigin: "680px 250px" }}
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


      {/* LAYER 3: Main Body 
          Z-Index: 0px
      */}
      <g style={{ transform: "translateZ(0px)" }}>
        {/* Internal Skeleton (Visible through gaps) */}
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
         {/* Core Spinner */}
         <motion.g
             style={{ transformOrigin: "400px 250px" }}
             animate={{ rotate: 360 }}
             transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        >
             <rect x="398" y="225" width="4" height="50" fill="#22d3ee" />
             <rect x="375" y="248" width="50" height="4" fill="#22d3ee" />
        </motion.g>
      </g>


      {/* LAYER 4: Near Fin (Closest to camera)
          Z-Index: 40px
      */}
      <motion.g 
        style={{ transform: "translateZ(40px)", transformOrigin: "300px 260px" }}
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

       {/* LAYER 5: Holographic HUD Overlay (Closest)
          Z-Index: 80px
      */}
      <motion.g style={{ transform: "translateZ(80px)" }} className="pointer-events-none">
          {/* Target Box around head */}
          <motion.path 
            d="M 60 180 L 60 160 L 100 160 M 200 160 L 240 160 L 240 180 M 240 320 L 240 340 L 200 340 M 100 340 L 60 340 L 60 320" 
            fill="none" 
            stroke="#22d3ee" 
            strokeWidth="1" 
            opacity="0.5"
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
          <text x="70" y="150" fill="#22d3ee" fontSize="10" fontFamily="monospace" opacity="0.8">BIO-MECH UNIT</text>
      </motion.g>

    </svg>
  );
};

// --- Definitions for Gradients & Filters ---
const Definitions = () => (
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
      <stop offset="50%" stopColor="#94a3b8" /> {/* Highlight line */}
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
);

// --- Background Grid & Particles ---
const BackgroundGrid = () => {
    return (
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
             {/* Grid Floor */}
            <div 
                className="absolute w-[200%] h-[200%] -left-[50%] top-1/2 bg-[linear-gradient(to_right,#083344_1px,transparent_1px),linear-gradient(to_bottom,#083344_1px,transparent_1px)] bg-[size:4rem_4rem] [transform:perspective(500px)_rotateX(60deg)] origin-top opacity-20"
                style={{
                    animation: "gridMove 20s linear infinite"
                }}
            />
             {/* Vignette */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#020617_90%)]" />
            <style>{`
                @keyframes gridMove {
                    0% { transform: perspective(500px) rotateX(60deg) translateY(0); }
                    100% { transform: perspective(500px) rotateX(60deg) translateY(4rem); }
                }
            `}</style>
        </div>
    );
};

const Particles = () => {
    // Generate random particles
    const particles = Array.from({ length: 20 }).map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        duration: Math.random() * 10 + 5
    }));

    return (
        <div className="absolute inset-0 z-0 pointer-events-none">
            {particles.map(p => (
                <motion.div
                    key={p.id}
                    className="absolute rounded-full bg-cyan-500 blur-[1px]"
                    style={{
                        left: `${p.x}%`,
                        top: `${p.y}%`,
                        width: p.size,
                        height: p.size,
                    }}
                    animate={{
                        x: ["-20vw", "0vw"], // Move past camera
                        opacity: [0, 0.5, 0],
                        scale: [0.5, 1.5]
                    }}
                    transition={{
                        duration: p.duration,
                        repeat: Infinity,
                        ease: "linear",
                        delay: Math.random() * 5
                    }}
                />
            ))}
        </div>
    );
};

export default CyberWhale;
