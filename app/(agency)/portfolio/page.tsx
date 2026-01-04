import { getPortfolioPageData } from "../../lib/actions";
import Navbar from "../../components/agency/Navbar";
import { Footer, PortfolioSection } from "../../components/agency/SectionComponents";

export const metadata = {
  title: "Our Portfolio | Swakarsa Digital",
  description: "Explore our latest projects and case studies.",
};

export const dynamic = 'force-dynamic';

export default async function PortfolioPage() {
  const projects = await getPortfolioPageData();

  return (
    <main className="min-h-screen bg-black text-white selection:bg-indigo-500/30">
      <Navbar />
      
      {/* Header */}
      <section className="pt-32 pb-12 container mx-auto px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">
           Selected <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Works</span>
        </h1>
        <p className="text-lg text-slate-400 max-w-2xl mx-auto">
           A showcase of our technical expertise and creative solutions for clients across various industries.
        </p>
      </section>

      {/* Reusing Portfolio Section Component but with ALL data */}
      <PortfolioSection data={projects} />

      <Footer />
    </main>
  );
}