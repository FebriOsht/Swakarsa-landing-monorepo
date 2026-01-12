'use client';

import React, { useEffect, useState } from 'react';
import { getAssignedProjects } from '@/app/lib/actions';
import { Users, Shield, Zap, Brain, Palette } from 'lucide-react';
import Link from 'next/link';

export default function MySquadPage() {
  const [squads, setSquads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const data = await getAssignedProjects();
      setSquads(data);
      setLoading(false);
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen p-8 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-10">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            My Squads <Users className="w-6 h-6 text-indigo-600" />
          </h1>
          <p className="text-slate-500">Your active teams and party members.</p>
        </div>

        {squads.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
            <Shield className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-slate-700">No Active Squads</h3>
            <p className="text-slate-500 mb-6">You haven't joined any active quests yet.</p>
            <Link href="/guild/quest" className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
              Find a Quest
            </Link>
          </div>
        ) : (
          <div className="space-y-12">
            {squads.map((project) => (
              <div key={project.id} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                {/* Project Header */}
                <div className="bg-slate-900 p-6 flex justify-between items-center text-white">
                  <div>
                    <h2 className="text-xl font-bold">{project.name}</h2>
                    <p className="text-slate-400 text-sm">Client: {project.client.name}</p>
                  </div>
                  <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 border border-emerald-500/50 rounded-full text-xs font-bold uppercase tracking-wider">
                    Active Mission
                  </span>
                </div>

                {/* Squad Grid */}
                <div className="p-6">
                  <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Party Members ({project.members.length})</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {project.members.map((member: any) => {
                      const hero = member.hero;
                      const stats = hero.heroProfile || { statSpeed: 0, statLogic: 0, statAesthetic: 0, tier: 'Rookie' };
                      
                      return (
                        <div key={member.id} className="flex items-center p-4 rounded-xl border border-slate-100 bg-slate-50 hover:border-indigo-200 transition-all">
                          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center text-2xl border-2 border-white shadow-sm mr-4 overflow-hidden">
                             {hero.image ? <img src={hero.image} alt={hero.name} className="w-full h-full object-cover"/> : "🦸‍♂️"}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-bold text-slate-800">{hero.name || "Unknown Hero"}</h4>
                            <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded mb-2 inline-block">
                              {stats.tier}
                            </span>
                            
                            {/* Mini Stats */}
                            <div className="flex gap-2 mt-1">
                              <div className="flex items-center text-[10px] text-slate-500" title="Speed">
                                <Zap className="w-3 h-3 text-amber-500 mr-1" /> {stats.statSpeed}
                              </div>
                              <div className="flex items-center text-[10px] text-slate-500" title="Logic">
                                <Brain className="w-3 h-3 text-blue-500 mr-1" /> {stats.statLogic}
                              </div>
                              <div className="flex items-center text-[10px] text-slate-500" title="Aesthetic">
                                <Palette className="w-3 h-3 text-pink-500 mr-1" /> {stats.statAesthetic}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}