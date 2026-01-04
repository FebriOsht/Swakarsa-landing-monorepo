"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  FileText,
  ExternalLink,
  Lock,
  CheckCircle,
  XCircle,
  Loader2,
  ShieldCheck
} from "lucide-react";
// import { useParams } from "next/navigation"; // Removed for preview compatibility
import { useEffect, useState, memo } from "react";

/* ===========================
   CONFIG & DATA
=========================== */
const VALID_ACCESS_CODE = "SWAKARSA2025";
const STORAGE_KEY = "team_cv_access_expires";
const ACCESS_DURATION = 5 * 60 * 1000; // 5 minutes

// Memoized Background to prevent re-renders (Performance Optimization)
const BackgroundEffects = memo(() => (
  <div className="fixed pointer-events-none inset-0 overflow-hidden z-0">
    <motion.div
      animate={{
        scale: [1, 1.1, 1],
        opacity: [0.2, 0.3, 0.2],
      }}
      transition={{
        duration: 15,
        repeat: Infinity,
        ease: "linear",
      }}
      className="absolute -top-40 left-1/4 -translate-x-1/2
      w-[600px] h-[600px]
      bg-gradient-to-tr from-indigo-500/10 via-purple-500/5 to-pink-500/10
      rounded-full blur-[120px]"
      style={{ willChange: "transform, opacity" }}
    />
    <motion.div
      animate={{
        scale: [1.1, 1, 1.1],
        opacity: [0.1, 0.2, 0.1],
      }}
      transition={{
        duration: 10,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className="absolute -bottom-40 -right-20
      w-[500px] h-[500px]
      bg-gradient-to-tr from-cyan-400/5 to-blue-500/5
      rounded-full blur-[100px]"
      style={{ willChange: "transform, opacity" }}
    />
  </div>
));

BackgroundEffects.displayName = 'BackgroundEffects';

// Expanded Dummy Data to match TeamPage categories
const teamCV: Record<string, any> = {
  leadership: {
    title: "Leadership & Strategy Team",
    description: "Executive profiles leading our strategic direction and business operations.",
    cvs: [
      { id: "lead-1", name: "M. Jonathan Tanuwijaya", role: "CEO", file: "#", experience: "6+ Years" },
      { id: "lead-2", name: "Jethro Elijah Lim", role: "Strategic Director", file: "#", experience: "5+ Years" }
    ]
  },
  development: {
    title: "Development Team",
    description: "Full-stack engineers and specialists building scalable digital solutions.",
    cvs: [
      { id: "dev-1", name: "Sarah Connor", role: "Senior Frontend Dev", file: "#", experience: "5+ Years" },
      { id: "dev-2", name: "John Smith", role: "Backend Specialist", file: "#", experience: "4+ Years" },
      { id: "dev-3", name: "David Chen", role: "Full Stack Engineer", file: "#", experience: "3+ Years" }
    ]
  },
  design: {
    title: "UI/UX Design Team",
    description: "Creative minds crafting intuitive and beautiful user experiences.",
    cvs: [
      { id: "des-1", name: "Elena Fisher", role: "Lead UI/UX Designer", file: "#", experience: "5+ Years" },
      { id: "des-2", name: "Nathan Drake", role: "Product Designer", file: "#", experience: "3+ Years" }
    ]
  },
  marketing: {
    title: "Digital Marketing Team",
    description: "Experts in ads strategy, SEO, and campaign optimization.",
    cvs: [
      { id: "mkt-1", name: "Ahmad Musyaari Rasyid", role: "Digital Strategist", file: "#", experience: "5+ Years" },
      { id: "mkt-2", name: "Richie Ardianto", role: "PPC Specialist", file: "#", experience: "4+ Years" },
      { id: "mkt-3", name: "M. Taufiq Hidayat", role: "Social Media Manager", file: "#", experience: "3+ Years" },
      { id: "mkt-4", name: "Reynardi Gunawan", role: "SEO Specialist", file: "#", experience: "6+ Years" },
      { id: "mkt-5", name: "Gregorio Yansen", role: "Content Manager", file: "#", experience: "4+ Years" }
    ]
  },
  content: {
    title: "Content & Copywriting",
    description: "Storytellers engaging audiences through compelling narratives.",
    cvs: [
      { id: "cont-1", name: "Jessica Jones", role: "Senior Copywriter", file: "#", experience: "4+ Years" },
      { id: "cont-2", name: "Peter Parker", role: "Content Creator", file: "#", experience: "2+ Years" }
    ]
  },
  seo: {
    title: "SEO & Analytics",
    description: "Data-driven specialists optimizing visibility and performance.",
    cvs: [
      { id: "seo-1", name: "Matt Murdock", role: "SEO Analyst", file: "#", experience: "5+ Years" }
    ]
  }
};

/* ===========================
   PAGE COMPONENT
=========================== */
export default function TeamCVPage() {
  // Mock params for preview environment
  // In a real Next.js app, you would use: const params = useParams();
  const params = { slug: "marketing" }; 
  const slug = (params?.slug as string) || "marketing"; // Default to marketing if no slug
  const team = teamCV[slug];

  const [hasAccess, setHasAccess] = useState(false);
  const [accessCode, setAccessCode] = useState("");
  const [isChecking, setIsChecking] = useState(false);
  const [accessStatus, setAccessStatus] = useState<null | "success" | "error">(null);

  /* --- Check Access on Load --- */
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return;

    if (Date.now() < parseInt(stored, 10)) {
      setHasAccess(true);
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  /* --- Auto Lock Timer --- */
  useEffect(() => {
    if (!hasAccess) return;
    const interval = setInterval(() => {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored || Date.now() > parseInt(stored, 10)) {
        localStorage.removeItem(STORAGE_KEY);
        setHasAccess(false);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [hasAccess]);

  /* --- Handle Login --- */
  const handleAccessSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!accessCode) return;

    setIsChecking(true);
    setAccessStatus(null);

    // Simulate network delay for loading effect
    setTimeout(() => {
      if (accessCode === VALID_ACCESS_CODE) {
        setAccessStatus("success");
        setTimeout(() => {
          localStorage.setItem(STORAGE_KEY, (Date.now() + ACCESS_DURATION).toString());
          setHasAccess(true);
          setIsChecking(false);
          setAccessStatus(null);
        }, 1000);
      } else {
        setAccessStatus("error");
        setIsChecking(false);
      }
    }, 1500);
  };

  /* ===========================
     ACCESS GATE (GLASS UI)
  =========================== */
  if (!hasAccess) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center px-4 relative overflow-hidden">
        <BackgroundEffects />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 w-full max-w-md"
        >
          {/* Glass Card */}
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
            
            {/* Top Shine Effect */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />

            <div className="flex flex-col items-center text-center mb-8">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center mb-4 border border-indigo-500/30 shadow-lg shadow-indigo-500/10">
                <ShieldCheck size={32} className="text-indigo-400" />
              </div>
              <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                Protected Access
              </h2>
              <p className="text-slate-400 text-sm mt-2 leading-relaxed">
                This page contains confidential information.<br/>Please enter your access code to proceed.
              </p>
            </div>

            <form onSubmit={handleAccessSubmit} className="space-y-4">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-300" />
                <input
                  type="password"
                  placeholder="Enter Access Code"
                  value={accessCode}
                  onChange={(e) => {
                    setAccessCode(e.target.value);
                    if (accessStatus === 'error') setAccessStatus(null);
                  }}
                  className={`relative w-full px-4 py-4 rounded-xl bg-black/50 border backdrop-blur-sm text-white placeholder-slate-500 outline-none transition-all duration-300
                    ${accessStatus === 'error' 
                      ? "border-red-500/50 focus:border-red-500" 
                      : "border-white/10 focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50"
                    }
                  `}
                />
                <Lock size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500" />
              </div>

              <button
                type="submit"
                disabled={isChecking || !accessCode}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 font-semibold text-white shadow-lg shadow-indigo-500/25 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 relative overflow-hidden"
              >
                {isChecking ? (
                  <div className="flex items-center justify-center gap-2">
                    <Loader2 size={20} className="animate-spin" />
                    <span>Verifying...</span>
                  </div>
                ) : (
                  <span>Unlock Access</span>
                )}
              </button>
            </form>

            {/* Error Message */}
            <AnimatePresence>
              {accessStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mt-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center gap-2 text-red-400 text-sm"
                >
                  <XCircle size={16} />
                  <span>Invalid access code. Please try again.</span>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="mt-8 text-center">
              <a
                href="/team"
                className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-white transition-colors"
              >
                <ArrowLeft size={14} />
                Back to Team Overview
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  /* ===========================
     TEAM NOT FOUND
  =========================== */
  if (!team) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center text-center px-6 relative overflow-hidden">
        <BackgroundEffects />
        <div className="relative z-10">
          <h1 className="text-4xl font-extrabold mb-4">Team Not Found</h1>
          <p className="text-slate-400 mb-6">
            The team profile you are looking for does not exist or has been moved.
          </p>
          <a
            href="/team"
            className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 transition-colors inline-block"
          >
            Back to Teams
          </a>
        </div>
      </div>
    );
  }

  /* ===========================
     MAIN CONTENT (ACCESS GRANTED)
  =========================== */
  return (
    <div className="min-h-screen bg-black text-white relative overflow-x-hidden">
      <BackgroundEffects />

      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-black/40 backdrop-blur-md border-b border-white/5">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <a href="/team" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
              <ArrowLeft size={20} />
              <span>Back</span>
            </a>
            <div className="flex items-center gap-2 text-green-400 bg-green-400/10 px-3 py-1 rounded-full text-sm border border-green-400/20">
              <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              Access Granted
            </div>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-6 py-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-500">
            {team.title}
          </h1>
          <p className="text-lg text-slate-400 mb-12 max-w-2xl leading-relaxed">
            {team.description}
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {team.cvs.map((cv: any, index: number) => (
              <motion.div
                key={cv.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="group relative bg-white/5 border border-white/10 hover:border-indigo-500/50 rounded-2xl p-6 transition-all duration-300 hover:bg-white/10 hover:-translate-y-1"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center border border-indigo-500/30 text-indigo-400 font-bold text-xl">
                    {cv.name.charAt(0)}
                  </div>
                  <span className="text-xs font-mono text-slate-500 bg-black/40 px-2 py-1 rounded">
                    {cv.experience}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-1 group-hover:text-indigo-400 transition-colors">
                  {cv.name}
                </h3>
                <p className="text-sm text-slate-400 mb-6">{cv.role}</p>

                <div className="pt-6 border-t border-white/5">
                  <a
                    href={cv.file}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between w-full p-3 rounded-xl bg-indigo-600/10 text-indigo-300 hover:bg-indigo-600 hover:text-white transition-all group/btn"
                  >
                    <span className="flex items-center gap-2 font-medium">
                      <FileText size={18} />
                      View CV
                    </span>
                    <ExternalLink size={16} className="opacity-50 group-hover/btn:opacity-100 transition-opacity" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  );
}