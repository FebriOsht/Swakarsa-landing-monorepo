"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronRight, X, Sparkles, Layers } from "lucide-react";
import Image from "next/image";

// Data dummy statis (Fallback jika DB kosong)
const defaultSkills = [
    {
      id: 1,
      title: "Inventory Management",
      category: "Operational System",
      image: "/images/Manajemen Inventori.jpg",
      shortDescription: "Automatic stock recording system.",
      description: "We develop integrated inventory management systems to monitor stock items, in-out flow, and stock demand predictions. This system helps businesses reduce excess stock, prevent shortages, and optimize storage space.",
      features: ["Real-time stock recording", "Auto alerts for low stock"],
      useCases: ["Retail stores", "Warehouse management"],
      techStack: ["Next.js", "PostgreSQL"],
      tags: ["System", "Stock"]
    },
    {
      id: 2,
      title: "Point of Sale (POS)",
      category: "Transaction System",
      image: "/images/Point of Sale (POS).jpg",
      shortDescription: "Modern cashier system.",
      description: "POS system that supports various types of retail, restaurant, or service-based business transactions with digital payment integration.",
      features: ["Multi-payment methods", "Offline mode"],
      useCases: ["Restaurants", "Retail shops"],
      techStack: ["React", "Node.js"],
      tags: ["POS", "Payment"]
    },
    {
      id: 3,
      title: "Web Scraping",
      category: "Data Collection",
      image: "/images/Web Scraping & Data Aggregation.jpg",
      shortDescription: "Automated data extraction.",
      description: "Web scraping service that helps you collect product price data, competitor reviews, latest content, or market information automatically.",
      features: ["Scheduled scraping", "Data export (CSV/JSON)"],
      useCases: ["Market research", "Price monitoring"],
      techStack: ["Python", "Puppeteer"],
      tags: ["Data", "Automation"]
    }
];

const Modal = ({ isOpen, onClose, children, title }: any) => {
  if (!isOpen) return null;
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
          className="relative z-10 w-full max-w-4xl bg-slate-900 border border-slate-700 rounded-3xl max-h-[90vh] overflow-y-auto custom-scrollbar flex flex-col shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="sticky top-0 z-20 flex items-center justify-between p-6 border-b border-slate-800 bg-slate-900/80 backdrop-blur-xl">
            <h3 className="text-xl font-bold text-white">{title}</h3>
            <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white">
              <X size={24} />
            </button>
          </div>
          <div className="p-6 text-white">
            {children}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const SkillCard = ({ skill, onClick }: any) => {
  const [imgSrc, setImgSrc] = useState(skill.image);

  return (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        whileHover={{ y: -8, scale: 1.02 }}
        className="rounded-2xl overflow-hidden cursor-pointer group relative flex flex-col h-full bg-slate-900/60 border border-slate-800 hover:border-indigo-500/50 transition-all duration-300"
        onClick={() => onClick(skill)}
    >
        <div className="relative h-48 w-full overflow-hidden">
        <Image 
            src={imgSrc || "/images/placeholder.jpg"} 
            alt={skill.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            onError={() => setImgSrc("https://placehold.co/600x400/1e293b/ffffff?text=Service")}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold bg-slate-900/80 text-white border border-slate-700 backdrop-blur-md">
            {skill.category}
        </div>
        </div>
        <div className="p-6 flex flex-col flex-grow text-left">
        <h3 className="font-bold text-xl mb-2 text-white group-hover:text-indigo-400 transition-colors">
            {skill.title}
        </h3>
        <p className="text-sm text-slate-400 line-clamp-2 mb-6 flex-grow">
            {skill.shortDescription}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-4">
            {skill.tags && skill.tags.slice(0,3).map((tag:string, idx:number) => (
                <span key={idx} className="px-2 py-1 text-xs rounded bg-slate-800 text-slate-300">{tag}</span>
            ))}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-slate-800 mt-auto">
            <span className="text-sm font-semibold text-indigo-400 flex items-center gap-1">
            Learn More <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </span>
        </div>
        </div>
    </motion.div>
  );
};

export default function ServicesSection({ skills }: { skills?: any[] }) {
  // Use props 'skills' or fallback to 'defaultSkills'
  const items = (skills && skills.length > 0) ? skills : defaultSkills; 
  const [selectedSkill, setSelectedSkill] = useState<any>(null);

  return (
    <section id="services" className="container mx-auto px-4 sm:px-6 py-20 sm:py-32 bg-slate-950">
        <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-white">Core Capabilities</h2>
            <p className="text-lg text-slate-400">End-to-end digital services for modern business needs.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {items.map((skill, index) => (
                <SkillCard key={skill.id || index} skill={skill} onClick={setSelectedSkill} />
            ))}
        </div>

        <Modal isOpen={!!selectedSkill} onClose={() => setSelectedSkill(null)} title={selectedSkill?.title}>
            {selectedSkill && (
                <div className="space-y-8">
                    <div className="flex flex-col md:flex-row gap-8">
                        <div className="relative w-full md:w-1/2 aspect-video rounded-xl overflow-hidden shadow-lg">
                            <Image 
                                src={selectedSkill.image || "/images/placeholder.jpg"}
                                alt={selectedSkill.title} 
                                fill 
                                className="object-cover"
                                onError={(e: any) => { e.target.src="https://placehold.co/600x400/1e293b/ffffff?text=Service" }}
                            />
                        </div>
                        <div className="w-full md:w-1/2 space-y-4">
                            <h2 className="text-2xl font-bold text-white">{selectedSkill.title}</h2>
                            <p className="text-slate-300 leading-relaxed">{selectedSkill.description}</p>
                            
                            <div className="pt-4">
                                <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">Tech Stack</h4>
                                <div className="flex flex-wrap gap-2">
                                    {selectedSkill.techStack?.map((tech: string, i: number) => (
                                        <span key={i} className="px-2 py-1 bg-indigo-500/20 text-indigo-300 rounded text-xs border border-indigo-500/30">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="h-px bg-slate-800 w-full" />
                    
                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <h4 className="flex items-center gap-2 font-bold text-white mb-4">
                                <Sparkles className="text-yellow-500" size={18} /> Features
                            </h4>
                            <ul className="space-y-2">
                                {selectedSkill.features?.map((f: string, i: number) => (
                                    <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                                        <ChevronRight size={14} className="mt-1 text-green-500" /> {f}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h4 className="flex items-center gap-2 font-bold text-white mb-4">
                                <Layers className="text-indigo-500" size={18} /> Use Cases
                            </h4>
                             <div className="flex flex-wrap gap-2">
                                {selectedSkill.useCases?.map((u: string, i: number) => (
                                    <span key={i} className="px-3 py-2 bg-slate-800 rounded-lg text-sm text-slate-300 border border-slate-700">
                                        {u}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </Modal>
    </section>
  );
}