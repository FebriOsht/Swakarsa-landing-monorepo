"use client";

import { useEffect, useRef } from "react";

export default function OceanWaves() {
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
          ctx.fillStyle = `rgba(34, 211, 238, ${p.opacity})`;
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
       <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-950/90" />
    </div>
  );
}