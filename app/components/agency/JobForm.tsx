"use client";

import { submitJobApplication } from "../../lib/actions";
import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle, Loader2 } from "lucide-react";

export default function JobForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    const formData = new FormData(event.currentTarget);
    const result = await submitJobApplication(formData);

    if (result.success) {
      setIsSuccess(true);
      // Reset form logic could go here
    } else {
      setErrorMessage(result.message || "Something went wrong.");
    }
    setIsSubmitting(false);
  }

  if (isSuccess) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-slate-900 border border-green-500/30 rounded-2xl p-8 text-center"
      >
        <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle size={32} />
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">Application Received!</h3>
        <p className="text-slate-400">
          Thank you for joining the Arise initiative. We will review your profile and contact you soon.
        </p>
        <button 
          onClick={() => setIsSuccess(false)}
          className="mt-6 text-sm text-indigo-400 hover:text-indigo-300 underline"
        >
          Send another application
        </button>
      </motion.div>
    );
  }

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-white">Join the Guild</h3>
        <p className="text-slate-400">Fill in your details to start your journey.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">Full Name</label>
            <input name="fullName" required className="w-full bg-black/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none" placeholder="John Doe" />
          </div>
          <div className="space-y-2">
             <label className="text-sm font-medium text-slate-300">Email Address</label>
             <input type="email" name="email" required className="w-full bg-black/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none" placeholder="john@example.com" />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">Phone / WhatsApp</label>
            <input name="phone" required className="w-full bg-black/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none" placeholder="+62..." />
          </div>
          <div className="space-y-2">
             <label className="text-sm font-medium text-slate-300">City / Location</label>
             <input name="location" required className="w-full bg-black/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none" placeholder="Jakarta, Indonesia" />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-300">Skills & Experience</label>
          <textarea name="experience" required rows={4} className="w-full bg-black/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none" placeholder="Tell us about your tech stack (e.g., React, Next.js, UI/UX) and past projects..." />
        </div>

        <div className="flex items-center gap-3 p-4 bg-indigo-500/10 rounded-lg border border-indigo-500/20">
           <input type="checkbox" name="hasWorkspace" id="ws" className="w-5 h-5 rounded border-slate-600 text-indigo-500 focus:ring-indigo-500 bg-slate-800" />
           <label htmlFor="ws" className="text-sm text-slate-300 cursor-pointer">
              I have a proper workspace (Laptop & Stable Internet) for remote work.
           </label>
        </div>

        {errorMessage && (
          <p className="text-red-400 text-sm bg-red-900/20 p-2 rounded text-center">{errorMessage}</p>
        )}

        <button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <> <Loader2 className="animate-spin" /> Sending... </>
          ) : (
            <> <Send size={18} /> Submit Application </>
          )}
        </button>
      </form>
    </div>
  );
}