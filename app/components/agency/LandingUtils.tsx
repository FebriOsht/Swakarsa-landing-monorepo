"use client";

import { useState, useEffect, useRef } from "react";

// Optimized CountUp component
export const CountUpAlt = ({ end, suffix = "", duration = 2.5, delay = 0 }: { end: number; suffix?: string; duration?: number; delay?: number }) => {
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
export const Card = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div
    className={`rounded-2xl border border-slate-800 bg-slate-900/80 backdrop-blur-sm ${className}`}
  >
    {children}
  </div>
);

export const CardContent = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`p-6 ${className}`}>{children}</div>
);

export const Button = ({ children, className = "", variant, size, onClick }: { 
  children: React.ReactNode; 
  className?: string; 
  variant?: "outline" | "default";
  size?: "lg" | "sm" | "default";
  onClick?: () => void;
}) => (
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

