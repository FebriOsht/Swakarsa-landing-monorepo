"use client";

import { motion } from "framer-motion";
import { Mail, Phone, Globe, Send, ArrowLeft, MapPin, MessageSquare, CheckCircle, AlertCircle } from "lucide-react";
import { useState, memo } from "react";
import { submitContactForm } from "@/app/lib/actions"; // Import Server Action kita

// ================= OPTIMIZED SUB-COMPONENTS =================

// Memoized Background Component (Tetap sama seperti sebelumnya)
const BackgroundEffects = memo(() => (
  <div className="fixed pointer-events-none inset-0 overflow-hidden z-0">
    <motion.div
      animate={{
        scale: [1, 1.1, 1],
        opacity: [0.2, 0.3, 0.2],
      }}
      transition={{
        duration: 15,
        repeat: Infinity,
        ease: "linear",
      }}
      className="absolute -top-40 left-1/4 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-indigo-500/10 via-purple-500/5 to-pink-500/10 rounded-full blur-[120px]"
    />
    <motion.div
      animate={{
        scale: [1.1, 1, 1.1],
        opacity: [0.1, 0.2, 0.1],
      }}
      transition={{
        duration: 10,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className="absolute -bottom-40 -right-20 w-[500px] h-[500px] bg-gradient-to-tr from-cyan-400/5 to-blue-500/5 rounded-full blur-[100px]"
    />
  </div>
));

BackgroundEffects.displayName = 'BackgroundEffects';

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState<{ success?: boolean; message?: string } | null>(null);

  // Handler untuk Form Submission via Server Action
  async function clientAction(formData: FormData) {
    setIsSubmitting(true);
    setFormStatus(null);

    // Panggil fungsi backend
    const result = await submitContactForm(formData);

    setIsSubmitting(false);
    setFormStatus(result);

    // Jika sukses, reset form
    if (result.success) {
      const form = document.getElementById("contact-form") as HTMLFormElement;
      if (form) form.reset();
    }
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden relative">
      <BackgroundEffects />

      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-black/40 backdrop-blur-md border-b border-white/5">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <a href="/" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors group">
              <div className="p-2 rounded-lg bg-white/5 group-hover:bg-white/10 transition-colors">
                <ArrowLeft size={20} />
              </div>
              <span className="font-medium">Back to Home</span>
            </a>
            <div className="flex items-center gap-2 text-green-400 bg-green-400/10 px-3 py-1 rounded-full text-sm border border-green-400/20">
              <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              Open for Projects
            </div>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 sm:px-6 py-12 sm:py-20 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 mb-6">
              <MessageSquare size={16} />
              <span className="text-sm font-medium">Get in Touch</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-extrabold mb-6 tracking-tight">
              Let's Build Something <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
                Extraordinary
              </span>
            </h1>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Ready to start your digital transformation? Send us a message and we'll reply via Email within 24 hours.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm">
                <h3 className="text-2xl font-bold mb-6 text-white">Contact Information</h3>
                <div className="space-y-6">
                    <InfoCard 
                        icon={<Mail size={24} />} 
                        title="Email Us" 
                        text="swakarsadigital@gmail.com" 
                        subtext="For general inquiries and partnerships"
                        href="mailto:swakarsadigital@gmail.com"
                    />
                    <InfoCard 
                        icon={<Phone size={24} />} 
                        title="WhatsApp" 
                        text="+62 822-7951-3201" 
                        subtext="Fast response (09:00 - 17:00 WIB)"
                        href="https://wa.me/6282279513201"
                    />
                    <InfoCard 
                        icon={<Globe size={24} />} 
                        title="Website" 
                        text="swakarsadigital.com" 
                        subtext="Visit our main landing page"
                        href="/"
                    />
                    <InfoCard 
                        icon={<MapPin size={24} />} 
                        title="Location" 
                        text="Bandar Lampung, Indonesia" 
                        subtext="Serving clients worldwide"
                    />
                </div>
            </div>
            
            {/* Trust Indicator */}
            <div className="p-6 rounded-3xl bg-gradient-to-r from-indigo-600/20 to-purple-600/20 border border-indigo-500/20 text-center">
                <p className="text-indigo-200 font-medium">
                    "Great things in business are never done by one person. They're done by a team of people."
                </p>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <form
              id="contact-form"
              action={clientAction}
              className="rounded-3xl bg-white/5 border border-white/10 p-8 backdrop-blur-md shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />
              
              <h3 className="text-2xl font-bold mb-2 text-white">Send a Message</h3>
              <p className="text-slate-400 mb-8 text-sm">We'll respond to your email as soon as possible.</p>

              {/* 🔒 HONEYPOT (HIDDEN) - Sesuai dengan actions.ts */}
              <input
                type="text"
                name="company"
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
              />

              <div className="space-y-5">
                <Input label="Full Name" name="name" placeholder="John Doe" />
                <Input label="Email Address" name="email" type="email" placeholder="john@example.com" />
                <Textarea label="Message" name="message" placeholder="Tell us about your project..." />

                {/* Status Message (Success/Error) */}
                {formStatus && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-4 rounded-xl flex items-center gap-3 ${
                      formStatus.success 
                        ? 'bg-green-500/10 text-green-400 border border-green-500/20' 
                        : 'bg-red-500/10 text-red-400 border border-red-500/20'
                    }`}
                  >
                    {formStatus.success ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
                    <p className="text-sm font-medium">{formStatus.message}</p>
                  </motion.div>
                )}

                <button
                  disabled={isSubmitting}
                  type="submit"
                  className="w-full flex items-center justify-center gap-3 py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 font-bold text-white shadow-lg shadow-indigo-500/25 disabled:opacity-60 disabled:cursor-not-allowed transition-all active:scale-[0.98] mt-4"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Sending Message...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send size={18} />
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 py-10 relative z-10 bg-black/40 backdrop-blur-xl">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                  <span className="font-bold text-white">SD</span>
                </div>
                <span className="font-bold text-xl">Swakarsa Digital</span>
              </div>
              <p className="text-slate-400 text-sm">
                © 2025 Swakarsa Digital. All rights reserved.
              </p>
            </div>
            <div className="flex items-center gap-8">
              <a href="/" className="text-slate-400 hover:text-white transition-colors text-sm font-medium">Home</a>
              <a href="/team" className="text-slate-400 hover:text-white transition-colors text-sm font-medium">Team</a>
              <a href="/portfolio" className="text-slate-400 hover:text-white transition-colors text-sm font-medium">Portfolio</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* =========================
   COMPONENTS (Sama seperti sebelumnya)
========================= */

const InfoCard = ({ icon, title, text, subtext, href }: any) => {
    const Content = () => (
        <div className="flex items-start gap-4 p-4 rounded-2xl hover:bg-white/5 transition-colors cursor-pointer group">
            <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-400 group-hover:bg-indigo-500/20 group-hover:text-indigo-300 transition-colors">
                {icon}
            </div>
            <div>
                <h4 className="font-bold text-white mb-1 group-hover:text-indigo-300 transition-colors">{title}</h4>
                <p className="text-slate-300 font-medium">{text}</p>
                {subtext && <p className="text-slate-500 text-sm mt-1">{subtext}</p>}
            </div>
        </div>
    );

    if (href) {
        return <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? "noopener noreferrer" : undefined}><Content /></a>;
    }
    return <Content />;
};

const Input = ({ label, name, type = "text", placeholder }: any) => (
  <div className="group">
    <label className="text-sm font-medium text-slate-300 mb-2 block group-focus-within:text-indigo-400 transition-colors">{label}</label>
    <input
      name={name}
      type={type}
      required
      placeholder={placeholder}
      className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-600 focus:bg-white/10 focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 outline-none transition-all"
    />
  </div>
);

const Textarea = ({ label, name, placeholder }: any) => (
  <div className="group">
    <label className="text-sm font-medium text-slate-300 mb-2 block group-focus-within:text-indigo-400 transition-colors">{label}</label>
    <textarea
      name={name}
      rows={4}
      required
      placeholder={placeholder}
      className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-600 focus:bg-white/10 focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 outline-none transition-all resize-none"
    />
  </div>
);