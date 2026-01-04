import Navbar from "../../components/agency/Navbar";
import { Footer } from "../../components/agency/SectionComponents";
import JobForm from "../../components/agency/JobForm";
import { Rocket, Shield, Users, Zap } from "lucide-react";

export const metadata = {
  title: "Arise: Join Swakarsa Digital",
  description: "Remote work opportunities for developers and creatives.",
};

export default function JobsPage() {
  const benefits = [
    { icon: <Zap className="text-yellow-400" />, title: "High-Ticket Projects", desc: "Access to enterprise-level projects with competitive compensation." },
    { icon: <Shield className="text-green-400" />, title: "Secure Workflow", desc: "Our platform ensures clear requirements and guaranteed payments." },
    { icon: <Rocket className="text-indigo-400" />, title: "Growth Ecosystem", desc: "Level up your rank from Bronze to Diamond based on performance." },
    { icon: <Users className="text-pink-400" />, title: "Community Support", desc: "Collaborate with other experts in the Guild." },
  ];

  return (
    <main className="min-h-screen bg-black text-white selection:bg-indigo-500/30">
      <Navbar />
      
      {/* Hero Jobs */}
      <section className="pt-32 pb-20 relative overflow-hidden">
         <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/40 via-black to-black pointer-events-none" />
         
         <div className="container mx-auto px-6 relative z-10 text-center">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 mb-6 uppercase tracking-wider">
               Codename: Arise
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight">
               Build the Future. <br />
               <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
                  Work Remotely.
               </span>
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-12">
               Swakarsa Digital is looking for the best talents to join our decentralized guild.
               No commute, no office politics—just pure impact.
            </p>
         </div>
      </section>

      {/* Content Grid */}
      <section className="pb-24">
         <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-12 gap-12 items-start">
               
               {/* Kiri: Benefit & Info */}
               <div className="lg:col-span-5 space-y-12">
                  <div>
                     <h2 className="text-3xl font-bold mb-6">Why Join The Guild?</h2>
                     <div className="space-y-8">
                        {benefits.map((b, i) => (
                           <div key={i} className="flex gap-4">
                              <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center flex-shrink-0">
                                 {b.icon}
                              </div>
                              <div>
                                 <h4 className="font-bold text-lg">{b.title}</h4>
                                 <p className="text-slate-400 text-sm leading-relaxed">{b.desc}</p>
                              </div>
                           </div>
                        ))}
                     </div>
                  </div>

                  <div className="p-6 bg-gradient-to-br from-indigo-900/50 to-purple-900/50 rounded-2xl border border-indigo-500/30">
                     <h3 className="font-bold text-xl mb-2">Open Roles</h3>
                     <ul className="space-y-2 text-indigo-200">
                        <li className="flex items-center gap-2">🔹 Frontend Developer (Next.js)</li>
                        <li className="flex items-center gap-2">🔹 UI/UX Designer (Figma)</li>
                        <li className="flex items-center gap-2">🔹 Backend Engineer (Node/Go)</li>
                        <li className="flex items-center gap-2">🔹 Content Strategist</li>
                     </ul>
                  </div>
               </div>

               {/* Kanan: Form Lamaran */}
               <div className="lg:col-span-7">
                  <JobForm />
               </div>

            </div>
         </div>
      </section>

      <Footer />
    </main>
  );
}