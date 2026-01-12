'use client';

import React, { useEffect, useState } from 'react';
import { getQuests } from '@/app/lib/actions';
import QuestCard from '@/app/components/guild/QuestCard';
import { Search, Filter, ScrollText } from 'lucide-react';
import Link from 'next/link';

export default function QuestBoardPage() {
  const [quests, setQuests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    async function fetchData() {
      const result = await getQuests();
      if (result.success && result.data) {
        // Filter hanya yang statusnya AVAILABLE (Negotiation)
        const availableQuests = (result.data as any[]).filter(q => q.status === 'AVAILABLE');
        setQuests(availableQuests);
      }
      setLoading(false);
    }
    fetchData();
  }, []);

  const filteredQuests = quests.filter(q => 
    q.title.toLowerCase().includes(search.toLowerCase()) || 
    q.client.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-10">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
              Quest Board <ScrollText className="w-6 h-6 text-indigo-600" />
            </h1>
            <p className="text-slate-500">Find new contracts and join active squads.</p>
          </div>
          
          <div className="flex items-center gap-2 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search jobs..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              />
            </div>
            <button className="p-2 border border-slate-200 rounded-lg hover:bg-slate-100 text-slate-600">
              <Filter className="w-4 h-4" />
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          </div>
        ) : filteredQuests.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredQuests.map((quest) => (
              <Link key={quest.id} href={`/guild/project/${quest.id}`} className="block h-full group hover:no-underline">
                <QuestCard 
                  quest={{
                    ...quest,
                    status: 'AVAILABLE'
                  }} 
                />
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl border border-slate-200">
            <p className="text-slate-500">No quests available at the moment. Check back later!</p>
          </div>
        )}
      </div>
    </div>
  );
}