"use client";

import { motion } from "framer-motion";
import { useState } from "react";

// --- UTILS ---
// @ts-ignore
const Card = ({ children, className = "" }) => (
  <div className={`rounded-2xl border border-slate-800 bg-slate-900/80 backdrop-blur-sm ${className}`}>
    {children}
  </div>
);

// --- MODAL COMPONENT ---
// @ts-ignore
export const Modal = ({ isOpen, onClose, children, title }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={onClose} />
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative z-10 w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl"
      >
        <div className="flex items-center justify-between p-6 border-b border-slate-800 bg-slate-900/80">
          <h3 className="text-xl font-bold text-white">{title}</h3>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-white">✕</button>
        </div>
        <div className="p-6 overflow-y-auto">{children}</div>
      </motion.div>
    </div>
  );
};

// --- PORTFOLIO SECTION ---
export const PortfolioSection = ({ data }: { data: any[] }) => {
  const [selected, setSelected] = useState<any>(null);

  return (
    <section id="portfolio" className="py-20 bg-black text-white">
      <div className="container mx-auto px-4">
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Featured Work</h2>
          <p className="text-slate-400">A selection of our recent projects.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {data.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              onClick={() => setSelected(project)}
              className="rounded-2xl overflow-hidden cursor-pointer group border border-slate-800 bg-slate-900/60 hover:border-slate-600 transition-all"
            >
              <div className="relative h-56 overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                  onError={(e: any) => e.target.src = "https://placehold.co/600x400/1e293b/FFF?text=Project"}
                />
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold bg-black/60 text-white border border-white/10">
                  {project.category}
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-xl text-white mb-1">{project.title}</h3>
                <p className="text-sm text-slate-400 line-clamp-2 mb-4">{project.shortDescription}</p>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.slice(0, 3).map((tag: string, i: number) => (
                    <span key={i} className="px-2 py-1 rounded text-xs font-medium bg-slate-800 text-slate-300">{tag}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Modal Detail */}
      <Modal isOpen={!!selected} onClose={() => setSelected(null)} title={selected?.title}>
        {selected && (
          <div className="space-y-6 text-slate-300">
             <img src={selected.image} className="w-full h-64 object-cover rounded-xl" />
             <p className="text-lg">{selected.description}</p>
             <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-slate-800/50 rounded-xl">
                   <h4 className="font-bold text-white mb-2">Challenges</h4>
                   <ul className="list-disc list-inside text-sm space-y-1">
                      {selected.challenges.map((c:string, i:number) => <li key={i}>{c}</li>)}
                   </ul>
                </div>
                <div className="p-4 bg-slate-800/50 rounded-xl">
                   <h4 className="font-bold text-white mb-2">Solutions</h4>
                   <ul className="list-disc list-inside text-sm space-y-1">
                      {selected.solutions.map((c:string, i:number) => <li key={i}>{c}</li>)}
                   </ul>
                </div>
             </div>
          </div>
        )}
      </Modal>
    </section>
  );
};

// --- TEAM SECTION ---
export const TeamSection = ({ data }: { data: any[] }) => (
  <section id="team" className="py-20 bg-slate-900/30">
    <div className="container mx-auto px-4">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-3xl font-bold text-white mb-4">Meet Our Leadership</h2>
        <p className="text-slate-400">The creative minds behind Swakarsa Digital.</p>
      </div>
      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {data.map((member, idx) => (
          <motion.div
            key={member.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.2 }}
            className="rounded-2xl p-6 bg-slate-900/60 border border-slate-800 backdrop-blur-sm flex gap-6 items-center"
          >
            <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-cyan-500/30 flex-shrink-0">
              <img src={member.image} alt={member.name} className="w-full h-full object-cover" 
              onError={(e: any) => e.target.src = "https://placehold.co/100x100/333/FFF?text=User"}/>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">{member.name}</h3>
              <p className="text-cyan-400 font-medium">{member.role}</p>
              <p className="text-sm text-slate-400 mt-2">{member.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

// --- SKILLS/SERVICES SECTION ---
export const ServicesSection = ({ data }: { data: any[] }) => {
  const [selected, setSelected] = useState<any>(null);

  return (
    <section id="services" className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-white text-center mb-16">Core Capabilities</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.map((skill, idx) => (
             <motion.div
                key={skill.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                onClick={() => setSelected(skill)}
                className="rounded-2xl overflow-hidden cursor-pointer group bg-slate-900/60 border border-slate-800 hover:border-cyan-500/50 transition-all"
             >
                <div className="h-48 overflow-hidden relative">
                   <img src={skill.image} alt={skill.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform" 
                   onError={(e: any) => e.target.src = "https://placehold.co/600x400/1e293b/FFF?text=Service"}/>
                   <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold bg-slate-900/80 text-white border border-slate-700 backdrop-blur-md">
                      {skill.category}
                   </div>
                </div>
                <div className="p-6">
                   <h3 className="font-bold text-xl text-white mb-2">{skill.title}</h3>
                   <p className="text-sm text-slate-400 line-clamp-2">{skill.shortDescription}</p>
                </div>
             </motion.div>
          ))}
        </div>
      </div>
      
      <Modal isOpen={!!selected} onClose={() => setSelected(null)} title={selected?.title}>
          {selected && (
             <div className="space-y-4 text-slate-300">
                <img src={selected.image} className="w-full h-64 object-cover rounded-xl" />
                <p>{selected.description}</p>
                <div className="flex flex-wrap gap-2 mt-4">
                   {selected.techStack.map((tech: string, i:number) => (
                      <span key={i} className="px-2 py-1 bg-cyan-500/10 text-cyan-300 rounded text-xs">{tech}</span>
                   ))}
                </div>
             </div>
          )}
      </Modal>
    </section>
  );
};

// --- FOOTER ---
export const Footer = () => (
  <footer className="pt-24 pb-12 bg-slate-950 border-t border-slate-800 text-white">
    <div className="container mx-auto px-4 text-center">
      <h2 className="text-4xl font-extrabold mb-6">Ready to Level Up?</h2>
      <p className="text-xl text-slate-400 mb-10">Consult your website & marketing needs with us.</p>
      <div className="flex justify-center gap-4 mb-12">
        <a href="https://wa.me/6282279513201" className="px-8 py-4 bg-gradient-to-r from-cyan-600 to-teal-600 rounded-xl font-bold shadow-lg shadow-cyan-500/25 hover:from-cyan-500 hover:to-teal-500 transition">Book Consultation</a>
      </div>
      <div className="h-px w-full bg-slate-800 my-12"></div>
      <p className="text-slate-500">© {new Date().getFullYear()} Swakarsa Digital. All Rights Reserved.</p>
    </div>
  </footer>
);