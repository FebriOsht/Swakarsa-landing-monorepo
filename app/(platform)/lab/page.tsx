import { auth } from "@/auth";
import { prisma } from "../../lib/prisma";
import { redirect } from "next/navigation";
import { Sword, Target, Scroll, Trophy, AlertCircle } from "lucide-react";

export const metadata = {
  title: "The Guild | Consultant Dashboard",
};

export default async function GuildPage() {
  const session = await auth();

  if (!session?.user?.email) {
    redirect("/login");
  }

  // Ambil data user
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: { heroProfile: true }
  });

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* 1. Guild Header */}
      <div className="flex flex-col md:flex-row justify-between items-center bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 p-8 rounded-3xl relative overflow-hidden shadow-2xl">
        <div className="relative z-10 space-y-2">
           <h1 className="text-3xl md:text-4xl font-bold text-white flex items-center gap-3">
             <Sword className="text-indigo-500" /> Guild Hall
           </h1>
           <p className="text-slate-400 max-w-lg">
             Welcome, <span className="text-white font-semibold">{user?.name}</span>. 
             This is where heroes take quests, earn loot, and build their legacy.
           </p>
        </div>
        
        {/* Rank Badge */}
        <div className="relative z-10 mt-6 md:mt-0 flex items-center gap-4 bg-black/30 p-4 rounded-2xl border border-white/5 backdrop-blur-sm">
            <div className="p-3 bg-yellow-500/20 rounded-full text-yellow-500">
                <Trophy size={24} />
            </div>
            <div>
                <div className="text-xs text-slate-400 uppercase tracking-wider font-bold">Current Rank</div>
                <div className="text-xl font-bold text-white">{user?.heroProfile?.tier || "NOVICE"}</div>
            </div>
        </div>

        {/* Dekorasi */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 blur-[120px] pointer-events-none" />
      </div>

      {/* 2. Quest Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-slate-900/50 border border-slate-800 rounded-2xl">
            <div className="flex items-center gap-3 mb-2 text-slate-400">
                <Target size={20} className="text-red-400" /> 
                <span className="text-sm font-semibold uppercase">Active Quests</span>
            </div>
            <div className="text-3xl font-bold text-white">0</div>
        </div>
        <div className="p-6 bg-slate-900/50 border border-slate-800 rounded-2xl">
            <div className="flex items-center gap-3 mb-2 text-slate-400">
                <Scroll size={20} className="text-blue-400" /> 
                <span className="text-sm font-semibold uppercase">Completed</span>
            </div>
            <div className="text-3xl font-bold text-white">0</div>
        </div>
        <div className="p-6 bg-slate-900/50 border border-slate-800 rounded-2xl">
            <div className="flex items-center gap-3 mb-2 text-slate-400">
                <Trophy size={20} className="text-yellow-400" /> 
                <span className="text-sm font-semibold uppercase">Total XP</span>
            </div>
            <div className="text-3xl font-bold text-white">{user?.heroProfile?.xp || 0}</div>
        </div>
      </div>

      {/* 3. Quest Board (Empty State) */}
      <div className="grid md:grid-cols-1 gap-6">
         <div className="p-12 text-center border-2 border-dashed border-slate-800 rounded-3xl bg-slate-900/10">
            <div className="w-16 h-16 bg-slate-800/50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-500">
                <AlertCircle size={32} />
            </div>
            <h3 className="text-xl font-semibold text-slate-300 mb-2">No Quests Available</h3>
            <p className="text-slate-500 max-w-md mx-auto">
                There are no active quests assigned to you at the moment. 
                Check back later or wait for "The Lab" clients to draft new projects.
            </p>
         </div>
      </div>
    </div>
  );
}