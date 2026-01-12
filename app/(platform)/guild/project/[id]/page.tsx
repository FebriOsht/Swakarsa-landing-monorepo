'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getQuestById, joinQuest } from '@/app/lib/actions';
import { ArrowLeft, Clock, DollarSign, Shield, Users, CheckCircle, AlertCircle, Briefcase, User as UserIcon } from 'lucide-react';
import Link from 'next/link';

// Tipe data untuk detail quest (Wajib sinkron dengan return getQuestById di actions.ts)
type QuestDetail = {
  id: string;
  title: string;
  client: string;
  clientImage: string | null;
  role: string;
  difficulty: 'S' | 'A' | 'B' | 'C';
  reward: string;
  deadline: string;
  status: string;
  description: string;
  isMember: boolean;
  memberCount: number;
  members: {
    id: string;
    name: string;
    role: string;
    image: string | null;
    stats: { speed: number; logic: number };
  }[];
};

export default function QuestDetailPage() {
  const params = useParams();
  const [quest, setQuest] = useState<QuestDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [joining, setJoining] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  // Fetch Data Quest saat halaman dimuat
  useEffect(() => {
    async function fetchQuest() {
      if (params.id) {
        const data = await getQuestById(params.id as string);
        if (data) {
          setQuest(data as any);
        }
        setLoading(false);
      }
    }
    fetchQuest();
  }, [params.id]);

  // Handler untuk tombol "Accept Quest"
  const handleJoin = async () => {
    if (!quest) return;
    setJoining(true);
    setMessage(null);

    const result = await joinQuest(quest.id);
    
    if (result.success) {
      setMessage({ type: 'success', text: result.message });
      // Update state lokal agar UI berubah tanpa reload (Optimistic UI)
      setQuest(prev => prev ? { 
          ...prev, 
          isMember: true, 
          memberCount: prev.memberCount + 1,
          // Tambahkan placeholder diri sendiri ke list member agar terlihat langsung
          members: [...prev.members, { 
              id: 'me', 
              name: 'You', 
              role: 'Specialist', 
              image: null, 
              stats: { speed: 50, logic: 50 } 
          }] 
      } : null);
    } else {
      setMessage({ type: 'error', text: result.message });
    }
    setJoining(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mb-4"></div>
            <p className="text-slate-500 font-medium">Loading mission briefing...</p>
        </div>
      </div>
    );
  }

  if (!quest) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
        <Briefcase className="w-16 h-16 text-slate-300 mb-4" />
        <h2 className="text-xl font-bold text-slate-800">Quest Not Found</h2>
        <Link href="/guild" className="mt-4 px-6 py-2 bg-white border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 font-medium transition-colors">
          Return to Guild Hall
        </Link>
      </div>
    );
  }

  const difficultyColors = {
    S: 'bg-red-500 shadow-red-500/50',
    A: 'bg-orange-500 shadow-orange-500/50',
    B: 'bg-indigo-500 shadow-indigo-500/50',
    C: 'bg-emerald-500 shadow-emerald-500/50',
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-10">
      <div className="max-w-5xl mx-auto">
        {/* Navigasi Kembali */}
        <Link href="/guild/quest" className="inline-flex items-center text-slate-500 hover:text-indigo-600 mb-6 transition-colors font-medium">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Quest Board
        </Link>

        {/* HERO HEADER CARD */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden relative mb-8">
          <div className="h-40 bg-gradient-to-r from-slate-900 via-indigo-900 to-slate-900 relative overflow-hidden">
            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
          </div>
          
          <div className="px-8 pb-8 relative">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end -mt-12 mb-6 gap-6">
              <div className="flex items-end">
                {/* Client Logo / Initial */}
                <div className="w-24 h-24 bg-white rounded-2xl p-1 shadow-lg mr-6 flex-shrink-0">
                  <div className="w-full h-full bg-slate-100 rounded-xl flex items-center justify-center text-3xl font-bold text-slate-400 border border-slate-200 overflow-hidden">
                    {quest.clientImage ? <img src={quest.clientImage} alt="Client" className="w-full h-full object-cover"/> : quest.client.charAt(0).toUpperCase()}
                  </div>
                </div>
                
                <div className="pb-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold text-white shadow-lg tracking-wider ${difficultyColors[quest.difficulty]}`}>
                      RANK {quest.difficulty}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-wider border ${
                        quest.status === 'ACTIVE' ? 'bg-amber-50 text-amber-600 border-amber-200' : 'bg-emerald-50 text-emerald-600 border-emerald-200'
                    }`}>
                      {quest.status}
                    </span>
                  </div>
                  <h1 className="text-3xl font-bold text-slate-900 leading-tight">{quest.title}</h1>
                  <p className="text-slate-500 font-medium mt-1 flex items-center text-sm">
                    <Shield className="w-4 h-4 mr-1.5 text-indigo-500" /> Client: <span className="text-slate-700 ml-1">{quest.client}</span>
                  </p>
                </div>
              </div>
              
              <div className="hidden md:block text-right pb-1">
                <p className="text-xs text-slate-400 uppercase tracking-wider font-bold mb-1">Contract Value</p>
                <p className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">
                    {quest.reward}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 border-t border-slate-100 pt-6">
              <div className="flex items-center p-3 rounded-xl bg-slate-50 border border-slate-100">
                <div className="p-2 bg-blue-100 text-blue-600 rounded-lg mr-3"><Clock className="w-5 h-5" /></div>
                <div>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wide">Deadline</p>
                  <p className="font-semibold text-slate-800 text-sm">{quest.deadline}</p>
                </div>
              </div>
              <div className="flex items-center p-3 rounded-xl bg-slate-50 border border-slate-100">
                <div className="p-2 bg-purple-100 text-purple-600 rounded-lg mr-3"><Users className="w-5 h-5" /></div>
                <div>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wide">Squad Size</p>
                  <p className="font-semibold text-slate-800 text-sm">{quest.memberCount} Heroes</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CONTENT LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT COLUMN: Briefing */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
              <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center">
                <span className="w-1.5 h-6 bg-indigo-500 rounded-full mr-3"></span>
                Mission Briefing
              </h3>
              <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed">
                <p className="whitespace-pre-wrap">
                    {quest.description || "No specific mission details provided. Prepare for standard deployment protocols based on client requirements."}
                </p>
                
                <h4 className="font-semibold text-slate-800 mt-6 mb-2">Standard Objectives:</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Analyze client requirements & deliverables</li>
                  <li>Collaborate with squad members</li>
                  <li>Ensure code quality & best practices</li>
                  <li>Complete within deadline</li>
                </ul>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Action & Squad */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Action Card (Status / Join Button) */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <h3 className="font-bold text-slate-900 mb-4 text-lg">Mission Status</h3>
              
              {message && (
                <div className={`mb-4 p-4 rounded-xl text-sm flex items-start border ${message.type === 'success' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-red-50 text-red-700 border-red-100'}`}>
                  {message.type === 'success' ? <CheckCircle className="w-5 h-5 mr-3 mt-0.5" /> : <AlertCircle className="w-5 h-5 mr-3 mt-0.5" />}
                  <span className="font-medium">{message.text}</span>
                </div>
              )}

              {quest.isMember ? (
                 <div className="text-center py-6 bg-gradient-to-b from-emerald-50 to-white rounded-xl border border-emerald-100">
                    <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm">
                      <CheckCircle className="w-6 h-6" />
                    </div>
                    <h4 className="font-bold text-slate-800">Joined Squad</h4>
                    <p className="text-xs text-slate-500 mt-1 px-2">Awaiting instructions.</p>
                 </div>
              ) : quest.status === 'NEGOTIATION' ? (
                <button 
                  onClick={handleJoin}
                  disabled={joining}
                  className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-200 transition-all flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed group"
                >
                  {joining ? "Processing..." : (
                    <>Accept Quest <ArrowLeft className="w-4 h-4 ml-2 rotate-180" /></>
                  )}
                </button>
              ) : (
                 <button disabled className="w-full py-4 bg-slate-100 text-slate-400 font-bold rounded-xl border border-slate-200 cursor-not-allowed">
                    Quest Unavailable
                 </button>
              )}
            </div>

            {/* SQUAD ROSTER (Daftar Anggota Tim) */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                <h3 className="font-bold text-slate-900 mb-4 flex items-center justify-between">
                    <span>Squad Roster</span>
                    <span className="text-xs font-normal text-slate-500 bg-slate-100 px-2 py-1 rounded-full">{quest.members.length} Active</span>
                </h3>
                
                <div className="space-y-4">
                    {quest.members.length > 0 ? (
                        quest.members.map((member) => (
                            <div key={member.id} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold border border-indigo-200 overflow-hidden">
                                        {member.image ? <img src={member.image} alt={member.name} className="w-full h-full object-cover"/> : <UserIcon className="w-5 h-5"/>}
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-slate-800">{member.name}</p>
                                        <p className="text-[10px] uppercase font-bold text-indigo-500">{member.role}</p>
                                    </div>
                                </div>
                                {/* Simple Stat Bar Visualization */}
                                <div className="flex flex-col items-end gap-1" title="Speed Stat">
                                    <div className="h-1.5 w-12 bg-slate-200 rounded-full overflow-hidden">
                                        <div className="h-full bg-emerald-500" style={{width: `${member.stats.speed}%`}}></div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-8 text-slate-400 text-sm italic border-2 border-dashed border-slate-100 rounded-xl">
                            Squad is currently empty.
                            <br/>Be the first to join!
                        </div>
                    )}
                </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}