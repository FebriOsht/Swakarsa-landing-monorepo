"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import { ArrowRight, X } from "lucide-react";

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
// 2. SUB-COMPONENTS
// ==========================================

const PortfolioModal = ({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) => {
  const [imgSrc, setImgSrc] = useState<string>(project?.image || "");

  // Reset state gambar saat project berubah
  // (Pengecekan sederhana agar tidak infinite loop)
  if (project && project.image !== imgSrc && !imgSrc.includes("placehold.co")) {
      setImgSrc(project.image);
  }

  if (!project) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          className="relative w-full max-w-5xl bg-slate-900 border border-slate-700 rounded-3xl max-h-[90vh] overflow-y-auto custom-scrollbar flex flex-col shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-50 p-2 bg-black/50 rounded-full text-white hover:bg-white hover:text-black transition-colors"
          >
            <X size={24} />
          </button>

          {/* Header Image */}
          <div className="relative h-64 md:h-96 w-full shrink-0 bg-slate-800">
            <Image
              src={imgSrc || "/images/placeholder.jpg"}
              alt={project.title}
              fill
              className="object-cover"
              priority
              onError={() =>
                setImgSrc(
                  "https://placehold.co/1200x600/1e293b/ffffff?text=Image+Not+Found"
                )
              }
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 md:left-10">
              <span className="px-3 py-1 bg-indigo-600 text-white text-xs font-bold rounded-full mb-3 inline-block">
                {project.category}
              </span>
              <h2 className="text-3xl md:text-5xl font-bold text-white">
                {project.title}
              </h2>
            </div>
          </div>

          {/* Content */}
          <div className="p-8 md:p-10 space-y-8">
            <div className="grid md:grid-cols-3 gap-10">
              <div className="md:col-span-2 space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    Overview
                  </h3>
                  <p className="text-slate-300 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* Render Challenges */}
                {project.challenges && (
                  <div className="p-6 bg-red-900/10 border border-red-500/20 rounded-2xl">
                    <h4 className="text-red-400 font-bold mb-2">Challenge</h4>
                    <ul className="list-disc list-inside text-slate-300 text-sm space-y-1">
                      {Array.isArray(project.challenges) ? (
                        project.challenges.map((c: string, i: number) => (
                          <li key={i}>{c}</li>
                        ))
                      ) : (
                        <li>{String(project.challenges)}</li>
                      )}
                    </ul>
                  </div>
                )}

                {/* Render Solutions */}
                {project.solutions && (
                  <div className="p-6 bg-green-900/10 border border-green-500/20 rounded-2xl">
                    <h4 className="text-green-400 font-bold mb-2">Solution</h4>
                    <ul className="list-disc list-inside text-slate-300 text-sm space-y-1">
                      {Array.isArray(project.solutions) ? (
                        project.solutions.map((s: string, i: number) => (
                          <li key={i}>{s}</li>
                        ))
                      ) : (
                        <li>{String(project.solutions)}</li>
                      )}
                    </ul>
                  </div>
                )}
              </div>

              <div className="space-y-6">
                <div className="p-6 bg-slate-800/50 rounded-2xl border border-slate-700">
                  <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">
                    Project Info
                  </h4>
                  <div className="space-y-4">
                    <div>
                      <span className="text-xs text-slate-500 block">
                        Client
                      </span>
                      <span className="text-white font-medium">
                        {project.client || "Confidential"}
                      </span>
                    </div>
                    <div>
                      <span className="text-xs text-slate-500 block">
                        Tech Stack
                      </span>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {Array.isArray(project.techStack) ? (
                          project.techStack.map((tech: string, idx: number) => (
                            <span
                              key={idx}
                              className="px-2 py-1 bg-slate-700 text-slate-300 text-xs rounded"
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
      whileHover={{ y: -8 }}
      className="rounded-2xl overflow-hidden cursor-pointer group bg-slate-900/60 border border-slate-800 hover:border-slate-600 transition-all duration-300 flex flex-col h-full"
      onClick={() => onClick(project)}
    >
      <div className="relative h-56 w-full overflow-hidden shrink-0 bg-slate-800">
        <Image
          src={imgSrc || "/images/placeholder.jpg"}
          alt={project.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          onError={() =>
            setImgSrc(
              "https://placehold.co/600x400/1e293b/ffffff?text=No+Image"
            )
          }
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />

        <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold bg-black/60 backdrop-blur-md text-white border border-white/10">
          {project.category}
        </div>

        <div className="absolute bottom-4 left-4 right-4 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
          <h3 className="font-bold text-xl text-white mb-1 truncate">
            {project.title}
          </h3>
          <p className="text-sm text-gray-300 line-clamp-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75">
            {project.client}
          </p>
        </div>
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <p className="text-sm text-slate-400 line-clamp-2 mb-4 flex-grow">
          {project.shortDescription}
        </p>

        <div className="flex items-center justify-between pt-3 border-t border-slate-800 mt-auto">
          <span className="text-sm font-medium text-white flex items-center gap-2 group-hover:gap-3 transition-all">
            View Case Study <ArrowRight size={14} className="text-indigo-500" />
          </span>
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

  // Fallback data jika DB kosong (untuk dev preview)
  // Casting 'any[]' ke 'Project[]' untuk keamanan tipe di map()
  const rawProjects = (data && data.length > 0) ? data : [];
  
  const projects: Project[] = rawProjects.length > 0 
    ? rawProjects 
    : [
          {
            id: 1,
            title: "Maju Mobilindo",
            category: "E-commerce",
            image: "/portfolio/Maju Mobilindo.jpeg",
            shortDescription: "Used car dealer platform.",
            description: "Full stack e-commerce for automotive sales...",
            techStack: ["Next.js", "PostgreSQL", "Tailwind"],
            client: "Maju Mobilindo",
            challenges: ["Handling 500+ car listings", "Search performance"],
            solutions: ["Optimized DB queries", "Elasticsearch integration"],
          },
          {
            id: 2,
            title: "Alumka Lampung",
            category: "Company Profile",
            image: "/portfolio/Alumka.jpeg",
            shortDescription: "Building materials supplier profile.",
            description: "Professional company profile for B2B supplier...",
            techStack: ["React", "Node.js"],
            client: "PT Alumka",
            challenges: ["Mobile responsiveness", "Catalog management"],
            solutions: ["Mobile-first design", "Custom CMS"],
          },
          {
            id: 3,
            title: "AI FAQ System",
            category: "AI Solution",
            image: "/portfolio/AI FAQ System.jpeg",
            shortDescription: "Automated customer support.",
            description: "AI-powered chatbot for 24/7 support...",
            techStack: ["Python", "OpenAI", "FastAPI"],
            client: "Tech Startup",
            challenges: ["Context understanding", "Response time"],
            solutions: ["Vector database", "Async processing"],
          },
        ];

  return (
    <section id="portfolio" className="py-20 sm:py-32 bg-black">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-white">
              Featured Work
            </h2>
            <p className="text-lg text-slate-400">
              Our recent projects showcasing quality and innovation.
            </p>
          </div>
          <a
            href="/portfolio"
            className="px-6 py-3 rounded-xl border border-slate-700 text-white hover:bg-slate-800 transition-colors"
          >
            View All Projects
          </a>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <PortfolioCard
              key={project.id || index}
              project={project}
              onClick={setSelectedProject}
            />
          ))}
        </div>

        {/* Modal dirender di luar map loop */}
        <PortfolioModal
          // Gunakan key untuk memaksa re-render jika modal yang sama dibuka ulang
          key={selectedProject ? `modal-${selectedProject.id}` : 'modal-closed'}
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      </div>
    </section>
  );
}