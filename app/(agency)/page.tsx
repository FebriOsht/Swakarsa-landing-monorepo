import { getLandingPageData } from "@/app/lib/actions";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

// PERBAIKAN 1: Gunakan Default Import (tanpa kurung kurawal) untuk komponen yang satu file satu komponen
import HeroSection from "@/app/components/agency/HeroSection";
import StatsSection from "@/app/components/agency/StatsSection";
import ClientLogos from "@/app/components/agency/ClientLogos";
import Navbar from "@/app/components/agency/Navbar";

// SectionComponents biasanya berisi banyak export, jadi tetap pakai Named Import
import { 
  PortfolioSection, 
  TeamSection, 
  ServicesSection, 
  Footer 
} from "@/app/components/agency/SectionComponents";

// Force dynamic rendering karena kita ambil data dari DB
export const dynamic = 'force-dynamic';

export default async function AgencyHome() {
  // ==========================================
  // 1. SMART REDIRECT (UX IMPROVEMENT)
  // ==========================================
  // Cek apakah user sudah login. Jika ya, arahkan ke dashboard masing-masing.
  const session = await auth();
  
  if (session?.user) {
    // PERBAIKAN 2: Casting 'as any' untuk menghindari error TypeScript pada properti 'role'
    const role = (session.user as any).role;
    
    if (role === 'ADMIN') redirect('/admin');
    if (role === 'CLIENT') redirect('/lab');
    if (role === 'CONSULTANT') redirect('/guild');
  }

  // ==========================================
  // 2. DATA FETCHING (SERVER SIDE)
  // ==========================================
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
      <ServicesSection data={skills} />
      
      {/* Portfolio Section (Data dari DB: Projects) */}
      <PortfolioSection data={portfolio} />
      
      {/* Team Section (Data dari DB: Team Members) */}
      <TeamSection data={team} />

      {/* Client Logos (Daftar Klien) */}
      <ClientLogos />
      
      {/* Footer */}
      <Footer />
    </main>
  );
}