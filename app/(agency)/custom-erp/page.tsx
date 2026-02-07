"use client";

import React, { useState, useEffect } from 'react';
import { 
  Code2, 
  Settings2, 
  Layers, 
  Cpu, 
  CheckCircle2, 
  Workflow, 
  Database,
  ArrowRight,
  ShieldCheck,
  Zap,
  BarChart3,
  Globe,
  Rocket
} from 'lucide-react';

/**
 * Technical Note: Using a standard <a> tag for the Link component 
 * to ensure compatibility with the preview environment.
 * In a production Next.js environment, replace this with 'next/link'.
 */
const Link = ({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) => (
  <a href={href} className={className}>{children}</a>
);

// --- Advanced Paged Typewriter Component ---

const TerminalContent = () => {
  const [pageIndex, setPageIndex] = useState(0);
  const [lineIndex, setLineIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Grouped content into pages to prevent overflow
  const pages = [
    [
      { text: "> Initializing Swakarsa_Core_v4.0...", color: "text-blue-400" },
      { text: "> System: Bespoke_ERP_Engine", color: "text-slate-400" },
      { text: "interface CustomSolution {", color: "text-pink-400" },
      { text: "  logic: '100%_Tailored';", color: "text-slate-300" },
      { text: "  owner: 'Client_Exclusive';", color: "text-slate-300" },
      { text: "  license: 'Zero_Fees';", color: "text-slate-300" },
      { text: "}", color: "text-pink-400" }
    ],
    [
      { text: "> Loading Advanced_Modules...", color: "text-blue-400" },
      { text: "mod Finance { auto_recon: true }", color: "text-emerald-400" },
      { text: "mod Inventory { multi_wh: true }", color: "text-emerald-400" },
      { text: "mod Logistics { real_time: true }", color: "text-emerald-400" },
      { text: "> Optimizing business_flow...", color: "text-orange-400" },
      { text: "> Result: Bottlenecks_Removed", color: "text-green-400" }
    ],
    [
      { text: "> Finalizing Security_Layer...", color: "text-blue-400" },
      { text: "> Encryption: AES_256_GCM", color: "text-slate-400" },
      { text: "> Scalability: Ready_for_Enterprise", color: "text-purple-400" },
      { text: "> Status: System_Operational", color: "text-blue-500 font-bold" },
      { text: "--------------------------------", color: "text-slate-700" },
      { text: "SWAKARSA DIGITAL READY.", color: "text-white animate-pulse" }
    ]
  ];

  useEffect(() => {
    if (isTransitioning) return;

    const currentLine = pages[pageIndex][lineIndex];
    
    if (currentText.length < currentLine.text.length) {
      // Typing character by character
      const charTimeout = setTimeout(() => {
        setCurrentText(currentLine.text.slice(0, currentText.length + 1));
      }, 25);
      return () => clearTimeout(charTimeout);
    } else {
      // Line finished
      if (lineIndex < pages[pageIndex].length - 1) {
        // Move to next line in current page
        const nextLineTimeout = setTimeout(() => {
          setLineIndex(prev => prev + 1);
          setCurrentText("");
        }, 500);
        return () => clearTimeout(nextLineTimeout);
      } else {
        // Page finished, wait and move to next page
        const pageTimeout = setTimeout(() => {
          setIsTransitioning(true);
          setTimeout(() => {
            setPageIndex(prev => (prev + 1) % pages.length);
            setLineIndex(0);
            setCurrentText("");
            setIsTransitioning(false);
          }, 800); // Transition animation length
        }, 3000); // How long to stay on finished page
        return () => clearTimeout(pageTimeout);
      }
    }
  }, [currentText, lineIndex, pageIndex, pages, isTransitioning]);

  return (
    <div className={`font-mono text-[11px] md:text-xs leading-relaxed h-48 transition-opacity duration-500 ${isTransitioning ? "opacity-0" : "opacity-100"}`}>
      {/* Completed lines in current page */}
      {pages[pageIndex].slice(0, lineIndex).map((line, idx) => (
        <div key={idx} className={line.color}>
          {line.text}
        </div>
      ))}
      
      {/* Line currently typing */}
      {!isTransitioning && lineIndex < pages[pageIndex].length && (
        <div className={pages[pageIndex][lineIndex].color}>
          {currentText}
          <span className="inline-block w-1.5 h-3 bg-blue-500 ml-1 animate-pulse align-middle" />
        </div>
      )}
    </div>
  );
};

export default function CustomERPPage() {
  const specializedFlows = [
    {
      title: "Advanced Inventory & Warehouse",
      desc: "Beyond simple tracking. Multi-warehouse synchronization, real-time batch tracking, automated replenishment logic, and waste management integration.",
      icon: <Layers className="w-8 h-8 text-blue-500" />
    },
    {
      title: "Financial Engineering & Automation",
      desc: "Complex approval hierarchies, automated bank reconciliation, and real-time financial reporting compliant with international accounting standards.",
      icon: <Database className="w-8 h-8 text-indigo-500" />
    },
    {
      title: "Enterprise Supply Chain",
      desc: "End-to-end logistics visibility. Track everything from raw material procurement to last-mile delivery with integrated fleet management.",
      icon: <Workflow className="w-8 h-8 text-emerald-500" />
    },
    {
      title: "Bespoke CRM & Sales Intelligence",
      desc: "Logic-driven sales pipelines tailored to your unique closing methodology, featuring AI-driven lead scoring and deep customer analytics.",
      icon: <BarChart3 className="w-8 h-8 text-orange-500" />
    }
  ];

  return (
    <div className="bg-white dark:bg-slate-950 pt-32 pb-20 overflow-hidden font-sans selection:bg-blue-100 dark:selection:bg-blue-900">
      {/* Styles for Custom Animations */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .scanline-effect {
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, transparent, rgba(59, 130, 246, 0.05), transparent);
          height: 100px;
          animation: scanline 8s linear infinite;
          pointer-events: none;
          z-index: 20;
        }
      `}} />

      {/* Hero Section */}
      <section className="container mx-auto px-6 text-center mb-28 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] -z-10" />
        
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs font-bold tracking-widest uppercase mb-8 border border-blue-100 dark:border-blue-800">
          <Globe className="w-3.5 h-3.5" /> Enterprise-Grade Solutions
        </div>
        
        <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white mb-8 leading-[1.1] tracking-tight">
          Engineering Your <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-500 to-cyan-400">
            Competitive Advantage
          </span>
        </h1>
        
        <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto mb-12 leading-relaxed">
          Generic software forces you to compromise. We build bespoke digital ecosystems that mirror your unique operational DNA, ensuring 100% process alignment and unmatched scalability.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-5">
          <Link 
            href="/contact" 
            className="inline-flex items-center justify-center gap-2 bg-slate-900 dark:bg-blue-600 hover:bg-black dark:hover:bg-blue-700 text-white px-10 py-5 rounded-full font-bold transition-all shadow-2xl shadow-blue-500/20 group"
          >
            Start Strategy Session <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link 
            href="/portfolio" 
            className="inline-flex items-center justify-center gap-2 bg-transparent border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 text-slate-900 dark:text-white px-10 py-5 rounded-full font-bold transition-all"
          >
            Review Case Studies
          </Link>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="bg-slate-50 dark:bg-slate-900/30 py-24 border-y border-slate-100 dark:border-slate-800">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl font-extrabold text-slate-900 dark:text-white leading-tight">
                Why Bespoke? <br />
                <span className="text-slate-400 font-medium">Because Templates are for Commodities.</span>
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-lg">
                In a digital-first economy, your software is your strategy. We don't just write code; we architect systems that eliminate bottlenecks and unlock hidden revenue.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-6">
                {[
                  { title: "Zero Technical Debt", desc: "Clean, optimized architecture built for the long haul." },
                  { title: "Full IP Ownership", desc: "You own the source code and the intellectual property." },
                  { title: "Modular Scalability", desc: "Grow from 10 to 10,000 users without licensing friction." },
                  { title: "Legacy Integration", desc: "Seamless bridge between your new system and existing tools." }
                ].map((item, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold">
                      <CheckCircle2 className="w-5 h-5" />
                      <span>{item.title}</span>
                    </div>
                    <p className="text-sm text-slate-500">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative animate-float">
              <div className="absolute inset-0 bg-blue-600/20 blur-[80px] -z-10 rounded-full" />
              <div className="bg-white dark:bg-slate-800 p-3 rounded-[2.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)] border border-slate-200 dark:border-slate-700 relative overflow-hidden group">
                <div className="scanline-effect" />
                
                <div className="bg-slate-950 rounded-[1.5rem] p-8 font-mono relative overflow-hidden">
                  <div className="flex justify-between items-center mb-6 border-b border-slate-900 pb-4">
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500/80 shadow-[0_0_8px_rgba(239,68,68,0.4)]" />
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 shadow-[0_0_8px_rgba(234,179,8,0.4)]" />
                      <div className="w-2.5 h-2.5 rounded-full bg-green-500/80 shadow-[0_0_8px_rgba(34,197,94,0.4)]" />
                    </div>
                    <div className="flex items-center gap-2 bg-slate-900/50 px-3 py-1 rounded-full border border-slate-800">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                      <span className="text-[9px] text-slate-400 uppercase tracking-widest font-bold">Kernel_Active</span>
                    </div>
                  </div>

                  {/* Character-by-Character Typewriter Animation with Paging */}
                  <TerminalContent />

                  <div className="mt-6 flex justify-between items-center text-[9px] text-slate-600 uppercase tracking-[0.2em] pt-6 border-t border-slate-900">
                    <div className="flex items-center gap-2">
                      <span className="text-blue-500 animate-pulse">●</span>
                      <span>Swakarsa Tech Stack</span>
                    </div>
                    <span className="bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded">Build_ID: 9821-X</span>
                  </div>
                </div>
              </div>
              
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-3xl -z-20 opacity-20 blur-xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities Section */}
      <section className="container mx-auto px-6 py-28">
        <div className="max-w-3xl mx-auto text-center mb-20">
          <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-6">Operational Flow Specialization</h2>
          <p className="text-slate-500 dark:text-slate-400 text-lg">
            We specialize in digitizing high-friction business processes that off-the-shelf software simply cannot handle.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {specializedFlows.map((flow, idx) => (
            <div 
              key={idx} 
              className="group p-10 bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-100 dark:border-slate-800 hover:border-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500"
            >
              <div className="mb-8 bg-slate-50 dark:bg-slate-800/50 w-16 h-16 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
                {flow.icon}
              </div>
              <h3 className="text-xl font-extrabold mb-4 dark:text-white group-hover:text-blue-600 transition-colors">{flow.title}</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                {flow.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Metrics Section */}
      <section className="container mx-auto px-6 mb-28">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-16 border-y border-slate-100 dark:border-slate-800">
          {[
            { label: "Uptime SLA", value: "99.99%" },
            { label: "IP Ownership", value: "100%" },
            { label: "Process Alignment", value: "Perfect" },
            { label: "License Fees", value: "Zero" }
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl font-black text-slate-900 dark:text-white mb-1">{stat.value}</div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Global CTA */}
      <section className="container mx-auto px-6">
        <div className="bg-slate-900 dark:bg-slate-900 rounded-[3rem] p-16 text-center relative overflow-hidden">
          {/* Subtle decorative elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] -mr-48 -mt-48" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-[120px] -ml-48 -mb-48" />
          
          <div className="relative z-10">
            <Rocket className="w-16 h-16 text-blue-500 mx-auto mb-8 animate-bounce" />
            <h2 className="text-4xl md:text-6xl font-black text-white mb-8 leading-tight">
              Ready to Digitally <br />Transform Your Operations?
            </h2>
            <p className="text-slate-400 mb-12 max-w-2xl mx-auto text-xl leading-relaxed">
              Skip the compromise. Join industry leaders who trust us to build the backbone of their business operations.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Link 
                href="/contact" 
                className="bg-blue-600 hover:bg-blue-500 text-white px-12 py-6 rounded-full font-black transition-all shadow-xl shadow-blue-600/20 active:scale-95"
              >
                Book Expert Consultation
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}