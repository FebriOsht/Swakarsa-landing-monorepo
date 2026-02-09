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
  Rocket,
  Menu,
  X,
  Search,
  PenTool,
  Server,
  DollarSign
} from 'lucide-react';
import { motion, useScroll, useMotionValueEvent } from "framer-motion";

/**
 * Technical Note: Using standard <a> tags for compatibility with the preview environment.
 */
const Link = ({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) => (
  <a href={href} className={className}>{children}</a>
);

// --- Internal Navbar Component (Updated to match Main Navbar) ---
const InternalNavbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const { scrollY } = useScroll();

  // Handle mounting to prevent hydration mismatch
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 50);
  });

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Process", href: "/#process" },
    { name: "Team", href: "/team" },
    { name: "Blog", href: "/blog" },
    { name: "Services", href: "/#services" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "Custom ERP", href: "/custom-erp" },
  ];

  // Default class for server/initial render
  const navClass = isMounted && scrolled 
    ? "bg-slate-950/80 backdrop-blur-xl border-white/10 py-4 shadow-[0_4px_30px_rgba(0,0,0,0.1)]" 
    : "bg-transparent border-transparent py-6";

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${navClass}`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo Area */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl overflow-hidden shadow-lg shadow-cyan-500/30 group-hover:scale-110 transition-transform duration-300 group-hover:shadow-cyan-500/50">
            <img 
              src="/images/logo.jpeg" 
              alt="Swakarsa Digital Logo" 
              className="w-full h-full object-cover"
              loading="eager"
              onError={(e: any) => {
                e.target.onerror = null;
                e.target.src = "https://placehold.co/100x100/333/FFF?text=S";
              }}
            />
          </div>
          <span className="font-bold text-lg text-white tracking-tight group-hover:text-cyan-400 transition-colors">
            Swakarsa Digital
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center bg-slate-900/50 rounded-full px-2 p-1 border border-white/5 backdrop-blur-md">
           {navLinks.map((link) => (
             <Link
               key={link.name}
               href={link.href}
               className="px-5 py-2 text-sm font-medium text-slate-400 hover:text-white transition-all hover:bg-white/5 rounded-full relative group"
             >
               {link.name}
               <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-cyan-400 transition-all group-hover:w-1/2 opacity-0 group-hover:opacity-100" />
             </Link>
           ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-4">
           <Link 
             href="/contact"
             className="px-6 py-2.5 rounded-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white text-sm font-semibold shadow-lg shadow-cyan-900/20 hover:shadow-cyan-500/30 transition-all transform hover:-translate-y-0.5"
           >
             Let's Talk
           </Link>
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
               <Link 
                 key={link.name} 
                 href={link.href} 
                 className="block text-lg font-medium text-slate-400 hover:text-cyan-400"
               >
                 {link.name}
               </Link>
            ))}
            <div className="h-px w-full bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent my-2"></div>
            <Link 
              href="/contact"
              className="block text-lg font-medium px-4 py-2 rounded-lg text-center transition-colors bg-cyan-500/10 text-white hover:bg-cyan-500/20 border border-cyan-500/30 hover:border-cyan-500/50"
            >
              Let's Talk
            </Link>
         </div>
      </motion.div>
    </nav>
  );
};

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
    <div className="bg-slate-950 min-h-screen font-sans selection:bg-blue-900 text-slate-200">
      
      {/* INTERNAL NAVBAR */}
      <InternalNavbar />

      <div className="pt-32 pb-20 overflow-hidden">
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
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-900/30 text-blue-400 text-xs font-bold tracking-widest uppercase mb-8 border border-blue-800">
            <Globe className="w-3.5 h-3.5" /> Enterprise-Grade Solutions
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black text-white mb-8 leading-[1.1] tracking-tight">
            Engineering Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-500 to-cyan-400">
              Competitive Advantage
            </span>
          </h1>
          
          <p className="text-xl text-slate-400 max-w-3xl mx-auto mb-12 leading-relaxed">
            Generic software forces you to compromise. We build bespoke digital ecosystems that mirror your unique operational DNA, ensuring 100% process alignment and unmatched scalability.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-5">
            <Link 
              href="/contact" 
              className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-10 py-5 rounded-full font-bold transition-all shadow-2xl shadow-blue-500/20 group"
            >
              Start Strategy Session <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              href="/portfolio" 
              className="inline-flex items-center justify-center gap-2 bg-transparent border border-slate-700 hover:bg-slate-900 text-white px-10 py-5 rounded-full font-bold transition-all"
            >
              Review Case Studies
            </Link>
          </div>
        </section>

        {/* Philosophy Section */}
        <section className="bg-slate-900/30 py-24 border-y border-slate-800">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              <div className="space-y-8">
                <h2 className="text-4xl font-extrabold text-white leading-tight">
                  Why Bespoke? <br />
                  <span className="text-slate-400 font-medium">Because Templates are for Commodities.</span>
                </h2>
                <p className="text-slate-400 text-lg">
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
                      <div className="flex items-center gap-2 text-blue-400 font-bold">
                        <CheckCircle2 className="w-5 h-5" />
                        <span>{item.title}</span>
                      </div>
                      <p className="text-sm text-slate-400">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="relative animate-float">
                <div className="absolute inset-0 bg-blue-600/20 blur-[80px] -z-10 rounded-full" />
                <div className="bg-slate-800 p-3 rounded-[2.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)] border border-slate-700 relative overflow-hidden group">
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

        {/* --- WORKFLOW SECTION (NEW) --- */}
        <section className="container mx-auto px-6 py-28 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-blue-900/5 rounded-full blur-[100px] -z-10" />
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">Development Workflow</h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Our structured approach ensures transparency and predictability from kickoff to deployment. No guesswork, just results.
            </p>
          </div>

          <div className="relative">
            {/* Connector Line */}
            <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-blue-800 to-transparent -translate-y-1/2 z-0" />

            <div className="grid md:grid-cols-4 gap-8 relative z-10">
              {[
                { 
                  icon: <Search className="w-6 h-6" />, 
                  title: "Discovery", 
                  desc: "We analyze your business logic, pain points, and technical requirements to draft a precise blueprint." 
                },
                { 
                  icon: <PenTool className="w-6 h-6" />, 
                  title: "Design & Proto", 
                  desc: "Creating high-fidelity wireframes and interactive prototypes to align on UX before writing a single line of code." 
                },
                { 
                  icon: <Code2 className="w-6 h-6" />, 
                  title: "Development", 
                  desc: "Agile sprints with weekly updates. We build scalable architecture using industry-standard best practices." 
                },
                { 
                  icon: <Rocket className="w-6 h-6" />, 
                  title: "Deploy & Scale", 
                  desc: "Rigorous QA testing, seamless deployment to cloud infrastructure, and post-launch monitoring." 
                }
              ].map((step, i) => (
                <div key={i} className="group bg-slate-900 border border-slate-800 p-8 rounded-2xl relative hover:border-blue-500/50 transition-colors">
                  <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center text-blue-400 mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors shadow-lg shadow-blue-900/20">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{step.desc}</p>
                  <div className="absolute top-4 right-4 text-slate-700 font-black text-4xl opacity-20 select-none">
                    0{i + 1}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- TECHNOLOGY STACK (NEW) --- */}
        <section className="bg-slate-900/50 py-24 border-y border-slate-800">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/20 text-blue-400 text-xs font-bold tracking-widest uppercase mb-4 border border-blue-800/50">
                <Cpu className="w-3.5 h-3.5" /> High-Performance Tech Stack
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-white">Built on Modern Foundations</h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 text-center">
              {[
                { name: "Next.js", type: "Framework" },
                { name: "React", type: "Frontend Library" },
                { name: "Node.js", type: "Backend Runtime" },
                { name: "PostgreSQL", type: "Database" },
                { name: "Prisma", type: "ORM" },
                { name: "AWS", type: "Cloud Infra" },
                { name: "Docker", type: "Containerization" },
                { name: "Redis", type: "Caching" },
                { name: "TypeScript", type: "Language" },
                { name: "Tailwind", type: "Styling" },
                { name: "Vercel", type: "Deployment" },
                { name: "GitHub", type: "Version Control" }
              ].map((tech, i) => (
                <div key={i} className="bg-slate-950 border border-slate-800 p-6 rounded-xl hover:border-blue-500/30 transition-colors group">
                  <div className="font-bold text-white mb-1 group-hover:text-blue-400 transition-colors">{tech.name}</div>
                  <div className="text-xs text-slate-500 font-medium uppercase tracking-wide">{tech.type}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Capabilities Section */}
        <section className="container mx-auto px-6 py-28">
          <div className="max-w-3xl mx-auto text-center mb-20">
            <h2 className="text-4xl font-black text-white mb-6">Operational Flow Specialization</h2>
            <p className="text-slate-400 text-lg">
              We specialize in digitizing high-friction business processes that off-the-shelf software simply cannot handle.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {specializedFlows.map((flow, idx) => (
              <div 
                key={idx} 
                className="group p-10 bg-slate-900 rounded-[2rem] border border-slate-800 hover:border-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500"
              >
                <div className="mb-8 bg-slate-800/50 w-16 h-16 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
                  {flow.icon}
                </div>
                <h3 className="text-xl font-extrabold mb-4 text-white group-hover:text-blue-600 transition-colors">{flow.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {flow.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Metrics Section */}
        <section className="container mx-auto px-6 mb-28">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-16 border-y border-slate-800">
            {[
              { label: "Uptime SLA", value: "99.99%" },
              { label: "IP Ownership", value: "100%" },
              { label: "Process Alignment", value: "Perfect" },
              { label: "License Fees", value: "Zero" }
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl font-black text-white mb-1">{stat.value}</div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Global CTA & Pricing Estimate */}
        <section className="container mx-auto px-6 mb-20">
          <div className="bg-slate-900 rounded-[3rem] p-16 text-center relative overflow-hidden">
            {/* Subtle decorative elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] -mr-48 -mt-48" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-[120px] -ml-48 -mb-48" />
            
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-400 px-4 py-2 rounded-full border border-emerald-500/20 mb-8 font-bold text-sm">
                <DollarSign className="w-4 h-4" /> Investment starts from IDR 15.000.000
              </div>

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
    </div>
  );
}