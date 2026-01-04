import { getLandingPageData } from "../lib/actions";
import HeroSection from "../components/agency/HeroSection";
import StatsSection from "../components/agency/StatsSection"; 
import ClientLogos from "../components/agency/ClientLogos";
import Navbar from "../components/agency/Navbar";
import { 
  PortfolioSection, 
  TeamSection, 
  ServicesSection, 
  Footer 
} from "../components/agency/SectionComponents";

// Force dynamic rendering karena kita ambil data dari DB
export const dynamic = 'force-dynamic';

export default async function AgencyHome() {
  // 1. Fetch data dari Database (Server-side)
  // Data ini diambil sekali di sini lalu disebar ke komponen anak (Services, Portfolio, Team)
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