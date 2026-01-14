"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { X, FileText, Loader2 } from "lucide-react";

// ATS-Friendly CV Data (No photos, addresses, or sensitive info)
const teamCVData: Record<string, any> = {
  leadership: {
    title: "Leadership & Strategy Team",
    description: "Executive profiles leading our strategic direction and business operations.",
    members: [
      {
        id: "lead-1",
        name: "Yonathan Tanuwijaya",
        role: "Managing Director / Full Stack Developer",
        cvPath: "/cv/YONATHAN_TANUWIJAYA_ATS.txt",
        experienceYears: "6+ Years"
      },
      {
        id: "lead-2",
        name: "Jethro Elijah Lim",
        role: "Marketing Director / Digital Marketing Technologist",
        cvPath: "/cv/JETHRO_ELIJAH_LIM_ATS.txt",
        experienceYears: "5+ Years"
      }
    ]
  },
  development: {
    title: "Development Team",
    description: "Full-stack engineers and specialists building scalable digital solutions.",
    members: [
      {
        id: "dev-1",
        name: "Ahmad Musyaari Rasyid",
        role: "Graphic Designer",
        cvPath: "/cv/AHMAD_MUSYAARI_RASYID_ATS.txt",
        experienceYears: "5+ Years"
      },
      {
        id: "dev-2",
        name: "Reynardi Gunawan",
        role: "IT / Social Media / Management Professional",
        cvPath: "/cv/REYNARDI_GUNAWAN_ATS.txt",
        experienceYears: "6+ Years"
      },
      {
        id: "dev-3",
        name: "M. Taufiq Hidayat",
        role: "Graphic Designer / Visual Communication Specialist",
        cvPath: "/cv/TAUFIQ_HIDAYAT_ATS.txt",
        experienceYears: "4+ Years"
      },
      {
        id: "dev-4",
        name: "Richie Ardianto",
        role: "Social Media Specialist / Digital Marketer",
        cvPath: "/cv/RICHIE_ARDIANTO_ATS.txt",
        experienceYears: "4+ Years"
      },
      {
        id: "dev-5",
        name: "Asep Saefuddin",
        role: "Fullstack Software Developer",
        cvPath: "/cv/ASEP_SAEFUDDIN_ATS.txt",
        experienceYears: "3+ Years"
      },
      {
        id: "dev-6",
        name: "Gregorio Yansen",
        role: "Event Management Professional",
        cvPath: "/cv/GREGORIO_YANSEN_ATS.txt",
        experienceYears: "2+ Years"
      }
    ]
  },
  marketing: {
    title: "Digital Marketing Team",
    description: "Experts in ads strategy, SEO, and campaign optimization.",
    members: [
      {
        id: "mkt-1",
        name: "Ahmad Musyaari Rasyid",
        role: "Graphic Designer",
        cvPath: "/cv/AHMAD_MUSYAARI_RASYID_ATS.txt",
        experienceYears: "5+ Years"
      },
      {
        id: "mkt-2",
        name: "Richie Ardianto",
        role: "Social Media Specialist / Digital Marketer",
        cvPath: "/cv/RICHIE_ARDIANTO_ATS.txt",
        experienceYears: "4+ Years"
      },
      {
        id: "mkt-3",
        name: "M. Taufiq Hidayat",
        role: "Graphic Designer / Visual Communication Specialist",
        cvPath: "/cv/TAUFIQ_HIDAYAT_ATS.txt",
        experienceYears: "4+ Years"
      },
      {
        id: "mkt-4",
        name: "Reynardi Gunawan",
        role: "IT / Social Media / Management Professional",
        cvPath: "/cv/REYNARDI_GUNAWAN_ATS.txt",
        experienceYears: "6+ Years"
      },
      {
        id: "mkt-5",
        name: "Gregorio Yansen",
        role: "Event Management Professional",
        cvPath: "/cv/GREGORIO_YANSEN_ATS.txt",
        experienceYears: "2+ Years"
      }
    ]
  }
};

// CV Modal Component
const CVModal = ({ member, isOpen, onClose }: any) => {
  const [cvContent, setCvContent] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen && member?.cvPath) {
      setIsLoading(true);
      fetch(member.cvPath)
        .then(res => res.text())
        .then(text => {
          setCvContent(text);
          setIsLoading(false);
        })
        .catch(err => {
          console.error('Error loading CV:', err);
          setCvContent("Error loading CV. Please try again later.");
          setIsLoading(false);
        });
    } else {
      setCvContent("");
    }
  }, [isOpen, member]);

  if (!isOpen || !member) return null;

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
          className="relative z-10 w-full max-w-3xl rounded-3xl max-h-[90vh] overflow-hidden flex flex-col bg-slate-900 border border-slate-700 shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="sticky top-0 z-20 flex items-center justify-between p-6 border-b border-slate-800 bg-slate-900/80 backdrop-blur-xl">
            <div>
              <h3 className="text-xl font-bold text-white">
                {member.name}
              </h3>
              <p className="text-sm text-slate-400">
                {member.role}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full transition-colors hover:bg-slate-800 text-slate-400 hover:text-white"
            >
              <X size={24} />
            </button>
          </div>
          
          <div className="p-6 overflow-y-auto custom-scrollbar">
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="animate-spin text-cyan-500" size={32} />
              </div>
            ) : (
              <div className="prose prose-invert max-w-none">
                <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-slate-300">
                  {cvContent || "CV content not available"}
                </pre>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// Team Member Card
const TeamMemberCard = ({ member, index, onClick }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.4, delay: index * 0.1 }}
    onClick={onClick}
    className="group relative bg-white/5 border border-white/10 hover:border-cyan-500/50 rounded-2xl p-6 transition-all duration-300 hover:bg-white/10 hover:-translate-y-1 cursor-pointer"
  >
    <div className="flex justify-between items-start mb-4">
      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-teal-500/20 flex items-center justify-center border border-cyan-500/30 text-cyan-400 font-bold text-xl">
        {member.name.charAt(0)}
      </div>
      <span className="text-xs font-mono px-2 py-1 rounded text-slate-500 bg-black/40">
        {member.experienceYears}
      </span>
    </div>

    <h3 className="text-xl font-bold mb-1 group-hover:text-cyan-400 transition-colors text-white">
      {member.name}
    </h3>
    <p className="text-sm mb-4 text-slate-400">{member.role}</p>

    <div className="pt-4 border-t border-white/5">
      <div className="flex items-center justify-between w-full p-3 rounded-xl bg-cyan-600/10 text-cyan-300 hover:bg-cyan-600 hover:text-white transition-all group/btn">
        <span className="flex items-center gap-2 font-medium">
          <FileText size={18} />
          View CV
        </span>
      </div>
    </div>
  </motion.div>
);

export default function TeamPage() {
  const [selectedMember, setSelectedMember] = useState<any>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("leadership");

  const handleMemberClick = (member: any) => {
    setSelectedMember(member);
  };

  const closeModal = () => {
    setSelectedMember(null);
  };

  const categories = Object.keys(teamCVData);

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Header */}
      <div className="bg-slate-900/90 backdrop-blur-xl border-b border-cyan-500/10 sticky top-0 z-40">
        <div className="container mx-auto px-4 sm:px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold mb-2 text-white">
                Our Team
              </h1>
              <p className="text-slate-400">
                Meet the talented professionals behind Swakarsa Digital.
              </p>
            </div>
            <a 
              href="/"
              className="px-4 py-2 rounded-xl font-medium transition-colors bg-slate-800 hover:bg-slate-700 text-white hover:text-cyan-400"
            >
              Back to Home
            </a>
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="container mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-wrap gap-3 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-xl font-medium transition-all
                ${selectedCategory === category
                  ? "bg-gradient-to-r from-cyan-600 to-teal-600 text-white shadow-lg shadow-cyan-500/30"
                  : "bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-cyan-400"
                }`}
            >
              {teamCVData[category].title}
            </button>
          ))}
        </div>

        {/* Team Members Grid */}
        <div>
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-2 text-white">
              {teamCVData[selectedCategory].title}
            </h2>
            <p className="text-slate-400">
              {teamCVData[selectedCategory].description}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teamCVData[selectedCategory].members.map((member: any, index: number) => (
              <TeamMemberCard
                key={member.id}
                member={member}
                index={index}
                onClick={() => handleMemberClick(member)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* CV Modal */}
      <CVModal 
        member={selectedMember} 
        isOpen={!!selectedMember} 
        onClose={closeModal}
      />
    </div>
  );
}
