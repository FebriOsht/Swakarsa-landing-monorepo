"use client";

import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { Zap, Shield, Brain } from "lucide-react";

type HeroProps = {
  id: string;
  name: string;
  role: string;
  rate: number; // Monthly rate
  stats: { speed: number; logic: number; aesthetic: number };
};

export function DraggableCard({ hero }: { hero: HeroProps }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: hero.id,
    data: hero, // Kirim data hero saat didrag
  });

  const style = {
    transform: CSS.Translate.toString(transform),
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="p-4 bg-slate-800 border border-slate-700 rounded-xl cursor-grab active:cursor-grabbing hover:border-indigo-500 transition-colors shadow-lg group relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500 group-hover:bg-indigo-400 transition-colors" />
      
      <div className="flex justify-between items-start mb-2">
        <div>
          <h4 className="font-bold text-white text-sm">{hero.name}</h4>
          <p className="text-xs text-indigo-400 font-mono uppercase">{hero.role}</p>
        </div>
        <div className="text-right">
          <span className="block text-xs text-slate-400">Rate/mo</span>
          <span className="font-bold text-emerald-400 text-sm">${hero.rate}</span>
        </div>
      </div>

      {/* Mini Stats Grid */}
      <div className="grid grid-cols-3 gap-1 mt-3">
        <StatBadge icon={<Zap size={10} />} value={hero.stats.speed} label="SPD" color="text-yellow-400" />
        <StatBadge icon={<Brain size={10} />} value={hero.stats.logic} label="INT" color="text-blue-400" />
        <StatBadge icon={<Shield size={10} />} value={hero.stats.aesthetic} label="AES" color="text-pink-400" />
      </div>
    </div>
  );
}

function StatBadge({ icon, value, label, color }: any) {
  return (
    <div className="flex flex-col items-center bg-slate-900/50 rounded p-1">
      <div className={`flex items-center gap-0.5 ${color}`}>
        {icon}
        <span className="text-[10px] font-bold">{value}</span>
      </div>
      <span className="text-[8px] text-slate-500 uppercase">{label}</span>
    </div>
  );
}