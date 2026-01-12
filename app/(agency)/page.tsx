import { Suspense } from "react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getLandingPageData } from "@/app/lib/actions";

// Default Imports (Single Component per File)
import HeroSection from "@/app/components/agency/HeroSection";
import StatsSection from "@/app/components/agency/StatsSection";
import ClientLogos from "@/app/components/agency/ClientLogos";
import Navbar from "@/app/components/agency/Navbar";

// Named Imports (Multiple Components per File or Re-exports)
import ServicesSection from "@/app/components/agency/ServicesSection";
import PortfolioSection from "@/app/components/agency/PortfolioSection";
import TeamSection from "@/app/components/agency/TeamSection";

// Component Footer sederhana
const Footer = () => (
  <footer className="relative pt-24 pb-12 bg-slate-900 border-t border-slate-800 text-center">
    <div className="container mx-auto px-6">
      <h2 className="text-3xl font-bold text-white mb-8">Ready to Level Up?</h2>
      <p className="text-slate-400 mb-8">Let's discuss your project today.</p>
      <div className="flex justify-center gap-4 mb-12">
        <a 
          href="/contact" 
          className="px-8 py-3 bg-white text-black font-bold rounded-full hover:bg-slate-200 transition-colors"
        >
          Start Project
        </a>
      </div>
      <p className="text-sm text-slate-600">
        © {new Date().getFullYear()} Swakarsa Digital. All Rights Reserved.
      </p>
    </div>
  </footer>
);

// Force dynamic rendering karena data bisa berubah sewaktu-waktu di DB
export const dynamic = 'force-dynamic';

export default async function AgencyHome() {
  // ==========================================
  // 1. SMART REDIRECT (UX IMPROVEMENT)
  // ==========================================
  const session = await auth();
  
  if (session?.user) {
    const role = (session.user as any).role;
    
    // Redirect ke dashboard yang sesuai jika user sudah login
    if (role === 'ADMIN') redirect('/admin');
    if (role === 'CLIENT') redirect('/lab');
    if (role === 'CONSULTANT') redirect('/guild');
  }

  // ==========================================
  // 2. DATA FETCHING (SERVER SIDE)
  // ==========================================
  // Mengambil data real dari database via Server Action
  const { team, portfolio, skills } = await getLandingPageData();

  return (
    <main className="min-h-screen bg-black text-white selection:bg-indigo-500/30">
      {/* Navigasi Utama */}
      <Navbar />
      
      {/* Bagian Hero (Animasi Utama) */}
      <HeroSection />

      {/* Bagian Statistik (Animasi Angka) */}
      <StatsSection />

      {/* About Section (Teks Pengantar Singkat) */}
      <section id="about" className="container mx-auto px-6 py-24 text-center max-w-4xl">
         <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
           More Than Just a Digital Agency
         </h2>
         <p className="text-lg text-slate-400 leading-relaxed">
           Swakarsa Digital is a collective of freelancers consisting of web developers, 
           digital marketers, and creative strategists. We work as one team to help brands 
           and SMEs build modern, scalable digital presence ready to compete.
         </p>
      </section>

      {/* Services Section (Data dari DB: Skill/Services) */}
      {/* Perhatikan prop: skills={skills} sesuai definisi component */}
      <Suspense fallback={<div className="py-20 text-center text-slate-500">Loading Services...</div>}>
        <ServicesSection skills={skills} />
      </Suspense>
      
      {/* Portfolio Section (Data dari DB: Projects) */}
      {/* Perhatikan prop: data={portfolio} sesuai definisi component */}
      <Suspense fallback={<div className="py-20 text-center text-slate-500">Loading Portfolio...</div>}>
        <PortfolioSection data={portfolio} />
      </Suspense>
      
      {/* Team Section (Data dari DB: Team Members) */}
      {/* Perhatikan prop: team={team} sesuai definisi component */}
      <Suspense fallback={<div className="py-20 text-center text-slate-500">Loading Team...</div>}>
        <TeamSection team={team} />
      </Suspense>

      {/* Client Logos (Daftar Klien) */}
      <ClientLogos />
      
      {/* Footer */}
      <Footer />
    </main>
  );
}