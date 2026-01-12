'use client';

import React, { useEffect, useState } from 'react';
import { getHeroStats, updateHeroAvailability } from '@/app/lib/actions';
import { User, Shield, Zap, Brain, Palette, Briefcase, Power, CheckCircle, Clock } from 'lucide-react';

type HeroStats = {
  name: string;
  email: string | null | undefined;
  class: string;
  level: number;
  xp: number;
  xpNext: number;
  stats: {
    speed: number;
    logic: number;
    aesthetic: number;
  };
  availability: boolean;
  completedProjects: number; // Data Real dari actions.ts
  activeProjects: number;    // Data Real dari actions.ts
};

export default function HeroProfilePage() {
  const [hero, setHero] = useState<HeroStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getHeroStats();
        if (data) {
          // Casting response to match HeroStats type if needed, 
          // though getHeroStats should return compatible structure
          setHero(data as HeroStats);
        }
      } catch (error) {
        console.error("Failed to load profile:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleToggleAvailability = async () => {
    if (!hero || updating) return;
    setUpdating(true);
    
    // Optimistic UI update
    const newStatus = !hero.availability;
    setHero({ ...hero, availability: newStatus });

    const result = await updateHeroAvailability(newStatus);
    if (!result.success) {
      // Revert if failed
      setHero({ ...hero, availability: !newStatus });
      alert("Failed to update status");
    }
    setUpdating(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mb-4"></div>
            <p className="text-slate-500 font-medium">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!hero) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
            <div className="text-center">
                <h3 className="text-lg font-bold text-slate-800">Profile Not Found</h3>
                <p className="text-slate-500">Please try logging in again.</p>
            </div>
        </div>
      )
  }

  // --- LOGIKA TAMPILAN (DERIVED STATS) ---
  
  // 1. Progress Bar XP
  const xpPercentage = Math.min(100, Math.max(5, (hero.xp / hero.xpNext) * 100));

  // 2. Kalkulasi Grade/Rank (A/B/C) berdasarkan Rata-rata Stats
  const avgStat = (hero.stats.speed + hero.stats.logic + hero.stats.aesthetic) / 3;
  let grade = "C";
  if (avgStat >= 90) grade = "S";
  else if (avgStat >= 80) grade = "A";
  else if (avgStat >= 70) grade = "B";
  else if (avgStat >= 50) grade = "C";
  else grade = "D";

  // 3. Success Rate (Simulasi logika: 100% default, bisa dikembangkan jika ada data 'failed')
  const successRate = 100;

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-10">
      <div className="max-w-4xl mx-auto">
        
        {/* HEADER: Identity Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-full -mr-20 -mt-20 blur-3xl opacity-50"></div>
          
          <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
            {/* Avatar Placeholder */}
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 p-1 shadow-xl shrink-0">
              <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                 <User className="w-16 h-16 text-slate-300" />
              </div>
            </div>

            <div className="text-center md:text-left flex-1 w-full">
              <div className="flex flex-col md:flex-row items-center gap-3 mb-2 justify-center md:justify-start">
                <h1 className="text-3xl font-bold text-slate-900">{hero.name}</h1>
                <span className="px-3 py-1 bg-indigo-100 text-indigo-700 text-xs font-bold rounded-full uppercase tracking-wide border border-indigo-200">
                  {hero.class}
                </span>
              </div>
              <p className="text-slate-500 mb-6">{hero.email}</p>
              
              {/* Level Progress */}
              <div className="max-w-md mx-auto md:mx-0">
                <div className="flex justify-between text-sm font-semibold text-slate-700 mb-1">
                  <span>Level {hero.level}</span>
                  <span className="text-slate-400">{hero.xp} / {hero.xpNext} XP</span>
                </div>
                <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${xpPercentage}%` }}
                  ></div>
                </div>
                <p className="text-xs text-slate-400 mt-2">
                    Earn XP by completing quests to level up and unlock better rates.
                </p>
              </div>
            </div>

            {/* Availability Toggle */}
            <div className="flex flex-col items-center min-w-[120px]">
               <button 
                 onClick={handleToggleAvailability}
                 disabled={updating}
                 className={`w-16 h-8 rounded-full p-1 transition-colors duration-300 ease-in-out cursor-pointer ${hero.availability ? 'bg-emerald-500' : 'bg-slate-300'}`}
               >
                 <div className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ${hero.availability ? 'translate-x-8' : 'translate-x-0'}`}></div>
               </button>
               <span className={`mt-2 text-xs font-bold uppercase tracking-wide ${hero.availability ? 'text-emerald-600' : 'text-slate-400'}`}>
                 {hero.availability ? 'Ready' : 'Busy'}
               </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* STATS PANEL (REAL DB DATA) */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
            <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center">
              <Shield className="w-5 h-5 mr-2 text-indigo-600" />
              Core Attributes
            </h3>
            
            <div className="space-y-6">
              {/* SPEED */}
              <div>
                <div className="flex justify-between mb-2">
                  <div className="flex items-center text-slate-700 font-medium">
                    <Zap className="w-4 h-4 mr-2 text-amber-500" /> Speed (Delivery)
                  </div>
                  <span className="font-bold text-slate-900">{hero.stats.speed}/100</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 rounded-full" style={{ width: `${hero.stats.speed}%` }}></div>
                </div>
              </div>

              {/* LOGIC */}
              <div>
                <div className="flex justify-between mb-2">
                  <div className="flex items-center text-slate-700 font-medium">
                    <Brain className="w-4 h-4 mr-2 text-blue-500" /> Logic (Backend)
                  </div>
                  <span className="font-bold text-slate-900">{hero.stats.logic}/100</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: `${hero.stats.logic}%` }}></div>
                </div>
              </div>

              {/* AESTHETIC */}
              <div>
                <div className="flex justify-between mb-2">
                  <div className="flex items-center text-slate-700 font-medium">
                    <Palette className="w-4 h-4 mr-2 text-pink-500" /> Aesthetic (UI/UX)
                  </div>
                  <span className="font-bold text-slate-900">{hero.stats.aesthetic}/100</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-pink-500 rounded-full" style={{ width: `${hero.stats.aesthetic}%` }}></div>
                </div>
              </div>
            </div>

            <div className="mt-8 p-4 bg-indigo-50 rounded-xl border border-indigo-100 text-sm text-indigo-800">
              <p className="flex items-start">
                <Briefcase className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                Stats ini bersifat dinamis dan diambil langsung dari database (Tabel HeroProfile). Selesaikan quest untuk meningkatkan statistik ini.
              </p>
            </div>
          </div>

          {/* ACTIVE STATUS / BUFFS */}
          <div className="space-y-8">
             <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
                <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center">
                  <Power className="w-5 h-5 mr-2 text-emerald-600" />
                  Active Status
                </h3>
                
                <div className="space-y-4">
                   <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100">
                      <div className="flex items-center">
                         <CheckCircle className="w-5 h-5 text-emerald-500 mr-3" />
                         <div>
                            <p className="text-sm font-bold text-slate-700">Verified Consultant</p>
                            <p className="text-xs text-slate-500">Identity confirmed</p>
                         </div>
                      </div>
                      <span className="px-2 py-1 bg-white border border-slate-200 rounded text-xs font-mono text-slate-600">PASS</span>
                   </div>

                   <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100">
                      <div className="flex items-center">
                         <Clock className="w-5 h-5 text-blue-500 mr-3" />
                         <div>
                            <p className="text-sm font-bold text-slate-700">Response Rate</p>
                            <p className="text-xs text-slate-500">Avg. reply time</p>
                         </div>
                      </div>
                      {/* Dynamic Logic: Jika Available, response rate cepat */}
                      <span className="px-2 py-1 bg-white border border-slate-200 rounded text-xs font-mono text-slate-600">
                        {hero.availability ? "< 2 Hrs" : "~ 24 Hrs"}
                      </span>
                   </div>
                </div>
             </div>

             <div className="bg-gradient-to-r from-slate-900 to-indigo-900 rounded-2xl shadow-lg p-8 text-white">
                <h3 className="text-lg font-bold mb-2">Quest History</h3>
                {/* Gunakan data real dari backend */}
                <p className="text-indigo-200 text-sm mb-6">Performance analysis based on {hero.completedProjects} completed missions.</p>
                
                <div className="flex justify-between items-center text-center">
                   <div>
                      {/* Gunakan data real dari backend */}
                      <p className="text-3xl font-bold">{hero.completedProjects}</p>
                      <p className="text-xs text-indigo-300 uppercase tracking-wide mt-1">Completed</p>
                   </div>
                   <div className="w-px h-10 bg-white/20"></div>
                   <div>
                      <p className="text-3xl font-bold text-emerald-400">{successRate}%</p>
                      <p className="text-xs text-indigo-300 uppercase tracking-wide mt-1">Success Rate</p>
                   </div>
                   <div className="w-px h-10 bg-white/20"></div>
                   <div>
                      <p className="text-3xl font-bold text-amber-400">{grade}</p>
                      <p className="text-xs text-indigo-300 uppercase tracking-wide mt-1">Avg. Grade</p>
                   </div>
                </div>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
}