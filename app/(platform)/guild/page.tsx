'use client';

import React, { useState, useEffect } from 'react';
import GuildStats from '@/app/components/guild/GuildStats';
import QuestCard from '@/app/components/guild/QuestCard';
import { Search, Filter, Bell, Loader2, X, ArrowRight, Map, ScrollText } from 'lucide-react';
import { getQuests, getGuildStats } from '@/app/lib/actions'; 
import Link from 'next/link'; 

// Tipe data Quest sesuai return dari actions.ts
type Quest = {
  id: string;
  title: string;
  client: string;
  role: string;
  difficulty: 'S' | 'A' | 'B' | 'C';
  reward: string;
  deadline: string;
  status: string;
};

// Tipe data Stats sesuai return dari actions.ts
type Stats = {
    activeQuests: number;
    completedQuests: number;
    totalLoot: string;
    rank: string;
    level: number;
    xpNeeded: number;
} | null;

export default function GuildPage() {
  // Hapus state activeTab karena Dashboard khusus "My Quests"
  const [quests, setQuests] = useState<Quest[]>([]);
  const [stats, setStats] = useState<Stats>(null); 
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    async function fetchData() {
      try {
        const [questsResult, statsResult] = await Promise.all([
            getQuests(),
            getGuildStats()
        ]);

        if (questsResult.success && questsResult.data) {
          setQuests(questsResult.data as any); 
        }
        
        if (statsResult) {
            setStats(statsResult);
        }

      } catch (error) {
        console.error("Error loading guild data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // Filter hanya menampilkan Active & Completed (Misi Saya)
  const displayedQuests = quests.filter((quest) => {
    // 1. Filter Status: HANYA Active & Completed
    const isMyQuest = quest.status === 'ACTIVE' || quest.status === 'COMPLETED';

    // 2. Filter Search
    const query = searchQuery.toLowerCase();
    const matchesSearch = 
      quest.title.toLowerCase().includes(query) || 
      quest.client.toLowerCase().includes(query) ||
      quest.role.toLowerCase().includes(query);

    return isMyQuest && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50/50 p-6 md:p-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            The Guild Hall 🏰
          </h1>
          <p className="text-slate-500">Your command center and active missions.</p>
        </div>
        
        <div className="flex items-center gap-3">
           {/* Tombol pintas ke Quest Board */}
           <Link href="/guild/quest" className="hidden md:flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg shadow-sm hover:bg-indigo-700 transition-colors text-sm font-medium">
              Find New Quest <ArrowRight className="w-4 h-4 ml-2" />
           </Link>
           
           <button className="p-2 bg-white rounded-full border border-slate-200 hover:bg-slate-50 text-slate-600 relative">
             <Bell className="w-5 h-5" />
             <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
           </button>
        </div>
      </div>

      <GuildStats stats={stats} loading={loading} />

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden min-h-[500px]">
        {/* Header Content - Tanpa Tab */}
        <div className="border-b border-slate-200 p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h3 className="font-bold text-lg text-slate-800">My Active Log</h3>

          <div className="flex items-center gap-2 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter my quests..."
                className="w-full pl-9 pr-8 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>
            <button className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-600">
              <Filter className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Quest Grid */}
        <div className="p-6">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 text-slate-400">
              <Loader2 className="w-10 h-10 animate-spin mb-4" />
              <p>Syncing log...</p>
            </div>
          ) : displayedQuests.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedQuests.map((quest) => (
                <Link key={quest.id} href={`/guild/project/${quest.id}`} className="block h-full group hover:no-underline">
                    <QuestCard 
                      quest={{
                        ...quest,
                        status: quest.status as 'AVAILABLE' | 'ACTIVE' | 'COMPLETED'
                      }} 
                    />
                </Link>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              {searchQuery ? (
                // State 1: Search Not Found (User sedang mencari sesuatu tapi nihil)
                <>
                  <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                    <Search className="w-8 h-8 text-slate-400" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">No matches found</h3>
                  <p className="text-slate-500 max-w-xs mx-auto mt-2">
                    We couldn't find any quests matching "{searchQuery}". Try different keywords.
                  </p>
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="mt-6 text-indigo-600 font-medium hover:underline"
                  >
                    Clear Search
                  </button>
                </>
              ) : (
                // State 2: Empty Quest Log (User baru / belum ambil job) - UX LEBIH BAIK
                <>
                  <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mb-6 shadow-sm">
                    <Map className="w-10 h-10 text-indigo-500" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">Your Adventure Log is Empty</h3>
                  <p className="text-slate-500 max-w-md mx-auto mt-2 mb-8 leading-relaxed">
                    You haven't accepted any quests yet. Visit the Quest Board to find available contracts and start building your reputation as a Hero.
                  </p>
                  <Link 
                    href="/guild/quest" 
                    className="inline-flex items-center px-8 py-3 bg-indigo-600 text-white font-bold rounded-xl shadow-lg shadow-indigo-200 hover:bg-indigo-700 hover:scale-105 transition-all"
                  >
                    <ScrollText className="w-5 h-5 mr-2" />
                    Browse Quest Board
                  </Link>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}