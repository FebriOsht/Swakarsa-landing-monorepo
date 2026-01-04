"use client";

import { motion, useInView } from "framer-motion";
import { useState, useEffect, useRef } from "react";

// Helper untuk animasi angka
const CountUpAnimation = ({ end, suffix = "", duration = 2.5, delay = 0 }: { end: number, suffix?: string, duration?: number, delay?: number }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;

    let startTime = 0;
    let animationFrameId: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / (duration * 1000), 1);
      
      setCount(Math.floor(percentage * end));

      if (progress < duration * 1000) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    const timeoutId = setTimeout(() => {
      animationFrameId = requestAnimationFrame(animate);
    }, delay * 1000);

    return () => {
      clearTimeout(timeoutId);
      cancelAnimationFrame(animationFrameId);
    };
  }, [end, duration, delay, isInView]);

  return <span ref={ref}>{count}{suffix}</span>;
};

export default function StatsSection() {
  const stats = [
    { value: 50, suffix: "+", label: "Projects Completed" },
    { value: 95, suffix: "%", label: "Client Satisfaction" },
    { value: 24, suffix: "/7", label: "Support Hours" },
    { value: 3, suffix: "x", label: "Average ROI" },
  ];

  return (
    <section className="container mx-auto px-6 relative z-20 -mt-20 sm:-mt-24">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 bg-slate-900/80 border border-slate-800 shadow-2xl backdrop-blur-xl rounded-3xl p-8 md:p-10">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="text-center group"
          >
            <div className="text-3xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
              <CountUpAnimation end={stat.value} suffix={stat.suffix} delay={index * 0.2} />
            </div>
            <p className="text-xs md:text-sm font-medium uppercase tracking-wider text-slate-500">
              {stat.label}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}