import React from 'react';
import { Calendar, DollarSign, Clock, ArrowRight, Shield } from 'lucide-react';

interface QuestProps {
  title: string;
  client: string;
  role: string;
  difficulty: 'S' | 'A' | 'B' | 'C';
  reward: string;
  deadline: string;
  status: 'AVAILABLE' | 'ACTIVE' | 'COMPLETED';
}

const difficultyColors = {
  S: 'bg-red-500 text-white shadow-red-500/50',
  A: 'bg-orange-500 text-white shadow-orange-500/50',
  B: 'bg-indigo-500 text-white shadow-indigo-500/50',
  C: 'bg-emerald-500 text-white shadow-emerald-500/50',
};

export default function QuestCard({ quest }: { quest: QuestProps }) {
  return (
    <div className="group relative bg-white border border-slate-200 rounded-xl p-5 hover:shadow-lg transition-all duration-300 hover:border-indigo-300">
      {/* Rank Badge */}
      <div className={`absolute -top-3 -right-3 w-10 h-10 rounded-lg flex items-center justify-center font-bold text-lg shadow-lg ${difficultyColors[quest.difficulty]}`}>
        {quest.difficulty}
      </div>

      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-semibold text-slate-500 mb-1 uppercase tracking-wider">
            <Shield className="w-3 h-3" />
            <span>{quest.client}</span>
          </div>
          <h3 className="text-lg font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">
            {quest.title}
          </h3>
          <span className="inline-block mt-1 px-2 py-0.5 rounded text-xs font-medium bg-slate-100 text-slate-600">
            Role: {quest.role}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 my-4 py-4 border-t border-b border-slate-100">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-emerald-100 rounded-full text-emerald-600">
            <DollarSign className="w-4 h-4" />
          </div>
          <div>
            <p className="text-xs text-slate-500">Loot (Salary)</p>
            <p className="font-semibold text-slate-800">{quest.reward}</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-100 rounded-full text-blue-600">
            <Clock className="w-4 h-4" />
          </div>
          <div>
            <p className="text-xs text-slate-500">Deadline</p>
            <p className="font-semibold text-slate-800">{quest.deadline}</p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mt-4">
        <span className={`text-xs font-bold px-3 py-1 rounded-full ${
          quest.status === 'ACTIVE' 
            ? 'bg-amber-100 text-amber-700' 
            : quest.status === 'COMPLETED' 
            ? 'bg-slate-100 text-slate-500'
            : 'bg-indigo-100 text-indigo-700'
        }`}>
          {quest.status === 'ACTIVE' ? 'IN PROGRESS' : quest.status}
        </span>
        
        <button className="flex items-center space-x-1 text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors">
          <span>View Details</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}