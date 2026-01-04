import { getTeamPageData } from "../../lib/actions";
import Navbar from "../../components/agency/Navbar";
import { Footer, TeamSection } from "../../components/agency/SectionComponents";

export const metadata = {
  title: "Our Team | Swakarsa Digital",
  description: "Meet the experts behind Swakarsa Digital.",
};

export const dynamic = 'force-dynamic';

export default async function TeamPage() {
  const members = await getTeamPageData();

  return (
    <main className="min-h-screen bg-black text-white selection:bg-indigo-500/30">
      <Navbar />
      
      {/* Header */}
      <section className="pt-32 pb-12 container mx-auto px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">
           The <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Squad</span>
        </h1>
        <p className="text-lg text-slate-400 max-w-2xl mx-auto">
           A collective of developers, designers, and strategists working together to build great things.
        </p>
      </section>

      {/* Reusing Team Section Component */}
      <TeamSection data={members} />

      <Footer />
    </main>
  );
}