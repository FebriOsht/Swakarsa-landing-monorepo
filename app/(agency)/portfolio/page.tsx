"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronRight } from "lucide-react";
import { useState } from "react";

// ================= MODAL COMPONENTS =================
const Modal = ({ isOpen, onClose, children, title }: any) => {
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

// Portfolio Modal Content
const PortfolioModalContent = ({ project }: any) => (
  <div className="space-y-8">
    <div className="relative rounded-2xl overflow-hidden h-64 md:h-80 w-full group">
        <img 
          src={project.image} 
          alt={project.title}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-6 md:p-8">
             <div>
                <span className="inline-block px-3 py-1 mb-3 rounded-full text-xs font-semibold backdrop-blur-md bg-cyan-500/80 text-white">
                  {project.category}
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-white">
                  {project.title}
                </h2>
             </div>
        </div>
    </div>

    <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">
            <div>
                <h3 className="text-xl font-bold mb-3 text-white">Project Overview</h3>
                <p className="text-lg leading-relaxed text-slate-300">
                  {project.description}
                </p>
            </div>

            <div className="grid gap-6">
                <div className="p-5 rounded-2xl bg-red-500/5 border border-red-500/10">
                    <h4 className="text-lg font-bold mb-3 flex items-center gap-2 text-red-400">
                        Challenges
                    </h4>
                    <ul className="space-y-2">
                        {project.challenges.map((challenge: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-slate-300">
                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-current opacity-60"></span>
                            {challenge}
                        </li>
                        ))}
                    </ul>
                </div>
                
                <div className="p-5 rounded-2xl bg-green-500/5 border border-green-500/10">
                    <h4 className="text-lg font-bold mb-3 flex items-center gap-2 text-green-400">
                        Solutions
                    </h4>
                    <ul className="space-y-2">
                        {project.solutions.map((solution: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-slate-300">
                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-current opacity-60"></span>
                            {solution}
                        </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>

        <div className="md:col-span-1 space-y-6">
             <div className="p-5 rounded-2xl bg-slate-800/50">
                <h4 className="text-sm font-bold uppercase tracking-wider mb-4 text-slate-400">
                    Project Details
                </h4>
                <div className="space-y-4">
                    <div>
                        <p className="text-xs text-slate-500">Client</p>
                        <p className="font-medium text-white">{project.client}</p>
                    </div>
                    <div>
                        <p className="text-xs text-slate-500">Duration</p>
                        <p className="font-medium text-white">{project.duration}</p>
                    </div>
                </div>
             </div>

             <div>
                <h4 className="text-sm font-bold uppercase tracking-wider mb-3 text-slate-400">
                    Results
                </h4>
                <div className="space-y-3">
                    {project.results.map((result: any, idx: number) => (
                    <div key={idx} className="p-3 rounded-xl flex items-center justify-between bg-slate-800/30">
                        <span className="text-sm text-slate-300">{result.label}</span>
                        <span className="font-bold text-cyan-400">{result.value}</span>
                    </div>
                    ))}
                </div>
             </div>

             <div>
                 <h4 className="text-sm font-bold uppercase tracking-wider mb-3 text-slate-400">
                    Tech Stack
                </h4>
                 <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech: string, idx: number) => (
                    <span key={idx} className="px-2 py-1 rounded text-xs font-medium bg-slate-800 text-slate-300">
                        {tech}
                    </span>
                    ))}
                </div>
             </div>
        </div>
    </div>
  </div>
);

// Portfolio Card
const PortfolioCard = ({ project, index, onClick }: any) => (
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
      
      <div className="flex items-center justify-between pt-4 border-t border-slate-800">
        <span className="text-sm font-semibold flex items-center gap-1 text-cyan-400">
          View Details <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </span>
      </div>
    </div>
  </motion.div>
);

export default function PortfolioPage() {
  const [selectedProject, setSelectedProject] = useState<any>(null);

  // Portfolio data
  const portfolioItems = [
    {
      id: 1,
      title: "Maju Mobilindo",
      category: "E-commerce Website",
      client: "Maju Mobilindo - Used Car Dealer",
      image: "/portfolio/Maju Mobilindo.jpeg",
      shortDescription: "E-commerce website for used car dealer with advanced search and filtering system.",
      description: "Developing a comprehensive e-commerce website for used car dealers, focusing on user experience and advanced search systems. This website allows customers to search for cars based on various criteria and schedule test drive appointments online.",
      duration: "8 Weeks",
      challenges: [
        "Managing 500+ car catalog with different specifications",
        "Creating responsive and accurate search systems",
        "Integration with CRM systems for lead management",
        "Performance optimization for many images"
      ],
      solutions: [
        "Implementing search engine with advanced filters",
        "CDN for image loading optimization",
        "Chatbot for 24/7 customer service",
        "Admin dashboard for inventory management"
      ],
      results: [
        { value: "300%", label: "Traffic Increase" },
        { value: "45%", label: "Conversion Rate" },
        { value: "2.5x", label: "Lead Generation" }
      ],
      techStack: ["Next.js", "Tailwind CSS", "PostgreSQL", "Cloudinary", "Stripe"],
      tags: ["E-commerce", "Automotive", "Search", "Booking"]
    },
    {
      id: 2,
      title: "Alumka Lampung",
      category: "Company Profile",
      client: "PT Alumka Lampung - Building Materials Supplier",
      image: "/portfolio/Alumka.jpeg",
      shortDescription: "Company profile website with product catalog and integrated inquiry system.",
      description: "Creating a professional company profile website for building materials suppliers, displaying project portfolios, complete product catalogs, and inquiry systems integrated with WhatsApp Business API for quick customer response.",
      duration: "6 Weeks",
      challenges: [
        "Displaying product catalog with 1000+ items",
        "Integration with WhatsApp Business API",
        "Optimization for mobile users (70% traffic)",
        "Multi-language support for international markets"
      ],
      solutions: [
        "Dynamic catalog with categories and filters",
        "WhatsApp integration for instant inquiry",
        "Mobile-first responsive design",
        "i18n for English and Indonesian language support"
      ],
      results: [
        { value: "200+", label: "Monthly Inquiries" },
        { value: "60%", label: "Mobile Traffic" },
        { value: "40%", label: "Increase in Sales" }
      ],
      techStack: ["React", "TypeScript", "Node.js", "MongoDB", "WhatsApp API"],
      tags: ["Company Profile", "Catalog", "WhatsApp", "B2B"]
    },
    {
      id: 3,
      title: "AI FAQ System",
      category: "AI Solution",
      client: "Tech Startup Company",
      image: "/portfolio/AI FAQ System.jpeg",
      shortDescription: "AI-based FAQ system with natural language processing for customer support.",
      description: "Developing intelligent FAQ systems using machine learning to understand customer questions and provide relevant answers. This system reduces customer service workload by 70% with accurate response automation.",
      duration: "10 Weeks",
      challenges: [
        "Training models to understand various question types",
        "Integration with existing helpdesk systems",
        "Handling ambiguous questions",
        "Multi-language understanding"
      ],
      solutions: [
        "Fine-tuning GPT models for specific domains",
        "API integration with Zendesk & Freshdesk",
        "Confidence scoring for ambiguous questions",
        "Fallback to human agents when needed"
      ],
      results: [
        { value: "70%", label: "Reduction in Support Tickets" },
        { value: "4.5/5", label: "Customer Satisfaction" },
        { value: "24/7", label: "Availability" }
      ],
      techStack: ["Python", "FastAPI", "OpenAI", "React", "Redis"],
      tags: ["AI", "Chatbot", "NLP", "Automation"]
    },
    {
      id: 4,
      title: "Hotel Dwipa Management System",
      category: "Hotel Management System",
      client: "Hotel Dwipa - Hospitality Business",
      image: "/portfolio/Hotel Dwipa Management System.jpeg",
      shortDescription: "Comprehensive hotel management system with booking, room management, and guest services.",
      description: "Developing a complete hotel management system that handles reservations, check-in/check-out, room status management, billing, and guest services. The system integrates with payment gateways and provides real-time availability updates.",
      duration: "12 Weeks",
      challenges: [
        "Managing multiple room types and pricing tiers",
        "Real-time availability synchronization",
        "Integration with payment gateways",
        "Handling peak booking periods"
      ],
      solutions: [
        "Dynamic pricing engine with seasonal adjustments",
        "Real-time booking system with conflict prevention",
        "Multiple payment gateway integration",
        "Automated email notifications and confirmations"
      ],
      results: [
        { value: "50%", label: "Booking Efficiency" },
        { value: "30%", label: "Revenue Increase" },
        { value: "4.8/5", label: "Guest Satisfaction" }
      ],
      techStack: ["Next.js", "Node.js", "PostgreSQL", "Stripe", "SendGrid"],
      tags: ["Hospitality", "Booking", "Management", "Payment"]
    },
    {
      id: 5,
      title: "Restaurant POS System",
      category: "Point of Sale System",
      client: "Restaurant Chain - F&B Business",
      image: "/portfolio/Restaurant POS System.jpeg",
      shortDescription: "Modern restaurant POS system with table management, kitchen display, and order tracking.",
      description: "Building a comprehensive restaurant POS system that handles table management, order taking, kitchen display system (KDS), payment processing, and sales reporting. The system supports multiple payment methods and integrates with delivery platforms.",
      duration: "10 Weeks",
      challenges: [
        "Real-time order synchronization between front and kitchen",
        "Table management for busy restaurants",
        "Split billing and group orders",
        "Integration with delivery platforms"
      ],
      solutions: [
        "WebSocket-based real-time order updates",
        "Visual table map with status indicators",
        "Flexible billing system with item-level splitting",
        "API integration with major delivery platforms"
      ],
      results: [
        { value: "40%", label: "Faster Service" },
        { value: "25%", label: "Order Accuracy" },
        { value: "35%", label: "Revenue Growth" }
      ],
      techStack: ["React", "Node.js", "Socket.io", "PostgreSQL", "Stripe"],
      tags: ["POS", "Restaurant", "F&B", "Real-time"]
    },
    {
      id: 6,
      title: "Transport Management System",
      category: "Logistics System",
      client: "Transportation Company - Logistics",
      image: "/portfolio/Transport Management System.jpeg",
      shortDescription: "Fleet management and logistics system with route optimization and real-time tracking.",
      description: "Creating a comprehensive transport management system that handles fleet management, route optimization, driver assignment, real-time GPS tracking, and delivery status updates. The system helps reduce fuel costs and improve delivery efficiency.",
      duration: "14 Weeks",
      challenges: [
        "Real-time GPS tracking for multiple vehicles",
        "Route optimization for cost efficiency",
        "Driver performance monitoring",
        "Integration with customer notification systems"
      ],
      solutions: [
        "GPS tracking with Google Maps integration",
        "AI-powered route optimization algorithm",
        "Driver dashboard with performance metrics",
        "Automated SMS/email notifications for customers"
      ],
      results: [
        { value: "30%", label: "Fuel Cost Reduction" },
        { value: "45%", label: "On-time Delivery" },
        { value: "50+", label: "Vehicles Managed" }
      ],
      techStack: ["Next.js", "Node.js", "PostgreSQL", "Google Maps API", "Twilio"],
      tags: ["Logistics", "Fleet Management", "GPS", "Optimization"]
    },
    {
      id: 7,
      title: "Web Scraping Dashboard",
      category: "Data Collection System",
      client: "Market Research Company",
      image: "/portfolio/Web Scraping Dashboard.jpeg",
      shortDescription: "Automated web scraping platform with data visualization and scheduling capabilities.",
      description: "Developing a web scraping dashboard that allows users to schedule scraping tasks, monitor data collection progress, visualize collected data, and export results. The system includes proxy rotation, rate limiting, and data cleaning features.",
      duration: "8 Weeks",
      challenges: [
        "Handling anti-scraping measures",
        "Managing large-scale data collection",
        "Data cleaning and normalization",
        "Scheduling and automation"
      ],
      solutions: [
        "Proxy rotation and user-agent management",
        "Distributed scraping architecture",
        "Automated data validation and cleaning",
        "Cron-based scheduling system"
      ],
      results: [
        { value: "10K+", label: "Daily Data Points" },
        { value: "95%", label: "Success Rate" },
        { value: "80%", label: "Time Saved" }
      ],
      techStack: ["Python", "Scrapy", "React", "PostgreSQL", "Redis", "Celery"],
      tags: ["Web Scraping", "Data", "Automation", "Analytics"]
    }
  ];

  const handleProjectClick = (project: any) => {
    setSelectedProject(project);
  };

  const closeModal = () => {
    setSelectedProject(null);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Header */}
      <div className="bg-slate-900/90 backdrop-blur-xl border-b border-cyan-500/10 sticky top-0 z-40">
        <div className="container mx-auto px-4 sm:px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold mb-2 text-white">
                Our Portfolio
        </h1>
              <p className="text-slate-400">
                A selection of our recent projects that showcase our commitment to quality and innovation.
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

      {/* Portfolio Grid */}
      <section className="container mx-auto px-4 sm:px-6 py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolioItems.map((project, index) => (
            <PortfolioCard 
              key={project.id}
              project={project}
              index={index}
              onClick={handleProjectClick}
            />
          ))}
        </div>
      </section>

      {/* Modal */}
      <Modal 
        isOpen={!!selectedProject} 
        onClose={closeModal} 
        title={selectedProject?.title}
      >
        {selectedProject && <PortfolioModalContent project={selectedProject} />}
      </Modal>
    </div>
  );
}
