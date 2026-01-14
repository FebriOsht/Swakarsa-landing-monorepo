"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronRight, Sparkles, Layers, ExternalLink } from "lucide-react";
import { CountUpAlt } from "./LandingUtils";

// Team Member Component
export const TeamMember = ({ member, index }: { member: any; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.5, delay: index * 0.2 }}
    className="rounded-2xl p-6 h-full bg-slate-900/60 border border-slate-800 hover:bg-slate-800/60 backdrop-blur-sm transition-colors duration-300"
  >
    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
      <div className="w-24 h-24 rounded-full overflow-hidden flex-shrink-0 border-2 border-cyan-500/30 shadow-lg shadow-cyan-500/10">
        <div className="w-full h-full flex items-center justify-center bg-slate-800">
          <img 
            src={member.image} 
            alt={member.name} 
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover"
            onError={(e: any) => { e.target.src="https://placehold.co/100x100/333/FFF?text=User" }}
          />
        </div>
      </div>
      <div className="min-w-0">
        <h3 className="text-xl font-bold truncate text-white">
          {member.name}
        </h3>
        <p className="mt-1 font-medium text-cyan-400">
          {member.role}
        </p>
        <p className="mt-3 text-sm leading-relaxed text-slate-400">
          {member.description}
        </p>
      </div>
    </div>
  </motion.div>
);

// Stats Section Component
export const StatsSection = ({ stats, hasAnimated }: { stats: any[]; hasAnimated: boolean }) => (
  <section id="stats-section" className="container mx-auto px-6 relative z-20 -mt-20 sm:-mt-24">
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 bg-slate-900/80 border border-slate-800 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] backdrop-blur-xl rounded-3xl p-8 md:p-10 transform transition-transform hover:scale-[1.01]"
    >
      {stats.map((stat: any, index: number) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="text-center group"
        >
          <div className="text-3xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-cyan-400 via-teal-400 to-blue-400 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
            {hasAnimated ? (
              <CountUpAlt 
                end={stat.value} 
                suffix={stat.suffix} 
                duration={2.5} 
                delay={index * 0.2}
              />
            ) : (
              `0${stat.suffix}`
            )}
          </div>
          <p className="text-xs md:text-sm font-medium uppercase tracking-wider text-slate-500">
            {stat.label}
          </p>
        </motion.div>
      ))}
    </motion.div>
  </section>
);

// Modal Component
export const Modal = ({ isOpen, onClose, children, title }: { 
  isOpen: boolean; 
  onClose: () => void; 
  children: React.ReactNode; 
  title?: string;
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[60] flex items-center justify-center p-4"
        onClick={onClose}
      >
        <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />
        
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          transition={{ type: "spring", damping: 25 }}
          className="relative z-10 w-full max-w-4xl rounded-3xl max-h-[90vh] overflow-hidden flex flex-col bg-slate-900 border border-slate-700 shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="sticky top-0 z-20 flex items-center justify-between p-6 border-b border-slate-800 bg-slate-900/80 backdrop-blur-xl">
            <h3 className="text-xl font-bold text-white">
              {title}
            </h3>
            <button
              onClick={onClose}
              className="p-2 rounded-full transition-colors hover:bg-slate-800 text-slate-400 hover:text-white"
            >
              <X size={24} />
            </button>
          </div>
          <div className="p-6 overflow-y-auto custom-scrollbar">
            {children}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// Skill Modal Content
export const SkillModalContent = ({ skill }: { skill: any }) => (
  <div className="space-y-8">
    <div className="flex flex-col md:flex-row items-start gap-8">
      <div className="w-full md:w-5/12">
        <div className="rounded-2xl overflow-hidden shadow-lg aspect-video">
          <img 
            src={skill.image} 
            alt={skill.title}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="mt-4 p-4 rounded-xl bg-slate-800/50">
          <h4 className="text-xs font-bold uppercase tracking-wider mb-2 text-cyan-400">
            Category
          </h4>
          <p className="font-medium text-white">
            {skill.category}
          </p>
        </div>
      </div>
      
      <div className="w-full md:w-7/12 space-y-4">
        <h2 className="text-3xl font-bold text-white">
          {skill.title}
        </h2>
        <p className="text-lg leading-relaxed text-slate-300">
          {skill.description}
        </p>
        
        <div className="pt-4">
          <h4 className="text-sm font-semibold mb-3 uppercase tracking-wider text-slate-400">
            Technologies Used
          </h4>
          <div className="flex flex-wrap gap-2">
            {skill.techStack.map((tech: string, idx: number) => (
              <span key={idx} className="px-3 py-1.5 rounded-lg text-sm font-medium bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>

    <div className="h-px w-full bg-slate-800" />

    <div className="grid md:grid-cols-2 gap-8">
      <div>
        <h4 className="text-xl font-bold mb-5 flex items-center gap-2 text-white">
          <Sparkles size={20} className="text-yellow-500" />
          Key Features
        </h4>
        <div className="space-y-3">
          {skill.features.map((feature: string, idx: number) => (
            <div key={idx} className="flex items-start gap-3 p-3 rounded-xl transition-colors hover:bg-slate-800/30">
              <div className="mt-0.5 p-1 rounded-full bg-green-500/20 text-green-400">
                <ChevronRight size={14} />
              </div>
              <p className="text-sm text-slate-300">{feature}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-xl font-bold mb-5 flex items-center gap-2 text-white">
          <Layers size={20} className="text-cyan-500" />
          Use Cases
        </h4>
        <div className="flex flex-wrap gap-3">
          {skill.useCases.map((useCase: string, idx: number) => (
            <span key={idx} className="px-4 py-3 rounded-xl text-sm font-medium w-full bg-slate-800 text-slate-300 border border-slate-700">
              {useCase}
            </span>
          ))}
        </div>
      </div>
    </div>
  </div>
);

// Portfolio Modal Content
export const PortfolioModalContent = ({ project }: { project: any }) => (
  <div className="space-y-8">
    <div className="flex flex-col md:flex-row items-start gap-8">
      <div className="w-full md:w-5/12">
        <div className="rounded-2xl overflow-hidden shadow-lg aspect-video">
          <img 
            src={project.image} 
            alt={project.title}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="mt-4 grid grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-slate-800/50">
            <h4 className="text-xs font-bold uppercase tracking-wider mb-2 text-cyan-400">
              Category
            </h4>
            <p className="font-medium text-white text-sm">
              {project.category}
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-800/50">
            <h4 className="text-xs font-bold uppercase tracking-wider mb-2 text-cyan-400">
              Duration
            </h4>
            <p className="font-medium text-white text-sm">
              {project.duration}
            </p>
          </div>
        </div>
      </div>
      
      <div className="w-full md:w-7/12 space-y-4">
        <h2 className="text-3xl font-bold text-white">
          {project.title}
        </h2>
        <p className="text-sm font-medium text-slate-400">
          {project.client}
        </p>
        <p className="text-lg leading-relaxed text-slate-300">
          {project.description}
        </p>
        
        <div className="pt-4">
          <h4 className="text-sm font-semibold mb-3 uppercase tracking-wider text-slate-400">
            Technologies Used
          </h4>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech: string, idx: number) => (
              <span key={idx} className="px-3 py-1.5 rounded-lg text-sm font-medium bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>

    <div className="h-px w-full bg-slate-800" />

    <div className="grid md:grid-cols-2 gap-8">
      <div>
        <h4 className="text-xl font-bold mb-5 flex items-center gap-2 text-white">
          <Sparkles size={20} className="text-yellow-500" />
          Challenges
        </h4>
        <div className="space-y-3">
          {project.challenges.map((challenge: string, idx: number) => (
            <div key={idx} className="flex items-start gap-3 p-3 rounded-xl transition-colors hover:bg-slate-800/30">
              <div className="mt-0.5 p-1 rounded-full bg-red-500/20 text-red-400">
                <ChevronRight size={14} />
              </div>
              <p className="text-sm text-slate-300">{challenge}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-xl font-bold mb-5 flex items-center gap-2 text-white">
          <Layers size={20} className="text-green-500" />
          Solutions
        </h4>
        <div className="space-y-3">
          {project.solutions.map((solution: string, idx: number) => (
            <div key={idx} className="flex items-start gap-3 p-3 rounded-xl transition-colors hover:bg-slate-800/30">
              <div className="mt-0.5 p-1 rounded-full bg-green-500/20 text-green-400">
                <ChevronRight size={14} />
              </div>
              <p className="text-sm text-slate-300">{solution}</p>
            </div>
          ))}
        </div>
      </div>
    </div>

    {project.results && project.results.length > 0 && (
      <>
        <div className="h-px w-full bg-slate-800" />
        <div>
          <h4 className="text-xl font-bold mb-5 text-white">
            Results
          </h4>
          <div className="grid grid-cols-3 gap-4">
            {project.results.map((result: any, idx: number) => (
              <div key={idx} className="p-4 rounded-xl bg-slate-800/50 text-center">
                <div className="text-2xl font-bold text-cyan-400 mb-1">
                  {result.value}
                </div>
                <div className="text-xs text-slate-400">
                  {result.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </>
    )}

    {project.tags && project.tags.length > 0 && (
      <>
        <div className="h-px w-full bg-slate-800" />
        <div>
          <h4 className="text-sm font-semibold mb-3 uppercase tracking-wider text-slate-400">
            Tags
          </h4>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag: string, idx: number) => (
              <span key={idx} className="px-3 py-1.5 rounded-lg text-sm font-medium bg-slate-800 text-slate-300 border border-slate-700">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </>
    )}
  </div>
);

