"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Users, Code, Palette, BarChart, Star, Globe, MessageSquare, ChevronRight, Zap, Clock, CheckCircle, Users as UsersIcon } from "lucide-react";
import { useState, useMemo, memo, useEffect } from "react";

// ================= OPTIMIZED SUB-COMPONENTS =================

// Memoized Background Component to prevent unnecessary re-renders
const BackgroundEffects = memo(() => (
  <div className="fixed pointer-events-none inset-0 overflow-hidden z-0">
    <motion.div
      animate={{
        scale: [1, 1.1, 1],
        opacity: [0.2, 0.3, 0.2], // Reduced opacity for performance
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
      style={{ willChange: "transform, opacity" }} // Hardware acceleration hint
    />

    <motion.div
      animate={{
        scale: [1.1, 1, 1.1],
        opacity: [0.1, 0.2, 0.1], // Reduced opacity
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

// Loading Screen Component
const LoadingScreen = () => (
  <motion.div
    initial={{ opacity: 1 }}
    exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
    className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black"
  >
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative flex items-center justify-center"
    >
        <motion.div 
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute w-32 h-32 bg-indigo-600/30 rounded-full blur-2xl"
        />
        
        <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="w-24 h-24 rounded-full border border-t-indigo-500 border-r-purple-500 border-b-transparent border-l-transparent opacity-80"
        />
        <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            className="absolute w-16 h-16 rounded-full border border-t-transparent border-r-transparent border-b-cyan-500 border-l-white opacity-60"
        />
        
        <span className="absolute text-xl font-bold text-white tracking-widest">SD</span>
    </motion.div>
    
    <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-8 flex flex-col items-center gap-2"
    >
        <p className="text-sm font-medium text-slate-400 tracking-[0.3em] uppercase">Loading</p>
        <div className="flex gap-1">
            {[0, 1, 2].map((i) => (
                <motion.div
                    key={i}
                    animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                    className="w-1.5 h-1.5 rounded-full bg-indigo-500"
                />
            ))}
        </div>
    </motion.div>
  </motion.div>
);

const TeamPage = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  // Removed hoveredCard state to prevent re-renders on hover
  const [isLoading, setIsLoading] = useState(true);

  // Department/Team data
  const departments = useMemo(() => [
    {
      id: "leadership",
      name: "Leadership & Strategy",
      slug: "leadership",
      description: "Leadership team that manages business strategy and company direction.",
      image: "/team/Tim leadership.jpg",
      memberCount: 5,
      projectsCompleted: 205,
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-500/20",
      hoverBorder: "group-hover:border-purple-500/50",
      skills: ["Business Strategy", "Project Management", "Team Leadership"],
      featured: true,
      members: [
        { name: "Chief Executive Officer", role: "Business Strategy & Operations" },
        { name: "Strategic Director", role: "Marketing & Business Development" }
      ]
    },
    {
      id: "development",
      name: "Development Team",
      slug: "development",
      description: "Expert developers in building modern and scalable web applications.",
      image: "/team/Tim developer.jpg",
      memberCount: +30,
      projectsCompleted: 190,
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/20",
      hoverBorder: "group-hover:border-blue-500/50",
      skills: ["Web Development", "Mobile Apps", "Backend Systems", "API Integration"],
      featured: true,
      members: [
        { name: "Frontend Specialist", role: "React/Next.js Expert" },
        { name: "Backend Engineer", role: "Node.js & Database" },
        { name: "Full Stack Developer", role: "End-to-end Solutions" }
      ]
    },
    {
      id: "design",
      name: "UI/UX Design Team",
      slug: "design",
      description: "Design team focused on user experience and attractive visual design.",
      image: "/team/Tim designer.jpg",
      memberCount: +20,
      projectsCompleted: 120,
      color: "from-pink-500 to-rose-500",
      bgColor: "bg-pink-500/10",
      borderColor: "border-pink-500/20",
      hoverBorder: "group-hover:border-pink-500/50",
      skills: ["UI Design", "UX Research", "Prototyping", "Design Systems"],
      featured: false,
      members: [
        { name: "UI Designer", role: "Visual Design Expert" },
        { name: "UX Researcher", role: "User Experience Analyst" }
      ]
    },
    {
      id: "marketing",
      name: "Digital Marketing",
      slug: "marketing",
      description: "Marketing team expert in digital strategy and campaign optimization.",
      image: "/team/Tim marketing.jpg",
      memberCount: +20,
      projectsCompleted: 150,
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-500/10",
      borderColor: "border-green-500/20",
      hoverBorder: "group-hover:border-green-500/50",
      skills: ["Digital Ads", "SEO", "Content Strategy", "Social Media"],
      featured: false,
      members: [
        { name: "Digital Marketer", role: "Campaign Management" },
        { name: "SEO Specialist", role: "Search Engine Optimization" }
      ]
    },
    {
      id: "content",
      name: "Content & Copywriting",
      slug: "content",
      description: "Content creator and copywriter team that creates engaging content.",
      image: "/team/Tim content creator.jpg",
      memberCount: +10,
      projectsCompleted: 80,
      color: "from-orange-500 to-amber-500",
      bgColor: "bg-orange-500/10",
      borderColor: "border-orange-500/20",
      hoverBorder: "group-hover:border-orange-500/50",
      skills: ["Content Writing", "Copywriting", "Social Media", "Blog Management"],
      featured: false,
      members: [
        { name: "Content Writer", role: "Copywriting Specialist" }
      ]
    },
    {
      id: "seo",
      name: "SEO & Analytics",
      slug: "seo",
      description: "SEO and analytics experts focused on optimization and data-driven decisions.",
      image: "/team/Tim seo.jpg",
      memberCount: +10,
      projectsCompleted: 95,
      color: "from-indigo-500 to-violet-500",
      bgColor: "bg-indigo-500/10",
      borderColor: "border-indigo-500/20",
      hoverBorder: "group-hover:border-indigo-500/50",
      skills: ["SEO Optimization", "Data Analytics", "Performance Tracking", "Reporting"],
      featured: false,
      members: [
        { name: "SEO Analyst", role: "Analytics & Optimization" }
      ]
    },
  ], []);

  // Filter categories
  const filters = useMemo(() => [
    { id: "all", label: "All Teams", count: departments.length },
    { id: "featured", label: "Featured", count: departments.filter(d => d.featured).length },
    { id: "technical", label: "Technical", count: departments.filter(d => d.id === "development" || d.id === "seo").length },
    { id: "creative", label: "Creative", count: departments.filter(d => d.id === "design" || d.id === "content").length },
  ], [departments]);

  // Filtered departments
  const filteredDepartments = useMemo(() => {
    if (activeFilter === "all") return departments;
    if (activeFilter === "featured") return departments.filter(d => d.featured);
    if (activeFilter === "technical") return departments.filter(d => d.id === "development" || d.id === "seo");
    return departments.filter(d => d.id === "design" || d.id === "content");
  }, [activeFilter, departments]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500); // Slightly faster loading
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-slate-950 to-black text-white overflow-x-hidden">
      <AnimatePresence>
        {isLoading && <LoadingScreen />}
      </AnimatePresence>

      <BackgroundEffects />

      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-black/40 backdrop-blur-md border-b border-slate-800/50">
        <div className="container mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <a href="/" className="flex items-center gap-3 group">
              <div className="p-2 rounded-lg bg-slate-800/50 group-hover:bg-slate-700/50 transition-colors">
                <ArrowLeft size={20} />
              </div>
              <div>
                <p className="text-sm text-slate-400">Back to</p>
                <p className="font-semibold group-hover:text-indigo-400 transition-colors">Home</p>
              </div>
            </a>

            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800/50">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                <span className="text-sm">Teams Available</span>
              </div>
              <a
                href="/contact"
                className="px-6 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 transition-all font-semibold"
              >
                Hire a Team
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-16 sm:py-20 md:py-28 z-10">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/50 border border-slate-700/50 mb-6">
              <Users size={16} className="text-indigo-400" />
              <span className="text-sm font-medium">Specialized Teams</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight">
              <span className="bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                Our Expert
              </span>
              <br />
              <span className="bg-gradient-to-r from-indigo-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Teams
              </span>
            </h1>
            
            <p className="mt-6 text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto">
              Each team at Swakarsa Digital consists of specialized experts working together
              to deliver the best solutions for your digital needs.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="sticky top-20 z-40 py-4 bg-black/30 backdrop-blur-md border-y border-slate-800/30">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <h2 className="text-xl font-bold text-white">Filter Teams</h2>
            <div className="flex flex-wrap gap-2">
              {filters.map((filter) => (
                <button
                  key={`filter-${filter.id}`}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    activeFilter === filter.id
                      ? "bg-gradient-to-r from-indigo-500 to-cyan-500 text-white shadow-lg shadow-indigo-500/20"
                      : "bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 hover:text-white"
                  }`}
                >
                  {filter.label}
                  <span className="ml-2 px-1.5 py-0.5 rounded text-xs bg-slate-900/50">
                    {filter.count}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Teams Grid - OPTIMIZED: Removed React Hover State */}
      <section className="py-16 sm:py-20 z-10 relative">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filteredDepartments.map((team, index) => (
              <motion.div
                key={`team-${team.id}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                // Using group hover for performance instead of JS state
                className={`group relative overflow-hidden rounded-2xl border ${team.borderColor} ${team.bgColor} backdrop-blur-sm
                  ${team.featured ? 'ring-2 ring-indigo-500/30' : ''}
                  transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-indigo-500/10 cursor-pointer transform-gpu`}
              >
                {/* Featured Badge */}
                {team.featured && (
                  <div className="absolute top-4 left-4 z-10">
                    <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-xs font-semibold">
                      <Star size={12} />
                      Featured Team
                    </div>
                  </div>
                )}

                {/* Team Image */}
                <div className="relative h-48 overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
                    <img 
                      src={team.image} 
                      alt={team.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                      decoding="async"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        target.parentElement!.innerHTML = `
                          <div class="w-full h-full flex items-center justify-center">
                            <div class="text-6xl">
                              ${team.id === "leadership" ? "👑" : 
                                team.id === "development" ? "💻" :
                                team.id === "design" ? "🎨" :
                                team.id === "marketing" ? "📈" :
                                team.id === "content" ? "✍️" : "📊"}
                            </div>
                          </div>
                        `;
                      }}
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* Type Badge */}
                  <div className="absolute bottom-4 left-4 z-10">
                    <div className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-sm text-xs font-medium">
                      {team.memberCount} {team.memberCount > 1 ? 'Members' : 'Member'}
                    </div>
                  </div>
                </div>

                {/* Team Content */}
                <div className="p-6">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-indigo-400 transition-colors">
                        {team.name}
                      </h3>
                      <p className="text-slate-300 text-sm line-clamp-2">
                        {team.description}
                      </p>
                    </div>
                    {team.featured && (
                      <div className="flex-shrink-0">
                        <Star size={18} className="text-yellow-500 fill-yellow-500" />
                      </div>
                    )}
                  </div>

                  {/* Team Stats */}
                  <div className="grid grid-cols-3 gap-2 mb-6">
                    <div className="text-center p-2 rounded-lg bg-black/20 border border-slate-800/30">
                      <div className="text-lg font-bold text-white">{team.projectsCompleted}+</div>
                      <div className="text-xs text-slate-400">Projects</div>
                    </div>
                    <div className="text-center p-2 rounded-lg bg-black/20 border border-slate-800/30">
                      <div className="text-lg font-bold text-white">{team.memberCount}</div>
                      <div className="text-xs text-slate-400">Members</div>
                    </div>
                    <div className="text-center p-2 rounded-lg bg-black/20 border border-slate-800/30">
                      <div className="text-lg font-bold text-white">95%</div>
                      <div className="text-xs text-slate-400">Success</div>
                    </div>
                  </div>

                  {/* Team Members */}
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-slate-400 mb-2 flex items-center gap-2">
                      <UsersIcon size={14} />
                      Team Members
                    </h4>
                    <div className="space-y-2">
                      {team.members.slice(0, 2).map((member, idx) => (
                        <div key={idx} className="flex items-center gap-2 p-2 rounded-lg bg-slate-800/30">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center">
                            <span className="text-xs font-bold">
                              {member.name.charAt(0)}
                            </span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium text-white truncate">{member.name}</div>
                            <div className="text-xs text-slate-400 truncate">{member.role}</div>
                          </div>
                        </div>
                      ))}
                      {team.members.length > 2 && (
                        <div className="text-center text-sm text-slate-400 py-1">
                          +{team.members.length - 2} more members
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Team Skills */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-slate-400 mb-2">Specializations</h4>
                    <div className="flex flex-wrap gap-1">
                      {team.skills.slice(0, 3).map((skill, index) => (
                        <span
                          key={`${team.id}-skill-${index}`}
                          className="px-2 py-1 rounded-full bg-slate-800/50 text-xs text-slate-300 border border-slate-700/50"
                        >
                          {skill}
                        </span>
                      ))}
                      {team.skills.length > 3 && (
                        <span className="px-2 py-1 rounded-full bg-slate-800/50 text-xs text-slate-400 border border-slate-700/50">
                          +{team.skills.length - 3}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="flex items-center gap-4 pt-4 border-t border-slate-800/50">
                    <a
                      href={`/team/${team.slug}`}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-slate-800/50 group-hover:bg-slate-700/50 text-white transition-colors group/link"
                    >
                      <span className="font-medium">View Team Details</span>
                      <ChevronRight 
                        size={16} 
                        className="group-hover:translate-x-1 transition-transform" 
                      />
                    </a>
                  </div>
                </div>

                {/* Hover Gradient Effect - Pure CSS */}
                <div className={`absolute inset-0 bg-gradient-to-tr ${team.color.replace('from-', 'from-').replace('to-', 'to-')}/5 via-transparent to-transparent
                  opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`}
                />
              </motion.div>
            ))}
          </div>

          {/* Empty State */}
          {filteredDepartments.length === 0 && (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">👥</div>
              <h3 className="text-2xl font-bold text-white mb-2">No teams found</h3>
              <p className="text-slate-400">Try selecting a different filter</p>
            </div>
          )}

          {/* How We Work Section */}
          <div className="mt-20">
            <div className="rounded-3xl overflow-hidden border border-slate-800/50 bg-gradient-to-br from-slate-900/40 to-black/40">
              <div className="md:flex">
                <div className="md:w-2/3 p-8 md:p-12">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600">
                      <Zap size={24} />
                    </div>
                    <h2 className="text-3xl font-bold text-white">
                      How Our Teams Work
                    </h2>
                  </div>
                  
                  <p className="text-slate-300 mb-8">
                    Each project is handled by specialist teams working collaboratively.
                    We use agile methodology to ensure the best results and on-time delivery.
                  </p>
                  
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                      { icon: <Users size={20} />, label: "Dedicated Team", value: "100%", desc: "Dedicated team for your project" },
                      { icon: <Clock size={20} />, label: "Agile Process", value: "Sprint Based", desc: "Phased development" },
                      { icon: <MessageSquare size={20} />, label: "Communication", value: "Daily Updates", desc: "Daily progress updates" },
                      { icon: <CheckCircle size={20} />, label: "Quality", value: "Multi Review", desc: "Multiple quality checks" },
                    ].map((item, index) => (
                      <div key={index} className="p-4 rounded-lg bg-slate-800/30 border border-slate-700/50">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="p-2 rounded-lg bg-indigo-500/20 text-indigo-400">
                            {item.icon}
                          </div>
                          <div>
                            <div className="text-lg font-bold text-white">{item.value}</div>
                            <div className="text-sm text-slate-400">{item.label}</div>
                          </div>
                        </div>
                        <p className="text-xs text-slate-500">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="md:w-1/3 p-8 md:p-12 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border-t md:border-t-0 md:border-l border-slate-800/50">
                  <div className="h-full flex flex-col justify-center">
                    <h3 className="text-xl font-bold text-white mb-4">Need a Specific Team?</h3>
                    <p className="text-slate-300 mb-6">
                      Need a specific team for your project? We can assemble a custom team according to your needs.
                    </p>
                    <div className="space-y-4">
                      <a
                        href="/contact"
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 transition-all font-semibold w-full"
                      >
                        Request Custom Team
                        <ArrowLeft className="rotate-180" size={16} />
                      </a>
                      <a
                        href="/portfolio"
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-slate-700 hover:bg-slate-800/50 transition-all font-semibold w-full"
                      >
                        See Our Portfolio
                        <ChevronRight size={16} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800/50 py-10">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                  <img src="/images/logo.jpeg" alt="Logo" className="w-8 h-8 rounded-lg" />
                </div>
                <span className="font-bold text-xl">Swakarsa Digital</span>
              </div>
              <p className="text-slate-400 text-sm">
                © 2025 Swakarsa Digital. All rights reserved.
              </p>
            </div>
            <div className="flex items-center gap-6">
              <a href="/" className="text-slate-400 hover:text-white transition-colors">
                Home
              </a>
              <a href="/portfolio" className="text-slate-400 hover:text-white transition-colors">
                Portfolio
              </a>
              <a href="/services" className="text-slate-400 hover:text-white transition-colors">
                Services
              </a>
              <a href="/contact" className="text-slate-400 hover:text-white transition-colors">
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default TeamPage;