"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Bug, X } from "lucide-react";

interface FrogGatekeeperProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function FrogGatekeeper({ isOpen, onClose }: FrogGatekeeperProps) {
  const router = useRouter();
  const [bugPosition, setBugPosition] = useState({ x: 50, y: 50 });
  const [isFeeding, setIsFeeding] = useState(false);
  const [showAccessGranted, setShowAccessGranted] = useState(false);
  const [isMouthOpen, setIsMouthOpen] = useState(false);
  const [isSwallowing, setIsSwallowing] = useState(false);

  // Animate bug flying around smoothly
  useEffect(() => {
    if (!isOpen || isFeeding) return;

    let targetX = Math.random() * 80 + 10;
    let targetY = Math.random() * 70 + 15;
    
    const animateBug = () => {
      setBugPosition({
        x: targetX,
        y: targetY,
      });
      
      targetX = Math.random() * 80 + 10;
      targetY = Math.random() * 70 + 15;
    };

    animateBug();
    const interval = setInterval(animateBug, 2000);
    return () => clearInterval(interval);
  }, [isOpen, isFeeding]);

  const handleBugClick = () => {
    if (isFeeding) return;
    
    setIsFeeding(true);
    setIsMouthOpen(true);
    
    setTimeout(() => {
      setBugPosition({ x: 50, y: 50 });
      setIsSwallowing(true);
      
      setTimeout(() => {
        setIsMouthOpen(false);
        setShowAccessGranted(true);
        
        setTimeout(() => {
          router.push('/team');
          onClose();
        }, 1000);
      }, 300);
    }, 500);
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
              animate={isSwallowing ? {
                scale: [1, 1.15, 1],
              } : {
                scale: [1, 1.02, 1],
              }}
              transition={{ duration: 0.3 }}
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
              <ellipse cx="50" cy="75" rx="28" ry="22" fill="#86efac" />
              <ellipse cx="45" cy="68" rx="12" ry="8" fill="#4ade80" opacity="0.3" />
              <ellipse cx="55" cy="68" rx="12" ry="8" fill="#4ade80" opacity="0.3" />

              {/* HEAD */}
              <circle cx="32" cy="50" r="16" fill="#22c55e" />
              <circle cx="68" cy="50" r="16" fill="#22c55e" />
              <ellipse cx="50" cy="55" rx="20" ry="18" fill="#22c55e" />

              {/* EYES */}
              <circle cx="32" cy="50" r="11" fill="white" />
              <circle cx="68" cy="50" r="11" fill="white" />
              <circle cx="32" cy="50" r="5" fill="#0f172a" />
              <circle cx="68" cy="50" r="5" fill="#0f172a" />
              <circle cx="34" cy="48" r="2" fill="white" opacity="0.8" />
              <circle cx="70" cy="48" r="2" fill="white" opacity="0.8" />

              {/* CYBER GOGGLES */}
              <rect x="18" y="42" width="64" height="16" rx="6" fill="rgba(15, 23, 42, 0.8)" stroke="#0891b2" strokeWidth="2" />
              <ellipse cx="32" cy="50" rx="12" ry="10" fill="rgba(6, 182, 212, 0.3)" />
              <ellipse cx="68" cy="50" rx="12" ry="10" fill="rgba(6, 182, 212, 0.3)" />
              <ellipse cx="32" cy="50" rx="8" ry="6" fill="rgba(6, 182, 212, 0.6)" />
              <ellipse cx="68" cy="50" rx="8" ry="6" fill="rgba(6, 182, 212, 0.6)" />
              <path d="M18 50H10" stroke="#0891b2" strokeWidth="3" strokeLinecap="round" />
              <path d="M82 50H90" stroke="#0891b2" strokeWidth="3" strokeLinecap="round" />

              {/* MOUTH - Opens when feeding */}
              <motion.path
                d={isMouthOpen ? "M38 75 Q50 85 62 75" : "M38 75 Q50 80 62 75"}
                stroke="#14532d"
                strokeWidth={isMouthOpen ? "4" : "3"}
                strokeLinecap="round"
                fill="none"
                animate={isMouthOpen ? {
                  pathLength: [0, 1],
                } : {}}
                transition={{ duration: 0.2 }}
              />

              {/* CHEEKS */}
              <circle cx="26" cy="68" r="5" fill="#f472b6" opacity="0.5" />
              <circle cx="74" cy="68" r="5" fill="#f472b6" opacity="0.5" />
            </motion.svg>

            {/* Data Bug - Flying around */}
            {!isFeeding && (
              <motion.div
                className="absolute cursor-pointer z-30"
                animate={{
                  left: `${bugPosition.x}%`,
                  top: `${bugPosition.y}%`,
                  rotate: [0, 360],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  left: { duration: 2, ease: "easeInOut" },
                  top: { duration: 2, ease: "easeInOut" },
                  rotate: { duration: 2, repeat: Infinity, ease: "linear" },
                  scale: { duration: 1, repeat: Infinity, ease: "easeInOut" },
                }}
                style={{
                  transform: 'translate(-50%, -50%)',
                }}
                onClick={handleBugClick}
                whileHover={{ scale: 1.3 }}
              >
                <div className="relative">
                  <Bug 
                    size={32} 
                    className="text-cyan-400 drop-shadow-[0_0_10px_rgba(6,182,212,0.8)]" 
                    style={{ filter: 'drop-shadow(0 0 15px rgba(6, 182, 212, 1))' }}
                  />
                  <motion.div
                    className="absolute inset-0 rounded-full bg-cyan-400/30 -z-10"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 0, 0.5],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                </div>
              </motion.div>
            )}

            {/* Bug moving to mouth animation */}
            {isFeeding && !showAccessGranted && (
              <motion.div
                className="absolute z-30"
                initial={{
                  left: `${bugPosition.x}%`,
                  top: `${bugPosition.y}%`,
                }}
                animate={{
                  left: '50%',
                  top: '50%',
                  scale: [1, 0.5, 0],
                }}
                transition={{ duration: 0.5 }}
                style={{
                  transform: 'translate(-50%, -50%)',
                }}
              >
                <Bug size={32} className="text-cyan-400" />
              </motion.div>
            )}

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
}

