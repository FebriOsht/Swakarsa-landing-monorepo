"use client";

import { motion } from "framer-motion";
import { ChevronRight, ArrowRight } from "lucide-react";

// Skill Card Component
export const SkillCard = ({ skill, index, onClick }: { skill: any; index: number; onClick: (skill: any) => void }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    whileHover={{ y: -8, scale: 1.02 }}
    className="rounded-2xl overflow-hidden cursor-pointer group relative flex flex-col h-full bg-slate-900/60 border border-slate-800 hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(34,211,238,0.15)] transition-all duration-300"
    onClick={() => onClick(skill)}
  >
    <div className="relative h-48 overflow-hidden">
      <img 
        src={skill.image} 
        alt={skill.title}
        loading="lazy"
        decoding="async"
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
      
      <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold tracking-wide backdrop-blur-md shadow-lg bg-slate-900/80 text-white border border-slate-700">
        {skill.category}
      </div>
    </div>

    <div className="p-6 flex flex-col flex-grow">
      <h3 className="font-bold text-xl mb-2 line-clamp-1 group-hover:text-cyan-400 transition-colors text-white">
        {skill.title}
      </h3>
      <p className="text-sm leading-relaxed line-clamp-2 mb-6 flex-grow text-slate-400">
        {skill.shortDescription}
      </p>
      
      <div className="flex flex-wrap gap-2 mb-6">
        {skill.tags.slice(0, 3).map((tag: string, idx: number) => (
          <span key={idx} className="px-2.5 py-1 rounded-md text-xs font-medium bg-slate-800 text-slate-300">
            {tag}
          </span>
        ))}
      </div>
      
      <div className="flex items-center justify-between pt-4 border-t border-slate-800 mt-auto">
        <span className="text-sm font-semibold flex items-center gap-1 text-cyan-400">
          Learn More <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </span>
      </div>
    </div>
  </motion.div>
);

// Portfolio Card Component
export const PortfolioCard = ({ project, index, onClick }: { project: any; index: number; onClick: (project: any) => void }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    whileHover={{ y: -8 }}
    className="rounded-2xl overflow-hidden cursor-pointer group bg-slate-900/60 border border-slate-800 hover:border-cyan-500/50 transition-all duration-300"
    onClick={() => onClick(project)}
  >
    <div className="relative h-56 overflow-hidden">
      <img 
        src={project.image} 
        alt={project.title}
        loading="lazy"
        decoding="async"
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
      
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

    <div className="p-5">
      <p className="text-sm line-clamp-2 mb-4 text-slate-400">
        {project.shortDescription}
      </p>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {project.tags.slice(0, 3).map((tag: string, idx: number) => (
          <span key={idx} className="px-2 py-1 rounded text-xs font-medium bg-slate-800 text-slate-300">
            {tag}
          </span>
        ))}
      </div>
      
      <div className="flex items-center justify-between pt-3 border-t border-slate-800">
        <span className="text-sm font-medium flex items-center gap-2 group-hover:gap-3 transition-all text-white">
          View Case Study <ArrowRight size={14} className="text-cyan-500" />
        </span>
      </div>
    </div>
  </motion.div>
);

// Client Logos Section
export const ClientLogosSection = ({ logos }: { logos: Array<{ name: string; src: string }> }) => (
    <section className="container mx-auto px-4 sm:px-6 py-16 sm:py-20">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
            className="text-center"
        >
            <h2 className="text-sm font-bold uppercase tracking-widest mb-8 text-slate-500">
                Trusted by Forward-Thinking Companies
            </h2>

            <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8 md:gap-x-20 px-4">
                {logos.map((logo, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="group relative"
                    >
                      <img
                        src={logo.src}
                        alt={logo.name}
                        loading="lazy"
                        decoding="async"
                        className="h-12 sm:h-16 md:h-20 w-auto object-contain transition-all duration-300 opacity-70 hover:opacity-100 hover:scale-110"
                        onError={(e: any) => { 
                            e.target.onerror = null; 
                            e.target.src="https://placehold.co/120x60/A0A0A0/FFFFFF?text=Client";
                        }}
                      />
                    </motion.div>
                ))}
            </div>
        </motion.div>
    </section>
);

// Social Media Logo Component
export const SocialMediaLogo = ({ social, size = 'w-8 h-8' }: { social: { href: string; label: string; src: string }; size?: string }) => {
  return (
    <a
      href={social.href}
      target="_blank"
      rel="noopener noreferrer"
      className={`p-0 transition-all duration-300 hover:scale-110 flex-shrink-0 ${size} rounded-full overflow-hidden shadow-sm hover:shadow-md border border-slate-700 hover:border-cyan-500`}
      aria-label={social.label}
    >
      <img 
        src={social.src} 
        alt={social.label}
        loading="lazy"
        decoding="async"
        className="w-full h-full object-cover"
        onError={(e: any) => { 
            e.target.onerror = null; 
            e.target.src="https://placehold.co/32x32/FF0000/FFFFFF?text=S";
        }}
      />
    </a>
  );
};

