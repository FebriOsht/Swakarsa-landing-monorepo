import React from 'react';
import { Award, Briefcase, TrendingUp, Zap } from 'lucide-react';

interface GuildStatsProps {
  stats: {
    activeQuests: number;
    completedQuests: number;
    totalLoot: string;
    rank: string;
    level: number;
    xpNeeded: number;
  } | null;
  loading?: boolean;
}

export default function GuildStats({ stats, loading }: GuildStatsProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8 animate-pulse">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-32 bg-slate-100 rounded-xl border border-slate-200"></div>
        ))}
      </div>
    );
  }

  const data = stats || {
    activeQuests: 0,
    completedQuests: 0,
    totalLoot: "$ 0",
    rank: "Rookie",
    level: 1,
    xpNeeded: 500
  };

  // Kalkulasi persentase XP untuk progress bar
  // Asumsi 1 Level = 500 XP. XP Current = 500 - xpNeeded
  const xpProgress = ((500 - data.xpNeeded) / 500) * 100;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
      {/* CARD 1: RANK & LEVEL (RPG STYLE) */}
      <div className="bg-gradient-to-br from-indigo-600 to-violet-700 rounded-xl p-5 text-white shadow-lg shadow-indigo-200 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10 blur-2xl"></div>
        
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="text-indigo-200 text-xs font-bold uppercase tracking-wider">Guild Rank</p>
            <h3 className="text-2xl font-bold mt-1">{data.rank}</h3>
          </div>
          <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
            <Award className="w-5 h-5 text-white" />
          </div>
        </div>
        
        {/* XP Bar Section */}
        <div>
          <div className="flex justify-between text-xs text-indigo-200 mb-1">
            <span>Lvl. {data.level}</span>
            <span>{500 - data.xpNeeded}/500 XP</span>
          </div>
          <div className="w-full h-2 bg-black/20 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${Math.max(5, xpProgress)}%` }}
            ></div>
          </div>
          <p className="text-[10px] text-indigo-300 mt-1 text-right">{data.xpNeeded} XP to level up</p>
        </div>
      </div>

      {/* CARD 2: ACTIVE QUESTS */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:border-indigo-200 transition-colors group">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-slate-500 text-sm font-medium">Active Quests</p>
            <h3 className="text-3xl font-bold text-slate-800 mt-1 group-hover:text-indigo-600 transition-colors">{data.activeQuests}</h3>
          </div>
          <div className="p-2 bg-amber-50 rounded-lg text-amber-600 group-hover:bg-amber-100 transition-colors">
            <Zap className="w-6 h-6" />
          </div>
        </div>
        <p className="mt-4 text-xs text-slate-500 flex items-center">
          {data.activeQuests > 0 
            ? <span className="text-emerald-600 font-medium">● In Progress</span> 
            : "No active missions"}
        </p>
      </div>

      {/* CARD 3: TOTAL LOOT */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:border-emerald-200 transition-colors group">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-slate-500 text-sm font-medium">Total Loot</p>
            <h3 className="text-3xl font-bold text-slate-800 mt-1 group-hover:text-emerald-600 transition-colors tracking-tight">
                {data.totalLoot}
            </h3>
          </div>
          <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600 group-hover:bg-emerald-100 transition-colors">
            <TrendingUp className="w-6 h-6" />
          </div>
        </div>
        <p className="mt-4 text-xs text-emerald-600 font-medium">
            Lifetime earnings
        </p>
      </div>

      {/* CARD 4: COMPLETED QUESTS */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:border-blue-200 transition-colors group">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-slate-500 text-sm font-medium">Completed</p>
            <h3 className="text-3xl font-bold text-slate-800 mt-1 group-hover:text-blue-600 transition-colors">{data.completedQuests}</h3>
          </div>
          <div className="p-2 bg-slate-100 rounded-lg text-slate-600 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
            <Briefcase className="w-6 h-6" />
          </div>
        </div>
        <p className="mt-4 text-xs text-slate-500">Successful raids</p>
      </div>
    </div>
  );
}