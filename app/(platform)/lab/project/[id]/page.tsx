import { getProjectDetails } from "@/app/lib/actions";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, Shield, User, Scroll, CheckCircle } from "lucide-react";

// Helper Date
const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat("en-US", { dateStyle: "long" }).format(date);
};

export default async function QuestDetailPage({ params }: { params: Promise<{ id: string }> }) {
  // 1. Await params (Wajib di Next.js 15)
  const resolvedParams = await params;
  
  // 2. Ambil detail project dengan security check (Member/Admin/Owner)
  const project = await getProjectDetails(resolvedParams.id);

  if (!project) return notFound();

  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto space-y-8 min-h-screen bg-slate-50/30">
      
      {/* --- HEADER --- */}
      <div className="flex flex-col gap-4">
        <Link href="/guild" className="text-slate-500 hover:text-indigo-600 flex items-center gap-2 text-sm font-bold w-fit transition-colors">
          <ArrowLeft size={16} /> Back to Guild Hall
        </Link>
        
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-3 mb-2">
               <span className="px-3 py-1 bg-indigo-100 text-indigo-700 text-xs font-bold rounded-full uppercase tracking-wider border border-indigo-200">
                 Quest Log
               </span>
               <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${
                  project.status === 'ACTIVE' ? 'bg-emerald-100 text-emerald-700 border-emerald-200' : 
                  'bg-amber-100 text-amber-700 border-amber-200'
               }`}>
                 {project.status}
               </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800">{project.name}</h1>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* --- LEFT COLUMN: MAIN INFO --- */}
        <div className="lg:col-span-2 space-y-6">
           
           {/* Briefing Card */}
           <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                <Scroll size={20} className="text-indigo-500"/> Mission Briefing
              </h3>
              <div className="space-y-4 text-slate-600 text-sm leading-relaxed">
                <p>
                  {project.description || "No description provided. Please coordinate with the Project Manager for detailed requirements."}
                </p>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex items-start gap-4">
                   <div className="p-2 bg-white rounded-lg border border-slate-200 text-indigo-500 shadow-sm">
                     <User size={20} />
                   </div>
                   <div>
                      <span className="text-xs font-bold text-slate-400 uppercase block mb-1">Client Contact</span>
                      <span className="font-bold text-slate-800 block">{project.client.name || "Valued Client"}</span>
                      <span className="text-slate-500 text-xs">{project.client.email}</span>
                   </div>
                </div>
              </div>
           </div>

           {/* Party Members */}
           <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                <Shield size={20} className="text-emerald-500"/> Party Roster
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                 {project.members.map((member) => (
                   <div key={member.id} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100 hover:border-indigo-200 transition-colors">
                      <div className="w-10 h-10 rounded-full bg-slate-800 text-white flex items-center justify-center font-bold shadow-md">
                        {member.hero.name?.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-slate-700 text-sm">{member.hero.name}</p>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] bg-slate-200 text-slate-600 px-1.5 py-0.5 rounded">
                            Lvl {member.hero.heroProfile?.xp || 1}
                          </span>
                          <span className="text-xs text-slate-400 font-mono">Specialist</span>
                        </div>
                      </div>
                   </div>
                 ))}
              </div>
           </div>

        </div>

        {/* --- RIGHT COLUMN: SIDEBAR --- */}
        <div className="space-y-6">
           <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-xl border border-slate-800">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <Calendar size={18} className="text-indigo-400"/> Quest Details
              </h3>
              <div className="space-y-4 text-sm">
                 <div className="flex justify-between border-b border-slate-700 pb-3">
                    <span className="text-slate-400">Start Date</span>
                    <span className="font-mono text-slate-200">{formatDate(project.createdAt)}</span>
                 </div>
                 <div className="flex justify-between border-b border-slate-700 pb-3">
                    <span className="text-slate-400">Duration</span>
                    <span className="font-mono text-slate-200">Ongoing</span>
                 </div>
                 <div className="pt-4">
                    <button className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 rounded-xl font-bold flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg shadow-indigo-500/25">
                      <CheckCircle size={18} /> Check In
                    </button>
                    <p className="text-center text-xs text-slate-500 mt-3">
                      Log your daily progress to earn XP.
                    </p>
                 </div>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
}