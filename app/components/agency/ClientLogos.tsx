"use client";

import { motion } from "framer-motion";

const clientLogos = [
  { name: "CV. ALUMKA CIPTA PRIMA", src: "/trust/cv alumka cipta prima.jpeg" },
  { name: "CV. TAN JAYA STEEL", src: "/trust/cv tan jaya steel.jpeg" },
  { name: "FEIXEN XIAO GROUP", src: "/trust/feixen xiao group.jpeg" },
  { name: "HOTEL DWIPA", src: "/trust/hotel dwipa.jpeg" },
  { name: "MAJU MOBILINDO", src: "/trust/maju mobilindo.jpeg" },
];

export default function ClientLogos() {
  return (
    <section className="container mx-auto px-4 sm:px-6 py-16 sm:py-20 bg-black">
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
                {clientLogos.map((logo, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="group relative"
                    >
                      <img
                        src={logo.src}
                        alt={logo.name}
                        className="h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 rounded-full object-cover transition-all duration-300 opacity-80 hover:opacity-100 hover:scale-110"
                        onError={(e: any) => { 
                            e.target.onerror = null; 
                            e.target.src="https://placehold.co/120x120/A0A0A0/FFFFFF?text=Client";
                        }}
                      />
                    </motion.div>
                ))}
            </div>
        </motion.div>
    </section>
  );
}