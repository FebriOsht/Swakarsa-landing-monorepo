"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { ArrowRight, X, ExternalLink, Sparkles } from "lucide-react";

// ==========================================
// 1. TYPE DEFINITIONS
// ==========================================

export interface Project {
  id?: string | number;
  title: string;
  category: string;
  image: string;
  description: string;
  shortDescription?: string;
  client?: string;
  techStack?: string[];
  challenges?: string[] | string;
  solutions?: string[] | string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

// ==========================================
// 2. SUB-COMPONENTS: MODAL
// ==========================================

const PortfolioModal = ({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) => {
  const [imgSrc, setImgSrc] = useState<string>("");

  useEffect(() => {
    if (project) {
      setImgSrc(project.image);
    }
  }, [project]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          className="relative w-full max-w-5xl bg-slate-900 border border-slate-700 rounded-[2.5rem] max-h-[90vh] overflow-y-auto custom-scrollbar flex flex-col shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-6 right-6 z-[110] p-2 bg-black/50 hover:bg-white hover:text-black rounded-full text-white transition-all shadow-xl"
          >
            <X size={24} />
          </button>

          {/* Header Image */}
          <div className="relative h-64 md:h-[450px] w-full shrink-0 bg-slate-800">
            <img
              src={imgSrc || "https://placehold.co/1200x600/1e293b/ffffff?text=Loading..."}
              alt={project.title}
              className="w-full h-full object-cover"
              onError={() =>
                setImgSrc(
                  "https://placehold.co/1200x600/1e293b/ffffff?text=Image+Not+Found"
                )
              }
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
            <div className="absolute bottom-8 left-8 md:left-12">
              <span className="px-4 py-1.5 bg-indigo-600 text-white text-[10px] font-black uppercase tracking-widest rounded-full mb-4 inline-block">
                {project.category}
              </span>
              <h2 className="text-4xl md:text-6xl font-black text-white leading-tight">
                {project.title}
              </h2>
            </div>
          </div>

          {/* Content */}
          <div className="p-8 md:p-12 space-y-10">
            <div className="grid lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2 space-y-8">
                <div>
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <Sparkles size={20} className="text-indigo-400" /> Overview
                  </h3>
                  <p className="text-slate-300 text-lg leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Render Challenges */}
                  {project.challenges && (
                    <div className="p-6 bg-red-900/10 border border-red-500/20 rounded-3xl">
                      <h4 className="text-red-400 font-bold mb-3 uppercase text-xs tracking-widest">The Challenge</h4>
                      <ul className="space-y-2 text-slate-300 text-sm">
                        {Array.isArray(project.challenges) ? (
                          project.challenges.map((c: string, i: number) => (
                            <li key={i} className="flex gap-2"><span>•</span> {c}</li>
                          ))
                        ) : (
                          <li className="flex gap-2"><span>•</span> {String(project.challenges)}</li>
                        )}
                      </ul>
                    </div>
                  )}

                  {/* Render Solutions */}
                  {project.solutions && (
                    <div className="p-6 bg-green-900/10 border border-green-500/20 rounded-3xl">
                      <h4 className="text-green-400 font-bold mb-3 uppercase text-xs tracking-widest">Our Solution</h4>
                      <ul className="space-y-2 text-slate-300 text-sm">
                        {Array.isArray(project.solutions) ? (
                          project.solutions.map((s: string, i: number) => (
                            <li key={i} className="flex gap-2"><span>•</span> {s}</li>
                          ))
                        ) : (
                          <li className="flex gap-2"><span>•</span> {String(project.solutions)}</li>
                        )}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-6">
                <div className="p-8 bg-slate-800/30 rounded-[2rem] border border-slate-700/50 shadow-inner">
                  <h4 className="text-xs font-black text-slate-500 uppercase tracking-[0.2em] mb-6">
                    Project Info
                  </h4>
                  <div className="space-y-6">
                    <div>
                      <span className="text-[10px] text-slate-500 uppercase font-bold block mb-1">
                        Client
                      </span>
                      <span className="text-white font-bold text-lg">
                        {project.client || "Confidential Partner"}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 uppercase font-bold block mb-3">
                        Tech Stack
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {Array.isArray(project.techStack) ? (
                          project.techStack.map((tech: string, idx: number) => (
                            <span
                              key={idx}
                              className="px-3 py-1.5 bg-slate-800 text-indigo-400 text-xs font-bold rounded-lg border border-slate-700"
                            >
                              {tech}
                            </span>
                          ))
                        ) : (
                          <span className="text-slate-300 text-sm">
                            {String(project.techStack)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// ==========================================
// 3. SUB-COMPONENTS: CLEAN CARD
// ==========================================

const PortfolioCard = ({
  project,
  onClick,
}: {
  project: Project;
  onClick: (p: Project) => void;
}) => {
  const [imgSrc, setImgSrc] = useState<string>(project.image);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ y: -12 }}
      className="rounded-[2.5rem] overflow-hidden cursor-pointer group bg-slate-900 border border-slate-800 hover:border-indigo-500/50 transition-all duration-500 flex flex-col h-[480px] relative shadow-2xl"
      onClick={() => onClick(project)}
    >
      {/* Background Image Layer */}
      <div className="absolute inset-0 w-full h-full overflow-hidden bg-slate-800">
        <img
          src={imgSrc || "https://placehold.co/600x800/1e293b/ffffff?text=Loading..."}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          onError={() =>
            setImgSrc(
              "https://placehold.co/600x800/1e293b/ffffff?text=No+Image"
            )
          }
        />
        {/* Darkened overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* Category Badge (Top) */}
      <div className="absolute top-6 left-6 z-10">
        <div className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-black/60 backdrop-blur-md text-white border border-white/10">
          {project.category}
        </div>
      </div>

      {/* Floating Action Icon (Top Right) */}
      <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0 z-10">
        <div className="p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
          <ExternalLink size={18} className="text-white" />
        </div>
      </div>

      {/* Content Layer (Bottom) */}
      <div className="absolute inset-0 p-8 flex flex-col justify-end translate-y-6 group-hover:translate-y-0 transition-transform duration-500 ease-out z-10">
        <div className="space-y-4">
          <div>
            <h3 className="font-black text-3xl text-white mb-1 group-hover:text-indigo-400 transition-colors duration-300">
              {project.title}
            </h3>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-tighter">
              {project.client || "Featured Case Study"}
            </p>
          </div>

          {/* Revealable Description */}
          <div className="opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100">
            <p className="text-sm text-slate-300 line-clamp-2 mb-6 leading-relaxed">
              {project.shortDescription}
            </p>
            <div className="flex items-center gap-3 text-white font-black text-xs uppercase tracking-widest">
              <span>View Case Study</span>
              <ArrowRight size={16} className="text-indigo-500 group-hover:translate-x-2 transition-transform" />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// ==========================================
// 3. MAIN COMPONENT
// ==========================================

export default function PortfolioSection({ data }: { data: any[] | undefined }) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const rawProjects = (data && data.length > 0) ? data : [];
  
  const projects: Project[] = rawProjects.length > 0 
    ? rawProjects 
    : [
          {
            id: 1,
            title: "Maju Mobilindo",
            category: "E-commerce",
            image: "/portfolio/Maju Mobilindo.jpeg",
            shortDescription: "Used car dealer platform with advanced inventory management.",
            description: "A comprehensive digital transformation for a leading used car dealership, featuring real-time stock tracking and optimized search performance.",
            techStack: ["Next.js", "PostgreSQL", "Tailwind CSS"],
            client: "Maju Mobilindo",
            challenges: ["Handling 500+ car listings", "High-traffic search performance"],
            solutions: ["Optimized DB queries", "Redis caching for search results"],
          },
          {
            id: 2,
            title: "Alumka Lampung",
            category: "B2B Profile",
            image: "/portfolio/Alumka.jpeg",
            shortDescription: "Full digital identity for a regional building materials giant.",
            description: "A professional and scalable company profile for a B2B supplier, designed to manage extensive catalogs and generate high-quality leads.",
            techStack: ["React", "Node.js", "MongoDB"],
            client: "PT Alumka Lampung",
            challenges: ["Complex catalog hierarchy", "Mobile traffic conversion"],
            solutions: ["Custom Category API", "Mobile-first conversion design"],
          },
          {
            id: 3,
            title: "AI FAQ Engine",
            category: "AI Solution",
            image: "/portfolio/AI FAQ System.jpeg",
            shortDescription: "LLM-powered automation for 24/7 technical support.",
            description: "An intelligent chatbot system that utilizes natural language processing to handle complex customer queries, reducing support overhead by 70%.",
            techStack: ["Python", "OpenAI API", "FastAPI"],
            client: "Global Tech Startup",
            challenges: ["Contextual understanding", "Latency issues"],
            solutions: ["Vector database integration", "Asynchronous task handling"],
          },
        ];

  return (
    <section id="portfolio" className="py-24 sm:py-32 bg-slate-950 relative overflow-hidden">
      {/* Decorative ambient lights */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-2 mb-6 text-indigo-400 font-black tracking-[0.3em] text-xs uppercase"
            >
              <Sparkles size={16} /> Featured Masterpieces
            </motion.div>
            <h2 className="text-5xl sm:text-7xl font-black mb-6 text-white tracking-tighter">
              Featured <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400">
                Innovation
              </span>
            </h2>
            <p className="text-xl text-slate-400 max-w-xl">
              We create digital experiences that combine aesthetic beauty with technical precision.
            </p>
          </div>
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="/portfolio"
            className="px-10 py-4 rounded-2xl bg-white text-slate-950 font-black text-sm uppercase tracking-widest hover:bg-indigo-400 hover:shadow-[0_0_30px_rgba(99,102,241,0.4)] transition-all flex items-center gap-3"
          >
            All Projects <ArrowRight size={18} />
          </motion.a>
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {projects.map((project, index) => (
            <PortfolioCard
              key={project.id || index}
              project={project}
              onClick={setSelectedProject}
            />
          ))}
        </div>

        {/* Global Modal Rendering */}
        <PortfolioModal
          key={selectedProject ? `modal-${selectedProject.id}` : 'modal-closed'}
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      </div>
    </section>
  );
}