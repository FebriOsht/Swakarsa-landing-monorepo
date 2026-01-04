"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ExternalLink, Github, Star, Calendar, Users, X, ChevronRight, Monitor, Layers, Rocket, CheckCircle, Code } from "lucide-react";
import { useState, useEffect, memo } from "react";

// ================= OPTIMIZED SUB-COMPONENTS =================

// Memoized Background Component to prevent unnecessary re-renders
const BackgroundEffects = memo(() => (
  <div className="fixed pointer-events-none inset-0 overflow-hidden">
    <motion.div
      animate={{
        scale: [1, 1.1, 1],
        opacity: [0.3, 0.5, 0.3],
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
        opacity: [0.2, 0.3, 0.2],
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
        {/* Glowing Orb */}
        <motion.div 
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute w-32 h-32 bg-indigo-600/30 rounded-full blur-2xl"
        />
        
        {/* Spinning Rings */}
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
        
        {/* Logo Text */}
        <img src="/images/logo.jpeg" alt="Logo" className="w-8 h-8 rounded-lg" />
    </motion.div>
    
    {/* Loading Text */}
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

// Modal Component
const Modal = ({ isOpen, onClose, children, title }: any) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        onClick={onClose}
      >
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
        
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          transition={{ type: "spring", damping: 25 }}
          className="relative z-10 w-full max-w-4xl rounded-2xl max-h-[90vh] overflow-y-auto
            bg-slate-900 border border-slate-700 shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="sticky top-0 z-20 flex items-center justify-between p-6 border-b border-slate-700 bg-slate-900/95 backdrop-blur-sm">
            <h3 className="text-xl font-bold text-white">
              {title}
            </h3>
            <button
              onClick={onClose}
              className="p-2 rounded-lg transition-colors hover:bg-slate-800 text-slate-400 hover:text-white"
            >
              <X size={24} />
            </button>
          </div>
          <div className="p-6">
            {children}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// Portfolio Modal Content Component
const PortfolioModalContent = ({ project }: any) => {
  // Custom content based on project type
  const getProjectSpecificContent = () => {
    switch(project.type) {
      case "management-system":
        return {
          duration: "12 Weeks",
          challenges: [
            "Integration with existing legacy systems",
            "Complex business logic for various processes",
            "Real-time synchronization for operations",
            "Security requirements for sensitive data",
            "Multi-language support for international needs"
          ],
          solutions: [
            "Microservices architecture for modular development",
            "Advanced business logic engine",
            "WebSocket implementation for real-time updates",
            "End-to-end encryption and compliance",
            "i18n integration with auto-translation"
          ],
          features: [
            "Comprehensive management dashboard",
            "Real-time monitoring & reporting",
            "Automated workflow processes",
            "Multi-level user permissions",
            "Data analytics & visualization",
            "Mobile-responsive interface"
          ],
          results: [
            { label: "Operational Efficiency", value: "+40%", improvement: "+40%" },
            { label: "Processing Speed", value: "2.5 min", improvement: "+60%" },
            { label: "User Satisfaction", value: "4.8/5", improvement: "+30%" },
            { label: "Error Reduction", value: "-85%", improvement: "+85%" }
          ]
        };
      case "crm-system":
        return {
          duration: "8 Weeks",
          challenges: [
            "Managing large customer database",
            "Lead tracking from multiple channels",
            "Integration with various platforms",
            "Sales follow-up automation",
            "Performance analytics & reporting"
          ],
          solutions: [
            "Advanced search with comprehensive filters",
            "Automated lead scoring & distribution",
            "API integration with multiple platforms",
            "Sales pipeline with automated reminders",
            "Advanced analytics dashboard"
          ],
          features: [
            "Customer database management",
            "Lead tracking & pipeline management",
            "Automated communication system",
            "Performance analytics dashboard",
            "Integration capabilities",
            "Mobile access & notifications"
          ],
          results: [
            { label: "Lead Conversion", value: "35%", improvement: "+40%" },
            { label: "Sales Growth", value: "45%", improvement: "+50%" },
            { label: "Response Time", value: "15 min", improvement: "+70%" },
            { label: "Customer Retention", value: "+30%", improvement: "+30%" }
          ]
        };
      case "pos-system":
        return {
          duration: "6 Weeks",
          challenges: [
            "Real-time order synchronization",
            "Offline mode capabilities",
            "Multiple payment method integration",
            "Inventory tracking & management",
            "Reporting & analytics"
          ],
          solutions: [
            "WebSocket for real-time communication",
            "Local storage with auto-sync capability",
            "Payment gateway with multiple provider support",
            "Advanced inventory management system",
            "Comprehensive reporting dashboard"
          ],
          features: [
            "Order management & tracking",
            "Inventory management system",
            "Multi-payment integration",
            "Customer loyalty program",
            "Real-time analytics",
            "Mobile ordering capability"
          ],
          results: [
            { label: "Order Processing", value: "3.2 min", improvement: "+50%" },
            { label: "Customer Satisfaction", value: "4.7/5", improvement: "+40%" },
            { label: "Inventory Accuracy", value: "98.5%", improvement: "+45%" },
            { label: "Revenue Growth", value: "+35%", improvement: "+35%" }
          ]
        };
      case "erp-system":
        return {
          duration: "16 Weeks",
          challenges: [
            "Integrating multiple departments",
            "Legacy system migration",
            "Complex process tracking",
            "Multi-location inventory",
            "Real-time production monitoring"
          ],
          solutions: [
            "Modular ERP with role-based access",
            "Phased migration strategy",
            "Production monitoring system",
            "Advanced inventory management",
            "Real-time dashboard & reporting"
          ],
          features: [
            "Production planning & scheduling",
            "Inventory & warehouse management",
            "Accounting & finance modules",
            "HR & payroll management",
            "Quality control system",
            "Business intelligence dashboard"
          ],
          results: [
            { label: "Production Efficiency", value: "92%", improvement: "+28%" },
            { label: "Inventory Accuracy", value: "98.5%", improvement: "+35%" },
            { label: "Reporting Time", value: "2 hrs", improvement: "+70%" },
            { label: "Cost Reduction", value: "25%", improvement: "+25%" }
          ]
        };
      case "ai-system":
        return {
          duration: "10 Weeks",
          challenges: [
            "Natural language processing",
            "Context understanding",
            "System integration",
            "Accuracy improvement",
            "Multi-channel deployment"
          ],
          solutions: [
            "AI model fine-tuning",
            "Context-aware response generation",
            "API integration strategy",
            "Continuous learning system",
            "Omnichannel deployment"
          ],
          features: [
            "AI-powered automation",
            "Context-aware processing",
            "Multi-language support",
            "System integration capabilities",
            "Performance analytics",
            "Continuous learning"
          ],
          results: [
            { label: "Response Time", value: "1.8s", improvement: "+85%" },
            { label: "Accuracy Rate", value: "92%", improvement: "+40%" },
            { label: "Cost Reduction", value: "70%", improvement: "+65%" },
            { label: "Customer Satisfaction", value: "4.6/5", improvement: "+35%" }
          ]
        };
      case "data-analytics":
        return {
          duration: "8 Weeks",
          challenges: [
            "Large-scale data processing",
            "Data normalization & cleaning",
            "Real-time monitoring",
            "Alert system implementation",
            "User-friendly visualization"
          ],
          solutions: [
            "Distributed processing architecture",
            "Data cleaning pipeline",
            "Real-time processing system",
            "Automated alert system",
            "Interactive visualization dashboard"
          ],
          features: [
            "Multi-source data collection",
            "Real-time monitoring",
            "Competitor analysis tools",
            "Trend forecasting",
            "Automated reporting",
            "Data export capabilities"
          ],
          results: [
            { label: "Data Accuracy", value: "97%", improvement: "+45%" },
            { label: "Processing Speed", value: "5k/min", improvement: "+80%" },
            { label: "Cost Savings", value: "65%", improvement: "+55%" },
            { label: "Decision Speed", value: "3x faster", improvement: "+200%" }
          ]
        };
      case "iot-system":
        return {
          duration: "14 Weeks",
          challenges: [
            "Real-time tracking implementation",
            "Route optimization algorithms",
            "Performance monitoring",
            "Maintenance scheduling",
            "System integration"
          ],
          solutions: [
            "GPS tracking with live updates",
            "Route optimization engine",
            "Performance analytics system",
            "Predictive maintenance",
            "API integration framework"
          ],
          features: [
            "Real-time tracking & monitoring",
            "Route optimization",
            "Fleet management dashboard",
            "Maintenance scheduling",
            "Performance analytics",
            "Delivery tracking system"
          ],
          results: [
            { label: "Delivery Time", value: "3.5 hrs", improvement: "+30%" },
            { label: "Fuel Efficiency", value: "18%", improvement: "+25%" },
            { label: "On-time Delivery", value: "96%", improvement: "+40%" },
            { label: "Maintenance Cost", value: "22%", improvement: "+22%" }
          ]
        };
      default:
        return {
          duration: "6-8 Weeks",
          challenges: [
            "System integration",
            "Performance optimization",
            "Data management",
            "Security implementation"
          ],
          solutions: [
            "Modern API integration",
            "Performance optimization strategy",
            "Efficient data management",
            "Advanced security protocols"
          ],
          features: [
            "Responsive design",
            "Performance optimization",
            "SEO friendly structure",
            "Third-party integrations",
            "Analytics dashboard",
            "User management"
          ],
          results: [
            { label: "Performance", value: "+60%", improvement: "+60%" },
            { label: "Conversion Rate", value: "+40%", improvement: "+40%" },
            { label: "User Engagement", value: "+30%", improvement: "+30%" },
            { label: "Mobile Usage", value: "+25%", improvement: "+25%" }
          ]
        };
    }
  };

  const specificContent = getProjectSpecificContent();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start gap-6">
        <div className="w-full md:w-2/5">
          <div className="rounded-xl overflow-hidden shadow-lg">
            <div className="h-64 bg-slate-800 flex items-center justify-center overflow-hidden">
              <img 
                src={project.image} 
                alt={project.title}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  target.parentElement!.innerHTML = `
                    <div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900">
                      <div class="text-4xl">${project.type === "management-system" ? "🏨" : 
                          project.type === "crm-system" ? "👥" :
                          project.type === "pos-system" ? "🍽️" :
                          project.type === "erp-system" ? "🏭" :
                          project.type === "ai-system" ? "🤖" :
                          project.type === "data-analytics" ? "📊" :
                          project.type === "iot-system" ? "🚚" : "💻"}</div>
                    </div>
                  `;
                }}
              />
            </div>
          </div>
          <div className="mt-4 p-4 rounded-lg bg-slate-800/50">
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-semibold text-white">Project Details</h4>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-slate-700 text-slate-300">
                  {project.year}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-indigo-500/20 text-indigo-300">
                  {project.typeLabel}
                </span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Users size={14} className="text-slate-400" />
                <span className="text-slate-300">{project.client}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={14} className="text-slate-400" />
                <span className="text-slate-300">Duration: {specificContent.duration}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="w-full md:w-3/5">
          <div className="flex items-start justify-between gap-4 mb-4">
            <h2 className="text-2xl font-bold text-white">
              {project.title}
            </h2>
            {project.featured && (
              <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-xs font-semibold text-white">
                <Star size={12} />
                Featured
              </div>
            )}
          </div>
          
          <p className="text-lg text-slate-300 mb-6">
            {project.description}
          </p>
          
          <div className="p-4 rounded-lg bg-slate-800/30">
            <h4 className="font-semibold text-white mb-2">Main Objective</h4>
            <p className="text-slate-300 text-sm">
              {project.objective || "Increase operational efficiency, enhance user experience, and optimize overall business processes."}
            </p>
          </div>
        </div>
      </div>

      {/* Features & Benefits */}
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h4 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <Layers size={20} className="text-indigo-400" />
            Key Features
          </h4>
          <div className="space-y-3">
            {specificContent.features.map((feature: string, idx: number) => (
              <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-slate-800/50">
                <CheckCircle size={16} className="text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-slate-300">{feature}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <h4 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <Rocket size={20} className="text-purple-400" />
            Achieved Results
          </h4>
          <div className="space-y-3">
            {specificContent.results.map((result: any, idx: number) => (
              <div key={idx} className="p-3 rounded-lg bg-slate-800/50">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-slate-300">{result.label}</span>
                  <span className="text-white font-bold">{result.value}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1.5 rounded-full bg-slate-700">
                    <div 
                      className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"
                      style={{ width: `${parseInt(result.improvement)}%` }}
                    />
                  </div>
                  <span className="text-xs text-green-400">{result.improvement}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tech Stack */}
      <div>
        <h4 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
          <Code size={20} className="text-cyan-400" />
          Technologies Used
        </h4>
        <div className="flex flex-wrap gap-3">
          {project.tech.map((tech: string, idx: number) => (
            <span key={idx} className="px-4 py-2 rounded-lg font-medium
              bg-slate-800 text-slate-300 border border-slate-700 hover:border-indigo-500 transition-colors">
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Challenges & Solutions */}
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h4 className="text-xl font-semibold text-white mb-4">Main Challenges</h4>
          <div className="p-4 rounded-lg bg-slate-800/50">
            <ul className="space-y-2">
              {specificContent.challenges.map((challenge: string, idx: number) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="mt-1.5 w-2 h-2 rounded-full bg-red-400"></span>
                  <span className="text-slate-300">{challenge}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div>
          <h4 className="text-xl font-semibold text-white mb-4">Our Solutions</h4>
          <div className="p-4 rounded-lg bg-slate-800/50">
            <ul className="space-y-2">
              {specificContent.solutions.map((solution: string, idx: number) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="mt-1.5 w-2 h-2 rounded-full bg-green-400"></span>
                  <span className="text-slate-300">{solution}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* CTA Buttons */}
      <div className="pt-6 border-t border-slate-700">
        <div className="flex flex-col sm:flex-row gap-4">
          {project.liveUrl && project.liveUrl !== "#" && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 transition-all font-semibold text-white"
            >
              <Monitor size={18} />
              Visit Live Website
            </a>
          )}
          {project.githubUrl && project.githubUrl !== "#" && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-slate-700 hover:bg-slate-800/50 transition-all font-semibold text-white"
            >
              <Github size={18} />
              View Source Code
            </a>
          )}
          <a
            href="/contact"
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-slate-700 hover:bg-slate-800/50 transition-all font-semibold text-white"
          >
            <ChevronRight size={18} />
            Consult Similar Project
          </a>
        </div>
      </div>
    </div>
  );
};

const PortfolioPage = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Complete portfolio data with real projects
  const portfolioItems = [
    {
      id: "hotel-dwipa",
      title: "Hotel Dwipa Management System",
      type: "management-system",
      typeLabel: "Management System",
      description: "Integrated hotel management system covering booking management, front desk operations, housekeeping, billing, and reporting. This system improves hotel operational efficiency by 40% and significantly enhances guest experience.",
      image: "/portfolio/Hotel Dwipa Management System.jpeg",
      tech: ["Next.js", "TypeScript", "PostgreSQL", "Redis", "Stripe API", "Socket.io", "Mapbox", "Chart.js"],
      liveUrl: "#",
      githubUrl: "#",
      featured: true,
      year: "2024",
      client: "Hotel Dwipa Group",
      objective: "Improve hotel operational efficiency, enhance guest experience, and optimize revenue management."
    },
    {
      id: "maju-mobilindo",
      title: "Maju Mobilindo CRM System",
      type: "crm-system",
      typeLabel: "CRM System",
      description: "Custom CRM system for used car dealership with lead management, inventory tracking, customer follow-up, and sales analytics features. This system helps increase lead to sales conversion rate by 35% and optimizes inventory management.",
      image: "/portfolio/Maju Mobilindo.jpeg",
      tech: ["React", "Node.js", "MongoDB", "Express", "Twilio API", "Cloudinary", "Chart.js", "Redux"],
      liveUrl: "#",
      githubUrl: "#",
      featured: true,
      year: "2024",
      client: "Maju Mobilindo",
      objective: "Increase lead conversion rate, optimize inventory management, and accelerate sales process."
    },
    {
      id: "restaurant-pos",
      title: "Restaurant POS System",
      type: "pos-system",
      typeLabel: "POS System",
      description: "Complete Point of Sale system for restaurants with order management, kitchen display system, inventory tracking, and comprehensive reporting. This system reduces customer waiting time by 50% and increases table turnover rate.",
      image: "/portfolio/Restaurant POS System.jpeg",
      tech: ["Vue.js", "Node.js", "MySQL", "Socket.io", "QRIS API", "Thermal Printer API", "Redis", "JWT"],
      liveUrl: "#",
      githubUrl: "#",
      featured: true,
      year: "2024",
      client: "FoodChain Restaurant Group",
      objective: "Speed up order process, increase table turnover, and optimize inventory management."
    },
    {
      id: "alumka-lampung",
      title: "Alumka Lampung ERP System",
      type: "erp-system",
      typeLabel: "ERP System",
      description: "Enterprise Resource Planning system for aluminum manufacturing company with production, inventory, accounting, HR, and business intelligence modules. This system integrates all departments in one efficient platform.",
      image: "/portfolio/Alumka.jpeg",
      tech: ["Laravel", "Vue.js", "MySQL", "Redis", "ERP Modules", "BI Tools", "Docker", "AWS"],
      liveUrl: "#",
      githubUrl: "#",
      featured: true,
      year: "2023",
      client: "PT Alumka Lampung",
      objective: "Integrate all departments into one system, improve production efficiency, and reduce operational costs."
    },
    {
      id: "ai-faq-system",
      title: "AI FAQ Chatbot System",
      type: "ai-system",
      typeLabel: "AI System",
      description: "AI-based chatbot system that can understand natural language questions in Indonesian and provide accurate answers. Reduces customer service workload by 70% with response time under 2 seconds.",
      image: "/portfolio/AI FAQ System.jpeg",
      tech: ["Python", "FastAPI", "OpenAI GPT", "React", "Redis", "WebSocket", "NLP", "Docker"],
      liveUrl: "#",
      githubUrl: "#",
      featured: true,
      year: "2024",
      client: "TechStartup Inc.",
      objective: "Reduce customer service workload, improve response time, and provide better customer experience."
    },
    {
      id: "web-scraping",
      title: "Web Scraping Dashboard",
      type: "data-analytics",
      typeLabel: "Data Analytics",
      description: "Automatic price and competitor monitoring platform with web scraping technology. Collects and analyzes data from various e-commerce sites for pricing strategy and market analysis.",
      image: "/portfolio/Web Scraping Dashboard.jpeg",
      tech: ["Python", "Scrapy", "React", "PostgreSQL", "Celery", "Docker", "Redis", "Chart.js"],
      liveUrl: "#",
      githubUrl: "#",
      featured: true,
      year: "2024",
      client: "E-commerce Retailer",
      objective: "Real-time competitor price monitoring, market trend analysis, and support data-driven decision making."
    },
    {
      id: "transport-management",
      title: "Transport Management System",
      type: "iot-system",
      typeLabel: "IoT System",
      description: "Logistics transportation management system with real-time GPS tracking, route optimization, fleet management, and delivery scheduling. Reduces logistics operational costs by 25%.",
      image: "/portfolio/Transport Management System.jpeg",
      tech: ["Next.js", "Node.js", "MongoDB", "Mapbox API", "Socket.io", "Redis", "GPS Tracking", "Docker"],
      liveUrl: "#",
      githubUrl: "#",
      featured: true,
      year: "2024",
      client: "Logistics Company",
      objective: "Optimize delivery routes, improve fuel efficiency, and enhance fleet management."
    },
  ];

  // Filter categories based on project type
  const categories = [
    { id: "all", label: "All Projects", count: portfolioItems.length },
    { id: "management-system", label: "Management System", count: portfolioItems.filter(item => item.type === "management-system").length },
    { id: "crm-system", label: "CRM System", count: portfolioItems.filter(item => item.type === "crm-system").length },
    { id: "pos-system", label: "POS System", count: portfolioItems.filter(item => item.type === "pos-system").length },
    { id: "erp-system", label: "ERP System", count: portfolioItems.filter(item => item.type === "erp-system").length },
    { id: "ai-system", label: "AI System", count: portfolioItems.filter(item => item.type === "ai-system").length },
    { id: "data-analytics", label: "Data Analytics", count: portfolioItems.filter(item => item.type === "data-analytics").length },
    { id: "iot-system", label: "IoT System", count: portfolioItems.filter(item => item.type === "iot-system").length },
  ];

  // Filtered items based on type
  const filteredItems = activeFilter === "all" 
    ? portfolioItems 
    : portfolioItems.filter(item => item.type === activeFilter);

  // Function to handle project card click
  const handleProjectClick = (project: any) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  // Function to close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-slate-950 to-black text-white overflow-hidden">
      <AnimatePresence>
        {isLoading && <LoadingScreen />}
      </AnimatePresence>

      {/* Background Effects */}
      <BackgroundEffects />

      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-black/40 backdrop-blur-md border-b border-slate-800/50">
        <div className="container mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <a href="/" className="flex items-center gap-3 group">
              <motion.div
                whileHover={{ x: -5 }}
                className="p-2 rounded-lg bg-slate-800/50 group-hover:bg-slate-700/50 transition-colors"
              >
                <ArrowLeft size={20} />
              </motion.div>
              <div>
                <p className="text-sm text-slate-400">Back to</p>
                <p className="font-semibold group-hover:text-indigo-400 transition-colors">Home</p>
              </div>
            </a>

            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2 text-sm text-slate-400">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                <span>Available for projects</span>
              </div>
              <a
                href="/contact"
                className="px-6 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 transition-all font-semibold"
              >
                Start Project
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-16 sm:py-20 md:py-28">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/50 border border-slate-700/50 mb-6">
              <Star size={16} className="text-yellow-500" />
              <span className="text-sm font-medium">Selected Portfolio</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight">
              <span className="bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                Our Digital
              </span>
              <br />
              <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Masterpieces
              </span>
            </h1>
            
            <p className="mt-6 text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto">
              The best works we have built for clients from various industries.
              Click each project to see complete details.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="sticky top-20 z-40 py-4 bg-black/30 backdrop-blur-md border-y border-slate-800/30">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <h2 className="text-xl font-bold text-white">Filter by Category</h2>
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((category) => (
                <button
                  key={`category-${category.id}`}
                  onClick={() => setActiveFilter(category.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    activeFilter === category.id
                      ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/20"
                      : "bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 hover:text-white"
                  }`}
                >
                  {category.label}
                  <span className="ml-2 px-1.5 py-0.5 rounded text-xs bg-slate-900/50">
                    {category.count}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filteredItems.map((item) => (
              <motion.div
                key={`project-${item.id}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5 }}
                onMouseEnter={() => setHoveredCard(item.id)}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={() => handleProjectClick(item)}
                className={`group relative overflow-hidden rounded-2xl border border-slate-800/50 bg-gradient-to-br from-slate-900/40 to-black/40 backdrop-blur-sm
                  ${item.featured ? 'ring-2 ring-indigo-500/30' : ''}
                  ${hoveredCard === item.id ? 'scale-[1.02] shadow-2xl shadow-indigo-500/10 cursor-pointer' : ''}
                  transition-all duration-300 cursor-pointer`}
              >
                {/* Featured Badge */}
                {item.featured && (
                  <div className="absolute top-4 left-4 z-10">
                    <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-xs font-semibold">
                      <Star size={12} />
                      Featured
                    </div>
                  </div>
                )}

                {/* Image */}
                <div className="relative h-48 overflow-hidden bg-slate-800">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      target.parentElement!.innerHTML = `
                        <div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900">
                          <div class="text-4xl">${item.type === "management-system" ? "🏨" : 
                             item.type === "crm-system" ? "👥" :
                             item.type === "pos-system" ? "🍽️" :
                             item.type === "erp-system" ? "🏭" :
                             item.type === "ai-system" ? "🤖" :
                             item.type === "data-analytics" ? "📊" :
                             item.type === "iot-system" ? "🚚" : "💻"}</div>
                        </div>
                      `;
                    }}
                  />
                  {/* Hover Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent
                    ${hoveredCard === item.id ? 'opacity-80' : 'opacity-40'} transition-opacity`}
                  />
                  {/* Hover Text */}
                  <div className={`absolute inset-0 flex items-center justify-center transition-opacity
                    ${hoveredCard === item.id ? 'opacity-100' : 'opacity-0'}`}>
                    <div className="text-center p-4">
                      <div className="p-2 rounded-full bg-black/50 backdrop-blur-sm inline-flex items-center gap-2">
                        <ExternalLink size={16} />
                        <span className="text-sm font-medium">Click for details</span>
                      </div>
                    </div>
                  </div>
                  {/* Type Badge */}
                  <div className="absolute bottom-4 left-4 z-10">
                    <div className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-sm text-xs font-medium">
                      {item.typeLabel}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-white group-hover:text-indigo-400 transition-colors">
                        {item.title}
                      </h3>
                      <div className="flex items-center gap-3 mt-2 text-sm text-slate-400">
                        <span className="flex items-center gap-1">
                          <Calendar size={14} />
                          {item.year}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users size={14} />
                          {item.client}
                        </span>
                      </div>
                    </div>
                    {item.featured && (
                      <div className="flex-shrink-0">
                        <Star size={18} className="text-yellow-500 fill-yellow-500" />
                      </div>
                    )}
                  </div>

                  <p className="text-slate-300 mb-4 line-clamp-2">
                    {item.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {item.tech.slice(0, 3).map((tech, techIndex) => (
                      <span
                        key={`${item.id}-tech-${techIndex}`}
                        className="px-3 py-1 rounded-full bg-slate-800/50 text-xs text-slate-300 border border-slate-700/50"
                      >
                        {tech}
                      </span>
                    ))}
                    {item.tech.length > 3 && (
                      <span className="px-3 py-1 rounded-full bg-slate-800/50 text-xs text-slate-400 border border-slate-700/50">
                        +{item.tech.length - 3} more
                      </span>
                    )}
                  </div>

                  {/* Links */}
                  <div className="flex items-center gap-4 pt-4 border-t border-slate-800/50">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleProjectClick(item);
                      }}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800/50 hover:bg-slate-700/50 text-white transition-colors"
                    >
                      <ExternalLink size={16} />
                      <span>View Details</span>
                    </button>
                    {item.liveUrl && item.liveUrl !== "#" && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(item.liveUrl, '_blank');
                        }}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800/50 hover:bg-slate-700/50 text-white transition-colors"
                      >
                        <Monitor size={16} />
                        <span>Live Demo</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Hover Effect */}
                <div className={`absolute inset-0 bg-gradient-to-tr from-indigo-500/10 via-transparent to-pink-500/10
                  ${hoveredCard === item.id ? 'opacity-100' : 'opacity-0'} transition-opacity pointer-events-none`}
                />
              </motion.div>
            ))}
          </div>

          {/* Empty State */}
          {filteredItems.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-white mb-2">No projects found</h3>
              <p className="text-slate-400">Try selecting a different category</p>
            </motion.div>
          )}

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-20 text-center"
          >
            <div className="max-w-2xl mx-auto p-8 rounded-3xl bg-gradient-to-br from-slate-900/40 to-black/40 border border-slate-800/50 backdrop-blur-sm">
              <h2 className="text-3xl font-bold text-white mb-4">
                Ready to Build Something Amazing?
              </h2>
              <p className="text-slate-300 mb-8">
                Let's discuss your project and bring your ideas to life with our expertise.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/contact"
                  className="px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 transition-all font-semibold text-lg"
                >
                  Start Your Project
                </a>
                <a
                  href="/team"
                  className="px-8 py-4 rounded-xl border border-slate-700 hover:bg-slate-800/50 transition-all font-semibold text-lg"
                >
                  Meet Our Team
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800/50 py-10">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                  <span className="font-bold text-white">SD</span>
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
              <a href="/services" className="text-slate-400 hover:text-white transition-colors">
                Services
              </a>
              <a href="/team" className="text-slate-400 hover:text-white transition-colors">
                Team
              </a>
              <a href="/contact" className="text-slate-400 hover:text-white transition-colors">
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Portfolio Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={selectedProject?.title || "Project Details"}
      >
        {selectedProject && <PortfolioModalContent project={selectedProject} />}
      </Modal>
    </div>
  );
};

export default PortfolioPage;